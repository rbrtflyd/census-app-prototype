import React from 'react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { ConnectionType, ConnectionServiceType } from '../../db/types';
import { useOutletContext, useNavigate } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumb } from '~/hooks/useBreadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

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
        button={{
          label: 'Add Connection',
          icon: faPlus,
        }}
      />
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col max-w-[1400px] mx-auto w-full">
          {workspaceConnections.map((wc) => {
            const connectionDetails = formatWorkspaceConnection(wc);
            return (
              <button
                key={wc.id}
                className="w-full  rounded-md hover:bg-slate-25 transition-colors duration-75 *:leading-none group"
                onClick={() => {
                  navigate(`/${version}/connections/${wc.id}`);
                }}>
                <div className="flex flex-row items-center justify-between px-6 py-6">
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
                        {wc.name
                          ? wc.name
                          : connectionDetails?.connectionServiceName}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <Text className="text-sm text-slate-500">
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger>
                            <Badge>
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                              <Text className="capitalize">
                                {wc.lastTestStatus}
                              </Text>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <Text className="capitalize">
                              Last tested on{' '}
                              {new Date(wc.createdAt).toLocaleDateString()}
                            </Text>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Text>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-50 group-hover:opacity-0" />
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
