import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { Button } from '../../components/ui/button';
import { DotPattern } from '../../components/ui/dot-pattern';
import cn from 'classnames';

const useCases = [
  {
    title: 'Deduplicate with entity resolution',
    description: 'Create a segment to filter your data',
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
    <div className="flex flex-row w-full h-full overflow-hidden px-6 py-8 gap-6">
      <div className="flex flex-col grow *:w-full *:max-w-[1400px] *:mx-auto">
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Summary</Text>
          {thisDataset.description}
        </div>
      </div>
      <div className="flex flex-col gap-6 w-1/3 bg-subtle rounded-lg p-9 relative overflow-hidden border border-base">
        <Text className="text-lg font-medium text-dark z-10">
          Manage your dataset
        </Text>
        <div className="flex flex-col gap-4 z-10">
          {useCases.map((useCase) => (
            <button
              key={useCase.title}
              className="flex flex-col gap-1 items-start text-left hover:scale-[1.02] transition-all duration-75 p-4 rounded-md bg-white shadow">
              <Text className="font-medium leading-tight">{useCase.title}</Text>
              <Text className="text-sm text-lighter">
                {useCase.description}
              </Text>
            </button>
          ))}
        </div>
        <DotPattern
          width={10}
          height={10}
          cx={1}
          cy={1}
          cr={1.2}
          className={cn(
            '[mask-image:linear-gradient(white,transparent,transparent)] z-0'
          )}
        />
      </div>
    </div>
  );
}
