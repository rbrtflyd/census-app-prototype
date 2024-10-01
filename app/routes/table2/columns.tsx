'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DatasetColumn = {
  id: string;
  columnName: string;
  dataType: string;
  nulls: number;
  source: string;
  pii: boolean;
  enumeration: boolean;
};

export const columns: ColumnDef<DatasetColumn>[] = [
  {
    accessorKey: 'columnName',
    header: 'Column Name',
  },
  {
    accessorKey: 'dataType',
    header: 'Data Type',
  },
  {
    accessorKey: 'nulls',
    header: 'Nulls',
  },
  {
    accessorKey: 'source',
    header: 'Source',
  },
  {
    accessorKey: 'pii',
    header: 'PII',
  },
  {
    accessorKey: 'enumeration',
    header: 'Enumeration',
  },
];
