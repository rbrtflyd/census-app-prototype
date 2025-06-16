import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DatasetBrowserSidebar,
  DatasetBrowserFooter,
} from '~/components/DatasetBrowser/Components';
import {
  ConnectionServiceType,
  ConnectionType,
  SyncSourceType,
} from '~/db/types';
import { useState } from 'react';
import { DatasetType } from '~/db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/pro-solid-svg-icons';

import { motion, AnimatePresence } from 'framer-motion';

interface DatasetBrowserProps {
  data: {
    datasets: DatasetType[];
    connections: ConnectionServiceType[];
    workspaceConnections: ConnectionType[];
  };
  selectedSource: SyncSourceType | null;
  setSelectedSource: (value: SyncSourceType | null) => void;
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
  return workspaceConnections
    .map((wc) => {
      const connectionDetails = formatWorkspaceConnection(wc, connections);
      // Only include connections where we found matching details
      if (!connectionDetails) {
        return null;
      }
      return {
        ...wc,
        id: connectionDetails.id,
        logo: connectionDetails.logo || '',
        connectionServiceName: connectionDetails.connectionServiceName || '',
        connectionServiceType: connectionDetails.connectionServiceType || '',
        category: connectionDetails.connectionServiceCategory || '',
        modes: connectionDetails.modes || [],
        // Add tables for prototype
        tables: sampleTables,
      };
    })
    .filter(Boolean); // Remove null entries
};

const sourceConnectionsOnly = (connections: any[]) => {
  return connections.filter(
    (connection: any) =>
      connection.modes.includes('source') || connection.modes.includes('both')
  );
};

export const DatasetBrowser = ({
  data,
  selectedSource,
  setSelectedSource,
}: DatasetBrowserProps) => {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const [value, setValue] = useState(selectedSource?.name || '');
  const [isSearching, setIsSearching] = useState(true);

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
        (dataset: DatasetType) =>
          dataset.name.toLowerCase().includes(search.toLowerCase()) ||
          dataset.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Filter connections based on search (only on main page)
  const filteredConnections = !currentPage
    ? connections.filter(
        (connection: ConnectionType) =>
          connection.connectionServiceName &&
          connection.connectionServiceType &&
          (connection.connectionServiceName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            connection.connectionServiceType
              .toLowerCase()
              .includes(search.toLowerCase()))
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
    <motion.div
      layout
      layoutDependency={selectedSource}
      className="border border-base rounded-lg flex flex-col">
      {!selectedSource && (
        <Command
          shouldFilter={false}
          value={value || ''}
          onValueChange={(val) => setValue(val || '')}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
              e.preventDefault();
              setPages((pages) => pages.slice(0, -1));
            }
          }}>
          <CommandInput
            placeholder={
              currentPage
                ? `Search tables in ${
                    currentConnection?.connectionServiceName || 'connection'
                  }...`
                : 'Search for a dataset, table, or connection...'
            }
            value={search}
            onValueChange={(val) => setSearch(val || '')}
          />

          <AnimatePresence mode="wait">
            <div className="flex flex-col border-t border-base">
              <div className="flex flex-row">
                <DatasetBrowserSidebar
                  connections={connections}
                  setPages={setPages}
                  pages={pages}
                />
                <CommandList className="w-full px-3">
                  <CommandEmpty>
                    {currentPage ? 'No tables found.' : 'No results found.'}
                  </CommandEmpty>

                  {/* Main page - show datasets and connections */}
                  {!currentPage && (
                    <>
                      {/* Datasets Group */}
                      {filteredDatasets.length > 0 && (
                        <CommandGroup heading="Datasets">
                          {filteredDatasets.map((dataset: DatasetType) => (
                            <CommandItem
                              key={`dataset-${dataset.id}`}
                              value={`${dataset.name}`}
                              onSelect={() => {
                                setValue(`${dataset.name}`);
                                setSelectedSource({
                                  id: dataset.id.toString(),
                                  name: dataset.name,
                                  type: 'dataset',
                                  sourceId: dataset.id.toString(),
                                });
                              }}>
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
                          {filteredConnections.map(
                            (connection: ConnectionType, index) => (
                              <CommandItem
                                key={`connection-${connection.id || index}-${
                                  connection.connectionServiceName || 'unknown'
                                }`}
                                value={connection.connectionServiceName || ''}
                                onSelect={() =>
                                  setPages([
                                    ...pages,
                                    `connection-${connection.id}`,
                                  ])
                                }>
                                <div className="flex items-center gap-3 w-full">
                                  {connection.logo && (
                                    <img
                                      src={connection.logo}
                                      alt={
                                        connection.connectionServiceName ||
                                        'unknown'
                                      }
                                      className="w-6 h-6 object-contain"
                                    />
                                  )}
                                  <div className="flex-1 flex-row flex min-w-0">
                                    <div className="font-medium text-sm">
                                      {connection.connectionServiceName ||
                                        'unknown'}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">
                                      {connection.tables?.length} tables
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      →
                                    </span>
                                  </div>
                                </div>
                              </CommandItem>
                            )
                          )}
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
                          <span>
                            Tables in {currentConnection.connectionServiceName}
                          </span>
                        </div>
                      }>
                      {filteredTables.map((table: any) => (
                        <CommandItem
                          key={`table-${currentConnection.id}-${table.name}`}
                          value={`${table.name}`}
                          onSelect={() => {
                            setValue(`${table.name}`);
                          }}>
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                              <span className="text-xs font-medium text-green-600">
                                T
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {table.name}
                              </div>
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
              </div>
              <DatasetBrowserFooter />
            </div>
          </AnimatePresence>
        </Command>
      )}
      {selectedSource && (
        <div className="p-4 flex flex-row gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-800 rounded-lg leading-none flex items-center justify-center text-xs font-medium text-white">
              D
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedSource?.name}</div>
              <div className="text-sm text-lighter">{selectedSource?.type}</div>
            </div>
          </div>
          <button
            onClick={() => setSelectedSource(null)}
            className="px-3 py-1 text-sm gap-3 flex items-center text-lighter hover:text-dark">
            <FontAwesomeIcon icon={faRefresh} />
            Change source
          </button>
        </div>
      )}
    </motion.div>
  );
};
