import { Hexagon } from 'lucide-react';
import { Reveal } from './Reveal';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenProjects: () => void;
  onOpenAbout: () => void;
  onOpenBlog: () => void;
  onOpenContact: () => void;
}

export function Navbar({
  onOpenConsultation,
  onOpenProjects,
  onOpenAbout,
  onOpenBlog,
  onOpenContact,
}: NavbarProps) {
  const navItems = [
    {
      label: 'Projects',
      badge: '6',
      onClick: onOpenProjects,
    },
    {
      label: 'About',
      onClick: onOpenAbout,
    },
    {
      label: 'Blog',
      onClick: onOpenBlog,
    },
    {
      label: 'Contact',
      onClick: onOpenContact,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/15 bg-[#0a0a0a]/40 backdrop-blur-md transition-colors duration-300">
      <div className="w-full px-5 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Reveal delay={0}>
          <a
            href="/"
            className="flex items-center gap-2.5 text-white group cursor-pointer focus:outline-none"
            aria-label="NovaAI home"
          >
            <Hexagon
              size={24}
              strokeWidth={1.5}
              className="text-white transition-transform duration-300 group-hover:rotate-45"
            />
            <span className="text-lg sm:text-xl font-medium tracking-tight text-white">
              novaai
            </span>
          </a>
        </Reveal>

        {/* Center: Navigation Links (hidden below md) */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {navItems.map((item, idx) => (
            <Reveal key={item.label} delay={100 + idx * 100}>
              <button
                type="button"
                onClick={item.onClick}
                className="text-sm text-white/85 hover:text-white transition-colors duration-300 inline-flex items-baseline gap-1 cursor-pointer focus:outline-none"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <sup className="font-mono text-[10px] text-white/60 font-normal">
                    {item.badge}
                  </sup>
                )}
              </button>
            </Reveal>
          ))}
        </nav>

        {/* Right: CTA */}
        <Reveal delay={500}>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="rounded-md border border-white/20 bg-white/15 backdrop-blur-md px-4 py-2 text-xs sm:px-5 sm:text-sm text-white hover:bg-white/25 transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
          >
            Get Free Consultation
          </button>
        </Reveal>
      </div>
    </header>
  );
}
