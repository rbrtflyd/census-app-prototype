import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { ConnectionServiceType } from '~/db/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs-vertical';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { RadioGroupIndicator } from '@radix-ui/react-radio-group';
import {
  initializeDatabase,
  getConnections,
  getWorkspaceConnections,
} from '~/db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/pro-solid-svg-icons';

export const clientLoader = async () => {
  await initializeDatabase();
  console.log('Database initialized');
  const connections = await getConnections();
  const workspaceConnections = await getWorkspaceConnections();
  return { connections, workspaceConnections };
};

export default function NewDataset() {
  const { connections, workspaceConnections } =
    useLoaderData<typeof clientLoader>();
  const [selectedTab, setSelectedTab] = React.useState('sql_query');
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
      id: 'sql_query',
      label: 'SQL Query',
      content: {
        header: 'SQL Query',
        listId: null,
        description: 'Everything',
      },
    },
    {
      id: 'python_query',
      label: 'Python Query',
      content: {
        header: 'Python Query',
        listId: 'python_query',
        description: 'Python Query',
      },
    },
    {
      id: 'table',
      label: 'Table',
      content: {
        header: 'Tables',
        listId: 'tables',
        description: 'Tables',
      },
    },
  ];

  return (
    <Tabs
      className="flex flex-row gap-4 w-full h-full overflow-hidden"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
      orientation="vertical">
      <div className="flex flex-col space-y-4 w-1/4">
        <TabsList className="bg-white border border-base rounded-md flex flex-col justify-between grow">
          <div>
            <div className="p-4 border-b border-base">
              <Text className="text-lg font-medium text-dark">Snowflake</Text>
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
          <div className="p-6 flex flex-col gap-2 items-start bg-deep">
            <Text className="text-sm font-medium text-dark">
              Connect a query repository like dbt, Looker, or Sigma to import
              and run queries in Census
            </Text>
            <Button
              variant="link"
              size="link">
              Connect an external query repository
            </Button>
          </div>
        </TabsList>
        <div className="flex flex-col p-4 bg-white border border-base rounded-md grow">
          More stuff
        </div>
      </div>

      <TabsContent
        value={selectedTab}
        className="flex flex-col bg-white border border-base rounded-md w-3/4 overflow-hidden grow">
        <div className="px-6 py-4 border-b border-base">
          <Text className="leading-none font-medium text-dark">
            {tabs.find((tab) => tab.id === selectedTab)?.content.header}
          </Text>
        </div>
        <div className="flex flex-row w-full *:p-6 overflow-hidden h-full"></div>
      </TabsContent>
    </Tabs>
  );

  function ConnectionDetails({ connection }: ConnectionServiceType) {
    if (!connection) return null;

    const matchingWorkspaceConnections = workspaceConnections.filter(
      (wc) => wc.connectionId === connection.id
    );

    return (
      <div className="space-y-8 p-6 border-l border-base w-1/3 flex flex-col">
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
                    size="small">
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
