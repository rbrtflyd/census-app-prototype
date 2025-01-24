import React from 'react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { ConnectionType, ConnectionServiceType } from '../../db/types';
import { useOutletContext, useNavigate } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import {
  ConnectionListingVersion1,
  ConnectionListingVersion2,
  ConnectionListingVersion3,
} from './versions';

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '~/components/ui/tooltip';
import { columns } from './versions/ConnectionListingVersion3/listing-columns';
import { DataTable } from './versions/ConnectionListingVersion3/listing-table';

export default function Connections() {
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

  const data = {
    version,
    combinedConnections,
    connections,
    workspaceConnections,
    navigate,
  };

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
