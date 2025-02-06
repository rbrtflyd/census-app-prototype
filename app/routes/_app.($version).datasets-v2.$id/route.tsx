import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';
import { ScrollArea } from '~/components/ui/scroll-area';

import {
  ConnectionServiceType,
  ConnectionType,
  DatasetType,
} from '../../db/types';
import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '~/lib/utils';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  faCaretDown,
  faCoin,
  faCoins,
  faDatabase,
  faDiagramLeanCanvas,
  faDiagramNext,
  faDiagramProject,
  faFunction,
  faKey,
  faListTree,
  faObjectIntersect,
  faPlus,
  faSparkle,
  faSparkles,
  faTableRows,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faArrowUpRight,
  faChevronDown,
  faColumns,
  faInfoCircle,
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
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '~/components/ui/menubar';

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

import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { DataTable, PreviewColumns } from './PreviewTable';
import { mockData } from './PreviewTable';
import { columns } from './PreviewTable/preview-columns';
import { Separator } from '~/components/ui';
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
  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbs();
  const params = useParams();
  const id = params.id;
  const location = useLocation();

  const [showDefinition, setShowDefinition] = useState(false);

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

  useEffect(() => {
    clearBreadcrumbs();
    addBreadcrumb({
      label: 'Datasets',
      href: `/${version}/datasets`,
    });
  }, [version]);

  if (!thisDataset) {
    return (
      <div>
        <PageHeader title="Dataset Not Found" />
        <p>The requested dataset could not be found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-col">
        <PageHeader title={thisDataset.name}>
          <PageHeader.TitleSlot>
            <Badge>
              <FontAwesomeIcon
                icon={faTableRows}
                className="mr-1.5 icon-light"
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
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="icon-light text-xs mr-1"
              />
              Details
            </Button>
          </PageHeader.RightSlot>
        </PageHeader>
        <div className="flex flex-row gap-2 px-6 py-4 justify-between">
          <div className="flex flex-row">
            <Button
              variant="ghost"
              size="small"
              className={cn(showDefinition && 'bg-plum-500 text-white')}
              onClick={() => setShowDefinition(!showDefinition)}>
              <FontAwesomeIcon
                icon={faDatabase}
                className="text-xxs mr-1.5 icon-light"
              />
              Definition
            </Button>
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-xxs mr-1.5 icon-light"
              />
              Assign Object
            </Button>
            <Separator
              orientation="vertical"
              className="mx-3"
            />
            <Button
              variant="ghost"
              size="small">
              <div className="size-5 rounded bg-[#DFDFFB] mr-1.5 flex items-center justify-center hover:bg-[#4450E7] transition-all duration-75">
                <FontAwesomeIcon
                  icon={faSparkles}
                  className="text-xxs bg-gradient-to-tr from-[#4450E7] to-[#807FF0] bg-clip-text text-transparent"
                />
              </div>
              Enrich
              <FontAwesomeIcon
                icon={faChevronDown}
                className="icon-light text-xxs ml-1"
              />
            </Button>
            <Separator
              orientation="vertical"
              className="mx-3"
            />
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faObjectIntersect}
                className="text-xxs mr-1.5 icon-light"
              />
              Deduplicate
            </Button>
          </div>
          <div className="flex flex-row">
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faColumns}
                className="text-xxs mr-1.5 icon-light"
              />
              Columns
            </Button>
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faDiagramProject}
                className="text-xxs mr-1.5 icon-light"
              />
              Relationships
            </Button>
            <Separator
              orientation="vertical"
              className="mx-3"
            />
            <Button
              variant="ghost"
              size="small">
              Syncs
            </Button>
            <Button
              variant="ghost"
              size="small">
              Segments
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-3 overflow-hidden">
        {showDefinition && (
          <div className="flex flex-col px-6 w-full">
            <div className="bg-white border border-base rounded-md h-[325px]">
              <div className="px-8 py-6 border-b border-base leading-none">
                Definition
              </div>
              <div className="px-8 py-6">
                <Text>
                  This dataset contains information about customers and their
                  orders.
                </Text>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full border-t border-base overflow-hidden h-full">
          <DataTable
            columns={columns}
            data={mockData}
            count={mockData.length}
          />
        </div>
      </div>
      <Outlet context={thisDataset} />
    </div>
  );
}
