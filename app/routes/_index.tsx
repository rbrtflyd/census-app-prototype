import type { MetaFunction } from '@remix-run/node';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';
import { clientLoader } from '~/db/db';
import { useLoaderData } from '@remix-run/react';
import { DatasetType } from '~/db/types/dataset';
import { useLiveQuery } from 'dexie-react-hooks';
import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node'; // Add this import

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export const loader: any = async ({ params }: ClientLoaderFunctionArgs) => {
  // This runs in the browser
  return loader({ params });
};

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
