import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '~/db/types';
import EmptyState from '~/components/Empty/EmptyState';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';

const benefits = [
  {
    title: 'AI Enhancements',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Computed Columns',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Enrichments',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Data Quality',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Dataset Relationships',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Lineage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function Datasets() {
  const navigate = useNavigate();
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <PageHeader
        title="Datasets"
        button={{
          label: 'New Dataset',
          onClick: () => navigate('/datasets/new/step1'),
        }}
      />
      <div className="flex flex-col m-6 bg-deep rounded-md p-20 w-full max-w-[1400px] mx-auto gap-9">
        <div className="flex flex-row gap-12 items-center justify-between">
          <div className="flex flex-col gap-2  items-start max-w-xl">
            <Text className="text-2xl font-medium">
              Manage, organize, and enhance business data with datasets.
            </Text>
            <Text className="text-lg text-lighter">
              Datasets are the simplest way to define your data from warehouses,
              business apps, or event streams. Deduplicate, enrich, and enhance
              it before syncing it to any of our 200+ applications.
            </Text>
            <div className="flex gap-2 mt-4">
              <Button>New Dataset</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
          <div className="bg-slate-100/50 grow h-[450px] rounded-lg"></div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div className="bg-white rounded-md shadow shadow-[#4640eb2c] p-6 flex flex-col gap-1.5">
              <Text className="text-lg font-medium leading-none">
                {benefit.title}
              </Text>
              <Text className="text-lighter">{benefit.description}</Text>
            </div>
          ))}
        </div>
      </div>
      {/* <EmptyState
        title="No datasets found"
        description="You don't have any datasets yet. Create a new dataset to get started."
        actionLabel="New Dataset"
        onAction={() => navigate('/datasets/new/step1')}
      /> */}
    </div>
  );
}
