/** Hand-written, real-world usage examples shown under each playground. */
export const usageSnippets: Record<string, { title: string; code: string }[]> = {
  button: [
    {
      title: 'Router links with asChild',
      code: `import Link from 'next/link';
import { ChibiButton } from '@chibi-ui/react/button';

<ChibiButton asChild variant="secondary" rightIcon={<ArrowRightIcon />}>
  <Link href="/docs">Read the docs</Link>
</ChibiButton>`,
    },
    {
      title: 'Async action',
      code: `const [saving, setSaving] = useState(false);

<ChibiButton
  loading={saving}
  loadingText="Saving…"
  onClick={async () => {
    setSaving(true);
    await save();
    setSaving(false);
  }}
>
  Save
</ChibiButton>`,
    },
  ],
  card: [
    {
      title: 'Whole-card link (single tab stop)',
      code: `<ChibiCard asChild variant="interactive" tilt>
  <a href="/recipes/matcha">
    <ChibiCardHeader>
      <ChibiCardTitle asChild>
        <h2>Matcha latte</h2>
      </ChibiCardTitle>
      <ChibiCardDescription>Ready in 5 minutes</ChibiCardDescription>
    </ChibiCardHeader>
  </a>
</ChibiCard>`,
    },
  ],
  toast: [
    {
      title: '1 · Mount the provider once',
      code: `// app/layout.tsx
import { ChibiToastProvider } from '@chibi-ui/react/toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChibiToastProvider position="bottom-right">{children}</ChibiToastProvider>
      </body>
    </html>
  );
}`,
    },
    {
      title: '2 · Update a toast in place',
      code: `const { toast } = useChibiToast();

const id = toast({ title: 'Uploading…', icon: '⏳', duration: Infinity });
try {
  await upload(file);
  toast.success('Uploaded!', { id });
} catch {
  toast.error('Upload failed', { id, description: 'Please try again.' });
}`,
    },
  ],
  dialog: [
    {
      title: 'Controlled dialog',
      code: `const [open, setOpen] = useState(false);

<ChibiDialog open={open} onOpenChange={setOpen}>
  <ChibiDialogContent size="sm">
    <ChibiDialogHeader>
      <ChibiDialogTitle>Delete snack?</ChibiDialogTitle>
      <ChibiDialogDescription>This cannot be undone.</ChibiDialogDescription>
    </ChibiDialogHeader>
    <ChibiDialogFooter>
      <ChibiDialogClose asChild>
        <ChibiButton variant="ghost">Cancel</ChibiButton>
      </ChibiDialogClose>
      <ChibiButton onClick={() => { remove(); setOpen(false); }}>Delete</ChibiButton>
    </ChibiDialogFooter>
  </ChibiDialogContent>
</ChibiDialog>`,
    },
  ],
  accordion: [
    {
      title: 'Multiple open sections',
      code: `<ChibiAccordion type="multiple" defaultValue={['shipping']}>
  <ChibiAccordionItem value="shipping">
    <ChibiAccordionTrigger headingLevel={2}>Shipping</ChibiAccordionTrigger>
    <ChibiAccordionContent>Free over ¥3000.</ChibiAccordionContent>
  </ChibiAccordionItem>
  <ChibiAccordionItem value="returns">
    <ChibiAccordionTrigger headingLevel={2}>Returns</ChibiAccordionTrigger>
    <ChibiAccordionContent>Within 30 days.</ChibiAccordionContent>
  </ChibiAccordionItem>
</ChibiAccordion>`,
    },
  ],
  input: [
    {
      title: 'react-hook-form + Zod',
      code: `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChibiInput } from '@chibi-ui/react/input';

const schema = z.object({ email: z.email('Please enter a valid email') });

function Newsletter() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(subscribe)} noValidate>
      <ChibiInput
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
    </form>
  );
}`,
    },
  ],
  select: [
    {
      title: 'react-hook-form Controller',
      code: `<Controller
  control={control}
  name="flavour"
  render={({ field }) => (
    <ChibiSelect
      label="Flavour"
      placeholder="Pick one"
      error={errors.flavour?.message}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref} // lets RHF focus the trigger on error
      name={field.name}
    >
      <ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>
      <ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>
    </ChibiSelect>
  )}
/>`,
    },
  ],
  switch: [
    {
      title: 'react-hook-form Controller',
      code: `<Controller
  control={control}
  name="newsletter"
  render={({ field }) => (
    <ChibiSwitch
      label="Send me cute newsletters"
      checked={field.value}
      onCheckedChange={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref}
      name={field.name}
    />
  )}
/>`,
    },
  ],
};
