import Dexie, { type EntityTable } from 'dexie';
import {
  DatasetType,
  SyncType,
  ConnectionType,
  ConnectionServiceType,
  SegmentType,
  ColumnType,
  UserConfigType,
} from './types';
import {
  datasetsData,
  syncsData,
  userConfigData,
  connectionsData,
  workspaceConnectionsData,
} from './data';

class PrototypeDatabase extends Dexie {
  datasets: EntityTable<DatasetType, 'id'>;
  syncs: EntityTable<SyncType, 'id'>;
  userConfig: EntityTable<UserConfigType, 'id'>;
  connections: EntityTable<ConnectionServiceType, 'id'>;
  workspaceConnections: EntityTable<ConnectionType, 'id'>;

  constructor() {
    super('PrototypeDatabase');
    this.version(4).stores({
      datasets:
        'id, name, description, source, columns, rows, tags, schema, uniques, indexes, foreignKeys',
      syncs:
        'id, name, description, datasetId, destinationId, createdAt, updatedAt, status, rows, columns, tags, foreignKeys',
      userConfig: 'id, name, syncs_populated, datasets_populated',
      connections:
        'id, connectionServiceName, connectionServiceType, logo, connectionServiceCategory, description',
      workspaceConnections: 'id, connectionId',
    });
    this.datasets = this.table('datasets');
    this.syncs = this.table('syncs');
    this.userConfig = this.table('userConfig');
    this.connections = this.table('connections');
    this.workspaceConnections = this.table('workspaceConnections');
  }

  private dataMatches(existingData: any[], initialData: any[]): boolean {
    if (existingData.length !== initialData.length) return false;
    return existingData.every(
      (item, index) =>
        JSON.stringify(item) === JSON.stringify(initialData[index])
    );
  }

  async seedDatabase() {
    const datasets = await this.datasets.toArray();
    const syncs = await this.syncs.toArray();
    const userConfig = await this.userConfig.toArray();
    const connections = await this.connections.toArray();
    const workspaceConnections = await this.workspaceConnections.toArray();

    // Compare existing data with initial data
    if (!this.dataMatches(datasets, datasetsData)) {
      await this.datasets.clear();
      await this.datasets.bulkAdd(datasetsData);
    }
    if (!this.dataMatches(syncs, syncsData)) {
      await this.syncs.clear();
      await this.syncs.bulkAdd(syncsData);
    }
    if (!this.dataMatches(userConfig, userConfigData)) {
      await this.userConfig.clear();
      await this.userConfig.bulkAdd(userConfigData);
    }
    if (!this.dataMatches(connections, connectionsData)) {
      await this.connections.clear();
      await this.connections.bulkAdd(connectionsData);
    }
    if (!this.dataMatches(workspaceConnections, workspaceConnectionsData)) {
      await this.workspaceConnections.clear();
      await this.workspaceConnections.bulkAdd(workspaceConnectionsData);
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

export async function getUserConfig() {
  return await db.userConfig.toArray();
}

export async function getSyncs() {
  return await db.syncs.toArray();
}

export async function getSync(id: any) {
  return await db.syncs.get({ id });
}

export async function getConnections() {
  return await db.connections.toArray();
}

export async function getWorkspaceConnections() {
  return await db.workspaceConnections.toArray();
}

export default db;
