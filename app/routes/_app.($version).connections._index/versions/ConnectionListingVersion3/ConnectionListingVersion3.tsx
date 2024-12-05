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
  combinedConnections,
}: {
  version: string;
  combinedConnections: any;
}) {
  const navigate = useNavigate();

  const data = combinedConnections;

  return (
    <>
      <PageHeader
        title="Connections"
        button={{
          label: 'New Connection',
          icon: faPlus,
          onClick: () => navigate(`/${version}/connections/new/step1`),
        }}
      />
      <div className="px-8 py-5 border-b border-base text-sm leading-none">
        {combinedConnections.length} connections
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
}
