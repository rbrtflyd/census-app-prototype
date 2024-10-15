import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Outlet } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';

export const loader = async () => {
  // Add any necessary data fetching logic here
  return json({
    // Return any data needed for the component
  });
};

export default function NewDataset() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col w-full h-full pb-5">
      <PageHeader title="Create New Dataset" />
      <div className="flex flex-col w-full h-[180px] bg-subtle border-b border-base px-6 *:max-w-[1200px] *:mx-auto *:w-full justify-center">
        <Text className="text-2xl font-medium">
          Get started with a new dataset
        </Text>
        <Text className="text-lg text-lighter">
          Select a warehouse, database, event stream, or business app to get
          started.
        </Text>
      </div>
      <div className="px-6">
        <Outlet />
      </div>
    </div>
  );
}
