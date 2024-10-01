import { json } from '@remix-run/node';
import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { DataTable } from './data-table';
import { DatasetColumn, columns } from './columns';

import { Switch } from '~/components/ui/switch';

import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import { data } from './data';
export const loader = async () => {
  // You can fetch data or perform any server-side operations here
  return json({
    message: 'Hello from the table route!',
  });
};

export default function TableRoute() {
  const [showAlphabetical, setShowAlphabetical] = useState(false);

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <div className="flex flex-row px-6 py-3 border-b border-base">
          <Text className="text-lg font-medium">Datasets</Text>
        </div>
        <div className="flex flex-row w-full">
          <Tabs
            defaultValue="columns"
            className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="columns">Columns</TabsTrigger>
              <TabsTrigger value="syncs">Syncs</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row justify-between px-6 py-3 border-b border-base">
          <Text className="text font-medium">Columns</Text>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-2 text-light">
              <Text>Grouped</Text>
              <Switch
                checked={showAlphabetical}
                onCheckedChange={(checked) => setShowAlphabetical(checked)}
              />
              <Text>Alphabetical</Text>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
