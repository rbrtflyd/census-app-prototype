declare module '../db' {
  interface ColumnType {
    id: number;
    rawName: string;
    alias: number | string;
    datasetId: number | string;
    type: number | string;
  }
}

export { ColumnType };
