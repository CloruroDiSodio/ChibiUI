/** Shared helper types. */

/** Removes keys from `T` that are re-declared in `U`, then merges `U`. */
export type Merge<T, U> = Omit<T, keyof U> & U;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
