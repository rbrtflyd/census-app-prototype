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
    content: {
      header: 'Warehouses',
      description: 'Warehouses',
    },
  },
  {
    id: 'databases',
    label: 'Databases',
    content: {
      header: 'Databases',
      description: 'Databases',
    },
  },
  {
    id: 'event_streams',
    label: 'Event Streams',
    content: {
      header: 'Event Streams',
      description: 'Event Streams',
    },
  },
  {
    id: 'business_apps',
    label: 'Business Apps',
    content: {
      header: 'Business Apps',
      description: 'Business Apps',
    },
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
  const [selectedTab, setSelectedTab] = React.useState('warehouses');

  return (
    <Tabs
      className="flex flex-row gap-4 max-w-[1200px] mx-auto w-full h-full"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
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

      <TabsContent
        value={selectedTab}
        className="flex flex-col h-full bg-white border border-base rounded-md w-3/4">
        <div className="px-4 py-2 border-b border-base">
          <Text className="leading-none font-medium text-dark">
            {tabs.find((tab) => tab.id === selectedTab)?.content.header}
          </Text>
        </div>
        <div className="flex flex-row w-full h-full *:p-6">
          <div className="grow">List of things</div>
          <div className="w-1/3 border-l border-base">Selected thing</div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
