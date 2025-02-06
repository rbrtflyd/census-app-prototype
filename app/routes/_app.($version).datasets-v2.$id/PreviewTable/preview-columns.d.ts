type ColumnType = 'string' | 'number' | 'date' | 'boolean' | 'array' | 'object';
type ColumnSignificance =
  | 'unique'
  | 'primary'
  | 'foreign'
  | 'derived'
  | 'calculated';

type ColumnMetadata = {
  id: string;
  name: string;
  type: ColumnType;
  significance?: ColumnSignificance;
};

type PreviewColumns = {
  id: string;
  company_name: string;
  job_title: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  industry: string;
  revenue: number;
  customer_lifetime_value: number;
  contract_start_date: string;
  contract_end_date: string;
  contract_duration_months: number;
  renewal_probability: number;
  churn_rate: number;
  contract_value: number;
  contract_type: string;
  sales_representative: string;
  lead_source: string;
  lead_status: string;
  lead_created_date: string;
  lead_last_contacted_date: string;
  lead_conversion_date: string;
  first_name: string;
  last_name: string;
};

export const columnDef: ColumnMetadata = [
  {
    id: 'id',
    name: 'id',
    type: 'string',
    significance: 'unique',
  },
  {
    id: 'company_name',
    name: 'company_name',
    type: 'string',
    significance: 'primary',
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
