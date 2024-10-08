import Dexie, { type EntityTable } from 'dexie';
import {
  DatasetType,
  SyncType,
  ConnectionType,
  SegmentType,
  ColumnType,
} from './types';

import datasetsData from './data/datasets_data';

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

export default db;
