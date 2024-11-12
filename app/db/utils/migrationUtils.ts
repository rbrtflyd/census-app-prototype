import { migrations } from '../migration';
import type { PrototypeDatabase } from '../db';
import { useMigrationStore } from '~/stores/migrationStore';

export async function getCurrentDatabaseVersion(
  db: PrototypeDatabase
): Promise<number> {
  try {
    return db.verno;
  } catch {
    return 0;
  }
}
export async function checkMigrations(db: PrototypeDatabase) {
  const currentVersion = await getCurrentDatabaseVersion(db);
  const pendingMigrations = migrations.filter(
    (m) => m.version > currentVersion
  );

  if (pendingMigrations.length > 0) {
    console.log(
      'Pending database migrations:',
      pendingMigrations.map((m) => ({
        version: m.version,
        description: m.description,
      }))
    );
  }
  useMigrationStore.getState().setNeedsMigration(true);

  return pendingMigrations.length > 0;
}

export function getLatestVersion(): number {
  return Math.max(...migrations.map((m) => m.version));
}
