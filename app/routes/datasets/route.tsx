import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import datasetsData from '~/db/data/datasets_data';
import type { DatasetType } from '~/db/types';

const datasets = datasetsData;

export default function Datasets() {
  return (
    <div>
      <h1>Datasets</h1>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>{dataset.name}</li>
        ))}
      </ul>
    </div>
  );
}
