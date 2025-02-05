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
  ColumnPinningState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/data-table';

import { useNavigate, useParams } from '@remix-run/react';
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
    pageSize: 100, //default page size
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      category: false,
      lastTestedAt: false,
    });
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ['index'], // Pin the index column by default
    right: [],
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
    onColumnPinningChange: setColumnPinning,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      pagination,
      columnPinning,
    },
  });

  return (
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
  );
}
