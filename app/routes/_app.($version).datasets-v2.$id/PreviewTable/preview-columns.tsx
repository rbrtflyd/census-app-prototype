import { ColumnDef } from '@tanstack/react-table';
import type { PreviewColumns } from './preview-columns.d';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Toggle } from '~/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

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
    header: 'id',
  },
  {
    accessorKey: 'company_name',
    header: 'company_name',
  },
  {
    accessorKey: 'job_title',
    header: 'job_title',
  },
  {
    accessorKey: 'email',
    header: 'email',
  },
  {
    accessorKey: 'phone_number',
    header: 'phone_number',
  },
  {
    accessorKey: 'country',
    header: 'country',
  },
  {
    accessorKey: 'industry',
    header: 'industry',
  },
  {
    accessorKey: 'revenue',
    header: 'revenue',
  },
  {
    accessorKey: 'customer_lifetime_value',
    header: 'Customer Lifetime Value',
  },
  {
    accessorKey: 'contract_start_date',
    header: 'Contract Start Date',
  },
  {
    accessorKey: 'contract_end_date',
    header: 'Contract End Date',
  },
  {
    accessorKey: 'contract_duration_months',
    header: 'Contract Duration (Months)',
  },
  {
    accessorKey: 'renewal_probability',
    header: 'Renewal Probability',
  },
  {
    accessorKey: 'churn_rate',
    header: 'Churn Rate',
  },
  {
    accessorKey: 'contract_value',
    header: 'Contract Value',
  },
  {
    accessorKey: 'contract_type',
    header: 'Contract Type',
  },
  {
    accessorKey: 'sales_representative',
    header: 'Sales Representative',
  },
  {
    accessorKey: 'lead_source',
    header: 'Lead Source',
  },
  {
    accessorKey: 'lead_status',
    header: 'Lead Status',
  },
  {
    accessorKey: 'lead_created_date',
    header: 'Lead Created Date',
  },
  {
    accessorKey: 'lead_last_contacted_date',
    header: 'Lead Last Contacted Date',
  },
  {
    accessorKey: 'lead_conversion_date',
    header: 'Lead Conversion Date',
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
  },
];
