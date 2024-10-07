declare module '../db' {
  interface SegmentType {
    id: number;
    name: string;
    sourceId: number | string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    rows: Array<any>;
    columns: Array<any>;
    tags: string[];
    schema: string;
    uniques: Array<any>;
    indexes: Array<any>;
    foreignKeys: Array<any>;
  }
}

export { SegmentType };
