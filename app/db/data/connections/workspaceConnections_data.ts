const workspaceConnectionsData = [
  // Business Apps
  {
    id: 1,
    connectionId: 1, // Salesforce
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-12-01'),
    mode: ['source', 'destination'],
    syncEngine: 'basic',
    credentials: [
      { username: 'salesforce_username' },
      { instance_url: 'https://instance.salesforce.com' },
    ],
  },
  {
    id: 2,
    connectionId: 1, // Salesforce (second instance)
    workspaceId: 2,
    name: 'Partner Relationship Management',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-11-10'),
    mode: ['source', 'destination'],
    syncEngine: 'basic',
  },
  {
    id: 3,
    connectionId: 1, // Salesforce (third instance)
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-10-15'),
    mode: ['destination'],
  },
  {
    id: 4,
    connectionId: 2, // HubSpot
    workspaceId: 1,
    name: 'Marketing Hub',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-12-31'),
    mode: ['destination'],
  },
  {
    id: 5,
    connectionId: 3, // Zendesk
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-11-30'),
    mode: ['destination'],
  },
  {
    id: 6,
    connectionId: 4, // Slack
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-12-15'),
    mode: ['destination'],
  },
  {
    id: 7,
    connectionId: 5, // Jira
    workspaceId: 1,
    name: 'Development Tracking',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-11-20'),
    mode: ['destination'],
  },
  {
    id: 8,
    connectionId: 6, // Asana
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2023-12-10'),
    mode: ['source', 'destination'],
    syncEngine: 'basic',
    credentials: [
      { username: 'salesforce_username' },
      { instance_url: 'https://instance.salesforce.com' },
    ],
  },
  {
    id: 9,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: 'Customer Engagement',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-11-25'),
    mode: ['source', 'destination'],
    syncEngine: 'basic',
  },
  {
    id: 10,
    connectionId: 8, // Snowflake
    workspaceId: 1,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-12-20'),
    mode: ['source'],
    syncEngine: 'advanced',
    credentials: [
      { account: 'iq48949.us-east-1' },
      { user: 'CENSUS_DEMO_USER' },
      { warehouse: 'CENSUS_ORG13' },
    ],
  },

  {
    id: 17,
    connectionId: 14, // Zendesk
    workspaceId: 2,
    name: 'Support Analytics',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-12-10'),
    mode: ['destination'],
  },

  {
    id: 20,
    connectionId: 17, // MySQL
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-11-30'),
    mode: ['destination'],
  },

  {
    id: 26,
    connectionId: 23, // Tableau
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-11-30'),
    mode: ['destination'],
  },

  {
    id: 29,
    connectionId: 26, // Braze
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'failing',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-12-10'),
    mode: ['destination'],
  },

  {
    id: 32,
    connectionId: 29, // Mailchimp
    workspaceId: 2,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-11-30'),
    mode: ['source', 'destination'],
    syncEngine: 'basic',
    credentials: [
      {
        endpoint_url:
          'https://mc3ttnlvw0ty6-rd9gsld7xpvmqy.auth.marketingcloudapis.com/',
      },
      { client_id: '1pp2sjfxi55nxt7nc5l4xh72' },
      { sftp_user: '514008251' },
    ],
  },
  {
    id: 33,
    connectionId: 30, // Shopify
    workspaceId: 3,
    name: null,
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-12-05'),
    mode: ['source', 'destination'],
  },

  {
    id: 38,
    connectionId: 7, // Intercom
    workspaceId: 2,
    name: 'User Feedback System',
    lastTestedAt: new Date('2023-12-01'),
    lastTestStatus: 'healthy',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-11-30'),
    mode: ['destination'],
  },
];

export { workspaceConnectionsData };
