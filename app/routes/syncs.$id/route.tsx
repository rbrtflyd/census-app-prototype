import React from 'react';
import type { MetaFunction } from '@remix-run/node';

import { Outlet } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export default function Route() {
  return (
    <>
      <Outlet />
    </>
  );
}
