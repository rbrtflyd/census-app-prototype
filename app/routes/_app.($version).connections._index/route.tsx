import React from 'react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { ConnectionType, ConnectionServiceType } from '../../db/types';
import { useOutletContext, useNavigate } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumb } from '~/hooks/useBreadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import ConnectionListingVersion1 from './versions/ConnectionListingVersion1';
import { useOperator } from '~/contexts/OperatorContext';

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '~/components/ui/tooltip';

export default function Connections() {
  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const { selectedLayout } = useOperator();

  const navigate = useNavigate();

  const formatWorkspaceConnection = (workspaceConnection: ConnectionType) => {
    const connection = connections.find(
      (c) => c.id === workspaceConnection.connectionId
    );
    return connection;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {selectedLayout === 'default' && <ConnectionListingVersion1 />}
    </div>
  );
}
