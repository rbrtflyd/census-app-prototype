import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/DatasetBrowser/Command';
import { ConnectionServiceType, ConnectionType } from '~/db/types';
import { useState } from 'react';

interface DatasetBrowserProps {
  data: {
    datasets: any;
    connections: any;
    workspaceConnections: any;
  };
}

// Sample table data for prototype - every connection will have these tables
const sampleTables = [
  { name: 'users', description: 'User account information', rowCount: 15420 },
  { name: 'orders', description: 'Customer order data', rowCount: 89670 },
  { name: 'products', description: 'Product catalog', rowCount: 2340 },
  {
    name: 'transactions',
    description: 'Payment transactions',
    rowCount: 156780,
  },
  { name: 'sessions', description: 'User session data', rowCount: 234560 },
  { name: 'events', description: 'User interaction events', rowCount: 1250000 },
];

const formatWorkspaceConnection = (
  workspaceConnection: ConnectionType,
  connections: ConnectionServiceType[]
) => {
  const connection = connections.find(
    (c) => c.id === workspaceConnection.connectionId
  );
  return connection;
};

const combinedConnections = (
  workspaceConnections: ConnectionType[],
  connections: ConnectionServiceType[]
) => {
  return [...workspaceConnections].map((wc) => {
    const connectionDetails = formatWorkspaceConnection(wc, connections);
    return {
      ...wc,
      id: connectionDetails?.id,
      logo: connectionDetails?.logo || '',
      connectionServiceName: connectionDetails?.connectionServiceName || '',
      connectionServiceType: connectionDetails?.connectionServiceType || '',
      category: connectionDetails?.connectionServiceCategory || '',
      modes: connectionDetails?.modes || [],
      // Add tables for prototype
      tables: sampleTables,
    };
  });
};

const sourceConnectionsOnly = (connections: any[]) => {
  return connections.filter(
    (connection: any) =>
      connection.modes.includes('source') || connection.modes.includes('both')
  );
};

export const DatasetBrowser = ({ data }: DatasetBrowserProps) => {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>();

  const currentPage = pages[pages.length - 1];

  const connections = sourceConnectionsOnly(
    combinedConnections(data.workspaceConnections, data.connections)
  );

  // Find the current connection if we're on a connection page
  const currentConnection = currentPage
    ? connections.find((conn) => `connection-${conn.id}` === currentPage)
    : null;

  // Filter datasets based on search (only on main page)
  const filteredDatasets = !currentPage
    ? data.datasets.filter(
        (dataset: any) =>
          dataset.name.toLowerCase().includes(search.toLowerCase()) ||
          dataset.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Filter connections based on search (only on main page)
  const filteredConnections = !currentPage
    ? connections.filter(
        (connection: any) =>
          connection.connectionServiceName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          connection.connectionServiceType
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : [];

  // Filter tables for current connection page
  const filteredTables =
    currentConnection?.tables?.filter(
      (table: any) =>
        table.name.toLowerCase().includes(search.toLowerCase()) ||
        table.description.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <Command
      className="border border-base rounded-md flex flex-col overflow-hidden"
      shouldFilter={false}
      onKeyDown={(e) => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
          e.preventDefault();
          setPages((pages) => pages.slice(0, -1));
        }
      }}>
      <CommandInput
        placeholder={
          currentPage
            ? `Search tables in ${currentConnection?.connectionServiceName}...`
            : 'Search for a dataset, table, or connection...'
        }
        value={search}
        onValueChange={setSearch}
      />

      <div className="flex flex-row py-2 border-b border-base text-sm items-center gap-2 px-3 *:p-3 bg-white z-20">
        <button>Everything 278</button>
        <button>Datasets 32</button>
        <button>Connections 5</button>
        <button>Tables 240</button>
      </div>
      <CommandList>
        <CommandEmpty>
          {currentPage ? 'No tables found.' : 'No results found.'}
        </CommandEmpty>

        {/* Main page - show datasets and connections */}
        {!currentPage && (
          <>
            {/* Datasets Group */}
            {filteredDatasets.length > 0 && (
              <CommandGroup heading="Datasets">
                {filteredDatasets.map((dataset: any) => (
                  <CommandItem
                    key={`dataset-${dataset.id}`}
                    value={`dataset-${dataset.name}`}
                    onSelect={() =>
                      console.log('Selected dataset:', dataset.name)
                    }>
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-800 rounded-lg leading-none flex items-center justify-center text-xs font-medium text-white">
                        D
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {dataset.name}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {dataset.rows?.toLocaleString()} rows
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Connections Group */}
            {filteredConnections.length > 0 && (
              <CommandGroup heading="Connections">
                {filteredConnections.map((connection: any) => (
                  <CommandItem
                    key={`connection-${connection.id}`}
                    value={`connection-${connection.connectionServiceName}`}
                    onSelect={() =>
                      setPages([...pages, `connection-${connection.id}`])
                    }>
                    <div className="flex items-center gap-3 w-full">
                      {connection.logo && (
                        <img
                          src={connection.logo}
                          alt={connection.connectionServiceName}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <div className="flex-1 flex-row flex min-w-0">
                        <div className="font-medium text-sm">
                          {connection.connectionServiceName}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {connection.tables?.length} tables
                        </span>
                        <span className="text-xs text-gray-400">→</span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}

        {/* Connection page - show tables for selected connection */}
        {currentPage && currentConnection && (
          <CommandGroup
            heading={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPages(pages.slice(0, -1))}
                  className="text-xs text-lighter hover:text-dark flex items-center gap-1">
                  ← Back
                </button>
                <span>Tables in {currentConnection.connectionServiceName}</span>
              </div>
            }>
            {filteredTables.map((table: any) => (
              <CommandItem
                key={`table-${currentConnection.id}-${table.name}`}
                value={`table-${table.name}`}
                onSelect={() =>
                  console.log(
                    'Selected table:',
                    table.name,
                    'from',
                    currentConnection.connectionServiceName
                  )
                }>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">
                      T
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{table.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {table.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {table.rowCount?.toLocaleString()} rows
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};
