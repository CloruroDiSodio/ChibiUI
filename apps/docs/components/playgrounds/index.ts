import type { ComponentType } from 'react';
import { AccordionPlayground } from './accordion-playground';
import { ButtonPlayground } from './button-playground';
import { CardPlayground } from './card-playground';
import { DialogPlayground } from './dialog-playground';
import { InputPlayground } from './input-playground';
import { SelectPlayground } from './select-playground';
import { SwitchPlayground } from './switch-playground';
import { ToastPlayground } from './toast-playground';

export const playgrounds: Record<string, ComponentType> = {
  accordion: AccordionPlayground,
  button: ButtonPlayground,
  card: CardPlayground,
  dialog: DialogPlayground,
  input: InputPlayground,
  select: SelectPlayground,
  switch: SwitchPlayground,
  toast: ToastPlayground,
};
