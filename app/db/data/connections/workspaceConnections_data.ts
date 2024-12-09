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
    connectionId: 1, // Salesforce (second instance)
    workspaceId: 2,
    name: 'Partner Relationship Management',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-11-10'),
  },
  {
    id: 3,
    connectionId: 1, // Salesforce (third instance)
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-10-15'),
  },
  {
    id: 4,
    connectionId: 2, // HubSpot
    workspaceId: 1,
    name: 'Marketing Hub',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-12-31'),
  },
  {
    id: 5,
    connectionId: 3, // Zendesk
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 6,
    connectionId: 4, // Slack
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 7,
    connectionId: 5, // Jira
    workspaceId: 1,
    name: 'Development Tracking',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-11-20'),
  },
  {
    id: 8,
    connectionId: 6, // Asana
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 9,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: 'Customer Engagement',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-11-25'),
  },
  {
    id: 10,
    connectionId: 8, // Snowflake
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 11,
    connectionId: 8, // Snowflake (second instance)
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-11-05'),
  },
  {
    id: 12,
    connectionId: 9, // BigQuery
    workspaceId: 3,
    name: 'Analytics Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 13,
    connectionId: 10, // Amazon Redshift
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 14,
    connectionId: 11, // Salesforce
    workspaceId: 2,
    name: 'Sales Operations',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-12-18'),
  },
  {
    id: 15,
    connectionId: 12, // Marketo
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: 16,
    connectionId: 13, // HubSpot
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 17,
    connectionId: 14, // Zendesk
    workspaceId: 2,
    name: 'Support Analytics',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 18,
    connectionId: 15, // PostgreSQL
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-08-25'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 19,
    connectionId: 16, // MongoDB
    workspaceId: 1,
    name: 'User Analytics',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-12-12'),
  },
  {
    id: 20,
    connectionId: 17, // MySQL
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-09-30'),
    updatedAt: new Date('2023-12-08'),
  },
  {
    id: 21,
    connectionId: 18, // Stripe
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-12-19'),
  },
  {
    id: 22,
    connectionId: 19, // Segment
    workspaceId: 1,
    name: 'Customer Data Platform',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-12-21'),
  },
  {
    id: 23,
    connectionId: 20, // Mixpanel
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-12-22'),
  },
  {
    id: 24,
    connectionId: 21, // Amplitude
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2023-12-23'),
  },
  {
    id: 25,
    connectionId: 22, // Looker
    workspaceId: 1,
    name: 'Business Intelligence',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-26'),
    updatedAt: new Date('2023-12-24'),
  },
  {
    id: 26,
    connectionId: 23, // Tableau
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-27'),
    updatedAt: new Date('2023-12-25'),
  },
  {
    id: 27,
    connectionId: 24, // Marketo
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-28'),
    updatedAt: new Date('2023-12-26'),
  },
  {
    id: 28,
    connectionId: 25, // Klaviyo
    workspaceId: 1,
    name: 'Email Marketing',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-29'),
    updatedAt: new Date('2023-12-27'),
  },
  {
    id: 29,
    connectionId: 26, // Braze
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-11-30'),
    updatedAt: new Date('2023-12-28'),
  },
  {
    id: 30,
    connectionId: 27, // Twilio
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-29'),
  },
  {
    id: 31,
    connectionId: 28, // SendGrid
    workspaceId: 1,
    name: 'Email Infrastructure',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-02'),
    updatedAt: new Date('2023-12-30'),
  },
  {
    id: 32,
    connectionId: 29, // Mailchimp
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-03'),
    updatedAt: new Date('2023-12-31'),
  },
  {
    id: 33,
    connectionId: 30, // Shopify
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-04'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 34,
    connectionId: 31, // NetSuite
    workspaceId: 1,
    name: 'ERP System',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 35,
    connectionId: 32, // Workday
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-06'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: 36,
    connectionId: 33, // Adobe Analytics
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-07'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: 37,
    connectionId: 34, // Oracle
    workspaceId: 1,
    name: 'Enterprise Database',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-08'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 38,
    connectionId: 35, // SAP
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'connected',
    createdAt: new Date('2023-12-09'),
    updatedAt: new Date('2024-01-06'),
  },
];

export { workspaceConnectionsData };
