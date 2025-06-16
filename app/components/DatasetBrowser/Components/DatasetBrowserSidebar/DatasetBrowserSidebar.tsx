import { Text } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/pro-regular-svg-icons';
import { faFilter, faPlug } from '@fortawesome/pro-solid-svg-icons';
import { ConnectionServiceType } from '~/db/types';

interface DatasetBrowserSidebarProps {
  connections: ConnectionServiceType[];
  setPages: (pages: string[]) => void;
  pages: string[];
}

export default function DatasetBrowserSidebar({
  connections,
  setPages,
  pages,
}: DatasetBrowserSidebarProps) {
  return (
    <div className="flex flex-col p-6 gap-3 border-r border-base w-1/4 bg-subtle bg-opacity-50">
      <Text className="text-sm text-lighter leading-none">Sync from...</Text>
      <div className="flex flex-col py-2 text-sm gap-6 z-20 text-light *:flex">
        <button className="text-sm flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faTable} /> Datasets
        </button>
        <button className="text-sm flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faFilter} /> Segments
        </button>
        <div className="flex flex-col gap-3">
          <Text className="text-sm flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faPlug} />
            <Text className="font-medium">Connections</Text>
          </Text>
          <div className="flex flex-col gap-3">
            {connections.map((connection) => (
              <button
                key={connection.id}
                className="flex flex-row items-center gap-2"
                onClick={() => {
                  setPages([...pages, `connection-${connection.id}`]);
                }}>
                <img
                  src={connection.logo}
                  alt={connection.connectionServiceName}
                  width={12}
                  height={12}
                />
                <Text className="text-sm">
                  {connection.connectionServiceName}
                </Text>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
