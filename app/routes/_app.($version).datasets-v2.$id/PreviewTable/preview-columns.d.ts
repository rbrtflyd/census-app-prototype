type ColumnType = 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object';

type ColumnSchema = {
  id: string;
  name: string;
  type: ColumnType;
};

export type PreviewColumns = ColumnSchema[];

export const PreviewColumns: PreviewColumns = [
  {
    id: 'id',
    name: 'id',
    type: 'string',
  },
  {
    id: 'company_name',
    name: 'company_name',
    type: 'string',
  },
  {
    id: 'job_title',
    name: 'job_title',
    type: 'string',
  },
  {
    id: 'email',
    name: 'email',
    type: 'string',
  },
  {
    id: 'phone_number',
    name: 'phone_number',
    type: 'string',
  },
  {
    id: 'country',
    name: 'country',
    type: 'string',
  },
  {
    id: 'industry',
    name: 'industry',
    type: 'string',
  },
  {
    id: 'revenue',
    name: 'revenue',
    type: 'number',
  },
  {
    id: 'customer_lifetime_value',
    name: 'customer_lifetime_value',
    type: 'number',
  },
  {
    id: 'contract_start_date',
    name: 'contract_start_date',
    type: 'date',
  },
  {
    id: 'contract_end_date',
    name: 'contract_end_date',
    type: 'date',
  },
  {
    id: 'contract_duration_months',
    name: 'contract_duration_months',
    type: 'number',
  },
  {
    id: 'renewal_probability',
    name: 'renewal_probability',
    type: 'number',
  },
  {
    id: 'churn_rate',
    name: 'churn_rate',
    type: 'number',
  },
  {
    id: 'contract_value',
    name: 'contract_value',
    type: 'number',
  },
  {
    id: 'contract_type',
    name: 'contract_type',
    type: 'string',
  },
  {
    id: 'sales_representative',
    name: 'sales_representative',
    type: 'string',
  },
  {
    id: 'lead_source',
    name: 'lead_source',
    type: 'string',
  },
  {
    id: 'lead_status',
    name: 'lead_status',
    type: 'string',
  },
  {
    id: 'lead_created_date',
    name: 'lead_created_date',
    type: 'date',
  },
  {
    id: 'lead_last_contacted_date',
    name: 'lead_last_contacted_date',
    type: 'date',
  },
  {
    id: 'lead_conversion_date',
    name: 'lead_conversion_date',
    type: 'date',
  },
  {
    id: 'first_name',
    name: 'first_name',
    type: 'string',
  },
  {
    id: 'last_name',
    name: 'last_name',
    type: 'string',
  },
];
