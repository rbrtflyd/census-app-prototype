import { useState, useMemo } from 'react';
import { useOutletContext } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Separator } from '~/components/ui/separator';
import { ThumbsUpIcon } from 'lucide-react';
import { DotPattern } from '~/components/ui/dot-pattern';
import { cn } from '~/lib/utils';
const CreateRelationship = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[150px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Deduplicate = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[150px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Enhance = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[150px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Enrich = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start  w-full h-[150px]">
      <div className="grow w-full bg-deep rounded-md" />
      <div className="flex flex-row gap-2">
        <Button variant="secondary">Enrich with Clearbit</Button>
        <Button variant="secondary">Enrich with Apollo</Button>
      </div>
    </div>
  );
};

const useCases = [
  {
    title: 'Add relationships to other datasets',
    description: 'Create a relationship to another dataset',
    action: 'Add relationship',
    button: 'Create a relationship',
    children: <CreateRelationship button="Create a relationship" />,
  },
  {
    title: 'Deduplicate with entity resolution',
    description: 'Use entity resolution to find duplicates',
    action: 'Deduplicate',
    button: 'Deduplicate',
    children: <Deduplicate button="Deduplicate" />,
  },

  {
    title: 'Enhance with AI',
    description: 'Create a column to add new data',
    action: 'Enhance with AI',
    button: 'Create a GPT Column',
    children: <Enhance button="Create a GPT Column" />,
  },
  {
    title: 'Enrich with AI or Clearbit',
    description: 'Create a view to share your data',
    action: 'Enrich',
    button: 'Enrich',
    children: <Enrich button="Enrich" />,
  },
];
const issues = [
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'high',
  },
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'medium',
  },
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'low',
  },
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'low',
  },
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'low',
  },
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'low',
  },
];

export default function DatasetIndex() {
  const thisDataset = useOutletContext<DatasetType>();
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(
    'Add relationship'
  );
  const [isVisible, setIsVisible] = useState(true);

  const thisUseCase = useMemo(() => {
    return selectedUseCase
      ? useCases.find((useCase) => useCase.action === selectedUseCase)
      : null;
  }, [selectedUseCase]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex  px-6 py-8 bg-subtle">
        <div className="flex flex-col gap-6 items-start w-full max-w-[1400px] mx-auto">
          <div className="flex flex-row gap-4 items-center justify-between w-full">
            <Text className="text-2xl font-medium">{thisDataset.name}</Text>
            <div className="flex flex-row space-x-2">
              <Button variant="secondary">Sync</Button>
              <Button variant="secondary">Edit</Button>
              <Separator orientation="vertical" />
              <Button variant="secondary">Delete</Button>
            </div>
          </div>
          <div className="flex flex-row gap-6 justify-between items-center w-full">
            {isVisible && (
              <div className="flex flex-col gap-5 items-start grow h-full shrink-0 w-2/3">
                <div className="flex flex-col *:flex *:flex-row gap-4 p-6 border border-base rounded-md w-full h-full relative">
                  <div className="items-center justify-between">
                    <Text className="font-medium leading-none text-lg">
                      Get the most out of your dataset
                    </Text>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsVisible(false)}>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-xs"
                      />
                    </Button>
                  </div>

                  <div className="gap-12">
                    <div className="flex flex-col items-stretch gap-2 flex-wrap shrink-0">
                      {useCases.map((useCase) => (
                        <button
                          onClick={() => setSelectedUseCase(useCase.action)}
                          className={`px-3 py-1 rounded border border-transparent text-left ${
                            selectedUseCase === useCase.action
                              ? 'bg-subtle border-plum-100 shadow-md'
                              : ''
                          }`}>
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="text-sm mr-2 icon-lighter"
                          />
                          <Text>{useCase.action}</Text>
                        </button>
                      ))}
                    </div>
                    <Separator orientation="vertical" />
                    {!thisUseCase && <ThumbsUpIcon />}
                    {thisUseCase && (
                      <div className="flex flex-col gap-1 w-full items-start h-full">
                        <div className="flex flex-col gap-2 *:leading-none">
                          <Text className="font-medium">
                            {thisUseCase?.title}
                          </Text>
                          <Text>{thisUseCase?.description}</Text>
                        </div>
                        {thisUseCase.children}
                      </div>
                    )}
                  </div>
                  <DotPattern
                    width={10}
                    height={10}
                    cx={1}
                    cy={1}
                    cr={1.2}
                    className={cn(
                      '[mask-image:linear-gradient(white,transparent,transparent)] z-0'
                    )}
                  />
                </div>
              </div>
            )}
            <div className="rounded-md border border-base p-6 flex flex-col gap-4 bg-white min-w-1/3  w-full h-full">
              <div className="flex flex-row justify-between items-center *:leading-none">
                <Text className=" font-medium ">Issues</Text>
                <Text className="text-light">{issues.length} issues</Text>
              </div>
              <div className="flex flex-col rounded overflow-hidden border border-base">
                {issues.map((issue) => (
                  <button
                    key={issue.title}
                    className="hover:bg-subtle text-left overflow-hidden flex flex-row items-center gap-2 h-9 border-b border-base last-of-type:border-b-0">
                    <div className="h-full w-1 bg-red-500" />
                    {issue.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 py-8 grow *:w-full *:max-w-[1400px] *:mx-auto gap-6">
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Definition</Text>
          <div className="h-[300px] w-full bg-subtle rounded-md" />
        </div>
      </div>
    </div>
  );
}
