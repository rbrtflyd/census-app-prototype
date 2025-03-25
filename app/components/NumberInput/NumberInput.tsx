'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button, Group, Input, NumberField } from 'react-aria-components';

export default function NumberInput({
  minValue,
  maxValue,
  defaultValue,
  className,
  onChange,
}: {
  minValue: number;
  maxValue: number;
  defaultValue: number;
  className?: string;
  onChange: (value: number) => void;
}) {
  return (
    <NumberField
      defaultValue={defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      onChange={onChange}>
      <div className="*:not-first:mt-2">
        <Group
          className={`border-base data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-16 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px] ${className}`}>
          <Button
            slot="decrement"
            className="border-base bg-white icon-lighter hover:bg-subtle hover:icon-light -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
            <MinusIcon
              size={20}
              aria-hidden="true"
            />
          </Button>
          <Input className="bg-white text-dark text-xl h-full w-full grow px-3 py-2 text-center tabular-nums" />
          <Button
            slot="increment"
            className="border-base bg-white icon-lighter hover:bg-subtle hover:icon-light -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
            <PlusIcon
              size={20}
              aria-hidden="true"
            />
          </Button>
        </Group>
      </div>
    </NumberField>
  );
}
