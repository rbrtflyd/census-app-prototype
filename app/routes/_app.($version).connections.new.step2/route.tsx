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
import { faCheck } from '@fortawesome/pro-regular-svg-icons';

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

  const selectedConnection = connections.find(
    (c) => c.id.toString() === selectedConnectionId
  );

  const [name, setName] = useState<string>('');
  const [mode, setMode] = useState<'source' | 'destination' | 'both' | null>(
    null
  );

  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set([]));

  const sampleCredentials = [
    {
      section: 'Authentication Method',
      label: 'Choose the authentication method for this connection',
      value: 'Role Based',
      type: 'toggle',
    },
    {
      section: 'Authentication',
      label: 'Username',
      value: 'admin',
      type: 'text',
      helpText: 'The username to use for the connection',
    },
    {
      section: 'Authentication',
      label: 'Password',
      value: 'password',
      type: 'password',
      helpText: 'The password to use for the connection',
    },
    {
      section: 'Connection',
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

  const [authMethod, setAuthMethod] = useState<string>();

  const [credentials, setCredentials] = useState(() => {
    if (!selectedConnection?.credentials) {
      return [];
    }

    return selectedConnection.credentials.map((cred: any) => ({
      section: cred.authentication_method || 'Connection',
      label: cred.field_name,
      value: '',
      type: cred.field_type,
      helpText: cred.field_description,
      field_required: cred.field_required,
    }));
  });

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

  const groupedCredentials = credentials.reduce(
    (acc: { [key: string]: typeof credentials }, curr: any) => {
      const section = curr.section || ''; // Use 'Other' for credentials without a section
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(curr);
      return acc;
    },
    {}
  );

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
          <div className="flex flex-row gap-2 p-6 bg-subtle border border-base rounded-md text-sm sticky top-5 items-center justify-between">
            <div className="flex flex-col gap-1 w-1/2">
              <Text className="font-medium">
                Share a connect link with your team.
              </Text>
              <Text className="text-light">
                If you don't know this information, you can share a connect link
                with your team and have someone else set it up for you.
              </Text>
            </div>
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
              <div className="flex flex-row items-center gap-2 w-1/3">
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
        <div className="flex flex-col gap-8 px-6 py-9">
          <div className="flex flex-row justify-between gap-16">
            <div className="flex flex-col gap-8 grow  mx-auto">
              {selectedConnection?.authentication_methods && (
                <div className="flex flex-col gap-4">
                  <Text className="font-medium text-lg">
                    Authentication Method
                  </Text>
                  <div className="flex flex-col gap-2">
                    <RadioGroup
                      className="flex flex-col gap-2"
                      value={authMethod}
                      onValueChange={(value) => {
                        setAuthMethod(value);
                        // Clear credentials when switching to OAuth
                        if (value === 'OAuth') {
                          setCredentials([]);
                        } else {
                          // Reset credentials for the selected auth method
                          const filteredCreds =
                            selectedConnection?.credentials
                              ?.filter(
                                (cred: any) =>
                                  !cred.authentication_method ||
                                  cred.authentication_method === value
                              )
                              .map((cred: any) => ({
                                section:
                                  cred.authentication_method || 'Connection',
                                label: cred.field_name,
                                value: '',
                                type: cred.field_type,
                                helpText: cred.field_description,
                                field_required: cred.field_required,
                              })) || [];
                          setCredentials(filteredCreds);
                        }
                      }}>
                      {selectedConnection?.authentication_methods.map(
                        (method: any) => (
                          <RadioGroupItem
                            key={method}
                            indicator={false}
                            className="flex flex-row items-center gap-2 p-4 text-lg font-medium border border-base rounded-md hover:bg-slate-25 transition-all duration-75 hover:border-slate-100 hover:text-slate-900 cursor-pointer data-[state=checked]:border-plum-200 data-[state=unchecked]:border-base data-[state=checked]:bg-plum-100 data-[state=unchecked]:bg-white data-[state=checked]:text-plum-500 data-[state=unchecked]:text-dark justify-between leading-none"
                            value={method}
                            id={method}>
                            <Text>{method}</Text>
                          </RadioGroupItem>
                        )
                      )}
                    </RadioGroup>
                  </div>
                </div>
              )}
              {authMethod && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {authMethod !== 'OAuth' &&
                      Object.entries(groupedCredentials).map(
                        ([section, sectionCredentials]: any) => (
                          <div
                            key={section}
                            className="flex flex-col gap-4">
                            <Text className="font-medium">{section}</Text>
                            <div className="flex flex-col gap-6">
                              {sectionCredentials.map((credential: any) => (
                                <div
                                  className="flex flex-col gap-2 grow"
                                  key={credential.label}>
                                  <Label size="md">
                                    {credential.label}
                                    {credential.field_required && (
                                      <span className="text-red-500 ml-1">
                                        *
                                      </span>
                                    )}
                                  </Label>

                                  <Input
                                    value={credential.value}
                                    type={credential.type}
                                    required={credential.field_required}
                                    onChange={(e) => {
                                      const newCredentials = credentials.map(
                                        (c: any) =>
                                          c.label === credential.label
                                            ? { ...c, value: e.target.value }
                                            : c
                                      );
                                      setCredentials(newCredentials);
                                    }}
                                  />
                                  <Text className="text-light text-xs leading-none">
                                    {credential.helpText}
                                  </Text>
                                </div>
                              ))}
                            </div>
                            <Separator />
                          </div>
                        )
                      )}
                    <div className="flex flex-col gap-2">
                      <Button>
                        <Text>Connect</Text>
                      </Button>
                    </div>
                  </div>

                  {authMethod === 'OAuth' && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Text className="font-medium text-lg">
                          Census will request the following permissions from
                          your {selectedConnection?.connectionServiceName}{' '}
                          account:
                        </Text>
                        <div className="flex flex-row gap-2 items-center">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-emerald-500"
                          />
                          <Text>Ability to read data</Text>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-emerald-500"
                          />
                          <Text>Ability to write data</Text>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            // OAuth logic will go here
                            console.log('OAuth authentication clicked');
                          }}>
                          <Text>
                            Authenticate with{' '}
                            {selectedConnection?.connectionServiceName}
                          </Text>
                        </Button>
                        <Text className="text-light text-sm">
                          Click the button above to securely connect your{' '}
                          {selectedConnection?.connectionServiceName} account
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {selectedConnection?.connectionServiceType?.toLowerCase() ===
              'data warehouse' && (
              <div className="flex flex-col gap-4 w-[300px] shrink-0">
                <div className="flex flex-col gap-4 sticky top-5">
                  <div className="flex flex-col gap-2 p-6 border border-base rounded-md text-sm">
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
                </div>
              </div>
            )}
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
