import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full leading-none',
  {
    variants: {
      variant: {
        default: 'border border-base bg-white',
      },
      size: {
        sm: 'text-xxs px-2 py-1 font-mono',
        md: 'text-xs px-2 py-1 leading-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
