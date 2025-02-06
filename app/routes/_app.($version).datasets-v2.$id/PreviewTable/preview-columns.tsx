import { ColumnDef } from '@tanstack/react-table';
import type { PreviewColumns } from './preview-columns.d';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { Toggle } from '~/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { HeaderColumn } from './HeaderColumn';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const columns: ColumnDef<PreviewColumns>[] = [
  {
    accessorKey: 'index',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="text-xs text-lighter text-center">{row.index + 1}</div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <HeaderColumn
        label="id"
        dataType="string"
        significance="unique"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-xs text-lighter text-center bg-plum-100">
          {row.original.id}
        </div>
      );
    },
  },
  {
    accessorKey: 'company_name',
    header: ({ column }) => (
      <HeaderColumn
        label="company_name"
        dataType="string"
        significance="primary"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
  },
  {
    accessorKey: 'job_title',
    header: ({ column }) => (
      <HeaderColumn
        label="job_title"
        dataType="string"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <HeaderColumn
        label="email"
        dataType="string"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <HeaderColumn
        label="phone_number"
        dataType="string"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <HeaderColumn
        label="country"
        dataType="string"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        onHide={() => column.toggleVisibility()}
      />
    ),
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <HeaderColumn
        label="industry"
        dataType="string"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => (
      <HeaderColumn
        label="revenue"
        dataType="number"
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'customer_lifetime_value',
    header: ({ column }) => (
      <HeaderColumn
        label="customer_lifetime_value"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'contract_start_date',
    header: ({ column }) => (
      <HeaderColumn
        label="contract_start_date"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'contract_end_date',
    header: ({ column }) => (
      <HeaderColumn
        label="contract_end_date"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'contract_duration_months',
    header: ({ column }) => (
      <HeaderColumn
        label="contract_duration_months"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'renewal_probability',
    header: ({ column }) => (
      <HeaderColumn
        label="renewal_probability"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'churn_rate',
    header: ({ column }) => (
      <HeaderColumn
        label="churn_rate"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'contract_value',
    header: ({ column }) => (
      <HeaderColumn
        label="contract_value"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'contract_type',
    header: ({ column }) => (
      <HeaderColumn
        label="contract_type"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'sales_representative',
    header: ({ column }) => (
      <HeaderColumn
        label="sales_representative"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'lead_source',
    header: ({ column }) => (
      <HeaderColumn
        label="lead_source"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'lead_status',
    header: ({ column }) => (
      <HeaderColumn
        label="lead_status"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'lead_created_date',
    header: ({ column }) => (
      <HeaderColumn
        label="lead_created_date"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'lead_last_contacted_date',
    header: ({ column }) => (
      <HeaderColumn
        label="lead_last_contacted_date"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'lead_conversion_date',
    header: ({ column }) => (
      <HeaderColumn
        label="lead_conversion_date"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <HeaderColumn
        label="first_name"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <HeaderColumn
        label="last_name"
        dataType={column.columnDef.type}
        onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      />
    ),
  },
  {
    accessorKey: 'new_column',
    header: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="small">
            <FontAwesomeIcon
              icon={faPlus}
              className="mr-2 text-xs"
            />
            Add Column
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuItem>Enrichment</DropdownMenuItem>
          <DropdownMenuItem>Fill with AI</DropdownMenuItem>
          <DropdownMenuItem>Add Column</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
