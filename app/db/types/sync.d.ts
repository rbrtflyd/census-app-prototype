import { SyncStatusType } from './syncStatus';

interface SyncType {
  id: number;
  name: string;
  datasetId?: number | string;
  destinationId?: number | string;
  description?: string;
  createdAt?: Date;
  status?: SyncStatusType;
  updatedAt?: Date;
  rows?: number;
  columns?: Array<any>;
  tags?: string[];
  foreignKeys?: Array<any>;
}

export { SyncType };
