import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { initializeDatabase, getSyncs } from '../../db/db';
import { SyncType } from '../../db/types';
import { useNavigate } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';

const benefits = [
  {
    title: 'No Code',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: '200+ Applications',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Data Transformations',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'First-Class Alerting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Dataset Relationships',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Secure, Fast, Reliable',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export const clientLoader = async () => {
  await initializeDatabase();
  const syncs = await getSyncs();
  return syncs;
};

interface LoaderData {
  syncs: any; // Replace 'any' with the actual type of datasets
}

export default function Index() {
  const syncs = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col bg-deep rounded-md p-12 w-full gap-9">
        <div className="flex flex-row gap-12 items-center justify-between">
          <div className="flex flex-col gap-2  items-start max-w-xl">
            <Text className="text-2xl font-medium">
              Activate data to over 200+ applications. No code required..
            </Text>
            <Text className="text-lg text-lighter">
              Syncs are the simplest way to activate data to over 200+
              applications. No code required.
            </Text>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => navigate('/syncs/new')}>New Sync</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
          <div className="bg-slate-100/50 grow h-[350px] rounded-lg"></div>
        </div>
        <div className="flex flex-row gap-2 p-5 rounded-md bg-plum-100/50 border-plum-500/20 border items-center justify-between">
          <Text className="text-lg font-medium">
            Syncs are better with datasets.
          </Text>
          <Button
            variant="secondary"
            onClick={() => navigate('/datasets/new/step1')}>
            Create a New Dataset
          </Button>
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
    </div>
  );
}
