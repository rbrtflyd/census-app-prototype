import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '~/db/types';
import EmptyState from '~/components/Empty/EmptyState';

export default function Datasets() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Datasets"
        button={{
          label: 'New Dataset',
          onClick: () => navigate('/datasets/new/step1'),
        }}
      />
      <EmptyState
        title="No datasets found"
        description="You don't have any datasets yet. Create a new dataset to get started."
        actionLabel="New Dataset"
        onAction={() => navigate('/datasets/new/step1')}
      />
    </div>
  );
}