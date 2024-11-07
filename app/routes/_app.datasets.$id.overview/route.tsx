import { useState, useMemo } from 'react';
import { useOutletContext } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const useCases = [
  {
    title: 'Add relationships to other datasets',
    action: 'Add relationship',
    button: 'Create a relationship',
  },
  {
    title: 'Deduplicate with entity resolution',
    action: 'Deduplicate',
    button: 'Deduplicate',
  },

  {
    title: 'Enhance with AI',
    description: 'Create a column to add new data',
    action: 'Enhance with AI',
    button: 'Create a GPT Column',
  },
  {
    title: 'Enrich with AI or Clearbit',
    description: 'Create a view to share your data',
    action: 'Enrich',
    button: 'Enrich',
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
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
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
          <Text className="text-2xl font-medium">{thisDataset.name}</Text>
          <div className="flex flex-row gap-6 justify-between items-center w-full">
            <div className="flex flex-col gap-5 items-start grow h-full">
              {isVisible && (
                <div className="flex flex-col *:flex *:flex-row gap-4 p-6 border border-base rounded-md w-full h-full">
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
                          {useCase.action}
                        </button>
                      ))}
                    </div>
                    {thisUseCase && (
                      <div className="flex flex-col gap-1 w-full items-start h-full">
                        <Text className="font-medium">
                          {thisUseCase?.title}
                        </Text>
                        <Text>{thisUseCase?.description}</Text>
                        <Button variant="secondary">
                          {thisUseCase?.button}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-md border border-base p-6 flex flex-col gap-4 bg-white min-w-1/3 max-w-[525px] w-full">
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
