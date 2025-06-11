import type { MetaFunction } from '@remix-run/node';
import { Outlet, useNavigate, useOutletContext } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { ConnectionServiceType, ConnectionType, DatasetType } from '~/db/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const { datasets, connections, workspaceConnections } =
    useOutletContext() as {
      datasets: DatasetType[];
      connections: ConnectionServiceType[];
      workspaceConnections: ConnectionType[];
    };
  return (
    <div className="flex flex-col h-screen">
      <PageHeader
        title="All Syncs"
        button={{
          label: 'New Sync',
          onClick: () => navigate('/syncs/new'),
        }}
      />

      <Outlet context={{ datasets, connections, workspaceConnections }} />
    </div>
  );
}
