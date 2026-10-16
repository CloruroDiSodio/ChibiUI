'use client';

import {
  ChibiAccordion,
  ChibiAccordionContent,
  ChibiAccordionItem,
  ChibiAccordionTrigger,
} from '@chibi-ui/react/accordion';
import { ChibiButton } from '@chibi-ui/react/button';
import {
  ChibiCard,
  ChibiCardContent,
  ChibiCardDescription,
  ChibiCardHeader,
  ChibiCardTitle,
} from '@chibi-ui/react/card';
import {
  ChibiDialog,
  ChibiDialogClose,
  ChibiDialogContent,
  ChibiDialogDescription,
  ChibiDialogFooter,
  ChibiDialogHeader,
  ChibiDialogTitle,
  ChibiDialogTrigger,
} from '@chibi-ui/react/dialog';
import { ChibiInput } from '@chibi-ui/react/input';
import { ChibiSwitch } from '@chibi-ui/react/switch';
import { useChibiToast } from '@chibi-ui/react/toast';
import { HeartIcon, MailIcon } from './icons';

export function HomeShowcase() {
  const { toast } = useChibiToast();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ChibiCard>
        <ChibiCardHeader>
          <ChibiCardTitle>Buttons</ChibiCardTitle>
          <ChibiCardDescription>Press the kawaii one. It bounces.</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent className="flex flex-wrap gap-3">
          <ChibiButton variant="kawaii" leftIcon={<HeartIcon />}>
            Kawaii
          </ChibiButton>
          <ChibiButton>Primary</ChibiButton>
          <ChibiButton variant="secondary">Secondary</ChibiButton>
          <ChibiButton variant="ghost" loading spinner="mascot">
            Loading
          </ChibiButton>
        </ChibiCardContent>
      </ChibiCard>

      <ChibiCard>
        <ChibiCardHeader>
          <ChibiCardTitle>Toasts</ChibiCardTitle>
          <ChibiCardDescription>Announced politely to screen readers.</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent className="flex flex-wrap gap-3">
          <ChibiButton
            onClick={() => toast.success('Saved!', { description: 'Your mochi is safe.' })}
          >
            Success
          </ChibiButton>
          <ChibiButton
            variant="secondary"
            onClick={() => toast.warning('Running low', { description: 'Only 2 snacks left.' })}
          >
            Warning
          </ChibiButton>
          <ChibiButton
            variant="ghost"
            onClick={() => toast.error('Oh no!', { description: 'The server took a nap.' })}
          >
            Error
          </ChibiButton>
        </ChibiCardContent>
      </ChibiCard>

      <ChibiCard>
        <ChibiCardHeader>
          <ChibiCardTitle>Dialog</ChibiCardTitle>
          <ChibiCardDescription>Glass backdrop, elastic pop-in, focus trap.</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent>
          <ChibiDialog>
            <ChibiDialogTrigger asChild>
              <ChibiButton variant="kawaii">Adopt a cat</ChibiButton>
            </ChibiDialogTrigger>
            <ChibiDialogContent size="sm">
              <ChibiDialogHeader>
                <ChibiDialogTitle>Adopt Mochi?</ChibiDialogTitle>
                <ChibiDialogDescription>
                  She enjoys naps, snacks and keyboards.
                </ChibiDialogDescription>
              </ChibiDialogHeader>
              <ChibiDialogFooter>
                <ChibiDialogClose asChild>
                  <ChibiButton variant="ghost">Maybe later</ChibiButton>
                </ChibiDialogClose>
                <ChibiDialogClose asChild>
                  <ChibiButton onClick={() => toast.success('Welcome home, Mochi!')}>
                    Yes!
                  </ChibiButton>
                </ChibiDialogClose>
              </ChibiDialogFooter>
            </ChibiDialogContent>
          </ChibiDialog>
        </ChibiCardContent>
      </ChibiCard>

      <ChibiCard>
        <ChibiCardHeader>
          <ChibiCardTitle>Forms</ChibiCardTitle>
          <ChibiCardDescription>Floating labels, linked errors.</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent className="flex flex-col gap-4">
          <ChibiInput label="Email" type="email" labelVariant="floating" leftIcon={<MailIcon />} />
          <ChibiSwitch label="Wake Mochi up" />
        </ChibiCardContent>
      </ChibiCard>

      <ChibiCard className="md:col-span-2">
        <ChibiCardHeader>
          <ChibiCardTitle>Accordion</ChibiCardTitle>
          <ChibiCardDescription>Opening a section wakes Mochi up.</ChibiCardDescription>
        </ChibiCardHeader>
        <ChibiCardContent>
          <ChibiAccordion type="single" collapsible>
            <ChibiAccordionItem value="a11y">
              <ChibiAccordionTrigger icon="ears">Is it accessible?</ChibiAccordionTrigger>
              <ChibiAccordionContent>
                Every interactive primitive is built on Radix UI. Each component is tested with
                axe-core, and colour contrast is checked against WCAG AA in CI.
              </ChibiAccordionContent>
            </ChibiAccordionItem>
            <ChibiAccordionItem value="theme">
              <ChibiAccordionTrigger icon="ears">Can I change the colours?</ChibiAccordionTrigger>
              <ChibiAccordionContent>
                Yes. Every colour is a CSS variable, and themes can be scoped to any subtree with
                the data-chibi-theme attribute.
              </ChibiAccordionContent>
            </ChibiAccordionItem>
          </ChibiAccordion>
        </ChibiCardContent>
      </ChibiCard>
    </div>
  );
}
