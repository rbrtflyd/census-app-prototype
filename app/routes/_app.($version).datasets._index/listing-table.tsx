import { Button } from '../../components/ui/button';
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { useNavigate, useParams } from '@remix-run/react';
import type { TableRowType } from './route';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onFolderClick?: (folderId: string) => void;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  selectedRows?: Record<string, boolean>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onFolderClick,
  onRowSelectionChange,
  selectedRows = {},
}: DataTableProps<TData, TValue>) {
  const { version } = useParams();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const handleRowSelectionChange = (updater: any) => {
    const newSelection =
      typeof updater === 'function' ? updater(selectedRows) : updater;
    onRowSelectionChange?.(newSelection);
  };

  const handleRowClick = (event: React.MouseEvent, row: any) => {
    // Prevent navigation when clicking checkbox
    if ((event.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }

    const rowData = row.original as TableRowType;

    if (rowData.type === 'folder') {
      // Handle folder click
      onFolderClick?.(rowData.id);
    } else {
      // Handle dataset click
      navigate(`/${version}/datasets/${rowData.id}/overview-v2`);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => (row as TableRowType).id,
    state: {
      rowSelection: selectedRows,
      sorting,
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
            table.getRowModel().rows.map((row) => {
              const rowData = row.original as TableRowType;
              const isFolder = rowData.type === 'folder';

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={(e) => handleRowClick(e, row)}
                  className={'cursor-pointer h-16'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
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
