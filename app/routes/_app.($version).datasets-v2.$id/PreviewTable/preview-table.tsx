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
import { ScrollArea } from '~/components/ui/scroll-area';

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

  const [tableColumns, setTableColumns] = React.useState(columns);

  const handleAddColumn = () => {
    const newColumn: ColumnDef<TData, TValue> = {
      accessorKey: `new_column_${tableColumns.length}`,
      header: 'New Column',
      cell: () => (
        <input
          type="text"
          placeholder="Enter value"
        />
      ),
    };
    setTableColumns([...tableColumns, newColumn]);
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
    enableColumnPinning: true,
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers
              .filter((header) => header.column.getIsPinned() === 'left')
              .map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width: header.getSize(),
                    position: 'sticky',
                    left: header.getStart(),
                    zIndex: 2,
                  }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            {headerGroup.headers
              .filter((header) => !header.column.getIsPinned())
              .map((header) => (
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
              ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}>
              {/* Render pinned left cells */}
              {row
                .getVisibleCells()
                .filter((cell) => cell.column.getIsPinned() === 'left')
                .map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      position: 'sticky',
                      left: cell.column.getStart(),
                      zIndex: 1,
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

              {/* Render unpinned cells */}
              {row
                .getVisibleCells()
                .filter((cell) => !cell.column.getIsPinned())
                .map((cell) => (
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
