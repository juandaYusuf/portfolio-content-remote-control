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
  },
})
