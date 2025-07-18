import { ColumnDef } from '@tanstack/react-table';
import type { SyncType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown, Folder } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faSort,
  faPlay,
  faPause,
  faCheck,
  faExclamationTriangle,
  faDotCircle,
  faCircleSmall,
  faCircle,
} from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';
import { Badge } from '~/components/ui/badge';
import type { TableRowType } from './route';

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
      const isFolder = row.original.type === 'folder';
      if (row.original.type === 'folder')
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
      const status = row.original.status || 'inactive';
      const statusConfig = {
        active: {
          label: 'Active',
          className: 'text-green-400',
        },
        paused: {
          label: 'Paused',
          className: 'text-slate-100',
        },
        success: {
          label: 'Success',
          className: 'text-green-100',
        },
        failing: {
          label: 'Failing',
          className: 'text-red-500',
        },
        inactive: {
          label: 'Inactive',

          className: 'text-slate-400',
        },
      };

      const config =
        statusConfig[status as keyof typeof statusConfig] ||
        statusConfig.inactive;
      return (
        <div className="flex items-center gap-3">
          <Text className={`truncate ${isFolder ? 'font-medium ' : ''}`}>
            {row.original.name}
          </Text>
          <Badge className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faCircle}
              className={`h-2 ${config.className}`}
            />
            {config.label}
          </Badge>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return row.original.source
        ? `Source ${row.original.source}`
        : 'No source';
    },
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return row.original.destination
        ? `Destination ${row.original.destination}`
        : 'No destination';
    },
  },
  {
    accessorKey: 'behavior',
    header: 'Behavior',
    cell: ({ row }) => {
      if (row.original.type === 'folder') return null;
      return <Badge className=" capitalize">{row.original.behavior}</Badge>;
    },
  },
  {
    accessorKey: 'lastRun',
    header: 'Last Run',
    cell: ({ row }) => {
      if (row.getValue('lastRun') === null) return <div>Never</div>;
      const date = new Date(row.getValue('lastRun'));
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
