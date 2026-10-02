import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: '700ms',
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out will-change-transform ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </Component>
  );
}
