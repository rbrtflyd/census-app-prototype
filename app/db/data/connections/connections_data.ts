import { ConnectionServiceType } from '../../types';

const connectionsData: ConnectionServiceType[] = [
  // B2B SaaS Apps
  {
    id: 1,
    connectionServiceName: 'Salesforce',
    connectionServiceType: 'CRM',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 2,
    connectionServiceName: 'HubSpot',
    connectionServiceType: 'CRM',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 3,
    connectionServiceName: 'Zendesk',
    connectionServiceType: 'Customer Support',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 4,
    connectionServiceName: 'Slack',
    connectionServiceType: 'Communication',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 5,
    connectionServiceName: 'Jira',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 6,
    connectionServiceName: 'Asana',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 7,
    connectionServiceName: 'Intercom',
    connectionServiceType: 'Customer Engagement',
    connectionServiceCategory: 'business_app',
  },

  // Data Warehouses
  {
    id: 8,
    connectionServiceName: 'Snowflake',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
  },
  {
    id: 9,
    connectionServiceName: 'Google BigQuery',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
  },
  {
    id: 10,
    connectionServiceName: 'Amazon Redshift',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
  },
  {
    id: 11,
    connectionServiceName: 'Azure Synapse Analytics',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
  },
  {
    id: 12,
    connectionServiceName: 'Databricks',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
  },

  // Social Media Ads Destinations
  {
    id: 13,
    connectionServiceName: 'Facebook Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 14,
    connectionServiceName: 'Google Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 15,
    connectionServiceName: 'LinkedIn Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 16,
    connectionServiceName: 'Twitter Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 17,
    connectionServiceName: 'TikTok Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
  {
    id: 18,
    connectionServiceName: 'Pinterest Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
  },
];

export { connectionsData };
