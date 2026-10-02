import { ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface SectionTwoProps {
  onRunDemo: (feature?: string) => void;
  onOpenConsultation: () => void;
}

export function SectionTwo({ onRunDemo, onOpenConsultation }: SectionTwoProps) {
  const capabilities = [
    {
      index: '01',
      title: 'Real-time vision',
      body: 'Reads context as it happens and surfaces what matters before you ask.',
    },
    {
      index: '02',
      title: 'Layered insight',
      body: 'Moves from rough outline to sharp output without losing the thread.',
    },
    {
      index: '03',
      title: 'Adaptive speed',
      body: 'Learns your cadence and tightens every pass as you work.',
    },
  ];

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 relative z-10">
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between w-full">
        {/* Left: Badge */}
        <Reveal delay={120}>
          <div className="border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md inline-block">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white select-none">
              Insight On Demand
            </span>
          </div>
        </Reveal>

        {/* Right: Intro copy */}
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-normal">
            Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
          </p>
        </Reveal>
      </div>

      {/* Bottom Area */}
      <div className="flex-1 flex flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16 pt-12 sm:pt-16">
        {/* Left Column */}
        <div className="max-w-xl">
          <Reveal delay={180}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Learn to see
              <br />
              brilliantly.
            </h2>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed">
              From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onRunDemo()}
                className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 inline-flex items-center gap-1.5 transition-colors duration-300 cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
              >
                <span>Run the demo</span>
                <ChevronRight size={14} className="shrink-0" />
              </button>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Free consultation
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right: Frosted Capability Panel */}
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6 shadow-2xl shrink-0">
          {capabilities.map((cap, idx) => {
            const isLast = idx === capabilities.length - 1;
            return (
              <Reveal key={cap.index} delay={300 + idx * 110}>
                <div
                  onClick={() => onRunDemo(cap.title)}
                  className={`flex gap-5 py-5 group cursor-pointer transition-colors duration-300 ${
                    !isLast ? 'border-b border-white/15' : ''
                  }`}
                >
                  {/* Index */}
                  <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5 select-none shrink-0">
                    {cap.index}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-medium text-white group-hover:text-white/95 transition-colors">
                        {cap.title}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white shrink-0"
                      />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      {cap.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
