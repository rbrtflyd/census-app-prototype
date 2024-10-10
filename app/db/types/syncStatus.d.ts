declare module '../db' {
  interface SyncStatusType {
    id: number;
    stage: string;
    status: 'Active' | 'Paused' | 'Failed' | 'Completed';
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export { SyncStatusType };
