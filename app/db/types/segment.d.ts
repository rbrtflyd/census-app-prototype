declare module '../db' {
  interface SegmentType {
    id: number;
    name: string;
    sourceId: number | string;
    destinations: number[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
    rowCount: number;
    columnCount: number;
    tags: string[];
    folderId: number | null;
  }
}

export { SegmentType };
