import { SyncStatusType } from './syncStatus';

type SyncBehaviorType =
  | 'update and create'
  | 'update only'
  | 'delete'
  | 'mirror';

interface SyncType {
  id: number;
  label: string;
  source?: number | string;
  destination?: number | string;
  description?: string;
  createdAt?: Date;
  status?: SyncStatusType;
  updatedAt?: Date;
  rows?: number;
  columns?: Array<any>;
  tags?: string[];
  foreignKeys?: Array<any>;
  folderId?: string | null;
  behavior?: SyncBehaviorType;
  lastRun?: Date | null;
}

export { SyncType, SyncBehaviorType };
