import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@radix-ui/themes';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '~/components/ui/collapsible';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({});
}

const StartSendingData = () => {
  return <div className="p-4 min-h-[200px]">Some content</div>;
};

const sections = [
  {
    id: 'start-sending-data',
    title: 'Start Sending Data',
    content: <StartSendingData />,
    color: 'bg-plum-500',
  },
  {
    id: 'tell-us-which-data-you-want-to-send',
    title: 'Tell us which data you want to send',
    color: 'bg-yellow-500',
  },
  {
    id: 'enhance-your-data-before-sending',
    title: 'Enhance your data before sending',
    color: 'bg-orange-500',
  },
  {
    id: 'tell-us-where-this-data-should-go',
    title: 'Tell us where this data should go',
    color: 'bg-green-500',
  },
];

export default function ActivatePage() {
  return (
    <div className="flex flex-col gap-4 *:w-full *:mx-auto *:max-w-[1300px] pt-9 px-8">
      <div className="flex flex-col gap-4  justify-center h-[350px]">
        <Text className="text-2xl font-medium w-[600px]">
          Getting started with Census is easy. We'll walk you through the steps
          here to help you activate important business data anywehre you need
          it.
        </Text>
        <div className="flex flex-row gap-2">
          <Button size="default">Start</Button>
          <Button
            size="default"
            variant="link">
            I know what I'm doing, skip
          </Button>
        </div>
      </div>
      {sections.map((section) => (
        <Collapsible
          className="w-full bg-white rounded-lg border border-base"
          key={section.id}>
          <CollapsibleTrigger asChild>
            <button className="w-full border-b border-base p-8 flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-stretch">
                <div className={`w-1 rounded-full ${section.color}`} />
                <Text className="text-xl font-medium leading-none">
                  {section.title}
                </Text>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} />
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
