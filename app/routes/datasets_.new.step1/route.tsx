import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs-vertical';

const tabs = [
  {
    id: 'warehouses',
    label: 'Warehouses',
    content: 'Warehouses',
  },
  {
    id: 'databases',
    label: 'Databases',
    content: 'Databases',
  },
  {
    id: 'event_streams',
    label: 'Event Streams',
    content: 'Event Streams',
  },
  {
    id: 'business_apps',
    label: 'Business Apps',
    content: 'Business Apps',
  },
];

export const loader = async () => {
  // Add any necessary data fetching logic here
  return json({
    // Return any data needed for the component
  });
};

export default function NewDataset() {
  const data = useLoaderData<typeof loader>();

  return (
    <Tabs
      className="flex flex-row gap-4 -mt-10 max-w-[1200px] mx-auto w-full"
      defaultValue="warehouses"
      orientation="vertical">
      <TabsList className="bg-white border border-base rounded-md grow flex flex-col">
        <div className="p-4 border-b border-base">
          <Text className="text-lg font-medium text-dark">
            Select where your data is
          </Text>
        </div>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="bg-white border border-base rounded-md w-3/4 flex flex-col">
        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
