import { Button } from '../../../../components/ui/button';
import React from 'react';
import { Text } from '@radix-ui/themes';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../../components/ui/hover-card';

import { ConnectionType } from '~/db/types/connection';

import { useNavigate, useParams } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { faSliders } from '@fortawesome/pro-regular-svg-icons';

interface DataTableProps<TData extends ConnectionType, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
}

const tableActions = [
  {
    label: 'Test',
  },
  {
    label: 'Delete',
  },
  {
    label: 'Reauthorize',
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
}: DataTableProps<TData, TValue>) {
  const { version } = useParams();
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      category: false,
      lastTestedAt: false,
    });

  const handleRowClick = (event: React.MouseEvent, row: any) => {
    // Prevent navigation when clicking checkbox
    if ((event.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }

    // Assuming each row has an id field - adjust according to your data structure
    navigate(`/${version}/connections/${row.original.id}/`);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-3 border-b border-base text-sm leading-none justify-between flex items-center">
        <Text>{count} connections</Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="ml-auto"
              variant="secondary">
              <FontAwesomeIcon
                icon={faSliders}
                className="mr-1 text-xs icon-light"
              />
              <Text>Display</Text>

              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-sm icon-light ml-2"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id
                      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                      .trim()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div></div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <>
                {row.original.credentials ? (
                  <HoverCard
                    key={row.id}
                    openDelay={250}
                    closeDelay={50}>
                    <HoverCardTrigger asChild>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={(e) => handleRowClick(e, row)}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[350px]">
                      <div className="space-y-4">
                        <div className="flex flex-row items-center">
                          <div className="size-10 flex items-center justify-center border border-base rounded-md bg-white mr-2 shadow-sm">
                            <img
                              src={row.original.logo}
                              alt={row.original.connectionServiceName}
                              className="size-6"
                            />
                          </div>
                          <Text className="font-medium">
                            {row.original.name ||
                              row.original.connectionServiceName}
                          </Text>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                          {Object.entries(row.original.credentials).map(
                            ([key, value]) => (
                              <div
                                className="flex flex-row gap-1 text-sm leading-none w-full"
                                key={key}>
                                {Object.entries(value as object).map(
                                  ([credKey, credValue]) => (
                                    <div
                                      key={credKey}
                                      className="flex flex-row w-full">
                                      <Text className="text-light w-32 shrink-0 capitalize">
                                        {credKey
                                          .replace(/_/g, ' ')
                                          .replace(/url/gi, 'URL')
                                          .replace(/sftp/gi, 'SFTP')}
                                      </Text>
                                      <Text className="truncate">
                                        {credValue}
                                      </Text>
                                    </div>
                                  )
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={(e) => handleRowClick(e, row)}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 pt-2 pb-4 px-8 bg-subtle border-t border-base justify-self-end">
        <Button
          variant="secondary"
          size="small"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
