declare module '../db' {
  interface ConnectionType {
    id: number;
    connectionId: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    name: string;
    lastTestedAt: Date;
    lastTestStatus: 'connected' | 'failed';
  }
}

export { ConnectionType };
