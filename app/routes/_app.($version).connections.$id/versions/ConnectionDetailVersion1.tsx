import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useOutletContext, useParams, Link } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '~/db/types';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faPencil, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function ConnectionDetailVersion1({
  version,
  thisWorkspaceConnection,
  thisConnection,
}: {
  version: string;
  thisWorkspaceConnection: ConnectionType;
  thisConnection: ConnectionServiceType;
}) {
  const metaInfo = [
    {
      label: 'Last Tested',
      value: format(thisWorkspaceConnection?.lastTestedAt, 'MMM d, yyyy'),
    },
    {
      label: 'Created',
      value: format(thisWorkspaceConnection?.createdAt, 'MMM d, yyyy'),
    },
    {
      label: 'Last Updated',
      value: format(thisWorkspaceConnection?.updatedAt, 'MMM d, yyyy'),
    },
    {
      label: 'Connected By',
      value: thisWorkspaceConnection?.connectedBy || 'john.doe@example.com',
    },
  ];

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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader
        title={
          thisWorkspaceConnection.name
            ? thisWorkspaceConnection.name
            : thisConnection.connectionServiceName
        }></PageHeader>
      <main className="h-full overflow-y-auto *:mx-auto *:w-full *:max-w-[1400px]">
        <div className="flex flex-row gap-4 py-6 px-6  justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="size-10 flex items-center justify-center border border-base rounded-md bg-white mr-2 shadow-sm">
                <img
                  src={thisConnection.logo}
                  alt={thisConnection.connectionServiceName}
                  className="size-6"
                />
              </div>
              <div className="flex flex-col leading-none gap-1">
                {thisWorkspaceConnection.name ? (
                  <Text className="text-lg font-medium">
                    {thisWorkspaceConnection.name}
                  </Text>
                ) : (
                  <Text className="text-lg font-medium">
                    {thisConnection.connectionServiceName}
                  </Text>
                )}
                <Text className="text-light text-sm">
                  destination:
                  <span className="lowercase">
                    {thisConnection.connectionServiceName}
                  </span>
                  -<span>{thisConnection.id}</span>
                </Text>
              </div>
            </div>
            <Badge>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="capitalize">
                {thisWorkspaceConnection.lastTestStatus}
              </Text>
            </Badge>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faGauge}
                className="mr-2 icon-lighter "
              />
              Test
            </Button>
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faPencil}
                className="mr-2 icon-lighter"
              />
              Edit
            </Button>
            <Button
              variant="secondary"
              size="small">
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-2 icon-lighter"
              />
              Delete
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">
              <Text>Details</Text>
            </TabsTrigger>
            <TabsTrigger value="syncs">
              <Text>Syncs</Text>
            </TabsTrigger>
            <TabsTrigger value="datasets">
              <Text>Datasets</Text>
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Text>Projects</Text>
            </TabsTrigger>
          </TabsList>
          <div className="px-6 h-full">
            <TabsContent value="details">
              <div className="flex flex-row h-full">
                <div className="flex flex-col grow pr-6">
                  <div className="flex flex-col gap-4 py-6 border-b border-base">
                    <div className="flex flex-row gap-12">
                      {metaInfo.map((info) => (
                        <div
                          className="flex flex-col gap-1 text-sm leading-none"
                          key={info.label}>
                          <Text className="text-light">{info.label}</Text>
                          <Text>{info.value}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 py-6 border-b border-base">
                    <Text className=" font-medium">Connection Mode</Text>
                    <div className="flex flex-row gap-2">
                      {thisWorkspaceConnection.mode.map((mode: string) => (
                        <Badge
                          key={mode}
                          className="capitalize ">
                          {mode}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 py-6 border-b border-base">
                    <Text className="font-medium">Credentials</Text>

                    {thisWorkspaceConnection.credentials ? (
                      <div className="flex flex-col gap-4 w-full">
                        {Object.entries(
                          thisWorkspaceConnection.credentials
                        ).map(([key, value]) => (
                          <div
                            className="flex flex-row gap-1 text-sm leading-none w-full"
                            key={key}>
                            {Object.entries(value as object).map(
                              ([credKey, credValue]) => (
                                <div
                                  key={credKey}
                                  className="flex flex-row">
                                  <Text className="text-light w-40 capitalize">
                                    {credKey
                                      .replace(/_/g, ' ')
                                      .replace(/url/gi, 'URL')
                                      .replace(/sftp/gi, 'SFTP')}
                                  </Text>
                                  <Text>{credValue}</Text>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Text className="text-light">
                        OAuth Connection No Credentials Present
                      </Text>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4 py-4 border border-base rounded-lg p-4 w-[300px]">
                  <Text className="font-medium">Test Connection</Text>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
