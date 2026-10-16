import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controller, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ChibiButton } from '../button/button';
import { ChibiInput } from '../input/input';
import { ChibiSelect, ChibiSelectItem } from '../select/select';
import { ChibiSwitch } from '../switch/switch';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  flavour: z.enum(['strawberry', 'matcha'], { message: 'Pick a flavour' }),
  terms: z.literal(true, { message: 'Please accept the terms' }),
});
type Values = z.infer<typeof schema>;

function AdoptionForm({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ChibiInput label="Name" error={errors.name?.message} {...register('name')} />
      <Controller
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
            ref={field.ref}
            name={field.name}
          >
            <ChibiSelectItem value="strawberry">Strawberry</ChibiSelectItem>
            <ChibiSelectItem value="matcha">Matcha</ChibiSelectItem>
          </ChibiSelect>
        )}
      />
      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <ChibiSwitch
            label="I accept the terms"
            error={errors.terms?.message}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            name={field.name}
          />
        )}
      />
      <ChibiButton type="submit">Adopt</ChibiButton>
    </form>
  );
}

describe('react-hook-form + zod integration', () => {
  it('shows schema errors, focuses the first invalid field, then submits valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AdoptionForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Adopt' }));

    const name = screen.getByRole('textbox', { name: 'Name' });
    expect(await screen.findByText('Name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Pick a flavour')).toBeInTheDocument();
    expect(screen.getByText('Please accept the terms')).toBeInTheDocument();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(name, 'Mochi');
    const flavour = screen.getByRole('combobox', { name: 'Flavour' });
    flavour.focus();
    await user.keyboard('{Enter}');
    await user.click(await screen.findByRole('option', { name: 'Matcha' }));
    await user.click(screen.getByRole('switch', { name: 'I accept the terms' }));
    await user.click(screen.getByRole('button', { name: 'Adopt' }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        { name: 'Mochi', flavour: 'matcha', terms: true },
        expect.anything(),
      ),
    );
  });
});
