import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useOutletContext, useParams, Link } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faPencil, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function ConnectionDetailVersion1({
  version,
  thisWorkspaceConnection,
  thisConnection,
}: {
  version: string;
  thisWorkspaceConnection: ConnectionType;
  thisConnection: ConnectionServiceType;
}) {
  const metaInfo = [
    {
      label: 'Last Tested',
      value: format(thisWorkspaceConnection?.lastTestedAt, 'MMM d, yyyy'),
    },
    {
      label: 'Created',
      value: format(thisWorkspaceConnection?.createdAt, 'MMM d, yyyy'),
    },
    {
      label: 'Last Updated',
      value: format(thisWorkspaceConnection?.updatedAt, 'MMM d, yyyy'),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader
        title={
          thisWorkspaceConnection.name
            ? thisWorkspaceConnection.name
            : thisConnection.connectionServiceName
        }>
        <PageHeader.RightSlot>
          <div className="flex flex-row items-center gap-4">
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faGauge}
                className="mr-2 icon-lighter"
              />
              Test
            </Button>
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faPencil}
                className="mr-2 icon-lighter"
              />
              Edit
            </Button>
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-2 icon-lighter"
              />
              Delete
            </Button>
          </div>
        </PageHeader.RightSlot>
      </PageHeader>
      <main className="h-full overflow-y-auto *:mx-auto *:w-full *:max-w-[1400px]">
        <div className="flex flex-row gap-4 py-6 px-6  justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <div className="size-10 flex items-center justify-center border border-base rounded-md bg-white mr-2 shadow-sm">
              <img
                src={thisConnection.logo}
                alt={thisConnection.connectionServiceName}
                className="size-6"
              />
            </div>
            {thisWorkspaceConnection.name ? (
              <Text className="text-lg font-medium">
                {thisWorkspaceConnection.name}
              </Text>
            ) : (
              <Text className="text-lg font-medium">
                {thisConnection.connectionServiceName}
              </Text>
            )}
            <Badge>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="capitalize">
                {thisWorkspaceConnection.lastTestStatus}
              </Text>
            </Badge>
          </div>

          <div className="flex flex-row gap-6 py-4">
            {metaInfo.map((info) => (
              <div className="flex flex-col gap-2 text-xs leading-none">
                <Text className="font-medium">{info.label}</Text>
                <Text>{info.value}</Text>
              </div>
            ))}
          </div>
        </div>

        <Tabs>
          <TabsList>
            <TabsTrigger value="details">
              <Text>Details</Text>
            </TabsTrigger>

            <TabsTrigger value="settings">
              <Text>Settings</Text>
            </TabsTrigger>
            <TabsTrigger value="syncs">
              <Text>Syncs</Text>
            </TabsTrigger>
            <TabsTrigger value="datasets">
              <Text>Datasets</Text>
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Text>Projects</Text>
            </TabsTrigger>
          </TabsList>
          <div className="px-6 h-full">
            <TabsContent value="details">
              <div className="h-full w-full bg-slate-75 rounded-lg p-4 flex items-center justify-center">
                <Text>So much space for possibilities</Text>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
