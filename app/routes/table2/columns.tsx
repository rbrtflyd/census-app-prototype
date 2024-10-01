import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DatasetColumn = {
  id: string;
  columnName: string;
  dataType: string;
  nulls: number;
  source: string;
  pii: boolean;
  enumeration: boolean;
  group: string;
};

export const columns: ColumnDef<DatasetColumn>[] = [
  {
    accessorKey: 'columnName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Column Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'dataType',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nulls',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nulls
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    enableGrouping: true,
  },
  {
    accessorKey: 'pii',
    header: 'PII',
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.pii}
        onCheckedChange={() => {}}
        aria-label="Toggle PII"
      />
    ),
  },
  {
    accessorKey: 'enumeration',
    header: 'Enumeration',
  },
];
