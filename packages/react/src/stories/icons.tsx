/** Tiny inline icons used by stories and docs examples (not part of the public API). */
import type { ComponentProps } from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

export const HeartIcon = (props: ComponentProps<'svg'>) => (
  <svg {...base} {...props}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </svg>
);

export const SparkleIcon = (props: ComponentProps<'svg'>) => (
  <svg {...base} {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
  </svg>
);

export const ArrowRightIcon = (props: ComponentProps<'svg'>) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const MailIcon = (props: ComponentProps<'svg'>) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const SearchIcon = (props: ComponentProps<'svg'>) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </svg>
);
