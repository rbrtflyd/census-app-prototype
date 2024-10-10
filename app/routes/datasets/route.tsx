import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import datasetsData from '~/db/data/datasets_data';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import type { DatasetType } from '~/db/types';

const datasets = datasetsData;

export default function Datasets() {
  return (
    <div>
      <PageHeader
        title="Datasets"
        button={{ label: 'New Dataset', href: '/datasets/new' }}
      />
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>{dataset.name}</li>
        ))}
      </ul>
    </div>
  );
}
