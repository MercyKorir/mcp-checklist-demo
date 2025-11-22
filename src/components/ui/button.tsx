import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',

        sapphire: 'bg-[#0a5395] text-primary-foreground shadow hover:bg-[#1e97a0]/90',
        teal: 'bg-[#1e97a0] text-primary-foreground shadow hover:bg-[#1e97a0]/90',
        slate: 'bg-[#394752] text-primary-foreground shadow hover:bg-[#394752]/90',
        orange: 'bg-[#ee5938] text-primary-foreground shadow hover:bg-[#ff9500]/90',
        gold: 'bg-[#fba538] text-primary-foreground shadow hover:bg-[#ff9500]/90',
        pearl: 'bg-[#f8f8f6] text-primary-foreground shadow hover:bg-[#f59e0b]/90',

        ghost: 'hover:bg-accent hover:text-accent-foreground',
        transparent: 'bg-transparent',
        link: 'text-blue-900 underline-offset-4 hover:underline',
        simple: 'text-primary/70 hover:text-primary',
      },
      size: {
        default: 'h-9 px-4 py-2',
        minimum: 'h-fit w-fit p-0 text-sm self-start',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
