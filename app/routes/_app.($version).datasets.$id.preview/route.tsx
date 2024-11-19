import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getDatasets, initializeDatabase } from '../../db/db';
import { useParams, useOutletContext } from '@remix-run/react';
import { DatasetType } from '../../db/types';
import React from 'react';

export default function DatasetIndex() {
  const thisDataset = useOutletContext<DatasetType>();

  return <div>Preview {thisDataset.name}</div>;
}
