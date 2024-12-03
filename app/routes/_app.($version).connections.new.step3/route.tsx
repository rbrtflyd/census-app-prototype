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
import { useNewConnectionContext } from '../../contexts/NewConnectionContext';
import { Checkbox } from '../../components/ui/checkbox';

export default function NewDataset() {
  const navigate = useNavigate();
  const { setCurrentStep } = useNewConnectionContext();
  setCurrentStep('step3');
  const { connections, workspaceConnections } = useOutletContext() as {
    connections: ConnectionServiceType[];
    workspaceConnections: ConnectionType[];
  };

  const [useCase, setUseCase] = useState<'read' | 'write'>('read');
  const [readType, setReadType] = useState<'Basic' | 'Advanced'>('Basic');

  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(
    new Set()
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
      <div className="flex flex-col h-full w-full p-4">
        Configure Connnection
        <div className="w-48 h-48 relative bg-slate-500 overflow-hidden">
          some more stuff
          <svg
            className="absolute inset-0 size-full stroke-gray-900 opacity-10"
            fill="none">
            <defs>
              <pattern
                id="pattern"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse">
                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
              </pattern>
            </defs>
            <rect
              stroke="none"
              fill="url(#pattern)"
              width="100%"
              height="100%"></rect>
          </svg>
        </div>
      </div>
    </div>
  );
}
