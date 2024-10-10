import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import type { DatasetType } from '~/db/types';

export default function Datasets() {
  return (
    <div>
      <PageHeader
        title="Datasets"
        button={{ label: 'New Dataset', href: '/datasets/new' }}
      />
    </div>
  );
}
