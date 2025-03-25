'use client';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useId, useState } from 'react';

export default function FancyRadioGroup({
  options,
}: {
  options: { label: string; extra?: string; value: string }[];
}) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState('on');

  return (
    <div className="bg-deep inline-flex h-12 rounded-md p-1">
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="group w-full after:bg-white has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded after:shadow after:transition-[translate,box-shadow] after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
        data-state={selectedValue}>
        {options.map((option) => (
          <label
            key={option.value}
            className="group-data-[state=on]:text-dark relative z-10 inline-flex h-full min-w-16 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
            {option.label}
            {option.extra && (
              <span className="group-data-[state=off]:text-lighter transition-colors group-data-[state=on]:text-plum-500">
                {option.extra}
              </span>
            )}
            <RadioGroupItem
              id={`${id}-${option.value}`}
              value="off"
              className="sr-only"
            />
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
