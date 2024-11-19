import type { PrototypeDatabase } from './db';

interface Migration {
  version: number;
  upgrade: (db: PrototypeDatabase) => { [key: string]: string | null };
  description: string;
}

export const migrations: Migration[] = [
  {
    version: 2,
    description: 'Add connections table',
    upgrade: (db: PrototypeDatabase) => ({
      connections: 'id, connectionServiceName, connectionServiceType',
    }),
  },
  {
    version: 3,
    description: 'Add workspace connections table',
    upgrade: (db: PrototypeDatabase) => ({
      workspaceConnections: 'id, connectionId',
    }),
  },
  {
    version: 4,
    description: 'Add additional indexes to datasets and syncs',
    upgrade: (db: PrototypeDatabase) => ({
      datasets: 'id, name, source, tags, schema',
      syncs: 'id, name, datasetId, status, updatedAt',
    }),
  },
  {
    version: 5,
    description: 'Add additional fields to workspace connections',
    upgrade: (db: PrototypeDatabase) => ({
      workspaceConnections:
        'id, connectionId, workspaceId, name, lastTestedAt, lastTestStatus',
    }),
  },
];
