import { ConnectionServiceType } from '../../types';

const connectionsData: ConnectionServiceType[] = [
  // B2B SaaS Apps
  { id: 1, connectionServiceName: 'Salesforce', connectionServiceType: 'CRM' },
  { id: 2, connectionServiceName: 'HubSpot', connectionServiceType: 'CRM' },
  {
    id: 3,
    connectionServiceName: 'Zendesk',
    connectionServiceType: 'Customer Support',
  },
  {
    id: 4,
    connectionServiceName: 'Slack',
    connectionServiceType: 'Communication',
  },
  {
    id: 5,
    connectionServiceName: 'Jira',
    connectionServiceType: 'Project Management',
  },
  {
    id: 6,
    connectionServiceName: 'Asana',
    connectionServiceType: 'Project Management',
  },
  {
    id: 7,
    connectionServiceName: 'Intercom',
    connectionServiceType: 'Customer Engagement',
  },

  // Data Warehouses
  {
    id: 8,
    connectionServiceName: 'Snowflake',
    connectionServiceType: 'Data Warehouse',
  },
  {
    id: 9,
    connectionServiceName: 'Google BigQuery',
    connectionServiceType: 'Data Warehouse',
  },
  {
    id: 10,
    connectionServiceName: 'Amazon Redshift',
    connectionServiceType: 'Data Warehouse',
  },
  {
    id: 11,
    connectionServiceName: 'Azure Synapse Analytics',
    connectionServiceType: 'Data Warehouse',
  },
  {
    id: 12,
    connectionServiceName: 'Databricks',
    connectionServiceType: 'Data Warehouse',
  },

  // Social Media Ads Destinations
  {
    id: 13,
    connectionServiceName: 'Facebook Ads',
    connectionServiceType: 'Advertising',
  },
  {
    id: 14,
    connectionServiceName: 'Google Ads',
    connectionServiceType: 'Advertising',
  },
  {
    id: 15,
    connectionServiceName: 'LinkedIn Ads',
    connectionServiceType: 'Advertising',
  },
  {
    id: 16,
    connectionServiceName: 'Twitter Ads',
    connectionServiceType: 'Advertising',
  },
  {
    id: 17,
    connectionServiceName: 'TikTok Ads',
    connectionServiceType: 'Advertising',
  },
  {
    id: 18,
    connectionServiceName: 'Pinterest Ads',
    connectionServiceType: 'Advertising',
  },
];

export { connectionsData };
