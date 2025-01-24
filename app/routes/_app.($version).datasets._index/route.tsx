import React, { useEffect, version } from 'react';
import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData, useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import EmptyState from '../../components/Empty/EmptyState';
import { Text } from '@radix-ui/themes';
import { Button } from '../../components/ui/button';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';

export default function Datasets() {
  const { clearBreadcrumbs } = useBreadcrumbs();
  const { version } = useParams();
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };

  const data = datasets;

  useEffect(() => {
    clearBreadcrumbs();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Datasets"
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
        }}
      />
      <div className="flex flex-col gap-4 grow h-full">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
