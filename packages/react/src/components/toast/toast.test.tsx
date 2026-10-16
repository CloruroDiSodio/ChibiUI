import { act, render, renderHook, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoAxeViolations } from '../../test/axe';
import { createToastStore } from './store';
import { ChibiToastProvider, useChibiToast, type UseChibiToastResult } from './toast';

function setup(props: Partial<ComponentProps<typeof ChibiToastProvider>> = {}) {
  let api!: UseChibiToastResult;
  function Grab() {
    api = useChibiToast();
    return null;
  }
  const utils = render(
    <ChibiToastProvider {...props}>
      <Grab />
    </ChibiToastProvider>,
  );
  return { ...utils, api: () => api };
}

const region = () => screen.getByRole('region', { name: /notifications/i });

describe('ChibiToastProvider / useChibiToast', () => {
  it('throws a helpful error outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useChibiToast())).toThrow(/ChibiToastProvider/);
    vi.mocked(console.error).mockRestore();
  });

  it('renders a labelled notifications landmark', () => {
    setup();
    expect(region()).toBeInTheDocument();
  });

  it('shows a toast with title, description and variant', async () => {
    const { api } = setup();
    act(() => {
      api().toast.success('Saved!', { description: 'Your mochi is safe.' });
    });
    const list = within(region());
    const toast = await list.findByText('Saved!');
    expect(list.getByText('Your mochi is safe.')).toBeInTheDocument();
    expect(toast.closest('[data-chibi="toast"]')).toHaveAttribute('data-variant', 'success');
  });

  it('dismisses via the close button', async () => {
    const user = userEvent.setup();
    const { api } = setup();
    act(() => {
      api().toast({ title: 'Bye soon', variant: 'info' });
    });
    await user.click(await screen.findByRole('button', { name: 'Dismiss notification' }));
    await waitFor(() => expect(screen.queryByText('Bye soon')).not.toBeInTheDocument());
  });

  it('dismisses programmatically, individually or all at once', async () => {
    const { api } = setup();
    let first = '';
    act(() => {
      first = api().toast.info('One');
      api().toast.info('Two');
    });
    act(() => api().dismiss(first));
    await waitFor(() => expect(screen.queryByText('One')).not.toBeInTheDocument());
    expect(screen.getByText('Two')).toBeInTheDocument();
    act(() => api().dismiss());
    await waitFor(() => expect(screen.queryByText('Two')).not.toBeInTheDocument());
  });

  it('updates a toast in place when re-using its id', async () => {
    const { api } = setup();
    act(() => {
      api().toast({ id: 'save', title: 'Saving…' });
    });
    act(() => {
      api().toast.success('Saved!', { id: 'save' });
    });
    await waitFor(() => expect(screen.queryByText('Saving…')).not.toBeInTheDocument());
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('auto-dismisses after the duration', async () => {
    const { api } = setup({ duration: 50 });
    act(() => {
      api().toast.info('Blink');
    });
    expect(await screen.findByText('Blink')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Blink')).not.toBeInTheDocument(), {
      timeout: 1000,
    });
  });

  it('runs actions and hides custom icons from assistive tech', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { api } = setup();
    act(() => {
      api().toast({
        title: 'Deleted',
        icon: '🍡',
        action: { label: 'Undo', altText: 'Restore it from the trash', onClick },
      });
    });
    expect(screen.getByText('🍡')).toHaveAttribute('aria-hidden', 'true');
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('has no axe violations with visible toasts', async () => {
    const { api, container } = setup();
    act(() => {
      api().toast.error('Oh no', { description: 'Something broke.' });
      api().toast.warning('Careful');
    });
    await screen.findByText('Oh no');
    await expectNoAxeViolations(container);
  });
});

describe('createToastStore', () => {
  it('drops the oldest toasts beyond the limit', () => {
    const store = createToastStore(2);
    store.add({ title: 'a' });
    store.add({ title: 'b' });
    store.add({ title: 'c' });
    expect(store.getSnapshot().map((t) => t.title)).toEqual(['b', 'c']);
  });

  it('notifies subscribers and supports unsubscribe', () => {
    const store = createToastStore(3);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    store.add({ title: 'x' });
    unsubscribe();
    store.add({ title: 'y' });
    expect(listener).toHaveBeenCalledOnce();
  });

  it('defaults the variant to info', () => {
    const store = createToastStore(3);
    store.add({ title: 'x' });
    expect(store.getSnapshot()[0]?.variant).toBe('info');
  });
});
