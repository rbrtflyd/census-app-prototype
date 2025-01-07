import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { ConnectionServiceType, ConnectionType } from '../../db/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs-vertical';
import { Separator } from '../../components/ui/separator';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faLink, faPlug } from '@fortawesome/pro-solid-svg-icons';
import { useNewConnectionContext } from '~/contexts/NewConnectionContext';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';

export default function NewConnectionStep2() {
  const navigate = useNavigate();
  const { setCurrentStep, setIsScrollable, isScrollable } =
    useNewConnectionContext();
  setCurrentStep('step2');
  const { connections, workspaceConnections } = useOutletContext() as {
    connections: ConnectionServiceType[];
    workspaceConnections: ConnectionType[];
    setSelectedConnectionId: (id: string) => void;
    selectedConnectionId: string | null;
    isScrollable: boolean;
    setIsScrollable: (scrollable: boolean) => void;
  };

  const { selectedConnectionId, setSelectedConnectionId } =
    useNewConnectionContext();

  const [name, setName] = useState<string>('');
  const [mode, setMode] = useState<'source' | 'destination' | 'both' | null>(
    null
  );

  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set([]));

  const sampleCredentials = [
    {
      label: 'Username',
      value: 'admin',
      type: 'text',
      helpText: 'The username to use for the connection',
    },
    {
      label: 'Password',
      value: 'password',
      type: 'password',
      helpText: 'The password to use for the connection',
    },
    {
      label: 'Hostname',
      value: 'hostname',
      type: 'text',
      helpText: 'The hostname to use for the connection',
    },
    {
      label: 'Port',
      value: 'port',
      type: 'number',
      helpText: 'The port to use for the connection',
    },
    {
      label: 'Database',
      value: 'database',
      type: 'text',
      helpText: 'The database to use for the connection',
    },
    {
      label: 'Schema',
      value: 'schema',
      type: 'text',
      helpText: 'The schema to use for the connection',
    },
  ];
  const [credentials, setCredentials] = useState(sampleCredentials);

  const handleModeClick = (mode: string) => {
    setSelectedModes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mode)) {
        newSet.delete(mode);
      } else {
        newSet.add(mode);
      }
      return newSet;
    });
  };

  useEffect(() => {
    setIsScrollable(true); // Make this step scrollable
    return () => setIsScrollable(false); // Reset when unmounting
  }, [setIsScrollable]);

  const [readType, setReadType] = useState<'Basic' | 'Advanced' | undefined>(
    undefined
  );

  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(
    new Set()
  );
  const [showConnectLink, setShowConnectLink] = useState(false);

  const selectedConnection = connections.find(
    (c) => c.id.toString() === selectedConnectionId
  );

  const supportedModes = selectedConnection?.modes || [];

  const handleUseCaseClick = (useCase: string) => {
    setSelectedUseCases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(useCase)) {
        newSet.delete(useCase);
      } else {
        newSet.add(useCase);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-white border border-base rounded-lg max-w-[800px]  mx-auto w-full flex flex-col">
        <div className="flex flex-col gap-4 px-6 py-9">
          <div className="flex flex-col gap-2">
            <Text className="font-medium text-lg leading-none">Name</Text>
            <Text className="text-light">
              An optional name to differentiate this connection from other
              connections of the same service.
            </Text>
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter connection name"
          />
          <div className="flex flex-row gap-2 items-center">
            <Text className="leading-none text-sm">Resource ID</Text>
            <Text className="text-light text-sm leading-none">
              destination:
              <span className="lowercase">
                {name || selectedConnection?.connectionServiceName}
              </span>
              -<span>{selectedConnection?.id}</span>
            </Text>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 px-6 py-9">
          <div className="flex flex-col gap-2">
            <Text className="font-medium text-lg leading-none">
              Connection Mode
            </Text>
            <Text className="text-light">
              Some help text describing connection modes
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            {['source', 'destination', 'both']
              .filter((mode) => {
                if (!supportedModes.includes('both')) {
                  return supportedModes.includes(mode);
                }
                return true; // If 'both' is supported, show all modes
              })
              .map((mode) => (
                <div
                  key={mode}
                  className="flex flex-col gap-2 grow">
                  <div
                    onClick={() => handleModeClick(mode)}
                    className="flex flex-row gap-2 items-baseline  p-4 border border-base rounded-md hover:bg-slate-25 transition-all duration-75 hover:border-slate-100 hover:text-slate-900 cursor-pointer">
                    <Checkbox
                      id={mode}
                      checked={selectedModes.has(mode)}
                      onCheckedChange={() => handleModeClick(mode)}
                    />
                    <div className="flex flex-col gap-1">
                      <label htmlFor={mode}>
                        <Text className="text-lg font-medium leading-none">
                          {mode === 'source'
                            ? 'Use as Source'
                            : mode === 'destination'
                            ? 'Use as Destination'
                            : 'Use as Both'}
                        </Text>
                      </label>{' '}
                      {mode === 'source' && (
                        <Text className="text-light">
                          Some text describing what read from connection means.
                        </Text>
                      )}
                      {mode === 'destination' && (
                        <Text className=" text-light">
                          Some text describing what write to connection means.
                        </Text>
                      )}
                      {mode === 'both' && (
                        <Text className="text-light">
                          Some text describing what read and write to connection
                          means.
                        </Text>
                      )}
                    </div>
                  </div>
                  {/* Add radio group for read options */}
                  {mode === 'source' && selectedModes.has('source') && (
                    <div className="flex flex-col gap-2 p-4 bg-subtle border border-base rounded-md">
                      <Text className="font-medium">
                        Select how to read from this connection
                      </Text>
                      <RadioGroup
                        className="flex flex-col gap-2"
                        value={readType}
                        onValueChange={(value: 'Basic' | 'Advanced') =>
                          setReadType(value)
                        }>
                        {['Basic', 'Advanced'].map((type) => (
                          <RadioGroupItem
                            indicator={false}
                            className="flex flex-row items-center gap-2 px-4 py-2 border border-base rounded-md hover:bg-slate-25 transition-all duration-75 hover:border-slate-100 hover:text-slate-900 cursor-pointer data-[state=checked]:border-plum-200 data-[state=unchecked]:border-base data-[state=checked]:bg-plum-100 data-[state=unchecked]:bg-white data-[state=checked]:text-plum-500 data-[state=unchecked]:text-dark justify-between leading-none"
                            value={type}
                            id={type}>
                            <Text>{type}</Text>
                            {type === 'Basic' ? (
                              <Badge>Easier to Setup</Badge>
                            ) : (
                              <Badge>Better Performance</Badge>
                            )}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 px-6 py-9">
          <Text className="font-medium text-lg">Connection Configuration</Text>
          <div className="flex flex-row justify-between gap-8">
            <div className="flex flex-col gap-8 grow max-w-[350px]">
              {credentials.map((credential: any) => (
                <div
                  className="flex flex-col gap-2 grow"
                  key={credential.label}>
                  <Label size="md">{credential.label}</Label>
                  <Input
                    value={credential.value}
                    type={credential.type}
                  />
                  <Text className="text-light text-xs leading-none">
                    {credential.helpText}
                  </Text>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-[300px]">
              <div className="flex flex-col gap-4 sticky top-5">
                <div className="flex flex-col gap-2 p-6 bg-subtle border border-base rounded-md text-sm">
                  <Text className="font-medium">
                    Allow inbound traffic from Census IP Addresses
                  </Text>
                  <Text className="text-light">
                    If your warehouse is behind a firewall/private network,
                    please add the following static IP addresses:
                  </Text>
                  <div>
                    <button
                      className="flex flex-row gap-2 items-center hover:bg-slate-25 transition-all duration-75 rounded p-1 group"
                      onClick={() => {
                        navigator.clipboard.writeText(`34.216.163.241`);
                      }}>
                      34.216.163.241
                      <FontAwesomeIcon
                        icon={faClone}
                        className="size-3 icon-lighter group-hover:text-slate-600 transition-all duration-75"
                      />
                    </button>
                    <button
                      className="flex flex-row gap-2 items-center hover:bg-slate-25 transition-all duration-75 rounded p-1 group"
                      onClick={() => {
                        navigator.clipboard.writeText(`54.212.243.205`);
                      }}>
                      54.212.243.205
                      <FontAwesomeIcon
                        icon={faClone}
                        className="size-3 icon-lighter group-hover:text-slate-600 transition-all duration-75"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-6 bg-subtle border border-base rounded-md text-sm sticky top-5 items-start">
                  <Text className="font-medium">
                    Share a connect link with your team.
                  </Text>
                  <Text className="text-light">
                    If you don't know this information, you can share a connect
                    link with your team and have someone else set it up for you.
                  </Text>
                  {!showConnectLink ? (
                    <Button
                      variant="ghost"
                      onClick={() => setShowConnectLink(true)}>
                      <FontAwesomeIcon
                        icon={faLink}
                        className="size-4 mr-2"
                      />
                      <Text>Create connect link</Text>
                    </Button>
                  ) : (
                    <div className="flex flex-row items-center gap-2 w-full">
                      <Input
                        value={`https://app.getcensus.com/connect/${selectedConnection?.id}`}
                        readOnly
                        className="bg-deep text-light hover:ring-0 truncate"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://app.getcensus.com/connect/${selectedConnection?.id}`
                          );
                        }}>
                        <FontAwesomeIcon
                          icon={faClone}
                          className="size-4 icon-lighter"
                        />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 p-6">
          <Text className="font-medium text-lg">Advanced Settings</Text>
          <div className="flex flex-row gap-4 items-stretch">
            <div className="grow h-full">
              <div className="bg-slate-50 w-full h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
