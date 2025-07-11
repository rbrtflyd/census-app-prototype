const datasetsData = [
  {
    id: 1,
    name: 'ies-map-converted-leads-to-contacts',
    source: 4,
    description: 'Description 1',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    columns: [
      {
        name: 'Column 1',
        type: 'string',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(
          new Date().setDate(
            new Date().getDate() - Math.floor(Math.random() * 90)
          )
        ),
      },
    ],
    tags: ['tag1', 'tag2'],
    schema: [],
    uniques: [],
    indexes: [],
    foreignKeys: [],
    folderId: 'marketing',
  },
  {
    id: 2,
    name: 'Salesforce Contacts',
    source: 5,
    description: 'Description 2',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 45682,
    tags: ['tag1', 'tag2'],
    schema: [],
    uniques: [],
    indexes: [],
    foreignKeys: [],
    folderId: 'sales',
  },
  {
    id: 3,
    name: 'Dataset 3',
    source: 6,
    description: 'Description 3',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'marketing',
  },
  {
    id: 4,
    name: 'Dataset 4',
    source: 7,
    description: 'Description 4',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'sales',
  },
  {
    id: 5,
    name: 'Dataset 5',
    source: 8,
    description: 'Description 5',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: null, // No folder (root level)
  },
  {
    id: 6,
    name: 'Dataset 6',
    source: 9,
    description: 'Description 6',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'analytics',
  },
  {
    id: 7,
    name: 'Dataset 7',
    source: 10,
    description: 'Description 7',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'analytics',
  },
  {
    id: 8,
    name: 'Dataset 8',
    source: 10,
    description: 'Description 7',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: null, // No folder (root level)
  },
  {
    id: 9,
    name: 'Dataset 9',
    source: 10,
    description: 'Description 7',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'uploads',
  },
  {
    id: 10,
    name: 'Dataset 10',
    source: 10,
    description: 'Description 7',
    createdAt: new Date(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))
    ),
    rows: 100,
    folderId: 'marketing-vip',
  },
];

// Define folder structure
export const foldersData = [
  {
    id: 'marketing',
    name: 'Marketing',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'marketing-vip',
    name: 'VIP Marketing Campaigns',
    parentId: 'marketing',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'sales',
    name: 'Sales',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'analytics',
    name: 'Analytics',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'uploads',
    name: 'Uploads and Temporary',
    parentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { datasetsData };
