declare module '../db' {
  interface ConnectionServiceType {
    id: number;
    connectionServiceName: string;
    connectionServiceCategory: string;
    connectionServiceType: string;
    logo: string;
  }
}

export { ConnectionServiceType };
