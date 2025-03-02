import { DatasetColumn } from './columns';

export const data: DatasetColumn[] = [
  {
    id: 'user_id',
    columnName: 'user_id',
    dataType: 'string',
    nulls: 0,
    source: 'salesforce',
    pii: true,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'email',
    columnName: 'email',
    dataType: 'string',
    nulls: 50,
    source: 'salesforce',
    pii: true,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'company_name',
    columnName: 'company_name',
    dataType: 'string',
    nulls: 100,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'sign_up_date',
    columnName: 'sign_up_date',
    dataType: 'date',
    nulls: 0,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'last_login_date',
    columnName: 'last_login_date',
    dataType: 'date',
    nulls: 200,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'total_logins',
    columnName: 'total_logins',
    dataType: 'integer',
    nulls: 0,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'average_session_duration',
    columnName: 'average_session_duration',
    dataType: 'float',
    nulls: 150,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'features_used',
    columnName: 'features_used',
    dataType: 'array',
    nulls: 300,
    source: 'salesforce',
    pii: false,
    enumeration: true,
    group: 'columns',
  },
  {
    id: 'subscription_tier',
    columnName: 'subscription_tier',
    dataType: 'string',
    nulls: 0,
    source: 'salesforce',
    pii: false,
    enumeration: true,
    group: 'columns',
  },
  {
    id: 'monthly_recurring_revenue',
    columnName: 'monthly_recurring_revenue',
    dataType: 'float',
    nulls: 0,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'lifetime_value',
    columnName: 'lifetime_value',
    dataType: 'float',
    nulls: 100,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'churn_probability',
    columnName: 'churn_probability',
    dataType: 'float',
    nulls: 250,
    source: 'salesforce',
    pii: false,
    enumeration: false,
    group: 'columns',
  },
  {
    id: 'industry',
    columnName: 'industry',
    dataType: 'string',
    nulls: 400,
    source: 'clearbit',
    pii: false,
    enumeration: true,
    group: 'clearbit',
  },
  {
    id: 'employee_count',
    columnName: 'employee_count',
    dataType: 'integer',
    nulls: 350,
    source: 'clearbit',
    pii: false,
    enumeration: false,
    group: 'clearbit',
  },
  {
    id: 'funding_total',
    columnName: 'funding_total',
    dataType: 'float',
    nulls: 600,
    source: 'clearbit',
    pii: false,
    enumeration: false,
    group: 'clearbit',
  },
  {
    id: 'tech_stack',
    columnName: 'tech_stack',
    dataType: 'array',
    nulls: 450,
    source: 'clearbit',
    pii: false,
    enumeration: true,
    group: 'clearbit',
  },
  {
    id: 'growth_potential',
    columnName: 'growth_potential',
    dataType: 'string',
    nulls: 200,
    source: 'gpt',
    pii: false,
    enumeration: true,
    group: 'Growth Potential',
  },
  {
    id: 'product_fit_score',
    columnName: 'product_fit_score',
    dataType: 'float',
    nulls: 300,
    source: 'gpt',
    pii: false,
    enumeration: false,
    group: 'Growth Potential',
  },
  {
    id: 'next_best_action',
    columnName: 'next_best_action',
    dataType: 'string',
    nulls: 250,
    source: 'gpt',
    pii: false,
    enumeration: true,
    group: 'Growth Potential',
  },
  {
    id: 'customer_health_product_fit_score',
    columnName: 'product_fit_score',
    dataType: 'float',
    nulls: 300,
    source: 'gpt',
    pii: false,
    enumeration: false,
    group: 'Customer Health',
  },
  {
    id: 'customer_health_next_best_action',
    columnName: 'next_best_action',
    dataType: 'string',
    nulls: 250,
    source: 'gpt',
    pii: false,
    enumeration: true,
    group: 'Customer Health',
  },
  {
    id: 'engagement_score',
    columnName: 'engagement_score',
    dataType: 'float',
    nulls: 100,
    source: 'computed',
    pii: false,
    enumeration: false,
    group: 'Computed Metrics',
  },
  {
    id: 'revenue_growth_rate',
    columnName: 'revenue_growth_rate',
    dataType: 'float',
    nulls: 150,
    source: 'computed',
    pii: false,
    enumeration: false,
    group: 'Computed Metrics',
  },
  {
    id: 'customer_health_index',
    columnName: 'customer_health_index',
    dataType: 'float',
    nulls: 200,
    source: 'computed',
    pii: false,
    enumeration: false,
    group: 'Computed Metrics',
  },
];
