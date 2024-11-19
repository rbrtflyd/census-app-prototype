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
    window.location.href = '/v1/getting-started';
  };

  const handleReturningUser = async () => {
    setIsLoading(true);
    await initializeDatabase();
    setIsLoading(false);
    // Navigate to main app view
    window.location.href = '/home';
  };

  const useCases = [
    {
      name: 'First Time User',
      description: 'Clears all data and starts fresh',
      onClick: handleFirstTimeUser,
    },
    {
      name: 'Returning User',
      description: 'Loads data to the app',
      onClick: handleReturningUser,
    },
  ];

  const workflows = [
    {
      name: 'New Navigation',
      description: 'Clears all data and starts fresh',
      onClick: () => {
        window.location.href = '/v2/getting-started';
      },
    },
  ];

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
      <div className="flex flex-row gap-9 p-14">
        <div className="p-12 flex flex-col gap-4 items-stretch bg-white rounded">
          <Text className="text-lg font-medium">Use Census as:</Text>
          {useCases.map((useCase) => (
            <button
              className="flex flex-col gap-2 border border-base rounded-md p-4 *:leading-none"
              onClick={useCase.onClick}>
              <Text className="font-medium">{useCase.name}</Text>
              <Text>{useCase.description}</Text>
            </button>
          ))}
        </div>
        <div className="p-14 flex flex-col gap-4 items-start bg-white rounded">
          <Text className="text-lg font-medium">Workflows:</Text>
          {workflows.map((workflow) => (
            <button
              className="flex flex-col gap-2 border border-base rounded-md p-4 *:leading-none"
              onClick={workflow.onClick}>
              <Text className="font-medium">{workflow.name}</Text>
              <Text>{workflow.description}</Text>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
