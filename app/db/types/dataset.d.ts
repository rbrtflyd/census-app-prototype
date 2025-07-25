import type {
  ColumnType,
  UniqueType,
  IndexType,
  ForeignKeyType,
} from './column';
import type { RowType } from './row';
declare module '../db' {
  interface DatasetType {
    id: number;
    name: string;
    sourceId: number | string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    rows: Array<RowType>;
    columns: Array<ColumnType>;
    tags: string[];
    schema: string;
    uniques: Array<UniqueType>;
    indexes: Array<IndexType>;
    foreignKeys: Array<ForeignKeyType>;
    folderId?: string | null; // Add folder support
  }
}

export { DatasetType };
