const workspaceConnectionsData = [
  // Business Apps
  {
    id: 1,
    connectionId: 1, // Salesforce
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-12-01'),
  },
  {
    id: 2,
    connectionId: 2, // HubSpot
    workspaceId: 1,
    name: 'Marketing Hub',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-11-10'),
  },
  {
    id: 3,
    connectionId: 3, // Zendesk
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-10-15'),
  },
  {
    id: 4,
    connectionId: 4, // Slack
    workspaceId: 1,
    name: 'Company-wide Slack',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-12-31'),
  },
  {
    id: 5,
    connectionId: 5, // Jira
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 6,
    connectionId: 6, // Asana
    workspaceId: 2,
    name: 'Project Management',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 7,
    connectionId: 7, // Intercom
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-11-20'),
  },
  {
    id: 8,
    connectionId: 1, // Salesforce (second instance)
    workspaceId: 3,
    name: 'Partner Relationship Management',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 9,
    connectionId: 2, // HubSpot (second instance)
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-11-25'),
  },

  // Data Warehouses
  {
    id: 10,
    connectionId: 8, // Assuming 8 is Snowflake in connections_data
    workspaceId: 1,
    name: 'Central Data Warehouse',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 11,
    connectionId: 9, // Assuming 9 is BigQuery in connections_data
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-11-05'),
  },
  {
    id: 12,
    connectionId: 8, // Snowflake
    workspaceId: 3,
    name: 'Finance Data Warehouse',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 13,
    connectionId: 9, // BigQuery
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 14,
    connectionId: 1, // Salesforce
    workspaceId: 2,
    name: 'Enterprise Sales CRM',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 15,
    connectionId: 2, // HubSpot
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-12-01'),
  },
  {
    id: 16,
    connectionId: 3, // Zendesk
    workspaceId: 1,
    name: 'Customer Support Portal',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 17,
    connectionId: 4, // Stripe
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 18,
    connectionId: 5, // MongoDB
    workspaceId: 3,
    name: 'Document Database',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 19,
    connectionId: 6, // PostgreSQL
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 20,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: 'Customer Messaging Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 21,
    connectionId: 8, // Snowflake
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-02-25'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 22,
    connectionId: 9, // BigQuery
    workspaceId: 1,
    name: 'Customer Data Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-30'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 23,
    connectionId: 1, // Salesforce
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 24,
    connectionId: 2, // HubSpot
    workspaceId: 3,
    name: 'Lead Generation System',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 25,
    connectionId: 3, // Zendesk
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 26,
    connectionId: 4, // Stripe
    workspaceId: 2,
    name: 'Subscription Management',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 27,
    connectionId: 5, // MongoDB
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-25'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 28,
    connectionId: 6, // PostgreSQL
    workspaceId: 1,
    name: 'Product Database',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-09-30'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 29,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 30,
    connectionId: 8, // Snowflake
    workspaceId: 3,
    name: 'Marketing Data Warehouse',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 31,
    connectionId: 9, // BigQuery
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 32,
    connectionId: 1, // Salesforce
    workspaceId: 2,
    name: 'Global Sales Operations',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 33,
    connectionId: 2, // HubSpot
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 34,
    connectionId: 3, // Zendesk
    workspaceId: 1,
    name: 'Customer Success Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-04-30'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 35,
    connectionId: 4, // Stripe
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 36,
    connectionId: 5, // MongoDB
    workspaceId: 3,
    name: 'Application Database',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 37,
    connectionId: 6, // PostgreSQL
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 38,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: 'User Feedback System',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 39,
    connectionId: 8, // Snowflake
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'error',
    createdAt: new Date('2023-09-25'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 40,
    connectionId: 9, // BigQuery
    workspaceId: 1,
    name: 'Analytics Data Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-10-30'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 41,
    connectionId: 1, // Salesforce
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-05'),
    updatedAt: new Date('2023-12-10'),
  },
];

export { workspaceConnectionsData };
