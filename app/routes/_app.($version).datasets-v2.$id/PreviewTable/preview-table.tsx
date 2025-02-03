import { Button } from '../../../components/ui/button';
import React, { useState } from 'react';
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
} from '../../../components/ui/data-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../components/ui/hover-card';

import { ConnectionType } from '~/db/types/connection';

import { useNavigate, useParams } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { faSliders } from '@fortawesome/pro-regular-svg-icons';
import { PreviewColumns } from './preview-columns.d';

interface DataTableProps<TData extends PreviewColumns, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
}

export function DataTable<TData extends PreviewColumns, TValue>({
  columns,
  data,
  count,
}: DataTableProps<TData, TValue>) {
  const { version } = useParams();
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 25, //default page size
  });
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
      pagination,
    },
  });

  return (
    <div className="flex flex-col h-full">
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
