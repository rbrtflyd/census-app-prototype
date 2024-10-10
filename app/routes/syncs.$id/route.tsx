import React from 'react';
import type { MetaFunction } from '@remix-run/node';

import { Outlet } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

const breadcrumb = {
  items: [{ label: 'Syncs', href: '/syncs' }],
};

export default function Route() {
  return (
    <>
      <PageHeader
        title="This Sync"
        breadcrumb={breadcrumb}
      />
      <Outlet />
    </>
  );
}
