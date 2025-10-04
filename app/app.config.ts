export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      slots: {
        base: [
          'cursor-pointer rounded-xl font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'transition-colors',
        ],
      },
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
    },
    input: {
      slots: {
        base: [
          'rounded-xl font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'transition-colors',
        ],
      },
    },
    popover: {
      slots: {
        content: 'bg-neutral-200/40 dark:bg-neutral-800/40 backdrop-blur-md shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto',
        arrow: 'fill-default'
      }
    }
  },
})
