import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';

const datasetUseCases = [
  {
    title: 'Deduplicate with entity resolution',
    action: 'Deduplicate',
  },
  {
    title: 'Create a segment',
    description: 'Create a segment to filter your data',
    action: 'New Segment',
  },
  {
    title: 'Create a sync',
    description: 'Create a sync to bring in new data',
    action: 'New Sync',
  },
  {
    title: 'Create a relationship',
    description: 'Create a relationship to another dataset',
    action: 'New Relationshiop',
  },
  {
    title: 'Create a GPT Column',
    description: 'Create a column to add new data',
    action: 'New GPT Column',
  },
  {
    title: 'Enrich with AI or Clearbit',
    description: 'Create a view to share your data',
    action: 'Enrich',
  },
];

export default function DatasetIndex() {
  const thisDataset = useOutletContext<DatasetType>();

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col px-6 py-8 grow *:w-full *:max-w-[1400px] *:mx-auto">
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Summary</Text>
          {thisDataset.description}
        </div>
      </div>
      <div className="flex flex-col w-1/5 bg-deep border-l border-base p-6 space-y-8">
        <Text className="text-lg font-medium">
          Things to do with this dataset
        </Text>
        <div className="flex flex-col gap-4">
          {datasetUseCases.map((useCase) => (
            <div className="rounded-md border border-base p-4 bg-white flex flex-col gap-1.5 items-start">
              <Text className="leading-none font-medium">{useCase.title}</Text>
              <Text>{useCase.description}</Text>
              <Button variant="secondary">{useCase.action}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
