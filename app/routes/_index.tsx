import type { MetaFunction } from '@remix-run/node';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';
import { getDatasets } from '~/db/db';
import { useLoaderData, Form } from '@remix-run/react';
import { DatasetType } from '~/db/types/datasets';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export async function loader() {
  const datasets = await getDatasets();
  return datasets;
}

export default function Index() {
  const datasets = useLoaderData();
  return (
    <div className="flex h-screen flex-row">
      <SidebarNavigation />
      <div className="grow">
        Main content
        {(datasets as DatasetType[]).map((dataset: any) => (
          <div key={dataset.id}>{dataset.name}</div>
        ))}
      </div>
    </div>
  );
}
