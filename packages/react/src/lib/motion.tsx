import { LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// Dynamic import: the animation feature bundle is code-split and fetched after first
// render instead of blocking the initial JS of every component that animates.
const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

/**
 * Wraps animated components so that:
 *  - only the lightweight `m.*` components ship up front; `domAnimation` features
 *    are lazy-loaded (LazyMotion) in a separate chunk;
 *  - transform/layout animations are skipped for users with `prefers-reduced-motion`
 *    (opacity fades are kept so state changes are still perceivable).
 */
export function ChibiMotion({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
