import PageHeader from '../../components/Structural/Headers/PageHeader';
import { ConnectionType, ConnectionServiceType } from '../../db/types';
import { useOutletContext, useNavigate } from '@remix-run/react';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import { columns, DataTable } from './ConnectionListingTable';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { useEffect } from 'react';

export default function Connections() {
  const { clearBreadcrumbs } = useBreadcrumbs();
  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const navigate = useNavigate();

  const formatWorkspaceConnection = (workspaceConnection: ConnectionType) => {
    const connection = connections.find(
      (c) => c.id === workspaceConnection.connectionId
    );
    return connection;
  };

  useEffect(() => {
    clearBreadcrumbs();
  }, []);

  const combinedConnections = [...workspaceConnections].map((wc) => {
    const connectionDetails = formatWorkspaceConnection(wc);
    return {
      ...wc,
      logo: connectionDetails?.logo || '',
      connectionServiceName: connectionDetails?.connectionServiceName || '',
      connectionServiceType: connectionDetails?.connectionServiceType || '',
      category: connectionDetails?.connectionServiceCategory || '',
    };
  });

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader
        title="Connections"
        button={{
          label: 'New Connection',
          icon: faPlus,
          onClick: () => navigate(`/${version}/connections/new/step1`),
        }}
      />

      <DataTable
        count={combinedConnections.length}
        columns={columns}
        data={combinedConnections}
      />
    </div>
  );
}
