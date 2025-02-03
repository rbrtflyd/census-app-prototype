import { json, LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, Link, useLocation } from '@remix-run/react';

import {
  ConnectionServiceType,
  ConnectionType,
  DatasetType,
} from '../../db/types';
import React, { useEffect, useMemo } from 'react';
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
          </PageHeader.RightSlot>
        </PageHeader>
        <div className="flex flex-row gap-2 px-6 py-4 bg-subtle border-b border-base">
          <div className="flex flex-row gap-2">
            {/* <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Deduplicate</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Name</MenubarItem>
                  <MenubarItem>Description</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Source</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Columns</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Join</MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Add Column</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Formula</MenubarItem>
                  <MenubarItem>Rollup</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>AI</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Chat GPT</MenubarItem>
                      <MenubarItem>Claude</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>Enrichment</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Clearbit</MenubarItem>
                      <MenubarItem>Apollo</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>HTTP</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar> */}
            <Button
              variant="secondary"
              size="small">
              Deduplicate
            </Button>
            <Button
              variant="secondary"
              size="small">
              Edit
            </Button>
            <Button
              variant="secondary"
              size="small">
              Join
            </Button>
            <Button
              variant="secondary"
              size="small">
              Add Column
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full bg-subtle">
        <div className="flex flex-col px-6 w-full py-2">
          <div className="bg-white border border-base rounded-md p-8 h-[325px]">
            Source
          </div>
        </div>
        <div className="flex flex-col w-full bg-white overflow-hidden h-full">
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
