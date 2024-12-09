import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import {
  useOutletContext,
  useParams,
  Link,
  useNavigate,
} from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faPencil, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { useOperator } from '~/contexts/OperatorContext';
import { ConnectionDetailVersion1 } from './versions';

export default function ConnectionDetail() {
  const { id } = useParams();
  const { version, workspaceConnections, connections } = useOutletContext() as {
    version: string;
    workspaceConnections: ConnectionType[];
    connections: ConnectionServiceType[];
  };

  const navigate = useNavigate();
  const layout = useOperator();

  const sourceTestSteps = [
    {
      step: '1',
      description: 'Test Network Connectivity',
      result: 'success',
    },
    {
      step: '2',
      description: 'Test warehouse credentials',
      result: 'success',
    },
    {
      step: '3',
      description: 'Load tables',
      result: 'Success',
    },
    {
      step: '4',
      description: 'Verify census schema',
      result: 'Success',
    },
    {
      step: '5',
      description: 'Run test sync',
      result: 'Success',
    },
  ];

  const destinationTestSteps = [
    {
      step: '1',
      description: 'Test Service Connectivity',
      result: 'success',
    },
    {
      step: '2',
      description: 'Load Service Objects',
      result: 'success',
    },
  ];

  const thisWorkspaceConnection = workspaceConnections.find(
    (wc) => wc.id === parseInt(id!, 10)
  );

  const thisConnection = connections.find(
    (c) => c.id === thisWorkspaceConnection?.connectionId
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
  }, [version, thisWorkspaceConnection, addBreadcrumb, clearBreadcrumbs]);

  const testSteps = thisWorkspaceConnection?.mode.includes('source')
    ? sourceTestSteps
    : destinationTestSteps;

  const data = {
    version,
    thisWorkspaceConnection,
    thisConnection,
    testSteps,
  };

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
    <>
      <ConnectionDetailVersion1 {...data} />
    </>
  );
}
