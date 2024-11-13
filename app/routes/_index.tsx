import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useLoaderData } from '@remix-run/react';
import {
  getDatasets,
  getSyncs,
  initializeDatabase,
  clearDatabase,
} from '~/db/db';
import { DatasetType, SyncType } from '~/db/types';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';
import { Outlet } from '@remix-run/react';
import censusLogo from '/logos/census/census-logo-mark.svg';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export const clientLoader = async () => {
  await initializeDatabase();
  console.log('Database initialized');
  const datasets = await getDatasets();
  const syncs = await getSyncs();
  console.log('Syncs retrieved:', syncs.length);
  return { datasets, syncs };
};

interface LoaderData {
  datasets: DatasetType[];
  syncs: SyncType[];
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFirstTimeUser = async () => {
    setIsLoading(true);
    await clearDatabase(); // You'll need to implement this function
    await initializeDatabase();
    setIsLoading(false);
    // Navigate to main app view
    window.location.href = '/getting-started';
  };

  const handleReturningUser = async () => {
    setIsLoading(true);
    await initializeDatabase();
    setIsLoading(false);
    // Navigate to main app view
    window.location.href = '/home';
  };
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-subtle">
      <div className="p-14 flex flex-row items-center gap-8">
        <img
          src={censusLogo}
          alt="Census Logo"
          className="w-16"
        />
        <Text className="text-xl font-medium">Prototype</Text>
      </div>
      <div className="p-14 flex flex-col gap-4 items-start">
        <Text className="text-lg font-medium">Use Census as:</Text>
        <button
          className="flex flex-col gap-2 border border-base rounded-md p-4 *:leading-none"
          onClick={handleFirstTimeUser}>
          <Text className="font-medium">First Time User</Text>
          <Text>Clears all data and starts fresh</Text>
        </button>
        <button
          className="flex flex-col gap-2 border border-base rounded-md p-4 *:leading-none"
          onClick={handleReturningUser}>
          <Text className="font-medium">Returning User</Text>
          <Text>Loads data to the app</Text>
        </button>
      </div>
    </div>
  );
}
