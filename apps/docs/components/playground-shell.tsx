'use client';

import { ChibiInput } from '@chibi-ui/react/input';
import { ChibiSelect, ChibiSelectItem } from '@chibi-ui/react/select';
import { ChibiSwitch } from '@chibi-ui/react/switch';
import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';

export type Control =
  | { type: 'select'; name: string; label: string; options: readonly string[] }
  | { type: 'boolean'; name: string; label: string }
  | { type: 'text'; name: string; label: string };

export type ControlValues = Record<string, string | boolean>;

interface PlaygroundShellProps<V extends ControlValues> {
  controls: readonly Control[];
  values: V;
  onChange: (name: keyof V & string, value: string | boolean) => void;
  preview: ReactNode;
  code: string;
}

export function PlaygroundShell<V extends ControlValues>({
  controls,
  values,
  onChange,
  preview,
  code,
}: PlaygroundShellProps<V>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid overflow-hidden rounded-chibi-lg border-2 border-chibi-border lg:grid-cols-[1fr_17rem]">
        <section
          aria-label="Live preview"
          className="relative flex min-h-72 items-center justify-center bg-chibi-bg bg-[radial-gradient(var(--chibi-border)_1px,transparent_1px)] [background-size:18px_18px] p-8"
        >
          {preview}
        </section>
        <form
          aria-label="Playground controls"
          onSubmit={(event) => event.preventDefault()}
          className="flex flex-col gap-4 border-t-2 border-chibi-border bg-chibi-surface p-5 lg:border-t-0 lg:border-l-2"
        >
          {controls.map((control) => {
            const value = values[control.name];
            switch (control.type) {
              case 'select':
                return (
                  <ChibiSelect
                    key={control.name}
                    label={control.label}
                    size="sm"
                    value={String(value)}
                    onValueChange={(next) => onChange(control.name, next)}
                  >
                    {control.options.map((option) => (
                      <ChibiSelectItem key={option} value={option}>
                        {option}
                      </ChibiSelectItem>
                    ))}
                  </ChibiSelect>
                );
              case 'boolean':
                return (
                  <ChibiSwitch
                    key={control.name}
                    label={control.label}
                    size="sm"
                    checked={value === true}
                    onCheckedChange={(next) => onChange(control.name, next)}
                  />
                );
              case 'text':
                return (
                  <ChibiInput
                    key={control.name}
                    label={control.label}
                    size="sm"
                    value={String(value)}
                    maxLength={80}
                    onChange={(event) => onChange(control.name, event.target.value)}
                  />
                );
            }
          })}
        </form>
      </div>
      <CodeBlock code={code} title="Generated code" />
    </div>
  );
}
