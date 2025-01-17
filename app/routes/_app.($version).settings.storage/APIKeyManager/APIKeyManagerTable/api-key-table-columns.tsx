import { ColumnDef } from '@tanstack/react-table';
import type { DatasetType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClone,
  faCopy,
  faSort,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';
import { Button } from '~/components/ui/button';
import { faRefresh } from '@fortawesome/pro-regular-svg-icons';
import { Input } from '~/components/ui';
import { APIKey } from '~/types';

interface APIKeyTableActions {
  handleRotateKey: (id: string) => void;
  handleRevokeKey: (id: string) => void;
  copyToClipboard: (text: string) => void;
  hideSecret: (id: string) => void;
}

export const columns = (actions: APIKeyTableActions): ColumnDef<APIKey>[] => {
  const { handleRotateKey, handleRevokeKey, copyToClipboard, hideSecret } =
    actions;
  return [
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
        return <Text className="truncate">{row.original.name}</Text>;
      },
      size: 100,
    },
    {
      accessorKey: 'clientId',
      header: 'Client ID',
    },
    {
      accessorKey: 'clientSecret',
      header: 'Client Secret',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col items-start justify-start relative w-full">
            <div className="relative w-full">
              <Input
                className={`text-sm w-full pe-10 text-slate-500 ${
                  row.original.showSecret ? 'truncate' : ''
                }`}
                value={
                  row.original.showSecret
                    ? row.original.clientSecret
                    : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'
                }
                readOnly
              />

              {row.original.showSecret && (
                <Button
                  className="absolute inset-y-1 end-1"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    copyToClipboard(row.original.clientSecret);
                    hideSecret(row.original.id);
                  }}>
                  <FontAwesomeIcon icon={faClone} />
                </Button>
              )}
            </div>
            {row.original.showSecret && (
              <Text className="text-xs text-red-500 -bottom-4 inset-x-0 leading-none absolute w-full">
                Copy this secret now, you won't see this again.
              </Text>
            )}
          </div>
        );
      },
      size: 300,
      minSize: 250,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        const now = new Date();
        const diffInSeconds = Math.floor(
          (now.getTime() - date.getTime()) / 1000
        );
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
    {
      accessorKey: 'createdBy',
      header: 'Created By',
    },
    {
      accessorKey: 'lastRotated',
      header: 'Last Rotated',
      cell: ({ row }) => {
        return (
          <div>
            {row.original.lastRotated
              ? new Date(row.original.lastRotated).toLocaleString()
              : 'Never'}
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2 items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRotateKey(row.original.id)}>
              <FontAwesomeIcon icon={faRefresh} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRevokeKey(row.original.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];
};
