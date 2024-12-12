import React, { useEffect, useState } from 'react';
import { useBreadcrumbContext } from '../../providers/breadcrumbContext';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useOutletContext, useParams } from '@remix-run/react';
import {
  ConnectionEditingVersion1,
  ConnectionEditingVersion2,
} from './Versions';

import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from '~/components/ui';

export default function ConnectionEdit({}) {
  const { id } = useParams();
  const { thisWorkspaceConnection, thisConnection, testSteps, version } =
    useOutletContext<any>();
  const { addBreadcrumb, updateBreadcrumb, removeBreadcrumb } =
    useBreadcrumbContext();
  const [useCase, setUseCase] = useState<'read' | 'write'>('read');
  const [readType, setReadType] = useState<'Basic' | 'Advanced'>('Basic');

  const [selectedUseCases, setSelectedUseCases] = useState<Set<string>>(
    new Set(['read', 'write'])
  );

  useEffect(() => {
    // Add the edit breadcrumb
    addBreadcrumb({
      label: `Edit ${
        thisWorkspaceConnection?.name || thisConnection?.connectionServiceName
      } Connection`,
      href: `/${version}/connections/${id}/edit`,
    });

    return () => {
      // Remove the edit breadcrumb when unmounting
      removeBreadcrumb(2);
    };
  }, [
    version,
    id,
    addBreadcrumb,
    removeBreadcrumb,
    thisWorkspaceConnection,
    thisConnection,
  ]);

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
  ];

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
    sampleCredentials,
  };

  if (!thisWorkspaceConnection || !thisConnection) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="Edit Connection" />
      <ConnectionEditingVersion1 data={data} />
    </>
  );
}
