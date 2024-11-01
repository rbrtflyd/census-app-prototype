import React, { type ReactNode } from 'react';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@radix-ui/themes';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../../components/ui/collapsible';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

const StartSendingData = () => {
  return (
    <div className="p-4 h-full bg-slate-300">
      <Text className="text-lg font-medium w-[600px]">
        Getting started with Census is easy. We'll walk you through the steps
        here to help you activate important business data anywhere you need it.
      </Text>
    </div>
  );
};
const DataSelection = () => {
  return (
    <div className="p-4 min-h-[200px]">
      I am the best data you've ever chosen. Just the best.
    </div>
  );
};
const DataEnhancement = () => {
  return (
    <div className="p-4 min-h-[200px]">Enahnce this data to be over 9000</div>
  );
};
const SyncMapping = () => {
  return (
    <div className="p-4 min-h-[200px]">Sync this data to a destination</div>
  );
};

type SectionStatus = 'not-started' | 'in-progress' | 'completed';

const sections = [
  {
    id: 'start-sending-data',
    title: 'Start Sending Data',
    content: <StartSendingData />,
    color: 'bg-plum-500',
    status: 'completed',
  },
  {
    id: 'tell-us-which-data-you-want-to-send',
    title: 'Tell us which data you want to send',
    content: <DataSelection />,
    color: 'bg-yellow-500',
    status: 'not-started',
  },
  {
    id: 'enhance-your-data-before-sending',
    title: 'Enhance your data before sending',
    content: <DataEnhancement />,
    color: 'bg-orange-500',
    status: 'not-started',
  },
  {
    id: 'tell-us-where-this-data-should-go',
    title: 'Tell us where this data should go',
    content: <SyncMapping />,
    color: 'bg-green-500',
    status: 'not-started',
  },
];

export default function ActivatePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col *:w-full *:mx-auto *:max-w-[1300px] pt-9 px-8 h-full overflow-hidden justify-start gap-y-6">
      {sections.map((section) => (
        <Collapsible
          className={`w-full overflow-hidden shrink-0 border border-base ${
            activeSection === section.id ? 'grow' : ''
          } ${section.status === 'completed' ? 'h-[50px]' : ''}`}
          key={section.id}
          open={activeSection === section.id}
          onOpenChange={(isOpen) =>
            setActiveSection(isOpen ? section.id : null)
          }>
          <CollapsibleTrigger asChild>
            <button className="w-full  p-5 flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-stretch">
                <div className={`w-1 rounded-full ${section.color}`} />
                <Text className="text-xl font-medium leading-none">
                  {section.title}
                </Text>
                <div>
                  {section.status === 'completed' && (
                    <Text>This appears when the section is completed</Text>
                  )}
                </div>
              </div>

              <div>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className={`transition-transform duration-75 icon-light ${
                    activeSection === section.id ? '-rotate-90' : ''
                  }`}
                />
              </div>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <>{section.content}</>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
