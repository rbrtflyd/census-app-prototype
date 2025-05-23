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
  faUser,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faArrowUpRight,
  faChevronDown,
  faColumns,
  faInfoCircle,
  faRefresh,
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

import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { DataTable, PreviewColumns } from './PreviewTable';
import { mockData } from './PreviewTable';
import { columns } from './PreviewTable/preview-columns';
import { Separator } from '~/components/ui';
import { Editor } from '@monaco-editor/react';
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
  const [panels, setPanels] = useState({
    jobs: false,
    logs: false,
  });

  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const thisDataset = datasets.find(
    (dataset: DatasetType) => dataset.id.toString() === id
  );
  const thisConnection = connections.find(
    (connection: ConnectionServiceType) =>
      connection.connectionServiceName === thisDataset?.connectionServiceName
  );
  const thisWorkspaceConnection = workspaceConnections.find(
    (connection: ConnectionServiceType) =>
      connection.connectionServiceName === thisDataset?.connectionServiceName
  );

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
        <div className="flex flex-row gap-2 px-6 py-3 justify-between">
          <div className="flex flex-row">
            <Button
              variant="ghost"
              size="small"
              className={cn(showDefinition && 'bg-plum-500 text-white')}
              onClick={() => setShowDefinition(!showDefinition)}>
              <FontAwesomeIcon
                icon={faDatabase}
                className="text-xxs mr-1.5 icon-light leading-none"
              />
              Definition
            </Button>
            <Button
              variant="ghost"
              size="small">
              <div className="size-5 flex flex-row items-center justify-center rounded-md bg-pink-600 mr-1.5">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[9.5px]  icon-white leading-none"
                />
              </div>
              Person
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
                  className="text-xxs text-plum-500"
                />
              </div>
              Enrich
              <FontAwesomeIcon
                icon={faChevronDown}
                className="icon-light text-xxs ml-1 leading-none"
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
                className="text-xxs mr-1.5 icon-light leading-none"
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
                className="text-xxs mr-1.5 icon-light leading-none"
              />
              Columns
            </Button>
            <Button
              variant="ghost"
              size="small">
              <FontAwesomeIcon
                icon={faDiagramProject}
                className="text-xxs mr-1.5 icon-light leading-none"
              />
              Relationships
            </Button>
            <Separator
              orientation="vertical"
              className="mx-3"
            />
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="small">
                  Activation
                </Button>
              </DrawerTrigger>
              <DrawerContent direction="right">
                <DrawerHeader>
                  <DrawerTitle>Activation</DrawerTitle>
                </DrawerHeader>
                <Tabs>
                  <TabsList>
                    <TabsTrigger value="syncs">Syncs</TabsTrigger>
                    <TabsTrigger value="segments">Segments</TabsTrigger>
                  </TabsList>
                </Tabs>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-3 overflow-hidden">
        {showDefinition && (
          <div className="flex flex-col px-6 w-full">
            <div className="bg-white border border-base rounded-md h-[375px] overflow-hidden">
              <div className="px-4 py-4 border-b border-base leading-none flex flex-row items-center gap-2">
                <div className="flex flex-row items-center justify-center size-10 bg-white border border-base rounded-lg shadow-sm">
                  <img
                    className="size-4"
                    src="https://cdn.worldvectorlogo.com/logos/aws-redshift-logo.svg"
                  />
                </div>
                <Text className="text-sm">sample-redshift-connection</Text>
              </div>
              <div className="w-full h-full pt-4">
                <Editor
                  height="100%"
                  language="sql"
                  value={`SELECT 
  c.id,
  c.company_name,
  c.industry,
  c.annual_revenue,
  c.employee_count,
  c.created_at as customer_since,
  SUM(s.amount) as total_spend,
  COUNT(DISTINCT p.id) as products_used,
  DATEDIFF('day', c.last_login_at, CURRENT_DATE) as days_since_last_login
FROM customers c
LEFT JOIN subscriptions s ON s.customer_id = c.id
LEFT JOIN product_usage p ON p.customer_id = c.id
WHERE c.status = 'active'
  AND c.annual_revenue > 1000000
  AND c.employee_count > 50
  AND c.industry IN ('Technology', 'Financial Services')
GROUP BY 
  c.id,
  c.company_name, 
  c.industry,
  c.annual_revenue,
  c.employee_count,
  c.created_at,
  c.last_login_at
HAVING total_spend > 50000
  AND days_since_last_login < 30
ORDER BY total_spend DESC`}
                />
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
      {(panels.jobs || panels.logs) && (
        <div className="flex flex-row h-[400px] w-full border-t border-base bg-white">
          {panels.jobs && (
            <div
              className={cn(
                ' p-4 h-full',
                panels.logs ? 'w-1/2 border-r border-base' : 'w-full'
              )}>
              <div className="flex flex-row justify-between">
                <div>Jobs</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setPanels((prev) => ({ ...prev, jobs: false }))
                  }>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
          )}
          {panels.logs && (
            <div className={cn(' p-4', panels.jobs ? 'w-1/2' : 'w-full')}>
              <div className="flex flex-row justify-between">
                <div>History</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setPanels((prev) => ({ ...prev, logs: false }))
                  }>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-row px-8 py-3 border-t border-base justify-between">
        <div className="text-xs text-light flex flex-row gap-2 items-center leading-none">
          <div className="size-2.5 bg-emerald-500 rounded-full" />
          <div>Cached 1,528 Rows</div>
          <div className="text-lighter">4 hours ago</div>
          <Separator
            orientation="vertical"
            className="mx-2"
          />
          <Button
            variant="ghost"
            size="tiny">
            <FontAwesomeIcon
              icon={faRefresh}
              className="mr-1 text-xs"
            />
            Refresh Data
          </Button>
        </div>
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="tiny"
            className={cn(panels.jobs && 'bg-plum-500 text-white')}
            onClick={() =>
              setPanels((prev) => ({ ...prev, jobs: !prev.jobs }))
            }>
            Jobs
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            size="tiny"
            className={cn(panels.logs && 'bg-plum-500 text-white')}
            onClick={() =>
              setPanels((prev) => ({ ...prev, logs: !prev.logs }))
            }>
            History
          </Button>
        </div>
      </div>
    </div>
  );
}
