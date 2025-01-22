import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';
import {
  ConnectionServiceType,
  ConnectionType,
  DatasetType,
} from '../../db/types';
import React, { useEffect } from 'react';
import { cn } from '~/lib/utils';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
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
  faTableRows,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faArrowUpRight,
  faSearch,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons';
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { useBreadcrumbs } from '~/providers/breadcrumbContext';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '~/components/ui/badge';
import { EnrichEnhanceDrawer } from './EnrichEnhanceHub';

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

  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const thisDataset = datasets.find(
    (dataset: DatasetType) => dataset.id.toString() === id
  );

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'overview-v2';
  };

  const activeTab = getActiveTab(location.pathname);

  useBreadcrumbs([{ label: 'Datasets', href: `/${version}/datasets` }]);

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
          <PageHeader.TitleSlot>
            <Badge>
              <FontAwesomeIcon
                icon={faTableRows}
                className="mr-1.5 icon-lighter"
              />
              {thisDataset.rows.toLocaleString()} Rows
            </Badge>
          </PageHeader.TitleSlot>
          <PageHeader.RightSlot>
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:bg-deep text-sm px-3 py-2 rounded leading-none data-[state=open]:bg-deep flex items-center justify-between gap-2 group">
                  <div>
                    <FontAwesomeIcon
                      icon={faCoin}
                      className=" mr-1 text-emerald-500"
                    />
                    <Text>90/100 Credits</Text>
                  </div>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-xs icon-lighter group-data-[state=open]:rotate-180 transition-transform duration-75"
                  />
                </button>
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
                      <Text className="text-emerald-600">90</Text>
                      <Text className="text-light">/100</Text>
                    </div>
                    <Text className="font-medium">Credits Left</Text>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-light">
                    <Text className="leading-tight">
                      Credits are used for GPT columns. After using your
                      credits, you will need to provide your own API key for
                      OpenAI.
                    </Text>
                    <Link
                      to="#"
                      target="_blank"
                      className="flex items-center gap-1 group hover:text-plum-500 transition-colors duration-75">
                      <Text className="group-hover:underline transition-all duration-75">
                        View Credit Usage
                      </Text>
                      <FontAwesomeIcon
                        icon={faArrowUpRight}
                        className="text-xs icon-light group-hover:text-plum-500 transition-colors duration-75"
                      />
                    </Link>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="small"
                        variant="secondary">
                        <FontAwesomeIcon
                          icon={faKey}
                          className="icon-light text-xs mr-1"
                        />
                        <Text>Add Your API Key</Text>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </PopoverContent>
            </Popover>
            <EnrichEnhanceDrawer />
          </PageHeader.RightSlot>
        </PageHeader>
        <Tabs
          value={activeTab}
          className="w-full">
          <TabsList>
            {[
              'overview-v2',
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
                  {tab.split('-')[0].charAt(0).toUpperCase() +
                    tab.split('-')[0].slice(1)}
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
