const workspaceConnectionsData = [
  // Business Apps
  {
    id: 1,
    connectionId: 1, // Salesforce
    workspaceId: 1,
    name: 'Sales Team CRM',
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
    name: 'Customer Support Portal',
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
    name: 'Development Tracker',
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
    name: 'Customer Engagement Platform',
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
    name: 'Sales Enablement Hub',
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
    name: 'Marketing Analytics Warehouse',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-11-05'),
  },
];

export { workspaceConnectionsData };
