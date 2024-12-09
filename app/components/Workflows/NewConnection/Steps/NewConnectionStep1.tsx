import { useState } from 'react';
import { Text } from '@radix-ui/themes';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Badge } from '../../../ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/pro-solid-svg-icons';

interface NewConnectionStep1Props {
  onNext: () => void;
}

export default function NewConnectionStep1({
  onNext,
}: NewConnectionStep1Props) {
  const [selectedTab, setSelectedTab] = useState('database');
  const [selectedConnection, setSelectedConnection] = useState<string>();

  const tabs = [
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
      className="flex flex-row gap-4 shrink-0 w-full h-full overflow-hidden"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
      orientation="vertical">
      <TabsList className="bg-white border border-base rounded-md grow flex flex-col justify-between max-w-[250px]">
        <div>
          <div className="p-4 border-b border-base">
            <Text className="text-lg font-medium text-dark">
              Select a connection type
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
      </TabsList>

      <TabsContent
        value={selectedTab}
        className="flex flex-row bg-white border border-base rounded-md grow overflow-hidden">
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
              {/* Connection items will be mapped here */}
            </RadioGroup>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
