import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  GroupingState,
  getExpandedRowModel,
  ExpandedState,
} from '@tanstack/react-table';

import { Input } from '~/components/ui/input';

import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [viewMode, setViewMode] = React.useState<'alphabetical' | 'grouped'>(
    'alphabetical'
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      grouping,
      expanded,
    },
  });

  React.useEffect(() => {
    if (viewMode === 'grouped') {
      setGrouping(['source']);
    } else {
      setGrouping([]);
    }
    table.resetExpanded();
  }, [viewMode, table]);

  return (
    <div className="rounded-md border ">
      <div className="flex items-center py-4 px-6 w-full justify-between">
        <Input
          placeholder="Search for a column..."
          value={
            (table.getColumn('columnName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('columnName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-row items-center space-x-2">
          <Text>View</Text>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: 'alphabetical' | 'grouped') =>
              setViewMode(value)
            }>
            <ToggleGroupItem value="alphabetical">Alphabetical</ToggleGroupItem>
            <ToggleGroupItem value="grouped">Grouped</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.getIsGrouped() ? 'text-plum-500' : ''
                  }>
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-row items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
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
                data-state={row.getIsSelected() && 'selected'}
                className={
                  row.getIsGrouped() ? 'bg-subtle text-xs !py-2 !h-auto' : ''
                }>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.getIsGrouped() ? (
                      <>
                        <button
                          className="font-medium flex flex-row space-x-2 items-center"
                          onClick={row.getToggleExpandedHandler()}
                          style={{
                            cursor: 'pointer',
                            marginRight: '5px',
                          }}>
                          <Text className="capitalize">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Text>
                          <Text className="text-lighter">
                            {row.subRows.length}
                          </Text>
                        </button>
                      </>
                    ) : cell.getIsPlaceholder() ? null : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
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
    </div>
  );
}
