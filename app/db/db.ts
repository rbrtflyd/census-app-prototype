import Dexie, { type EntityTable } from 'dexie';
import {
  DatasetType,
  SyncType,
  ConnectionType,
  SegmentType,
  ColumnType,
} from './types';

import datasetsData from './data/datasets/datasets_data';
import syncsData from './data/syncs/syncs_data';

class PrototypeDatabase extends Dexie {
  datasets: EntityTable<DatasetType, 'id'>;
  syncs: EntityTable<SyncType, 'id'>;
  constructor() {
    super('PrototypeDatabase');
    this.version(2).stores({
      datasets:
        '++id, name, description, source, columns, rows, tags, schema, uniques, indexes, foreignKeys',
      syncs:
        '++id, name, description, source, columns, rows, tags, schema, uniques, indexes, foreignKeys',
    });
    this.datasets = this.table('datasets');
    this.syncs = this.table('syncs');
  }

  async seedDatabase() {
    const datasets = await this.datasets.toArray();
    const syncs = await this.syncs.toArray();
    if (datasets.length === 0 && syncs.length === 0) {
      const datasets = datasetsData;
      const syncs = syncsData;

      await this.datasets.bulkAdd(datasets);
      await this.syncs.bulkAdd(syncs);
    }
  }
}

interface PrototypeDatabase extends Dexie {}

const db = new PrototypeDatabase();

export async function initializeDatabase() {
  await db.seedDatabase();
}

export async function getDatasets() {
  return await db.datasets.toArray();
}

export async function getDataset(id: any) {
  return await db.datasets.get({ id });
}

export async function getSyncs() {
  return await db.syncs.toArray();
}

export async function getSync(id: any) {
  return await db.syncs.get({ id });
}

export default db;
