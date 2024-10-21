import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import React from 'react';
import { cn } from '~/lib/utils';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

export const clientLoader = async () => {
  const datasets = await getDatasets();

  return { datasets };
};

interface LoaderData {
  datasets: DatasetType[];
}

export default function DatasetIndex() {
  const { datasets } = useLoaderData<LoaderData>();
  const params = useParams();
  const id = params.id;
  const location = useLocation();

  const thisDataset = datasets.find(
    (dataset: DatasetType) => dataset.id.toString() === id
  );

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'overview';
  };

  const activeTab = getActiveTab(location.pathname);

  if (!thisDataset) {
    return (
      <div>
        <PageHeader title="Dataset Not Found" />
        <p>The requested dataset could not be found.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={thisDataset.name} />
      <div className="flex flex-row w-full">
        <Tabs
          value={activeTab}
          className="w-full">
          <TabsList>
            {[
              'overview',
              'preview',
              'relationships',
              'columns',
              'syncs',
              'segments',
              'activity',
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                asChild>
                <Link
                  to={tab}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium',
                    activeTab === tab
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  )}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-col w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
