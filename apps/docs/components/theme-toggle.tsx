'use client';

import { useSyncExternalStore } from 'react';
import { isTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme-script';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-chibi-theme'] });
  return () => observer.disconnect();
};

const getSnapshot = (): Theme => {
  const value = document.documentElement.getAttribute('data-chibi-theme');
  return isTheme(value) ? value : 'system';
};

const options: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '💻' },
];

export function ThemeToggle() {
  // The server renders "system"; the inline theme script may already have changed the DOM.
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'system' as const);

  const select = (next: Theme) => {
    document.documentElement.setAttribute('data-chibi-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies): the choice still applies.
    }
  };

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-0.5 rounded-full border-2 border-chibi-border bg-chibi-surface p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={theme === option.value}
          onClick={() => select(option.value)}
          className="inline-flex size-8 items-center justify-center rounded-full text-sm transition-colors hover:bg-chibi-ghost-hover aria-pressed:bg-chibi-primary"
        >
          <span aria-hidden="true">{option.icon}</span>
          <span className="sr-only">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
