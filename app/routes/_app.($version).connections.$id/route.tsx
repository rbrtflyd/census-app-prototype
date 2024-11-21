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

export default function ConnectionDetail() {
  const { id } = useParams();
  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const thisWorkspaceConnection = workspaceConnections.find(
    (wc) => wc.id === parseInt(id!, 10)
  );

  const thisConnection = connections.find(
    (c) => c.id === thisWorkspaceConnection?.connectionId
  );

  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbContext();

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

  useEffect(() => {
    // Clear any existing breadcrumbs
    clearBreadcrumbs();

    // Add the connections list breadcrumb
    addBreadcrumb({
      label: 'Connections',
      href: `/${version}/connections`,
    });
  }, [version, thisWorkspaceConnection, addBreadcrumb, clearBreadcrumbs]);

  if (!thisWorkspaceConnection || !thisConnection) {
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
          thisWorkspaceConnection.name
            ? thisWorkspaceConnection.name
            : thisConnection.connectionServiceName
        }
      />

      <main className="h-full px-6 overflow-y-auto *:mx-auto *:w-full *:max-w-[1400px]">
        <div className="flex flex-row gap-4 py-6 border-b border-slate-50 justify-between">
          <div className="flex flex-row items-center gap-4">
            <img
              src={thisConnection.logo}
              alt={thisConnection.connectionServiceName}
              className="w-6 h-6"
            />
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
        <div className="h-full w-full bg-slate-75 rounded-lg p-4 flex items-center justify-center">
          <Text>So much space for possibilities</Text>
        </div>
      </main>
    </div>
  );
}
