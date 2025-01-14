import { cva } from 'class-variance-authority'

const typographyVariants = cva('scroll-m-20', {
  variants: {
    variant: {
      h1: 'font-display text-3xl font-bold font-extrabold uppercase tracking-tighter lg:text-4xl 2xl:text-[40px] lg:leading-[1.1]',
      h2: 'text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground sm:text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'color-base',
    },
  },
})

export { typographyVariants }
