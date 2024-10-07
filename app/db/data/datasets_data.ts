const datasetsData = [
  {
    id: 1,
    name: 'Dataset 1',
    source: 4,
    description: 'Description 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
    columns: [
      {
        name: 'Column 1',
        type: 'string',
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    tags: ['tag1', 'tag2'],
    schema: [],
    uniques: [],
    indexes: [],
    foreignKeys: [],
  },
  {
    id: 2,
    name: 'Dataset 2',
    source: 5,
    description: 'Description 2',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
    tags: ['tag1', 'tag2'],
    schema: [],
    uniques: [],
    indexes: [],
    foreignKeys: [],
  },
  {
    id: 3,
    name: 'Dataset 3',
    source: 6,
    description: 'Description 3',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
  },
  {
    id: 4,
    name: 'Dataset 4',
    source: 7,
    description: 'Description 4',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
  },
  {
    id: 5,
    name: 'Dataset 5',
    source: 8,
    description: 'Description 5',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
  },
  {
    id: 6,
    name: 'Dataset 6',
    source: 9,
    description: 'Description 6',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
  },
  {
    id: 7,
    name: 'Dataset 7',
    source: 10,
    description: 'Description 7',
    createdAt: new Date(),
    updatedAt: new Date(),
    rows: 100,
  },
];

export default datasetsData;