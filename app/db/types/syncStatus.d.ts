declare module '../db' {
  interface SyncStatusType {
    id: number;
    stage: string;
    status: 'Active' | 'Paused' | 'failing' | 'not yet run';
    message: string;
  }
}

export { SyncStatusType };
