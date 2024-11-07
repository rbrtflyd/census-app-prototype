import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import React from 'react';
import { cn } from '../../lib/utils';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faEye,
  faLink,
  faColumns,
  faSync,
  faFilter,
  faHistory,
  faDatabase,
} from '@fortawesome/pro-solid-svg-icons';

export const clientLoader = async ({
  params,
  request,
}: {
  params: any;
  request: any;
}) => {
  const datasets = await getDatasets();
  const id = params.id;

  return { datasets, id };
};

interface LoaderData {
  datasets: DatasetType[];
  id: string;
}

const pages = (id: string) => [
  {
    name: 'Overview',
    icon: faChartLine,
    link: `/datasets-v2/${id}/overview`,
  },
  {
    name: 'Preview',
    icon: faEye,
    link: `/datasets-v2/${id}/preview`,
  },
  {
    name: 'Relationships',
    icon: faLink,
    link: `/datasets-v2/${id}/relationships`, // Add links for all pages
  },
  {
    name: 'Columns',
    icon: faColumns,
    link: `/datasets-v2/${id}/columns`,
  },
  {
    name: 'Sources',
    icon: faDatabase,
    link: `/datasets-v2/${id}/sources`,
  },
  {
    name: 'Segments',
    icon: faFilter,
    link: `/datasets-v2/${id}/segments`,
  },
  {
    name: 'Activity',
    icon: faHistory,
    link: `/datasets-v2/${id}/activity`,
  },
];

export default function DatasetIndex() {
  const { datasets } = useLoaderData<LoaderData>();
  const params = useParams();
  const id = params.id!;
  const location = useLocation();

  const navigationPages = pages(id);

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
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex flex-row px-6 py-3 border-b border-base">
        <Link to="/datasets">Back</Link>
        {thisDataset.name}
      </div>
      <div className="flex flex-row w-full h-full overflow-hidden">
        <div className="flex flex-col bg-white border-r border-base p-2 space-y-2 shrink-0">
          {navigationPages.map((page) => (
            <Link
              to={page.link}
              className="size-9 rounded hover:bg-deep icon-light flex items-center justify-center">
              <FontAwesomeIcon
                icon={page.icon}
                className="size-4.5 leading-none"
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col w-full h-full">
          <Outlet context={thisDataset} />
        </div>
      </div>
    </div>
  );
}
