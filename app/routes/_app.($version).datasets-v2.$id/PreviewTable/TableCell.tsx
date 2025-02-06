import { cn } from '~/lib/utils';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faText,
  faHashtag,
  faCalendar,
  faToggleOn,
} from '@fortawesome/pro-regular-svg-icons';

interface TableCellProps {
  value: any;
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  significance?: 'unique' | 'primary' | 'foreign' | 'derived' | 'calculated';
  className?: string;
}

const dataTypeIcons = {
  string: faText,
  number: faHashtag,
  date: faCalendar,
  boolean: faToggleOn,
};

export function TableCell({
  value,
  dataType = 'string',
  significance,
  className,
}: TableCellProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2',
        significance === 'unique' ? 'bg-plum-100/35' : '',
        className
      )}>
      <span className="text-xs truncate w-full">{value?.toString() ?? ''}</span>
    </div>
  );
}
