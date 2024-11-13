import { create } from 'zustand';

interface MigrationState {
  needsMigration: boolean;
  setNeedsMigration: (needs: boolean) => void;
}

export const useMigrationStore = create<MigrationState>((set) => ({
  needsMigration: false,
  setNeedsMigration: (needs) => set({ needsMigration: needs }),
}));
