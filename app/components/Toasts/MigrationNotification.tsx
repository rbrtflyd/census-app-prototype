import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { useMigrationStore } from '~/stores/migrationStore';

export function MigrationNotification() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { needsMigration, setNeedsMigration } = useMigrationStore();

  if (!needsMigration) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Check for unsaved changes here
    window.location.reload();
  };

  const handleRemindLater = () => {
    setNeedsMigration(false);
    // Show again in 1 hour
    setTimeout(() => setNeedsMigration(true), 60 * 60 * 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border border-base rounded-md shadow-lg max-w-sm">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium">A new update is available</span>
        </div>
        <p className="text-sm text-lighter">
          Please refresh your browser to apply the latest updates. Any unsaved
          changes will be preserved.
        </p>
        <div className="flex flex-row gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1">
            {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
          </Button>
          <Button
            onClick={handleRemindLater}
            variant="secondary">
            Remind Later
          </Button>
        </div>
      </div>
    </div>
  );
}
