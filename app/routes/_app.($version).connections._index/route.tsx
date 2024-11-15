import React from 'react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { ConnectionType, ConnectionServiceType } from '../../db/types';
import { useOutletContext, useNavigate } from '@remix-run/react';

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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader
        title="Connections"
        button={{ label: 'Add Connection' }}
      />
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col gap-2 w-full">
          {workspaceConnections.map((wc) => {
            const connectionDetails = formatWorkspaceConnection(wc);
            return (
              <button
                key={wc.id}
                className="w-full flex flex-row items-center justify-between px-6 py-4 border border-base rounded-md hover:bg-slate-50 *:leading-none"
                onClick={() => {
                  navigate(`/${version}/connections/${wc.id}`);
                }}>
                <div className="flex flex-row items-center gap-4">
                  {connectionDetails?.logo && (
                    <img
                      src={connectionDetails.logo}
                      alt={connectionDetails.connectionServiceName}
                      className="w-6 h-6"
                    />
                  )}
                  <div className="flex flex-col items-start">
                    <Text className="font-medium text-slate-500">
                      {wc.name}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Text className="text-sm text-slate-500">
                    {new Date(wc.createdAt).toLocaleDateString()}
                  </Text>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
