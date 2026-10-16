import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChibiButton } from '../components/button/button';
import { ChibiInput } from '../components/input/input';
import { ChibiSelect, ChibiSelectItem } from '../components/select/select';
import { ChibiSwitch } from '../components/switch/switch';
import { ChibiToastProvider, useChibiToast } from '../components/toast/toast';

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  flavour: z.enum(['strawberry', 'matcha', 'peach'], { message: 'Pick a flavour' }),
  newsletter: z.boolean(),
});
type Values = z.infer<typeof schema>;

function SignupForm() {
  const { toast } = useChibiToast();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', newsletter: false },
  });

  const onSubmit = async (values: Values) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success(`Welcome, ${values.name}!`, { description: 'Your mochi box is on its way.' });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-96 max-w-full flex-col gap-5"
    >
      <ChibiInput
        label="Name"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register('name')}
      />
      <ChibiInput
        label="Email"
        type="email"
        autoComplete="email"
        labelVariant="floating"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Controller
        control={control}
        name="flavour"
        render={({ field }) => (
          <ChibiSelect
            label="Favourite flavour"
            placeholder="Pick one"
            required
            error={errors.flavour?.message}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            name={field.name}
          >
            <ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>
            <ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>
            <ChibiSelectItem value="peach">Peach</ChibiSelectItem>
          </ChibiSelect>
        )}
      />
      <Controller
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
      />
      <ChibiButton type="submit" variant="kawaii" loading={isSubmitting} loadingText="Signing up…">
        Sign up
      </ChibiButton>
    </form>
  );
}

const meta = {
  title: 'Forms/react-hook-form + Zod',
  parameters: { layout: 'centered' },
  render: () => (
    <ChibiToastProvider>
      <SignupForm />
    </ChibiToastProvider>
  ),
} satisfies Meta;

export default meta;

export const SignUp: StoryObj<typeof meta> = {};
