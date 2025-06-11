import type { ColumnType } from './column';
import type { RowType } from './row';
declare module '../db' {
  interface DatasetType {
    id: number;
    name: string;
    sourceId: number | string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    rows?: Array<RowType>;
    rowsCount?: number;
    columns?: Array<ColumnType>;
    tags?: string[];
    schema: string;
    uniques: Array<any>;
    indexes: Array<any>;
    foreignKeys: Array<any>;
  }
}

export { DatasetType };
