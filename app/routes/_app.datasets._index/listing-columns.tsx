import { ColumnDef } from '@tanstack/react-table';
import type { DatasetType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { format } from 'date-fns';

export const columns: ColumnDef<DatasetType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'sourceId',
    header: 'Source',
  },
  {
    accessorKey: 'destinations',
    header: 'Destinations',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Modified',
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
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

      return <div className="font-medium">{formatted}</div>;
    },
  },
];
