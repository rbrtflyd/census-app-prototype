import React, { useEffect } from 'react';
import { useParams } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { useBreadcrumbContext } from '../../providers/breadcrumbContext';

import { useOutletContext } from '@remix-run/react';
import { ConnectionType, ConnectionServiceType } from '../../db/types';

import PageHeader from '../../components/Structural/Headers/PageHeader';

export default function ConnectionEdit({}) {
  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbContext();

  const { version, thisWorkspaceConnection, thisConnection, testSteps } =
    useOutletContext<any>();

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex flex-col w-full h-[140px] bg-subtle border border-base px-6 *:max-w-[1100px] *:mx-auto *:w-full justify-center shrink-0">
        <Text className="text-xl font-medium">
          Edit {thisConnection.name || thisWorkspaceConnection.name}
        </Text>
      </div>
      <div className="px-6 h-full pb-6 -mt-8 overflow-hidden *:max-w-[1100px]  *:w-full  *:mx-auto">
        <div className="bg-white border border-base rounded-lg h-full">
          <div className="flex flex-col gap-4 p-6">
            <Text className="font-medium text-lg">Connection Mode</Text>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <Text className="font-medium text-lg">Credentials</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
