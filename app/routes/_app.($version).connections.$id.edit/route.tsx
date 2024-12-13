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
  const [mode, setMode] = useState<'source' | 'destination'>('source');
  const [readType, setReadType] = useState<'Basic' | 'Advanced'>('Basic');

  const [selectedModes, setSelectedModes] = useState<Set<string>>(
    new Set(['source', 'destination'])
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

  const data = {
    thisWorkspaceConnection,
    thisConnection,
    testSteps,
    mode,
    readType,
    setReadType,
    setMode,
    selectedModes,
    handleModeClick,
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
