import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getDataset, initializeDatabase } from '../../db/db';
import { DatasetType } from '../../db/types';
import React from 'react';

export const clientLoader = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    throw new Response('Not Found', { status: 404 });
  }

  await initializeDatabase();
  console.log('Database initialized');
  const dataset = await getDataset(id);

  if (!dataset) {
    throw new Response('Dataset Not Found', { status: 404 });
  }
  return json({ dataset });
};

interface LoaderData {
  dataset: DatasetType;
}

export default function DatasetIndex() {
  const { dataset } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Dataset Details</h1>
      <div>{dataset.name}</div>
      {/* TODO: Display dataset information */}
    </div>
  );
}
