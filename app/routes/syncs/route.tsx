import type { MetaFunction } from '@remix-run/node';

import { Outlet } from '@remix-run/react';
import datasetsData from '~/db/data/datasets_data';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

const datasets = datasetsData;
export default function Index() {
  return (
    <>
      Syncs
      <Outlet />
    </>
  );
}
