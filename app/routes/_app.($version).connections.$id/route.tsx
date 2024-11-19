import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useOutletContext, useParams, Link } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
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
        title={workspaceConnection.name}
        button={{ label: 'Test Connection' }}
      />

      <main className="flex-grow p-4 overflow-y-auto"></main>
    </div>
  );
}
