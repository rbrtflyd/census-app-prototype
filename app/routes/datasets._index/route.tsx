import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '~/db/types';

export default function Datasets() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Datasets"
        button={{
          label: 'New Dataset',
          onClick: () => navigate('/datasets/new'),
        }}
      />
    </div>
  );
}
