import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { initializeDatabase, getSyncs } from '~/db/db';
import { SyncType } from '~/db/types';

import { Outlet } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export const clientLoader = async () => {
  await initializeDatabase();
  const syncs = await getSyncs();
  return syncs;
};

interface LoaderData {
  syncs: any; // Replace 'any' with the actual type of datasets
}

export default function Index() {
  const syncs = useLoaderData<LoaderData>();
  return (
    <>
      <PageHeader
        title="Syncs"
        button={{ label: 'New Sync', onClick: () => {} }}
      />

      <Outlet />
    </>
  );
}
