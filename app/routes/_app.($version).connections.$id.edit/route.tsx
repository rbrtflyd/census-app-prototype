import React, { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { useBreadcrumbContext } from '../../providers/breadcrumbContext';
import { Checkbox } from '~/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Badge } from '~/components/ui/badge';

import { useOutletContext } from '@remix-run/react';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/pro-solid-svg-icons';
import {
  ConnectionEditingVersion1,
  ConnectionEditingVersion2,
} from './Versions';

export default function ConnectionEdit({}) {
  const { thisWorkspaceConnection, thisConnection, testSteps } =
    useOutletContext<any>();

  const [useCase, setUseCase] = useState<'read' | 'write'>('read');
  const [readType, setReadType] = useState<'Basic' | 'Advanced'>('Basic');

  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(
    new Set(['read', 'write'])
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

  const data = {
    thisWorkspaceConnection,
    thisConnection,
    testSteps,
    useCase,
    readType,
    setReadType,
    setUseCase,
    selectedUseCases,
    handleUseCaseClick,
  };

  if (!thisWorkspaceConnection || !thisConnection) {
    return <div>Loading...</div>;
  }

  return <ConnectionEditingVersion1 data={data} />;
}
