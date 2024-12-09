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
    mode: 'source' | 'destination';
    syncEngine?: mode extends ['source'] ? 'basic' | 'advanced' : never;
    credentials: {
      [key: string]: string;
    };
  }
}

export { ConnectionType };
