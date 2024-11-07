import { useState } from 'react';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';

import { Button } from '../../components/ui/button';
import { DotPattern } from '../../components/ui/dot-pattern';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const issues = [
  {
    title: 'Issue 1',
    description: 'Description 1',
    severity: 'high',
  },
  {
    title: 'Issue 2',
    description: 'Description 1',
    severity: 'medium',
  },
  {
    title: 'Issue 3',
    description: 'Description 1',
    severity: 'low',
  },
  {
    title: 'Issue 4',
    description: 'Description 1',
    severity: 'low',
  },
  {
    title: 'Issue 5',
    description: 'Description 1',
    severity: 'low',
  },
];

const useCases = [
  {
    title: 'Deduplicate with entity resolution',
    description: 'Create a segment to filter your data',
    action: 'Deduplicate',
  },
  {
    title: 'Create a GPT Column',
    description: 'Create a column to add new data',
    action: 'New GPT Column',
  },
  {
    title: 'Enrich with Clearbit or Apollo',
    description: 'Create a view to share your data',
    action: 'Enrich',
  },
  {
    title: 'Create a segment',
    description: 'Create a segment to filter your data',
    action: 'New Segment',
  },
  {
    title: 'Create a sync',
    description: 'Create a sync to bring in new data',
    action: 'New Sync',
  },
  {
    title: 'Create a relationship',
    description: 'Create a relationship to another dataset',
    action: 'New Relationshiop',
  },
];

export default function DatasetIndex() {
  const thisDataset = useOutletContext<DatasetType>();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-row w-full h-full overflow-hidden items-start px-6 py-8 gap-6 justify-center">
      <div className="flex flex-col w-full max-w-[1400px] gap-6">
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Issues</Text>
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
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Definition</Text>
          <div className="h-[300px] w-full bg-subtle rounded-md" />
        </div>
      </div>
      {isVisible && (
        <div className="flex flex-col gap-6 w-1/3 max-w-[450px] min-w-[350px] bg-subtle rounded-lg p-9 relative overflow-hidden border border-base">
          <div className="flex flex-row justify-between items-center z-10">
            <Text className="text-lg font-medium text-dark z-10">
              Manage your dataset
            </Text>
            <Button
              variant="ghost"
              onClick={() => setIsVisible(false)}>
              <Text>Dismiss</Text>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-xs ml-2"
              />
            </Button>
          </div>

          <div className="flex flex-col gap-4 z-10">
            {useCases.map((useCase) => (
              <button
                key={useCase.title}
                className="flex flex-col gap-1 items-start text-left hover:scale-[1.02] transition-all duration-75 p-4 rounded-md bg-white shadow">
                <Text className="font-medium leading-tight">
                  {useCase.title}
                </Text>
                <Text className="text-sm text-lighter">
                  {useCase.description}
                </Text>
              </button>
            ))}
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
      )}
    </div>
  );
}
