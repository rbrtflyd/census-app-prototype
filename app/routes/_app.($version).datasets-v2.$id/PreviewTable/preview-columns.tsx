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
import { TableCell } from './TableCell';

export const columns: ColumnDef<PreviewColumns>[] = [
  {
    accessorKey: 'index',
    header: '',
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.index + 1}
          className="text-center"
        />
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
        <TableCell
          value={row.original.id}
          dataType="string"
          significance="unique"
        />
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.company_name}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.job_title}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.email}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.phone_number}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.country}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.industry}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.revenue}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.customer_lifetime_value}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.contract_start_date}
          dataType="date"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.contract_end_date}
          dataType="date"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.contract_duration_months}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.renewal_probability}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.churn_rate}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.contract_value}
          dataType="number"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.contract_type}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.sales_representative}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.lead_source}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.lead_status}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.lead_created_date}
          dataType="date"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.lead_last_contacted_date}
          dataType="date"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.lead_conversion_date}
          dataType="date"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.first_name}
          dataType="string"
        />
      );
    },
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
    cell: ({ row }) => {
      return (
        <TableCell
          value={row.original.last_name}
          dataType="string"
        />
      );
    },
  },
  {
    accessorKey: 'new_column',
    header: () => (
      <div className="flex flex-row items-center px-3 py-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-2 text-xxs"
              />
              Add Column
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Enrichment</DropdownMenuItem>
            <DropdownMenuItem>Fill with AI</DropdownMenuItem>
            <DropdownMenuItem>Formula</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
