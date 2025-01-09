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
  },
];

export { datasetsData };
