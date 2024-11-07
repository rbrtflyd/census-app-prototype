import { useState, useMemo } from 'react';
import { useOutletContext } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Separator } from '~/components/ui/separator';
import { ThumbsUpIcon } from 'lucide-react';
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
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-col px-6 bg-subtle *:w-full *:max-w-[1400px] *:mx-auto pb-12">
        <div className="flex flex-row gap-4 py-12 items-center justify-between w-full">
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
                    key={useCase.action}
                    onClick={() => setSelectedUseCase(useCase.action)}
                    className={`px-3 py-1 rounded border border-transparent text-left h-[40px] w-[220px] group transition-all duration-75 ${
                      selectedUseCase === useCase.action
                        ? 'bg-white border-base shadow text-dark'
                        : 'text-lighter hover:bg-deep hover:text-dark'
                    }`}>
                    <FontAwesomeIcon
                      icon={useCase.icon}
                      className={` mr-2  ${
                        selectedUseCase === useCase.action
                          ? 'text-plum-500'
                          : 'icon-lighter group-hover:icon-light'
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
      <div className="flex flex-col px-6 py-8 grow *:w-full *:max-w-[1400px] *:mx-auto gap-6">
        <div className="rounded-md border border-base p-6 flex flex-col gap-4 bg-white min-w-1/3  w-full ">
          <div className="flex flex-row justify-between items-center *:leading-none">
            <Text className=" font-medium ">Issues</Text>
            <Text className="text-light">{issues.length} issues</Text>
          </div>
          <div className="flex flex-col rounded overflow-hidden border border-base">
            {sortedIssues.map((issue) => (
              <button
                key={issue.title}
                className="hover:bg-subtle text-left overflow-hidden flex flex-row items-center space-x-3 h-9 border-b border-base last-of-type:border-b-0 text-sm leading-none">
                <div
                  className={`h-full w-1 ${statusColor({
                    status: issue.status,
                    element: 'bg',
                  })}`}
                />
                <div className="flex flex-row space-x-4 w-full justify-between h-full items-center">
                  <Text className="font-medium">{issue.title}</Text>
                  <div className="flex flex-row items-center gap-4 w-[400px]">
                    <div className="flex flex-row items-center gap-1.5">
                      <FontAwesomeIcon
                        icon={statusIcon({ status: issue.status })}
                        className={`text-xxs ${statusColor({
                          status: issue.status,
                          element: 'text',
                        })}`}
                      />
                      <Text className="capitalize">{issue.status}</Text>
                    </div>
                    <Text className="text-light">
                      {issue.status_description}
                    </Text>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-base p-8 w-full flex flex-col gap-4">
          <Text className="leading-none text-lg font-medium ">Definition</Text>
          <div className="h-[300px] w-full bg-subtle rounded-md" />
        </div>
      </div>
    </div>
  );
}
