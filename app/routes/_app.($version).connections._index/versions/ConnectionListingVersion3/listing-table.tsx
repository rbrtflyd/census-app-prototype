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

import { useNavigate, useParams } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { faSliders } from '@fortawesome/pro-regular-svg-icons';

interface DataTableProps<TData, TValue> {
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
    React.useState<VisibilityState>({});

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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={(e) => handleRowClick(e, row)}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
