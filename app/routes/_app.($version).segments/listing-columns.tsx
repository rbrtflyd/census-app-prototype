import { ColumnDef } from '@tanstack/react-table';
import type { SegmentType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown, Folder } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faSort, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';
import { Badge } from '~/components/ui/badge';
import { TableRowType } from './route';

export const columns: ColumnDef<TableRowType>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Segment</Text>
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
      const isFolder = row.original.type === 'folder';
      if (row.original.type === 'folder') {
        return (
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faFolder}
              className="h-4 w-4 icon-lighter"
            />
            <Text className={`truncate ${isFolder ? 'font-medium ' : ''}`}>
              {row.original.name}
            </Text>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-3">
          <Text className="truncate">{row.original.name}</Text>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return (
        <Text className="text-light truncate w-full">
          {row.original.description || 'No description'}
        </Text>
      );
    },
    size: 200,
  },
  {
    accessorKey: 'rowCount',
    header: 'Rows',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return <Text>{row.original.rowCount?.toLocaleString() || '0'}</Text>;
    },
  },
  {
    accessorKey: 'columnCount',
    header: 'Columns',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return <Text>{row.original.columnCount || '0'}</Text>;
    },
  },
  {
    accessorKey: 'destinations',
    header: 'Destinations',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      const destinationCount = row.original.destinations?.length || 0;
      return (
        <Badge>
          {destinationCount} destination{destinationCount !== 1 ? 's' : ''}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      const date = new Date(row.original.updatedAt);
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

      return <Text className="text-slate-400">{formatted}</Text>;
    },
  },
];
