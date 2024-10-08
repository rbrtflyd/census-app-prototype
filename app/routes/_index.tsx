import { useState, useEffect } from 'react';
import { json, type LoaderFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';
import datasetsData from '~/db/data/datasets_data';
import { useLoaderData } from '@remix-run/react';
import { DatasetType } from '~/db/types/dataset';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

const datasets = datasetsData;
export default function Index() {
  return (
    <div className="flex h-screen flex-row">
      <SidebarNavigation />
      <div className="grow">
        Main content
        {datasets.map((dataset: any) => (
          <div key={dataset.id}>{dataset.name}</div>
        ))}
      </div>
    </div>
  );
}
