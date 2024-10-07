declare module '../db' {
  interface RowType {
    id: number;
    datasetId: number | string;
    data: Array<any>;
  }
}

export { RowType };
