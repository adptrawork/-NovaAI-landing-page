import { useState } from 'react';
import { ChevronRight, User } from 'lucide-react';
import { Reveal } from './Reveal';

const PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

interface SectionOneProps {
  onBookCall: () => void;
}

export function SectionOne({ onBookCall }: SectionOneProps) {
  const [imageError, setImageError] = useState(false);

  const services = [
    '/ AI AUTOMATION',
    '/ AI INTEGRATION',
    '/ AI AGENT DEVELOPMENT',
  ];

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 relative z-10">
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between w-full">
        {/* Left: Service List */}
        <div className="flex flex-col gap-2">
          {services.map((service, idx) => (
            <Reveal key={service} delay={150 + idx * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md select-none">
                {service}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right: Intro */}
        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-normal">
            We design automation that brings clarity, precision, and efficiency to the way your company operates.
          </p>
        </Reveal>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between w-full mt-12 sm:mt-0">
        {/* Left: Badge + H1 */}
        <div className="max-w-2xl">
          <Reveal delay={150}>
            <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white select-none">
                We Automate 100+ Businesses
              </span>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Clear. Precise.
              <br />
              Automated.
            </h1>
          </Reveal>
        </div>

        {/* Right: Glass Contact Card */}
        <Reveal delay={420} className="shrink-0">
          <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
            {/* Portrait Image */}
            <div className="relative h-24 w-20 overflow-hidden rounded-lg bg-neutral-800/80 shrink-0">
              {!imageError ? (
                <img
                  src={PORTRAIT_URL}
                  alt="Mitha, co-founder of NovaAI"
                  className="h-24 w-20 rounded-lg object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900 text-white/70">
                  <User size={28} className="opacity-80" />
                  <span className="text-[9px] font-mono mt-1 opacity-60">MITHA</span>
                </div>
              )}
            </div>

            {/* Text and Action */}
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white tracking-tight">
                Talk with Mitha
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                Co-founder of NovaAI
              </span>
              <button
                type="button"
                onClick={onBookCall}
                className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors duration-300 cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
              >
                <span>Book 15-mins call</span>
                <ChevronRight size={14} className="shrink-0" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
