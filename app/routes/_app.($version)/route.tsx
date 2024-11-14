import type { MetaFunction } from '@remix-run/node';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { checkMigrations } from '../../db/utils/migrationUtils';
import { getDatasets, getSyncs, initializeDatabase } from '../../db/db';
import { DatasetType, SyncType } from '../../db/types';
import SidebarNavigation from '../../components/Navigation/Sidebar/SidebarNavigation';
import db from '../../db/db';
import { Toaster } from '../../components/ui/sonner';
import { Outlet, useParams } from '@remix-run/react';
import React from 'react';
import HeaderNavigation from '../../components/Navigation/Header/HeaderNavigation';

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
  const { datasets, syncs } = useLoaderData<LoaderData>();
  const { version } = useParams();

  useEffect(() => {
    // Check for migrations every 5 minutes
    const checkForMigrations = async () => {
      await checkMigrations(db);
    };

    const interval = setInterval(checkForMigrations, 5 * 60 * 1000);
    checkForMigrations(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const data = { datasets, syncs, version };

  if (version === 'v1') {
    return (
      <div className="flex flex-row h-full w-full overflow-hidden">
        <Toaster />
        <SidebarNavigation />
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Outlet context={data} />
        </div>
      </div>
    );
  } else
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Toaster />
        <HeaderNavigation />

        <div className="flex flex-col h-full w-full overflow-hidden">
          <Outlet context={data} />
        </div>
      </div>
    );
}
