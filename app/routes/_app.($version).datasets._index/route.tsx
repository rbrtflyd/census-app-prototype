import React from 'react';
import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import EmptyState from '../../components/Empty/EmptyState';
import { Text } from '@radix-ui/themes';
import { Button } from '../../components/ui/button';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';

export default function Datasets() {
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };

  const data = datasets;

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Datasets"
        button={{
          label: 'New Dataset',
          onClick: () => navigate('/datasets/new/step1'),
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
