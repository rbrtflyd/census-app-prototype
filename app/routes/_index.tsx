import type { MetaFunction } from '@remix-run/node';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useLoaderData } from '@remix-run/react';
import { getDatasets, getSyncs, initializeDatabase } from '~/db/db';
import { DatasetType, SyncType } from '~/db/types';

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
  return (
    <>
      <PageHeader title="Home" />
      <div className="flex flex-col gap-4">
        {datasets.map((dataset) => (
          <div key={dataset.id}>{dataset.name}</div>
        ))}
        {syncs.map((sync) => (
          <div key={sync.id}>{sync.name}</div>
        ))}
      </div>
    </>
  );
}
