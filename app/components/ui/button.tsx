import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center leading-none whitespace-nowrap ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        primary: 'bg-plum-500 text-slate-50 hover:bg-plum-700',
        secondary:
          'bg-white text-dark hover:bg-slate-50 hover:border-slate-50 border border-base shadow',
        ghost: 'hover:bg-slate-50  hover:text-dark text-light',
        link: 'text-plum-500 underline-offset-1 hover:underline font-medium',
        table:
          'hover:bg-slate-50/50 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-50 rounded-none',
        fancy:
          'bg-gradient-to-b from-wisteria-500 to-wisteria-600 text-white hover:from-wisteria-600 hover:to-wisteria-500 transition-all duration-75',
      },
      size: {
        default: 'px-3 py-2 text-base leading-none rounded',
        small: 'py-2 px-3 text-sm leading-none rounded-[3px]',
        tiny: 'py-1.5 px-1.5 text-xs leading-none rounded-[3px]',
        icon: 'h-8 w-8 rounded-md text-slate-400',
        link: 'p-0',
        large: 'px-6 py-3 text-lg leading-none rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
