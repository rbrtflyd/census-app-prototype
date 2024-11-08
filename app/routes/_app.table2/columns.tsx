import {
  faCaretUp,
  faCaretDown,
  faLayerGroup,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
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
          variant="table"
          size="small"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full">
          <div className="flex flex-row space-x-1 items-center justify-start w-full">
            <Text>Column Name</Text>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`ml-1 size-3 icon-lighter transition-all duration-75 ${
                column.getIsSorted() === 'asc' ? 'rotate-180' : ''
              }`}
            />
          </div>
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
          size="small"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className="flex flex-row space-x-1 items-center">
            Data Type
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`ml-1 size-3 icon-lighter transition-all duration-75 ${
                column.getIsSorted() === 'asc' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: 'nulls',
    header: ({ column }) => {
      return (
        <>
          <Button
            variant="ghost"
            size="small"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            <div className="flex flex-row space-x-1 items-center">
              Nulls
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`ml-1 size-3 icon-lighter transition-all duration-75 ${
                  column.getIsSorted() === 'asc' ? 'rotate-180' : ''
                }`}
              />
            </div>
          </Button>
        </>
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
