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
  {
    version: 6,
    description: 'Add mode to workspace connections',
    upgrade: (db: PrototypeDatabase) => ({
      workspaceConnections: 'id, connectionId, workspaceId, name, mode',
    }),
  },
  {
    version: 7,
    description: 'Add syncEngine to workspace connections',
    upgrade: (db: PrototypeDatabase) => ({
      workspaceConnections:
        'id, connectionId, workspaceId, name, mode, syncEngine, credentials',
    }),
  },
  {
    version: 8,
    description: 'Add modes to connections',
    upgrade: (db: PrototypeDatabase) => ({
      connections: 'id, connectionServiceName, connectionServiceType, modes',
    }),
  },
  {
    version: 9,
    description: 'Add authentication methods to connections',
    upgrade: (db: PrototypeDatabase) => ({
      connections:
        'id, connectionServiceName, connectionServiceType, modes,authentication_methods, credentials',
    }),
  },
];
