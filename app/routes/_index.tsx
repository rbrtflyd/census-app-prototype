import type { MetaFunction } from '@remix-run/node';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useLoaderData } from '@remix-run/react';
import { getDatasets } from '~/db/db';
import { DatasetType } from '~/db/types';

import { initializeDatabase } from '~/db/db';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export const clientLoader = async () => {
  await initializeDatabase();
  const datasets = await getDatasets();
  return datasets;
};

interface LoaderData {
  datasets: any; // Replace 'any' with the actual type of datasets
}

export default function Index() {
  const datasets = useLoaderData<LoaderData>();
  return (
    <>
      <PageHeader title="Home" />
      <div className="flex flex-col gap-4">
        {(datasets as DatasetType[]).map((dataset: any) => (
          <div key={dataset.id}>{dataset.name}</div>
        ))}
      </div>
    </>
  );
}
