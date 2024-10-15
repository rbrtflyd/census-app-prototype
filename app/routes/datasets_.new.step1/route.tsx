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
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { RadioGroupIndicator } from '@radix-ui/react-radio-group';
import { initializeDatabase, getConnections } from '~/db/db';

export const clientLoader = async () => {
  await initializeDatabase();
  console.log('Database initialized');
  const connections = await getConnections();
  return { connections };
};

export default function NewDataset() {
  const { connections } = useLoaderData<typeof clientLoader>();
  const [selectedTab, setSelectedTab] = React.useState('everything');
  const [selectedConnection, setSelectedConnection] = React.useState<
    string | null
  >(null);

  const groupedConnections = React.useMemo(() => {
    return connections.reduce((acc, connection) => {
      const category = connection.connectionServiceCategory.toLowerCase();

      // Add to specific category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(connection);

      // Add to "everything" category
      if (!acc['everything']) {
        acc['everything'] = [];
      }
      acc['everything'].push(connection);

      return acc;
    }, {} as Record<string, typeof connections>);
  }, [connections]);

  const tabs = [
    {
      id: 'everything',
      label: 'Everything',
      content: {
        header: 'Everything',
        listId: null,
        description: 'Everything',
      },
    },
    {
      id: 'warehouse',
      label: 'Warehouses',
      content: {
        header: 'Warehouses',
        listId: 'warehouses',
        description: 'Warehouses',
      },
    },
    {
      id: 'database',
      label: 'Databases',
      content: {
        header: 'Databases',
        listId: 'databases',
        description: 'Databases',
      },
    },
    {
      id: 'event_stream',
      label: 'Event Streams',
      content: {
        header: 'Event Streams',
        listId: 'event_streams',
        description: 'Event Streams',
      },
    },
    {
      id: 'business_app',
      label: 'Business Apps',
      content: {
        header: 'Business Apps',
        listId: 'business_apps',
        description: 'Business Apps',
      },
    },
  ];

  return (
    <Tabs
      className="flex flex-row gap-4 max-w-[1200px] mx-auto w-full h-full overflow-hidden"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
      orientation="vertical">
      <TabsList className="bg-white border border-base rounded-md grow flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-base">
            <Text className="text-lg font-medium text-dark">
              Select where your data is
            </Text>
          </div>
          <div className="flex flex-col">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 items-stretch justify-stretch ">
          <Text className="text-sm font-medium text-dark">
            Or create a one-off SQL Query
          </Text>
          <Button variant="secondary">Create Query</Button>
        </div>
      </TabsList>

      <TabsContent
        value={selectedTab}
        className="flex flex-col bg-white border border-base rounded-md w-3/4 overflow-hidden">
        <div className="px-6 py-4 border-b border-base">
          <Text className="leading-none font-medium text-dark">
            {tabs.find((tab) => tab.id === selectedTab)?.content.header}
          </Text>
        </div>
        <div className="flex flex-row w-full *:p-6 overflow-hidden">
          <RadioGroup className="h-full overflow-y-auto grow">
            {groupedConnections[selectedTab] &&
              groupedConnections[selectedTab].map((connection: any) => (
                <RadioGroupItem
                  key={connection.id}
                  value={connection.id.toString()}
                  id={`option-${connection.id}`}
                  className="px-3 py-2 rounded-md border data-[state=checked]:border-plum-200 data-[state=unchecked]:border-base data-[state=checked]:bg-plum-100 data-[state=unchecked]:bg-white data-[state=checked]:text-plum-500 data-[state=unchecked]:text-dark">
                  <Text className="ml-2">
                    {connection.connectionServiceName}
                  </Text>
                </RadioGroupItem>
              ))}
          </RadioGroup>
          {selectedConnection && (
            <ConnectionDetails
              connection={groupedConnections[selectedTab].find(
                (c: any) => c.id.toString() === selectedConnection
              )}
            />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  interface ConnectionDetailsProps {
    connection: any;
  }

  function ConnectionDetails({ connection }: ConnectionDetailsProps) {
    if (!connection) return null;

    return (
      <div className="space-y-4 p-6 border-l border-base">
        <Text className="font-medium">Connection Details</Text>
        <div>
          <Text className="font-medium">Name:</Text>
          <Text>{connection.connectionServiceName}</Text>
        </div>
        <div>
          <Text
            as="p"
            className="font-medium">
            Category:
          </Text>
          <Text>{connection.connectionServiceCategory}</Text>
        </div>
        {/* Add more connection details as needed */}
      </div>
    );
  }
}
