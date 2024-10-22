import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Outlet } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import PageHeader from '../../components/Structural/Headers/PageHeader';

export default function NewDataset() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="Create a New Sync" />
      <div className="px-6 h-full pb-6 -mt-7 overflow-hidden *:max-w-[1400px] *:mx-auto *:w-full">
        <Outlet />
      </div>
    </div>
  );
}
