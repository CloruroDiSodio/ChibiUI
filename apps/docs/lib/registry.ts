export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  summary: string;
  /** Tree-shakable subpath import. */
  importPath: string;
  exports: string[];
  primitive?: string;
  a11y: string[];
  props: { component: string; rows: PropDoc[] }[];
}

const fieldProps: PropDoc[] = [
  { name: 'label', type: 'ReactNode', description: 'Visible label, associated with the control.' },
  {
    name: 'description',
    type: 'ReactNode',
    description: 'Helper text, linked via aria-describedby.',
  },
  {
    name: 'error',
    type: 'ReactNode',
    description:
      'Error message (e.g. errors.x?.message). Any truthy value sets aria-invalid; true marks invalid without a message.',
  },
  {
    name: 'containerClassName',
    type: 'string',
    description: 'Class for the wrapper holding label, control and messages.',
  },
];

export const components: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    summary:
      'Triggers an action. Four variants (including a bouncy kawaii one), loading states with a spinner or mascot, icons and polymorphic rendering.',
    importPath: '@chibi-ui/react/button',
    exports: ['ChibiButton', 'buttonVariants'],
    a11y: [
      'Renders a native <button type="button"> by default, so it never submits a form by accident.',
      'While loading the button keeps focus: it uses aria-disabled + aria-busy instead of the native disabled attribute.',
      'Icons are wrapped in aria-hidden spans. Icon-only buttons must have an aria-label (a development warning reminds you).',
      'The focus ring is an outline, so it stays visible in Windows forced-colours mode.',
      'Press and hover motion is removed under prefers-reduced-motion.',
    ],
    props: [
      {
        component: 'ChibiButton',
        rows: [
          {
            name: 'variant',
            type: "'primary' | 'secondary' | 'ghost' | 'kawaii'",
            default: "'primary'",
            description: 'Visual style.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'icon'",
            default: "'md'",
            description: 'Height and padding.',
          },
          {
            name: 'fullWidth',
            type: 'boolean',
            default: 'false',
            description: 'Stretch to the container width.',
          },
          {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Shows a spinner and blocks activation while keeping focus.',
          },
          { name: 'loadingText', type: 'string', description: 'Label shown while loading.' },
          {
            name: 'spinner',
            type: "'ring' | 'mascot'",
            default: "'ring'",
            description: 'Spinner style while loading.',
          },
          { name: 'leftIcon / rightIcon', type: 'ReactNode', description: 'Decorative icons.' },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Merge props into the single child (e.g. <a> or <Link>).',
          },
          {
            name: '…',
            type: "ComponentProps<'button'>",
            description: 'All native button props, plus ref.',
          },
        ],
      },
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    summary:
      'A compound surface for grouping content: elevated, outlined, or interactive with a hover lift and optional 3D tilt.',
    importPath: '@chibi-ui/react/card',
    exports: [
      'ChibiCard',
      'ChibiCardHeader',
      'ChibiCardTitle',
      'ChibiCardDescription',
      'ChibiCardContent',
      'ChibiCardFooter',
    ],
    a11y: [
      'Make an interactive card a single link with asChild. It then has one tab stop and an accessible name taken from its content.',
      'ChibiCardTitle renders an <h3> by default. Use asChild to pick the right heading level for your page outline.',
      'The tilt only follows a mouse: it is turned off for touch and under prefers-reduced-motion. It writes CSS variables on animation frames, so pointer moves never re-render React.',
    ],
    props: [
      {
        component: 'ChibiCard',
        rows: [
          {
            name: 'variant',
            type: "'elevated' | 'outlined' | 'interactive'",
            default: "'elevated'",
            description: 'Visual style.',
          },
          {
            name: 'tilt',
            type: 'boolean',
            default: 'false',
            description: '3D tilt + glare following the mouse (interactive variant only).',
          },
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Render the child element.',
          },
        ],
      },
      {
        component: 'ChibiCardTitle',
        rows: [
          {
            name: 'asChild',
            type: 'boolean',
            default: 'false',
            description: 'Use your own heading level.',
          },
        ],
      },
    ],
  },
  {
    slug: 'toast',
    name: 'Toast',
    summary:
      'Brief, non-blocking notifications with themed variants, mascot illustrations, actions and spring animations, all driven by a hook.',
    importPath: '@chibi-ui/react/toast',
    exports: ['ChibiToastProvider', 'useChibiToast'],
    primitive: 'Radix UI Toast',
    a11y: [
      'Toasts are announced through a live region. Errors use assertive (foreground) announcements; the other variants are polite.',
      'The timer pauses on hover, on focus and when the window loses focus, so users have time to read (WCAG 2.2.1). Errors stay up twice as long.',
      'F8 (configurable) jumps to the notifications landmark. Toasts close with Esc or a swipe, and every toast has a labelled close button.',
      'Actions need altText, which describes another way to do the same thing for people who cannot reach the toast in time.',
    ],
    props: [
      {
        component: 'ChibiToastProvider',
        rows: [
          {
            name: 'position',
            type: "'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'",
            default: "'bottom-right'",
            description: 'Where the stack is anchored. The swipe direction follows.',
          },
          {
            name: 'duration',
            type: 'number',
            default: '5000',
            description: 'Default auto-dismiss in ms.',
          },
          {
            name: 'limit',
            type: 'number',
            default: '3',
            description: 'Max visible toasts; oldest are dropped.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Notifications'",
            description: 'Landmark label.',
          },
          {
            name: 'hotkey',
            type: 'string[]',
            default: "['F8']",
            description: 'Jump-to-notifications shortcut.',
          },
        ],
      },
      {
        component: 'toast(options) / toast.success(title, options)',
        rows: [
          { name: 'title', type: 'ReactNode', description: 'Required headline.' },
          { name: 'description', type: 'ReactNode', description: 'Supporting text.' },
          {
            name: 'variant',
            type: "'success' | 'warning' | 'error' | 'info'",
            default: "'info'",
            description: 'Colour, mascot mood and urgency.',
          },
          {
            name: 'duration',
            type: 'number',
            description: 'Override auto-dismiss; Infinity to persist.',
          },
          {
            name: 'action',
            type: '{ label, altText, onClick }',
            description: 'Optional action button.',
          },
          {
            name: 'icon',
            type: 'ReactNode | false',
            description: 'Replace the mascot (e.g. an emoji) or hide it.',
          },
          {
            name: 'id',
            type: 'string',
            description: 'Re-use to update a toast in place. Returned by toast().',
          },
        ],
      },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    summary:
      'A modal window with a pastel glass backdrop and an elastic pop-in animation. Focus is trapped while it is open and returned when it closes.',
    importPath: '@chibi-ui/react/dialog',
    exports: [
      'ChibiDialog',
      'ChibiDialogTrigger',
      'ChibiDialogContent',
      'ChibiDialogHeader',
      'ChibiDialogTitle',
      'ChibiDialogDescription',
      'ChibiDialogFooter',
      'ChibiDialogClose',
    ],
    primitive: 'Radix UI Dialog',
    a11y: [
      'role="dialog" with aria-modal. It is labelled by ChibiDialogTitle and described by ChibiDialogDescription.',
      'Focus moves into the dialog and is trapped there. On close it returns to the trigger.',
      'Closes on Esc and on outside click. The page behind it is scroll-locked and hidden from assistive tech.',
      'The close button has an accessible label, which you can set with closeLabel.',
      'Under prefers-reduced-transparency the glass blur becomes a solid backdrop. Under prefers-reduced-motion only the fade remains.',
    ],
    props: [
      {
        component: 'ChibiDialog',
        rows: [
          {
            name: 'open / defaultOpen',
            type: 'boolean',
            description: 'Controlled / uncontrolled open state.',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Called when open state changes.',
          },
          { name: 'modal', type: 'boolean', default: 'true', description: 'Modal behaviour.' },
        ],
      },
      {
        component: 'ChibiDialogContent',
        rows: [
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Max width.' },
          {
            name: 'hideCloseButton',
            type: 'boolean',
            default: 'false',
            description: 'Hide the built-in close button.',
          },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Close dialog'",
            description: 'Close button label.',
          },
          { name: 'container', type: 'HTMLElement | null', description: 'Portal container.' },
        ],
      },
    ],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    summary:
      'Vertically stacked, collapsible sections. Heights animate smoothly, and the icon either rotates or twitches its ears.',
    importPath: '@chibi-ui/react/accordion',
    exports: [
      'ChibiAccordion',
      'ChibiAccordionItem',
      'ChibiAccordionTrigger',
      'ChibiAccordionContent',
    ],
    primitive: 'Radix UI Accordion',
    a11y: [
      'Each trigger is a button with aria-expanded inside a heading. Set the heading level with headingLevel.',
      'Arrow keys, Home and End move between triggers.',
      'Panels are regions labelled by their trigger.',
      'The height animation uses CSS keyframes driven by the measured content height, and is removed under reduced motion.',
    ],
    props: [
      {
        component: 'ChibiAccordion',
        rows: [
          { name: 'type', type: "'single' | 'multiple'", description: 'One or many open items.' },
          {
            name: 'collapsible',
            type: 'boolean',
            description: "Allow closing the open item (type='single').",
          },
          {
            name: 'value / defaultValue',
            type: 'string | string[]',
            description: 'Controlled / uncontrolled value.',
          },
        ],
      },
      {
        component: 'ChibiAccordionTrigger',
        rows: [
          {
            name: 'headingLevel',
            type: '2 | 3 | 4 | 5 | 6',
            default: '3',
            description: 'Wrapping heading level.',
          },
          {
            name: 'icon',
            type: "'chevron' | 'ears'",
            default: "'chevron'",
            description: 'Indicator style.',
          },
        ],
      },
    ],
  },
  {
    slug: 'input',
    name: 'Input',
    summary:
      'A text field with a static or floating label, helper text, error state and adornments. It works with react-hook-form register() out of the box.',
    importPath: '@chibi-ui/react/input',
    exports: ['ChibiInput'],
    a11y: [
      'The label is always a real <label> linked to the input. A floating label stays visible and is never a placeholder.',
      'Description and error are linked with aria-describedby. Errors set aria-invalid and sit in a polite live region, so an error shown on blur is still announced.',
      'Errors show an icon and text, not colour alone. The invalid border meets 3:1 non-text contrast.',
      'The required attribute is set natively. The visual asterisk is aria-hidden.',
    ],
    props: [
      {
        component: 'ChibiInput',
        rows: [
          ...fieldProps,
          {
            name: 'labelVariant',
            type: "'static' | 'floating'",
            default: "'static'",
            description: 'Label placement.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Control height.',
          },
          {
            name: 'leftIcon / rightIcon',
            type: 'ReactNode',
            description: 'Decorative adornments.',
          },
          {
            name: '…',
            type: "ComponentProps<'input'>",
            description: 'All native input props, plus ref.',
          },
        ],
      },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    summary:
      'A custom-styled listbox with groups, separators and disabled options. It submits natively inside forms.',
    importPath: '@chibi-ui/react/select',
    exports: [
      'ChibiSelect',
      'ChibiSelectItem',
      'ChibiSelectGroup',
      'ChibiSelectLabel',
      'ChibiSelectSeparator',
    ],
    primitive: 'Radix UI Select',
    a11y: [
      'The trigger is a labelled combobox button. ref points at it, so react-hook-form can focus it when validation fails.',
      'Typeahead plus arrow, Home and End keys. Disabled options are skipped.',
      'The highlighted option gets an outline as well as a tint, so it meets non-text contrast.',
      'A hidden native <select> mirrors the value, so plain form submission works.',
    ],
    props: [
      {
        component: 'ChibiSelect',
        rows: [
          ...fieldProps,
          { name: 'placeholder', type: 'ReactNode', description: 'Shown when empty.' },
          {
            name: 'value / defaultValue',
            type: 'string',
            description: 'Controlled / uncontrolled value.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Selection callback.',
          },
          { name: 'name / required / disabled', type: '…', description: 'Native form semantics.' },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Trigger height.',
          },
          { name: 'ref', type: 'Ref<HTMLButtonElement>', description: 'Forwarded to the trigger.' },
        ],
      },
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    summary:
      'An on/off toggle. Mochi sleeps on the thumb when it is off and wakes up, smiling, when it is on.',
    importPath: '@chibi-ui/react/switch',
    exports: ['ChibiSwitch'],
    primitive: 'Radix UI Switch',
    a11y: [
      'role="switch" with aria-checked. Space toggles it, and clicking the label toggles it too.',
      'The state is shown by the thumb position and the mascot’s expression, not by colour alone. The track border stays at 3:1 or more in both states.',
      'A hidden checkbox mirrors the state for native form submission.',
    ],
    props: [
      {
        component: 'ChibiSwitch',
        rows: [
          ...fieldProps,
          {
            name: 'checked / defaultChecked',
            type: 'boolean',
            description: 'Controlled / uncontrolled state.',
          },
          {
            name: 'onCheckedChange',
            type: '(checked: boolean) => void',
            description: 'Change callback.',
          },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track size.' },
          {
            name: 'labelPosition',
            type: "'start' | 'end'",
            default: "'end'",
            description: 'Label placement.',
          },
        ],
      },
    ],
  },
];

export const getComponent = (slug: string) => components.find((c) => c.slug === slug);
