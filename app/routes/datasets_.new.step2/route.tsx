import React, { useEffect } from 'react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

import { Button } from '~/components/ui/button';
import {
  initializeDatabase,
  getConnections,
  getWorkspaceConnections,
} from '~/db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from '@monaco-editor/react';
import { useNewDatasetContext } from '../../contexts/NewDatasetContext';

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
  const { setCurrentStep } = useNewDatasetContext();
  const [selectedTab, setSelectedTab] = React.useState('sql_query');
  const [selectedConnection, setSelectedConnection] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    setCurrentStep('step2');
  }, [setCurrentStep]);
  const code = 'SELECT * FROM USERS';
  const pythonCode = 'print("Hello, World!")';

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
        <div className="flex flex-col grow">
          <div className="px-6 py-4 border-b border-base">
            <Text className="leading-none font-medium text-dark">
              {tabs.find((tab) => tab.id === selectedTab)?.content.header}
            </Text>
          </div>
          <div className="flex flex-row w-full overflow-hidden h-full p-2">
            {selectedTab !== 'table' ? <QueryEditor /> : <TableSelector />}
          </div>
        </div>
        <Collapsible className="min-h-[200px] flex flex-col bg-subtle">
          <CollapsibleTrigger className="flex flex-row items-center px-6 py-4">
            Preview Results
          </CollapsibleTrigger>
          <CollapsibleContent className="h-full flex flex-col items-center justify-center bg-subtle">
            The results of your query will appear here.
          </CollapsibleContent>
        </Collapsible>
      </TabsContent>
    </Tabs>
  );

  function QueryEditor() {
    return (
      <Editor
        height="100%"
        language={selectedTab === 'sql_query' ? 'sql' : 'python'}
        value={selectedTab === 'sql_query' ? code : pythonCode}
      />
    );
  }

  function TableSelector() {
    return <div>Table Selector</div>;
  }
}
