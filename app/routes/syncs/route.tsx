import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export default function Index() {
  return (
    <>
      <PageHeader
        title="All Syncs"
        button={{ label: 'New Sync', onClick: () => {} }}
      />

      <Outlet />
    </>
  );
}
