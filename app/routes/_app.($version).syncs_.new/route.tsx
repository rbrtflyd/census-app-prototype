import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { DatasetBrowser } from '~/components/DatasetBrowser/DatasetBrowser';
import { useOutletContext } from '@remix-run/react';
import { ConnectionServiceType, ConnectionType, DatasetType } from '~/db/types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/pro-solid-svg-icons';
import { SyncSourceType } from '~/db/types';

export default function NewDataset() {
  const { datasets, connections, workspaceConnections } =
    useOutletContext() as {
      datasets: DatasetType[];
      connections: ConnectionServiceType[];
      workspaceConnections: ConnectionType[];
    };

  const [selectedSource, setSelectedSource] = useState<SyncSourceType | null>(
    null
  );
  const data = {
    datasets,
    connections,
    workspaceConnections,
  };

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="Create a New Sync" />
      <div className="px-6 h-full pb-6 overflow-hidden *:max-w-[900px] *:mx-auto *:w-full">
        <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full h-full pt-12">
          <div className="flex flex-col gap-4">
            <Text className="text-lg font-medium">Select a Source</Text>
            <div>
              <DatasetBrowser
                data={data}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
              />
            </div>
          </div>
          <div className="bg-white border border-base rounded-md p-5 flex flex-col gap-4">
            <Text className="text-lg font-medium">Select a Destination</Text>
            <div className="flex flex-row gap-2 w-full *:w-full bg-slate-50 h-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
