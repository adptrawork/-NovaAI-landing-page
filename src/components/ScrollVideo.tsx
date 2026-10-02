import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

// High-fidelity fallback poster with dark cinematic ambient atmosphere and glowing particles
const POSTER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><radialGradient id="g1" cx="55%" cy="45%" r="45%"><stop offset="0%" stop-color="%23e08a3c" stop-opacity="0.25"/><stop offset="50%" stop-color="%231a2332" stop-opacity="0.4"/><stop offset="100%" stop-color="%230a0a0a" stop-opacity="0.95"/></radialGradient><radialGradient id="g2" cx="30%" cy="60%" r="50%"><stop offset="0%" stop-color="%232c3e50" stop-opacity="0.2"/><stop offset="100%" stop-color="%230a0a0a" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="%230a0a0a"/><rect width="100%" height="100%" fill="url(%23g1)"/><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="980" cy="520" r="140" fill="%23f59e0b" opacity="0.08"/><circle cx="1120" cy="460" r="4" fill="%23fcd34d" opacity="0.7"/><circle cx="860" cy="620" r="3" fill="%23fbbf24" opacity="0.5"/><circle cx="1240" cy="580" r="2.5" fill="%23fef3c7" opacity="0.6"/></svg>`;

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasDecodedFrame, setHasDecodedFrame] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const framesRef = useRef<ImageBitmap[]>([]);
  const durationRef = useRef(0);
  const isExtractingRef = useRef(false);

  // 1. Scroll & resize listener to compute target progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = Math.max(1, scrollHeight - innerHeight);
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetProgressRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // 2. Setup canvas dimensions with DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Redraw if frames are ready
      if (framesRef.current.length > 0) {
        drawFrame(smoothedProgressRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to draw ImageBitmap onto canvas using object-cover
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.min(
      frames.length - 1,
      Math.max(0, Math.floor(progress * (frames.length - 1)))
    );
    const img = frames[idx];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    // object-cover math: scale max, center crop
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // 3. Animation loop: smooth lerp + scrub
  useEffect(() => {
    let animId: number;

    const loop = () => {
      // Smooth lerp: smoothed += (target - smoothed) * 0.12
      const target = targetProgressRef.current;
      const current = smoothedProgressRef.current;
      smoothedProgressRef.current += (target - current) * 0.12;

      // When frames are cached on canvas
      if (framesRef.current.length > 0) {
        drawFrame(smoothedProgressRef.current);
      } else if (videoRef.current && durationRef.current > 0) {
        // Fallback: direct seek of visible <video>
        const video = videoRef.current;
        const targetTime = smoothedProgressRef.current * Math.max(0, durationRef.current - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 4. Video metadata & Frame Cache Extraction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isDisposed = false;

    const onLoadedData = () => {
      setHasDecodedFrame(true);
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }

      // Wait 300ms yield before starting offscreen frame cache extraction
      setTimeout(() => {
        if (!isDisposed && !isExtractingRef.current && framesRef.current.length === 0) {
          startFrameExtraction(video.duration || 6);
        }
      }, 300);
    };

    const onDurationChange = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('durationchange', onDurationChange);

    if (video.readyState >= 2) {
      onLoadedData();
    }

    const startFrameExtraction = async (duration: number) => {
      isExtractingRef.current = true;
      try {
        const offscreenVideo = document.createElement('video');
        offscreenVideo.crossOrigin = 'anonymous';
        offscreenVideo.muted = true;
        offscreenVideo.playsInline = true;
        offscreenVideo.preload = 'auto';
        offscreenVideo.src = VIDEO_URL;

        await new Promise<void>((resolve, reject) => {
          offscreenVideo.onloadedmetadata = () => resolve();
          offscreenVideo.onerror = (e) => reject(e);
          setTimeout(() => reject(new Error('offscreen timeout')), 10000);
        });

        const effectiveDuration = offscreenVideo.duration || duration || 6;
        durationRef.current = effectiveDuration;

        // Extract up to 90 frames (or duration * 12, min 24), max width 960px
        const frameCount = Math.min(90, Math.max(24, Math.round(effectiveDuration * 12)));
        const targetWidth = Math.min(960, offscreenVideo.videoWidth || 960);
        const aspect = (offscreenVideo.videoHeight || 540) / (offscreenVideo.videoWidth || 960);
        const targetHeight = Math.round(targetWidth * aspect);

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = targetWidth;
        offscreenCanvas.height = targetHeight;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        if (!offscreenCtx) {
          throw new Error('Could not get 2d context');
        }

        const extracted: ImageBitmap[] = [];

        for (let i = 0; i < frameCount; i++) {
          if (isDisposed) return;
          const seekTime = (i / (frameCount - 1)) * (effectiveDuration - 0.05);

          await new Promise<void>((resolve) => {
            const onSeeked = () => {
              offscreenVideo.removeEventListener('seeked', onSeeked);
              resolve();
            };
            offscreenVideo.addEventListener('seeked', onSeeked);
            offscreenVideo.currentTime = seekTime;
          });

          offscreenCtx.drawImage(offscreenVideo, 0, 0, targetWidth, targetHeight);

          if (typeof window.createImageBitmap === 'function') {
            const bmp = await createImageBitmap(offscreenCanvas);
            extracted.push(bmp);
          } else {
            // Browser doesn't support createImageBitmap, rely on fallback
            throw new Error('createImageBitmap not supported');
          }
        }

        if (!isDisposed && extracted.length > 0) {
          framesRef.current = extracted;
          setIsCanvasReady(true);
          drawFrame(smoothedProgressRef.current);
        }
      } catch (err) {
        // If CORS or video extraction fails, visible <video> direct seek handles playback flawlessly
        console.warn('Offscreen frame cache fallback to direct video scrub:', err);
      } finally {
        isExtractingRef.current = false;
      }
    };

    return () => {
      isDisposed = true;
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('durationchange', onDurationChange);
      framesRef.current.forEach((bmp) => bmp.close?.());
      framesRef.current = [];
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Poster image (fades out when decoded frame or canvas ready) */}
      <img
        src={POSTER_SVG}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasDecodedFrame || isCanvasReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Layer 2: Visible <video> (visible while video has a frame and canvas cache is not ready, then fades out) */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        crossOrigin="anonymous"
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasDecodedFrame && !isCanvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Layer 3: Canvas drawing cached ImageBitmaps (fades in when ready) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isCanvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cinematic subtle dark overlay vignette for contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.6)_100%)]" />
    </div>
  );
}
