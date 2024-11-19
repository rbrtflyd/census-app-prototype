import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import React from 'react';
import { cn } from '~/lib/utils';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import {
  faCaretDown,
  faCoin,
  faCoins,
  faDiagramNext,
  faFunction,
  faKey,
  faListTree,
  faPlus,
  faSparkle,
  faSparkles,
} from '@fortawesome/pro-solid-svg-icons';
import { faArrowUpRight, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { Text } from '@radix-ui/themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '~/components/ui/badge';

export const clientLoader = async ({
  params,
  request,
}: {
  params: any;
  request: any;
}) => {
  const datasets = await getDatasets();
  const id = params.id;

  return { datasets };
};

interface LoaderData {
  datasets: DatasetType[];
}

export default function DatasetIndex() {
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };
  const params = useParams();
  const id = params.id;
  const location = useLocation();

  const thisDataset = datasets.find(
    (dataset: DatasetType) => dataset.id.toString() === id
  );

  const { addBreadcrumb } = useBreadcrumb();

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'overview';
  };

  const activeTab = getActiveTab(location.pathname);

  if (!thisDataset) {
    return (
      <div>
        <PageHeader title="Dataset Not Found" />
        <p>The requested dataset could not be found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex flex-col">
        <PageHeader title={thisDataset.name}>
          <Popover>
            <PopoverTrigger className="group">
              <Badge className="group-hover:bg-deep">
                <FontAwesomeIcon
                  icon={faCoin}
                  className="text-xs mr-1 text-emerald-500"
                />
                <Text>90/100 Census Credits</Text>
              </Badge>
            </PopoverTrigger>
            <PopoverContent
              className="w-[300px]"
              align="end">
              <div className="flex flex-col gap-3 text-sm ">
                <div className="flex items-center gap-2 leading-none">
                  <FontAwesomeIcon
                    icon={faCoin}
                    className="text-xs text-emerald-500"
                  />
                  <div className="flex flex-row">
                    <Text className="text-emerald-500">90</Text>
                    <Text>/100</Text>
                  </div>
                  <Text className="font-medium">Census Credits Left</Text>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <Text className="leading-tight">
                    Census Credits are used for GPT columns. After using your
                    credits, you will need to provide your own API key for
                    OpenAI.
                  </Text>
                  <Link
                    to="https://platform.openai.com/docs/overview"
                    target="_blank"
                    className="flex items-center gap-1 group hover:text-plum-500 transition-colors duration-75">
                    <Text className="group-hover:underline transition-all duration-75">
                      Setup an OpenAI API Key
                    </Text>
                    <FontAwesomeIcon
                      icon={faArrowUpRight}
                      className="text-xs icon-light group-hover:text-plum-500 transition-colors duration-75"
                    />
                  </Link>
                </div>
                <Button
                  size="small"
                  variant="secondary">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="icon-light text-xs mr-1"
                  />
                  <Text>Add Your API Key</Text>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="small">
                <Text>Enrich & Enhance</Text>{' '}
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="text-xxs ml-2"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48"
              align="end">
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-[5px] icon-light"
                />
                <Text>Lookup</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faListTree}
                  className="text-[5px] icon-light"
                />
                <Text>Rollup</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FontAwesomeIcon
                  icon={faFunction}
                  className="text-[5px] icon-light"
                />
                <Text>Equation</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/chatgpt-6.svg"
                      className="h-4"
                    />
                    <Text>GPT</Text>
                  </div>
                  <Badge>
                    <FontAwesomeIcon
                      icon={faCoin}
                      className="text-xs mr-1 text-emerald-500"
                    />
                    <Text>8</Text>
                  </Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FontAwesomeIcon
                    icon={faDiagramNext}
                    className="text-[5px] icon-light"
                  />
                  <Text>Enrichment</Text>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  <DropdownMenuLabel>Enrichment Providers</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <img
                      src="/clearbit.svg"
                      className="w-4"
                    />
                    Clearbit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <img
                      src="https://logosandtypes.com/wp-content/uploads/2022/09/apollo-io.svg"
                      className="w-4"
                    />
                    Apollo
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </PageHeader>
        <Tabs
          value={activeTab}
          className="w-full">
          <TabsList>
            {[
              'overview',
              'preview',
              'relationships',
              'columns',
              'syncs',
              'segments',
              'activity',
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                asChild>
                <Link
                  to={tab}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium',
                    activeTab === tab
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700'
                  )}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Outlet context={thisDataset} />
    </div>
  );
}
