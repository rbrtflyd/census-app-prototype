import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import {
  useParams,
  Link,
  useLocation,
  useOutletContext,
} from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import React, { useMemo, useState } from 'react';
import { DatasetType } from '~/db/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/pro-regular-svg-icons';
import {
  faBringFront,
  faDiagramPrevious,
  faDiagramProject,
  faSparkles,
  faTriangleExclamation,
  faBan,
} from '@fortawesome/pro-solid-svg-icons';
import { DotPattern } from '~/components/ui/dot-pattern';
import { cn } from '~/lib/utils';

const CreateRelationship = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[225px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Deduplicate = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[225px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Enhance = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start w-full h-[225px]">
      <div className="grow w-full bg-deep rounded-md" />
      <Button variant="secondary">{button}</Button>
    </div>
  );
};

const Enrich = ({ button }: { button: string }) => {
  return (
    <div className="flex flex-col gap-4 items-start  w-full h-[225px]">
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
    icon: faDiagramProject,
  },
  {
    title: 'Deduplicate with entity resolution',
    description: 'Use entity resolution to find duplicates',
    action: 'Deduplicate',
    button: 'Deduplicate',
    children: <Deduplicate button="Deduplicate" />,
    icon: faBringFront,
  },

  {
    title: 'Enhance with AI',
    description: 'Create a column to add new data',
    action: 'Enhance with AI',
    button: 'Create a GPT Column',
    children: <Enhance button="Create a GPT Column" />,
    icon: faSparkles,
  },
  {
    title: 'Enrich with AI or Clearbit',
    description: 'Create a view to share your data',
    action: 'Enrich',
    button: 'Enrich',
    children: <Enrich button="Enrich" />,
    icon: faDiagramPrevious,
  },
];
const issues = [
  {
    title: 'Unique ID',
    status: 'invalid',
    status_description: 'Unique ID is not unique',
    action: 'Update Unique ID',
  },
  {
    title: 'Person Type',
    status: 'invalid',
    status_description: 'Column assigned to Unique ID could not be found',
    action: 'Update Type',
  },
  {
    title: 'Relationship',
    status: 'invalid',
    status_description: 'Related dataset could not be found',
    action: 'Update Relationship',
  },
  {
    title: 'Warehouse Connection',
    status: 'failing',
    status_description: 'Warehouse connection error',
    action: 'Update Connection',
  },
];

export default function DatasetOverview() {
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

  const sortedIssues = useMemo(() => {
    return [...issues].sort((a, b) => {
      if (a.status === 'failing' && b.status !== 'failing') return -1;
      if (b.status === 'failing' && a.status !== 'failing') return 1;
      return 0;
    });
  }, []);

  const statusColor = ({
    status,
    element,
  }: {
    status: string;
    element: string;
  }) => {
    if (status === 'invalid') return ` ${element}-orange-500`;
    if (status === 'failing') return `${element}-red-500`;
    if (status === 'valid') return ` ${element}-green-500`;
    return ` ${element}-gray-500`;
  };

  const statusIcon = ({ status }: { status: string }) => {
    if (status === 'invalid') return faTriangleExclamation;
    if (status === 'failing') return faBan;
    return faCircle;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
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

          {isVisible && (
            <div className="flex flex-col *:flex *:flex-row gap-4 p-6 border border-base rounded-md w-full h-full bg-sublte shadow overflow-hidden relative">
              <div className="items-center justify-between z-10">
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

              <div className="gap-12 z-10 py-3">
                <div className="flex flex-col items-stretch justify-stretch gap-2 flex-wrap shrink-0">
                  {useCases.map((useCase) => (
                    <button
                      onClick={() => setSelectedUseCase(useCase.action)}
                      className={`px-3 py-1 rounded border border-transparent text-left h-[40px] w-[220px] ${
                        selectedUseCase === useCase.action
                          ? 'bg-white border-base shadow'
                          : ''
                      }`}>
                      <FontAwesomeIcon
                        icon={useCase.icon}
                        className={` mr-2  ${
                          selectedUseCase === useCase.action
                            ? 'text-plum-500'
                            : 'icon-light'
                        }`}
                      />
                      <Text>{useCase.action}</Text>
                    </button>
                  ))}
                </div>
                {thisUseCase && (
                  <div className="flex flex-col gap-4 w-full items-start h-full">
                    <div className="flex flex-col gap-2 *:leading-none">
                      <Text className="font-medium text-lg">
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
          )}
        </div>
      </div>
    </div>
  );
}
