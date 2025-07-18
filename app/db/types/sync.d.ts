import { SyncStatusType } from './syncStatus';

type SyncBehaviorType =
  | 'update and create'
  | 'update only'
  | 'delete'
  | 'mirror';

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
  folderId?: string | null;
  behavior?: SyncBehaviorType; // Also make this optional since not all syncs have it
}

export { SyncType };
