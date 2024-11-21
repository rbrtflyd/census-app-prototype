import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useOutletContext, useParams, Link } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
import { format } from 'date-fns';

export default function ConnectionDetail() {
  const { id } = useParams();
  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const workspaceConnection = workspaceConnections.find(
    (wc) => wc.id === parseInt(id!, 10)
  );

  const connectionDetails = connections.find(
    (c) => c.id === workspaceConnection?.connectionId
  );

  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbContext();

  const metaInfo = [
    {
      label: 'Last Tested',
      value: format(workspaceConnection?.lastTestedAt, 'MMM d, yyyy'),
    },
    {
      label: 'Created',
      value: format(workspaceConnection?.createdAt, 'MMM d, yyyy'),
    },
    {
      label: 'Last Updated',
      value: format(workspaceConnection?.updatedAt, 'MMM d, yyyy'),
    },
  ];

  useEffect(() => {
    // Clear any existing breadcrumbs
    clearBreadcrumbs();

    // Add the connections list breadcrumb
    addBreadcrumb({
      label: 'Connections',
      href: `/${version}/connections`,
    });
  }, [version, workspaceConnection, addBreadcrumb, clearBreadcrumbs]);

  if (!workspaceConnection || !connectionDetails) {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <PageHeader title="Connection Not Found" />
        <main className="flex-grow p-4">
          <Text>The requested connection could not be found.</Text>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader
        title={
          workspaceConnection.name
            ? workspaceConnection.name
            : connectionDetails.connectionServiceName
        }
        button={{ label: 'Test Connection' }}
      />

      <main className="flex-grow px-6 overflow-y-auto *:mx-auto *:w-full *:max-w-[1400px]">
        <div className="flex flex-row gap-4 py-6 border-b border-slate-50">
          <img
            src={connectionDetails.logo}
            alt={connectionDetails.name}
            className="w-6 h-6"
          />
          {workspaceConnection.name ? (
            <Text className="text-lg font-medium">
              {workspaceConnection.name}
            </Text>
          ) : (
            <Text className="text-lg font-medium">
              {connectionDetails.connectionServiceName}
            </Text>
          )}
          <Badge>{workspaceConnection.lastTestStatus}</Badge>
        </div>
        <div className="flex flex-row gap-6 py-4">
          {metaInfo.map((info) => (
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <Text className="font-medium">{info.label}</Text>
              </div>
              <Text>{info.value}</Text>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
