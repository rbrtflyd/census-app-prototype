import React, { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Checkbox } from '~/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Badge } from '~/components/ui/badge';
import { Label } from '~/components/ui/label';
import { useOutletContext } from '@remix-run/react';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/pro-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';

const snapPoints = ['148px', '355px', 1];

export default function ConnectionEdit({ data }: { data: any }) {
  const {
    thisWorkspaceConnection,
    sampleCredentials,
    thisConnection,
    testSteps,
    useCase,
    setUseCase,
    readType,
    setReadType,
    selectedUseCases,
    handleUseCaseClick,
  } = data;

  const [name, setName] = useState(thisWorkspaceConnection.name || '');
  const [credentials, setCredentials] = useState(sampleCredentials);
  const [hasCredentialsChanged, setHasCredentialsChanged] = useState(false);
  const [showReauthDialog, setShowReauthDialog] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  const handleCredentialBlur = (value: string, originalValue: string) => {
    if (value !== originalValue) {
      setHasCredentialsChanged(true);
      setShowReauthDialog(true);
    }
  };

  const handleReauthenticate = () => {
    // Add your reauthentication logic here
    setShowReauthDialog(false);
  };

  return (
    <>
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <div className="flex flex-col w-full h-[120px] bg-subtle border-b border-base px-6 *:max-w-[800px] *:mx-auto *:w-full justify-center shrink-0">
          <div className="flex flex-row items-center gap-4">
            <div className="size-10 flex items-center justify-center border border-base rounded-md bg-white mr-2 shadow-sm">
              <img
                src={thisConnection.logo}
                alt={thisConnection.connectionServiceName}
                className="size-6"
              />
            </div>
            <Text className="text-xl font-medium">
              Edit {thisConnection.connectionServiceName}
            </Text>
          </div>
        </div>
        <div className="px-6 h-full -mt-6">
          <div className="bg-white border border-base rounded-lg max-w-[800px] mx-auto w-full flex flex-col">
            <div className="flex flex-col gap-4 p-6">
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
                <button
                  className="flex flex-row gap-2 items-center hover:bg-slate-25 transition-all duration-75 rounded p-1 group"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `destination:${thisConnection.connectionServiceName.toLowerCase()}-${
                        thisConnection.id
                      }`
                    );
                  }}>
                  <Text className="text-light text-sm leading-none">
                    destination:
                    <span className="lowercase">
                      {thisConnection.connectionServiceName}
                    </span>
                    -<span>{thisConnection.id}</span>
                  </Text>
                  <FontAwesomeIcon
                    icon={faClone}
                    className="size-3 icon-lighter group-hover:text-slate-600 transition-all duration-75"
                  />
                </button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-2">
                <Text className="font-medium text-lg leading-none">
                  Connection Mode
                </Text>
                <Text className="text-light">
                  Some help text describing connection modes
                </Text>
              </div>
              <div className="flex flex-row gap-2">
                {['read', 'write'].map((useCase) => (
                  <div
                    key={useCase}
                    className="flex flex-col gap-2 grow">
                    <div
                      onClick={() => handleUseCaseClick(useCase)}
                      className="flex flex-row gap-2 items-baseline  p-4 border border-base rounded-md hover:bg-slate-25 transition-all duration-75 hover:border-slate-100 hover:text-slate-900 cursor-pointer">
                      <Checkbox
                        id={useCase}
                        checked={selectedUseCases.has(useCase)}
                        onCheckedChange={() => handleUseCaseClick(useCase)}
                      />
                      <div className="flex flex-col gap-1">
                        <label htmlFor={useCase}>
                          <Text className="text-lg font-medium leading-none">
                            {useCase === 'read' ? 'Read from' : 'Write to'} this
                            connection
                          </Text>
                        </label>{' '}
                        {useCase === 'read' && (
                          <Text className="text-light">
                            Some text describing what read from connection
                            means.
                          </Text>
                        )}
                        {useCase === 'write' && (
                          <Text className=" text-light">
                            Some text describing what write to connection means.
                          </Text>
                        )}
                      </div>
                    </div>
                    {/* Add radio group for read options */}
                    {useCase === 'read' && selectedUseCases.has('read') && (
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
            <div className="flex flex-col gap-4 p-6">
              <Text className="font-medium text-lg">Credentials</Text>
              <div className="flex flex-row justify-between gap-8">
                <div className="flex flex-col gap-8 grow">
                  {credentials.map((credential: any) => (
                    <div
                      className="flex flex-col gap-2 grow"
                      key={credential.label}>
                      <Label size="md">{credential.label}</Label>
                      <Input
                        value={credential.value}
                        type={credential.type}
                        onChange={(e) => {
                          const newCredentials = credentials.map((c: any) =>
                            c.label === credential.label
                              ? { ...c, value: e.target.value }
                              : c
                          );
                          setCredentials(newCredentials);
                          if (e.target.value !== credential.value) {
                            setHasCredentialsChanged(true);
                          }
                        }}
                        onBlur={(e) =>
                          handleCredentialBlur(e.target.value, credential.value)
                        }
                      />
                      <Text className="text-light text-xs leading-none">
                        {credential.helpText}
                      </Text>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 w-[250px]">
                  <div className="flex flex-col gap-2 p-6 bg-subtle border border-base rounded-md text-sm sticky top-5">
                    <Text className="font-medium">
                      Allow inbound traffic from Census IP Addresses
                    </Text>
                    <Text className="text-light">
                      If your warehouse is behind a firewall/private network,
                      please add the following static IP addresses:
                    </Text>
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
      </div>
      <Drawer
        modal={false}
        dismissible={false}
        open={showReauthDialog}
        onOpenChange={(open) => {
          setShowReauthDialog(open);
          if (!open) {
            // Reset any state if needed when drawer closes
          }
        }}>
        <DrawerContent size="sm">
          <Text className="font-medium text-lg">Reauthentication Required</Text>
          <div className="flex flex-row gap-2">
            <Button
              onClick={handleReauthenticate}
              size="default">
              Reauthenticate
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
