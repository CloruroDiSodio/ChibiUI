import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge needs to know about ChibiUI's custom theme scales, otherwise
 * e.g. `shadow-chibi-md` would be mistaken for a shadow *colour* and fail to
 * override `shadow-chibi-sm`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ['chibi-sm', 'chibi-md', 'chibi-lg', 'chibi-pop'],
      radius: ['chibi-sm', 'chibi-md', 'chibi-lg', 'chibi-full'],
      font: ['chibi-display', 'chibi-body'],
      ease: ['chibi-bounce', 'chibi-out'],
      animate: [
        'chibi-spin',
        'chibi-spin-slow',
        'chibi-bob',
        'chibi-accordion-down',
        'chibi-accordion-up',
        'chibi-pop-in',
        'chibi-pop-out',
        'chibi-wiggle',
      ],
    },
  },
});

/** Merges conditional class names and resolves Tailwind conflicts (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
