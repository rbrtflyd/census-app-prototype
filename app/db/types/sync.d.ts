declare module '../db' {
  interface SyncType {
    id: number;
    name: string;
    sourceId: number | string;
    destinationId: number | string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    rows: Array<any>;
    columns: Array<any>;
    tags: string[];
    foreignKeys: Array<any>;
  }
}

export { SyncType };
