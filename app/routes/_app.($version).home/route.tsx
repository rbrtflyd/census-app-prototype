import React from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { getDatasets, getSyncs } from '../../db/db';
import type { DatasetType, SyncType } from '../../db/types';

interface LoaderData {
  datasets: DatasetType[];
  syncs: SyncType[];
}

export default function Home() {
  const { datasets, syncs } = useOutletContext<LoaderData>();

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader title="Home" />
      <main className="flex-grow p-4">Some text on the home page</main>
    </div>
  );
}
