import { Text } from '@radix-ui/themes';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { DatasetBrowser } from '~/components/DatasetBrowser/DatasetBrowser';
import { useOutletContext } from '@remix-run/react';
import { DatasetType } from '~/db/types';

export default function NewDataset() {
  const { datasets } = useOutletContext() as {
    datasets: DatasetType[];
  };

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="Create a New Sync" />
      <div className="px-6 h-full pb-6 overflow-hidden *:max-w-[900px] *:mx-auto *:w-full">
        <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full h-full pt-12">
          <div className="bg-white border border-base rounded-md p-5 flex flex-col gap-4">
            <Text className="text-lg font-medium">Select a Source</Text>
            <div className="flex flex-row gap-2 w-full *:w-full">
              {/* <button
                className="border border-base p-3 rounded-lg"
                onClick={() => setOpenDatasetBrowser(true)}>
                Select a Dataset or Segment
              </button>
              <button className="border border-base p-3 rounded-lg">
                Select a Warehouse Table
              </button> */}
              <DatasetBrowser datasets={datasets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
