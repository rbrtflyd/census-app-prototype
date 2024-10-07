declare module '../db' {
  interface ConnectionType {
    id: number;
    name: string;
    connectionServiceName: string;
    connectionServiceType: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export { ConnectionType };
