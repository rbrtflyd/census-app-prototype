import Dexie, { type EntityTable } from 'dexie';
import {
  DatasetType,
  SyncType,
  ConnectionType,
  SegmentType,
  ColumnType,
} from './types';
import datasetsData from './data/datasets_data';

let indexedDB: IDBFactory;
let IDBKeyRange: typeof globalThis.IDBKeyRange;

if (typeof window === 'undefined') {
  const importFakeIndexedDB = async () => {
    const { default: fakeIndexedDB } = await import('fake-indexeddb');
    const { default: fakeIDBKeyRange } = await import('fake-indexeddb');
    return { fakeIndexedDB, fakeIDBKeyRange };
  };

  importFakeIndexedDB().then(({ fakeIndexedDB, fakeIDBKeyRange }) => {
    indexedDB = fakeIndexedDB as unknown as IDBFactory;
    IDBKeyRange = fakeIDBKeyRange as unknown as typeof IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
  });
} else {
  indexedDB = window.indexedDB;
  IDBKeyRange = window.IDBKeyRange;
  Dexie.dependencies.indexedDB = indexedDB;
  Dexie.dependencies.IDBKeyRange = IDBKeyRange;
}

class PrototypeDatabase extends Dexie {
  datasets: EntityTable<DatasetType, 'id'>;
  constructor() {
    super('PrototypeDatabase');
    this.version(1).stores({
      datasets:
        '++id, name, description, source, columns, rows, tags, schema, uniques, indexes, foreignKeys',
    });
    this.datasets = this.table('datasets');
  }

  async seedDatabase() {
    const datasets = await this.datasets.toArray();
    if (datasets.length === 0) {
      const datasets = datasetsData;
      await this.datasets.bulkAdd(datasets);
    }
  }
}

interface PrototypeDatabase extends Dexie {}

const db = new PrototypeDatabase();

export async function getDatasets() {
  return await db.datasets.toArray();
}

export async function getDataset(id: any) {
  return await db.datasets.get({ id });
}

export async function initializeDatabase() {
  await db.seedDatabase();
}

export default db;
