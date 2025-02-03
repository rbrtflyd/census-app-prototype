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
    name: 'ID',
    type: 'string',
  },
  {
    id: 'company_name',
    name: 'Company Name',
    type: 'string',
  },
  {
    id: 'job_title',
    name: 'Job Title',
    type: 'string',
  },
  {
    id: 'email',
    name: 'Email',
    type: 'string',
  },
  {
    id: 'phone_number',
    name: 'Phone Number',
    type: 'string',
  },
  {
    id: 'country',
    name: 'Country',
    type: 'string',
  },
  {
    id: 'industry',
    name: 'Industry',
    type: 'string',
  },
  {
    id: 'revenue',
    name: 'Revenue',
    type: 'number',
  },
  {
    id: 'customer_lifetime_value',
    name: 'Customer Lifetime Value',
    type: 'number',
  },
  {
    id: 'contract_start_date',
    name: 'Contract Start Date',
    type: 'date',
  },
  {
    id: 'contract_end_date',
    name: 'Contract End Date',
    type: 'date',
  },
  {
    id: 'contract_duration_months',
    name: 'Contract Duration (Months)',
    type: 'number',
  },
  {
    id: 'renewal_probability',
    name: 'Renewal Probability',
    type: 'number',
  },
  {
    id: 'churn_rate',
    name: 'Churn Rate',
    type: 'number',
  },
  {
    id: 'contract_value',
    name: 'Contract Value',
    type: 'number',
  },
  {
    id: 'contract_type',
    name: 'Contract Type',
    type: 'string',
  },
  {
    id: 'sales_representative',
    name: 'Sales Representative',
    type: 'string',
  },
  {
    id: 'lead_source',
    name: 'Lead Source',
    type: 'string',
  },
  {
    id: 'lead_status',
    name: 'Lead Status',
    type: 'string',
  },
  {
    id: 'lead_created_date',
    name: 'Lead Created Date',
    type: 'date',
  },
  {
    id: 'lead_last_contacted_date',
    name: 'Lead Last Contacted Date',
    type: 'date',
  },
  {
    id: 'lead_conversion_date',
    name: 'Lead Conversion Date',
    type: 'date',
  },
  {
    id: 'first_name',
    name: 'First Name',
    type: 'string',
  },
  {
    id: 'last_name',
    name: 'Last Name',
    type: 'string',
  },
];
