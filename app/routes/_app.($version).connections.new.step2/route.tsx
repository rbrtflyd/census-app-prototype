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
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/pro-solid-svg-icons';
import { useNewConnectionContext } from '~/contexts/NewConnectionContext';
import { Checkbox } from '~/components/ui/checkbox';

export default function NewConnectionStep2() {
  const navigate = useNavigate();
  const { setCurrentStep, selectedConnectionId } = useNewConnectionContext();
  setCurrentStep('step2');
  const { connections, workspaceConnections } = useOutletContext() as {
    connections: ConnectionServiceType[];
    workspaceConnections: ConnectionType[];
    setSelectedConnectionId: (id: string) => void;
    selectedConnectionId: string | null;
  };

  const [useCase, setUseCase] = useState<'read' | 'write'>('read');
  const [readType, setReadType] = useState<'Basic' | 'Advanced'>('Basic');

  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(
    new Set()
  );

  const selectedConnection = connections.find(
    (c) => c.id.toString() === selectedConnectionId
  );

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
    <div className="w-full bg-white border border-base rounded-md h-full flex flex-col">
      <div className="flex flex-row items-center justify-between p-4 border-b border-base">
        <Text className="text-lg font-medium">Configure Connection</Text>
      </div>
      <div className="flex flex-row h-full">
        <div className="flex flex-col gap-4 w-1/3 border-r border-base h-full p-4">
          <Text className="text-lg font-medium">
            Choose how Census can access this connection
          </Text>
          <div className="flex flex-col gap-2">
            {['read', 'write'].map((useCase) => (
              <>
                <div
                  key={useCase}
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
                        Some text describing what read from connection means.
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
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
