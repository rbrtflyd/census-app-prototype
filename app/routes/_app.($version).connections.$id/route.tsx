import { Text } from '@radix-ui/themes';
import { useOutletContext, useParams } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';

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
      <div className="flex flex-row items-center border-b border-base *:flex *:flex-row *:items-center *:gap-4 px-6 py-4 justify-between">
        <div>
          <img
            src={connectionDetails.logo}
            alt={connectionDetails.connectionServiceName}
            className="w-8 h-8"
          />
          <Text className="font-medium">{connectionDetails.name}</Text>
        </div>
        <div>
          <Button variant="secondary">Test Connection</Button>
        </div>
      </div>
      <main className="flex-grow p-4 overflow-y-auto"></main>
    </div>
  );
}
