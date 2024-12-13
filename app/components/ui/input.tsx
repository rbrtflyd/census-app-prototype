import * as React from 'react';

import { cn } from '~/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        value={value}
        className={cn(
          'flex h-10 w-full rounded-md border border-base bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-lightest/50 hover:ring-1 hover:ring-plum-500/50 transition-all duration-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-plum-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50  dark:bg-slate-950 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
