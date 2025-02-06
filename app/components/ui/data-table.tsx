import * as React from 'react';

import { cn } from '~/lib/utils';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-y-auto h-full">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm mr-10 mb-8', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setIsScrolled(target.scrollTop > 0);
    };

    if (typeof ref === 'function') return;
    const scrollParent = ref?.current?.closest('.overflow-y-auto');

    if (scrollParent) {
      scrollParent.addEventListener('scroll', handleScroll);
      return () => scrollParent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <thead
      ref={ref}
      className={cn(
        '[&_tr]:border-b [&_tr]:border-r border-base border-b [&_tr]:hover:bg-white [&_tr]:hover:cursor-default truncate sticky top-0 bg-white transition-shadow duration-200',
        isScrolled && 'shadow-sm',
        className
      )}
      {...props}
    />
  );
});
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-slate-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-slate-800/50 border-base',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-base transition-colors duration-75 cursor-pointer hover:bg-slate-50/50 data-[state=selected]:bg-slate-25 ',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      ' leading-none border-r border-b border-base text-left align-middle font-normal text-dark [&:has([role=checkbox])]:pr-0 uppercase text-xs p-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'align-middle border-r border-base [&:has([role=checkbox])]:pr-0 leading-none truncate p-0',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-dark dark:text-light', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
