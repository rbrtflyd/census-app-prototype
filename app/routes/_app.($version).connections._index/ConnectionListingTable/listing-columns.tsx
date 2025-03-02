import { ColumnDef } from '@tanstack/react-table';
import type { ConnectionType } from '~/db/types';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

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
    accessorKey: 'connection',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Connection</Text>
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
      return (
        <div className="flex flex-row items-center leading-none gap-3">
          {row.original.logo && (
            <div className="size-10 flex items-center justify-center border border-base rounded-md bg-white mr-2 shadow-sm">
              <img
                src={row.original.logo}
                alt={row.original.connectionServiceName}
                className="size-6"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5 items-start">
            <div className="flex flex-row gap-2 items-center">
              <Text className="truncate font-medium">
                {row.original.name || row.original.connectionServiceName}
              </Text>
              {row.original.name && (
                <Badge size="sm">{row.original.connectionServiceName}</Badge>
              )}
            </div>
            <TooltipProvider>
              <Tooltip delayDuration={75}>
                <TooltipTrigger className="group">
                  <Text className="text-light text-xs underline decoration-dashed group-hover:text-dark decoration-[0.06rem] underline-offset-2 decoration-slate-100 group-hover:decoration-slate-500 transition-all duration-75">
                    {row.original.connectionServiceName === 'Snowflake' ? (
                      <span>data_warehouse</span>
                    ) : (
                      <span>destination</span>
                    )}
                    {':'}
                    <span className="lowercase">
                      {row.original.connectionServiceName}
                    </span>
                    -<span>{row.original.id}</span>
                  </Text>
                </TooltipTrigger>
                <TooltipContent>
                  <Text className="">
                    Connected by someone@example.com on{' '}
                    {new Date(row.original.createdAt).toLocaleDateString()}
                  </Text>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
    size: 100,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Category</Text>
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
      return (
        <Badge className="truncate">{row.original.connectionServiceType}</Badge>
      );
    },
  },
  {
    accessorKey: 'connected',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Connected</Text>
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
      return (
        <Text>{new Date(row.original.createdAt).toLocaleDateString()}</Text>
      );
    },
  },
  {
    accessorKey: 'connectionMode',
    header: ({ column }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <Text>Mode</Text>
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
      return (
        <div className="flex flex-row gap-2">
          {row.original.mode.map((mode: string) =>
            mode === 'source' ? (
              <TooltipProvider key={mode}>
                <Tooltip delayDuration={75}>
                  <TooltipTrigger>
                    <Badge className="capitalize">
                      {' '}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          mode === 'source' ? 'bg-purple-500' : 'bg-orange-500'
                        } mr-1`}
                      />
                      {mode}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Text className="capitalize">
                      {row.original.syncEngine} Sync Engine
                    </Text>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Badge
                key={mode}
                className="capitalize">
                <div
                  className={`w-2 h-2 rounded-full ${
                    mode === 'source' ? 'bg-purple-500' : 'bg-orange-500'
                  } mr-1`}
                />
                {mode}
              </Badge>
            )
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'lastTestedAt',
    header: 'Last Tested',
    cell: ({ row }) => {
      return (
        <Text>{new Date(row.original.lastTestedAt).toLocaleDateString()}</Text>
      );
    },
  },

  {
    accessorKey: 'lastTestStatus',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={75}>
            <TooltipTrigger className="group">
              <Badge className="group-hover:border-plum-200 group-hover:bg-slate-50  transition-all duration-75">
                <div
                  className={`w-2 h-2 rounded-full ${
                    row.original.lastTestStatus === 'healthy'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  } mr-1`}
                />
                <Text className="capitalize">
                  {row.original.lastTestStatus}
                </Text>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <Text className="capitalize">
                Last tested on{' '}
                {new Date(row.original.createdAt).toLocaleDateString()}
              </Text>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
