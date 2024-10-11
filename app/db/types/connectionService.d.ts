declare module '../db' {
  interface ConnectionServiceType {
    id: number;
    connectionServiceName: string;
    connectionServiceCategory: string;
    logo: string;
  }
}

export { ConnectionServiceType };
