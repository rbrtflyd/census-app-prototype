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

  return { datasets };
};

interface LoaderData {
  datasets: DatasetType[];
}

const pages = [
  {
    name: 'Overview',
    icon: faChartLine,
  },
  {
    name: 'Preview',
    icon: faEye,
  },
  {
    name: 'Relationships',
    icon: faLink,
  },
  {
    name: 'Columns',
    icon: faColumns,
  },
  {
    name: 'Sources',
    icon: faDatabase,
  },
  {
    name: 'Segments',
    icon: faFilter,
  },
  {
    name: 'Activity',
    icon: faHistory,
  },
];

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
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div>Source</div>
    </div>
  );
}
