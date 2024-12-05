import { ColumnDef } from '@tanstack/react-table';
import type { ConnectionType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';

export const columns: ColumnDef<ConnectionType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex h-full items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-full items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 20,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'connectionId',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Name</Text>
          <Toggle
            size="sm"
            variant="default"
            className="px-1.5 py-1.5 flex items-center justify-center hover:bg-deep rounded-sm group icon-lighter hover:icon-light text-[11px] data-[state=on]:bg-deep data-[state=on]:icon-light"
            onPressedChange={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            <FontAwesomeIcon icon={faSort} />
          </Toggle>
        </div>
      );
    },
    cell: ({ row }) => {
      return <Text className="truncate">{row.original.name}</Text>;
    },
    size: 100,
  },
  {
    accessorKey: 'lastTestedAt',
    header: 'Modified',
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastTestedAt'));
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      let formatted;

      if (diffInSeconds < 60) {
        formatted = `${diffInSeconds} second${
          diffInSeconds !== 1 ? 's' : ''
        } ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        formatted = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        formatted = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        formatted = `${days} day${days !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        formatted = `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
      } else {
        const months = Math.floor(diffInSeconds / 2592000);
        formatted = `${months} month${months !== 1 ? 's' : ''} ago`;
      }

      return <div>{formatted}</div>;
    },
  },
];
