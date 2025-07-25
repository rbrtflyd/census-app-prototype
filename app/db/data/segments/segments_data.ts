const segmentsData = [
  {
    id: 1,
    name: 'High-Value B2B Prospects',
    sourceId: 1,
    destinations: [1, 2], // Marketo, Salesforce
    description:
      'Enterprise companies with >$50M revenue showing intent signals',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 2500,
    columnCount: 12,
    tags: ['b2b', 'enterprise', 'high-value'],
    folderId: 'b2b-marketing',
  },
  {
    id: 2,
    name: 'Cart Abandoners - Last 30 Days',
    sourceId: 2,
    destinations: [3, 4], // Facebook Ads, Google Ads
    description: 'E-commerce customers who abandoned cart in last 30 days',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 15000,
    columnCount: 8,
    tags: ['ecommerce', 'retargeting'],
    folderId: 'b2c-marketing',
  },
  {
    id: 3,
    name: 'Newsletter Subscribers - Highly Engaged',
    sourceId: 3,
    destinations: [5], // Mailchimp
    description: 'Subscribers with >40% open rate in last 90 days',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 50000,
    columnCount: 6,
    tags: ['email', 'engaged'],
    folderId: 'email-marketing',
  },
  {
    id: 4,
    name: 'SMB Decision Makers',
    sourceId: 4,
    destinations: [1, 6], // Marketo, LinkedIn Ads
    description: 'C-level and VP contacts at companies 10-100 employees',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 7500,
    columnCount: 15,
    tags: ['b2b', 'smb', 'decision-makers'],
    folderId: 'b2b-marketing',
  },
  {
    id: 5,
    name: 'Product Launch Interest Group',
    sourceId: 5,
    destinations: [3, 4, 5], // Facebook, Google, Mailchimp
    description: 'Customers who engaged with product launch content',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 25000,
    columnCount: 10,
    tags: ['product-launch', 'engaged'],
    folderId: null,
  },
  {
    id: 6,
    name: 'High LTV Customers',
    sourceId: 6,
    destinations: [7], // Customer.io
    description: 'Customers with lifetime value >$1000',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 5000,
    columnCount: 20,
    tags: ['high-value', 'retention'],
    folderId: 'customer-marketing',
  },
  {
    id: 7,
    name: 'Tech Industry Decision Makers',
    sourceId: 7,
    destinations: [1, 6], // Marketo, LinkedIn
    description: 'IT and Engineering leaders in technology companies',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 10000,
    columnCount: 18,
    tags: ['b2b', 'tech', 'decision-makers'],
    folderId: 'b2b-marketing',
  },
  {
    id: 8,
    name: 'Holiday Shoppers 2023',
    sourceId: 8,
    destinations: [3, 4], // Facebook, Google
    description: 'Customers who purchased during holiday season',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 75000,
    columnCount: 12,
    tags: ['seasonal', 'retail'],
    folderId: 'b2c-marketing',
  },
  {
    id: 9,
    name: 'Enterprise Upsell Opportunities',
    sourceId: 9,
    destinations: [2], // Salesforce
    description: 'Enterprise customers eligible for product upgrades',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 1500,
    columnCount: 25,
    tags: ['enterprise', 'upsell'],
    folderId: 'customer-marketing',
  },
  {
    id: 10,
    name: 'Blog Subscribers',
    sourceId: 10,
    destinations: [5, 7], // Mailchimp, Customer.io
    description: 'Active blog subscribers from last 6 months',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 100000,
    columnCount: 8,
    tags: ['content', 'blog'],
    folderId: 'content-marketing',
  },
  {
    id: 11,
    name: 'Webinar Registrants Q4',
    sourceId: 11,
    destinations: [1, 5], // Marketo, Mailchimp
    description: 'All webinar registrants from Q4 2023',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 12000,
    columnCount: 15,
    tags: ['events', 'webinar'],
    folderId: 'events-marketing',
  },
  {
    id: 12,
    name: 'Competitor Switchers',
    sourceId: 12,
    destinations: [2, 7], // Salesforce, Customer.io
    description: 'Customers who switched from competitors',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    ),
    rowCount: 3000,
    columnCount: 20,
    tags: ['competitive', 'win'],
    folderId: null,
  },
];

export const segmentFoldersData = [
  {
    id: 'b2b-marketing',
    name: 'B2B Marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
  {
    id: 'b2c-marketing',
    name: 'B2C Marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
  {
    id: 'email-marketing',
    name: 'Email Campaigns',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
  {
    id: 'customer-marketing',
    name: 'Customer Marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
  {
    id: 'events-marketing',
    name: 'Events',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    system: false,
  },
];

export { segmentsData };
