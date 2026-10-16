import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Props shared by every ChibiUI form control. */
export interface ChibiFieldProps {
  /** Visible label. Strongly recommended; otherwise pass `aria-label`. */
  label?: ReactNode;
  /** Helper text linked to the control via `aria-describedby`. */
  description?: ReactNode;
  /**
   * Error message (e.g. `errors.email?.message` from react-hook-form).
   * Any truthy value marks the control `aria-invalid`; pass `true` for no message.
   */
  error?: ReactNode;
}

const hasContent = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== true && node !== '';

interface UseFieldOptions {
  id?: string | undefined;
  description?: ReactNode;
  error?: ReactNode;
  'aria-describedby'?: string | undefined;
}

export function useField({ id, description, error, ...rest }: UseFieldOptions) {
  const generatedId = useId();
  const fieldId = id ?? `chibi${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(error);
  const showDescription = hasContent(description);
  const showError = hasContent(error);

  const describedBy =
    [rest['aria-describedby'], showDescription && descriptionId, showError && errorId]
      .filter(Boolean)
      .join(' ') || undefined;

  return {
    fieldId,
    descriptionId,
    errorId,
    invalid,
    showDescription,
    showError,
    controlProps: {
      id: fieldId,
      'aria-invalid': invalid || undefined,
      'aria-describedby': describedBy,
    },
  };
}

interface FieldLabelProps extends ComponentProps<'label'> {
  required?: boolean | undefined;
}

export function FieldLabel({ required, className, children, ...props }: FieldLabelProps) {
  return (
    <label
      data-chibi="label"
      className={cn(
        'inline-flex items-center gap-1 font-chibi-display text-sm font-semibold text-chibi-fg',
        className,
      )}
      {...props}
    >
      {children}
      {/* The native `required` attribute already announces this; the asterisk is visual. */}
      {required && (
        <span aria-hidden="true" className="text-chibi-danger-fg">
          *
        </span>
      )}
    </label>
  );
}

interface FieldMessagesProps {
  field: ReturnType<typeof useField>;
  description?: ReactNode;
  error?: ReactNode;
}

export function FieldMessages({ field, description, error }: FieldMessagesProps) {
  return (
    <>
      {field.showDescription && (
        <p id={field.descriptionId} className="m-0 text-sm text-chibi-fg-muted">
          {description}
        </p>
      )}
      {/* Always mounted so the polite live region announces errors that appear on blur. */}
      <p
        id={field.errorId}
        aria-live="polite"
        className={cn(
          'm-0 items-start gap-1.5 text-sm font-medium text-chibi-danger-fg',
          field.showError ? 'flex' : 'sr-only',
        )}
      >
        {field.showError && (
          <>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="mt-px size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v5.5M12 16.5v.01" />
            </svg>
            <span>{error}</span>
          </>
        )}
      </p>
    </>
  );
}
