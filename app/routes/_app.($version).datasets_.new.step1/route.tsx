import React, { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { ConnectionServiceType } from '../../db/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs-vertical';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

import {
  initializeDatabase,
  getConnections,
  getWorkspaceConnections,
} from '../../db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/pro-solid-svg-icons';
import { useNewDatasetContext } from '../../contexts/NewDatasetContext';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui';
import CSVUploadManager from '~/components/Workflows/Datasets/CSVUpload/CSVUploadManager';

export const clientLoader = async () => {
  await initializeDatabase();
  console.log('Database initialized');
  const connections = await getConnections();
  const workspaceConnections = await getWorkspaceConnections();
  return { connections, workspaceConnections };
};

export default function NewDataset() {
  const navigate = useNavigate();
  const { connections, workspaceConnections } =
    useLoaderData<typeof clientLoader>();
  const { setCurrentStep } = useNewDatasetContext();

  const [selectedTab, setSelectedTab] = React.useState('everything');
  const [selectedConnection, setSelectedConnection] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    setCurrentStep('step1');
  }, [setCurrentStep]);

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
      className="flex flex-row gap-4 w-full h-full overflow-hidden"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
      orientation="vertical">
      <TabsList className="bg-white border border-base rounded-md grow flex flex-col justify-between max-w-[250px]">
        <div>
          <div className="p-4 border-b border-base">
            <Text className="text-lg font-medium text-dark">
              Select a data source
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
          <div className="flex flex-col p-4 rounded-md border border-base gap-3">
            <Text className="text-sm font-medium text-lighter leading-none">
              Create from a CSV file
            </Text>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Upload a CSV</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload a CSV</DialogTitle>
                </DialogHeader>
                <CSVUploadManager />
                <DialogFooter>
                  <Button variant="secondary">Cancel</Button>
                  <Button>Create Dataset</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col p-4 rounded-md border border-base gap-3">
            <Text className="text-sm font-medium text-lighter leading-none">
              Create a one-off SQL Query
            </Text>
            <Button variant="secondary">Create Query</Button>
          </div>
        </div>
      </TabsList>

      <TabsContent
        value={selectedTab}
        className="flex flex-row bg-white border border-base rounded-md w-3/4 overflow-hidden">
        <div className="flex flex-col grow">
          <div className="px-6 py-4 border-b border-base">
            <Text className="leading-none font-medium text-lighter">
              Browse{' '}
              {tabs.find((tab) => tab.id === selectedTab)?.content.header}
            </Text>
          </div>
          <div className="flex flex-row w-full *:p-6 overflow-hidden h-full">
            <RadioGroup
              className="h-full overflow-auto grow flex flex-col space-y-2"
              onValueChange={setSelectedConnection}>
              {groupedConnections[selectedTab] &&
                groupedConnections[selectedTab].map((connection: any) => {
                  const hasExistingConnection = workspaceConnections.some(
                    (wc) => wc.connectionId === connection.id
                  );
                  return (
                    <RadioGroupItem
                      key={connection.id}
                      indicator={false}
                      value={connection.id.toString()}
                      id={`option-${connection.id}`}
                      className="px-3 py-2.5 rounded-md border data-[state=checked]:border-plum-200 data-[state=unchecked]:border-base data-[state=checked]:bg-plum-100 bg-white hover:bg-slate-25 transition-all duration-75 data-[state=checked]:text-plum-500 data-[state=unchecked]:text-dark justify-between hover:border-slate-100 hover:text-slate-900 ">
                      <div className="flex flex-row items-center">
                        {connection.logo && (
                          <img
                            src={connection.logo}
                            alt={connection.connectionServiceName}
                            className="size-7"
                          />
                        )}
                        <Text className="ml-4">
                          {connection.connectionServiceName}
                        </Text>
                      </div>
                      {hasExistingConnection && (
                        <Badge className="ml-2">
                          <FontAwesomeIcon
                            icon={faPlug}
                            className="mr-1 icon-light"
                          />
                          <Text className="text-light">Connected</Text>
                        </Badge>
                      )}
                    </RadioGroupItem>
                  );
                })}
            </RadioGroup>
          </div>
        </div>
        {selectedConnection && (
          <ConnectionDetails
            connection={groupedConnections[selectedTab].find(
              (c: any) => c.id.toString() === selectedConnection
            )}
          />
        )}
      </TabsContent>
    </Tabs>
  );

  function ConnectionDetails({ connection }: ConnectionServiceType) {
    if (!connection) return null;

    const matchingWorkspaceConnections = workspaceConnections.filter(
      (wc) => wc.connectionId === connection.id
    );

    return (
      <div className="space-y-8 p-6 border-l border-base w-2/5 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row gap-4 items-center">
            {connection.logo && (
              <img
                src={connection.logo}
                alt={connection.connectionServiceName}
                className="size-7"
              />
            )}
            <Text className="text-lg font-medium">
              {connection.connectionServiceName}
            </Text>
          </div>
          <Text className="text-light">{connection.description}</Text>
        </div>
        {matchingWorkspaceConnections.length > 0 && (
          <div className="flex flex-col gap-2">
            <Text className="font-medium">
              Existing {connection.connectionServiceName} Connections
            </Text>
            <div className="flex flex-col gap-2">
              {matchingWorkspaceConnections.map((wc) => (
                <div
                  key={wc.id}
                  className="flex flex-col gap-3 p-4 rounded border border-base">
                  <Text className="font-medium">{wc.name}</Text>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() =>
                      navigate('/datasets/new/step2', {
                        state: { connectionId: wc.id },
                      })
                    }>
                    Use Connection
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Text className="text-light">Connect New</Text>
        </div>
      </div>
    );
  }
}
