import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/pro-solid-svg-icons';
import { Check } from 'lucide-react';

import { cn } from '~/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-5 shrink-0 rounded border border-slate-200  ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-plum-500 data-[state=checked]:text-white  data-[state=checked]:border-plum-500 data-[state=indeterminate]:bg-plum-500 data-[state=indeterminate]:text-white  data-[state=indeterminate]:border-plum-500 group',
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}>
      <FontAwesomeIcon
        icon={faCheck}
        className="text-xxs group-data-[state=checked]:block hidden"
      />
      <FontAwesomeIcon
        icon={faMinus}
        className="text-xxs group-data-[state=indeterminate]:block hidden"
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
