import { useNavigate, useOutletContext } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../../../components/Structural/Headers/PageHeader';
import { Badge } from '~/components/ui/badge';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '~/components/ui/tooltip';
import { ConnectionServiceType, ConnectionType } from '~/db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';

export default function ConnectionListingVersion3({
  version,
  workspaceConnections,
  connections,
  formatWorkspaceConnection,
}: {
  version: string;
  workspaceConnections: ConnectionType[];
  connections: ConnectionServiceType[];
  formatWorkspaceConnection: (
    workspaceConnection: ConnectionType
  ) => ConnectionServiceType | undefined;
}) {
  const navigate = useNavigate();

  const data = workspaceConnections;
  return (
    <>
      <PageHeader
        title="Connections"
        button={{
          label: 'New Connection',
          icon: faPlus,
          onClick: () => navigate(`/${version}/connections/new`),
        }}
      />

      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
}
