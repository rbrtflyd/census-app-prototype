declare module '../db' {
  interface ConnectionType {
    id: number;
    connectionId: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  }
}

export { ConnectionType };
