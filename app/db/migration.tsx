import type { Transaction } from 'dexie';

interface Migration {
  version: number;
  upgrade: (trans: Transaction) => void | PromiseLike<any>;
  description: string;
}

export const migrations: Migration[] = [
  {
    version: 2,
    description: 'Add connections table',
    upgrade: (trans: Transaction) => {
      const db = trans.db;
      db.version(2).stores({
        connections: 'id, connectionServiceName, connectionServiceType',
      });
    },
  },
  {
    version: 3,
    description: 'Add workspace connections table',
    upgrade: (trans: Transaction) => {
      const db = trans.db;
      db.version(3).stores({
        workspaceConnections: 'id, connectionId',
      });
    },
  },
  {
    version: 4,
    description: 'Add additional indexes to datasets and syncs',
    upgrade: (trans: Transaction) => {
      const db = trans.db;
      db.version(4).stores({
        datasets: 'id, name, source, tags, schema',
        syncs: 'id, name, datasetId, status, updatedAt',
      });
    },
  },
];
