import { useEffect, useState, useCallback } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type {
  ConnectionType,
  DatasetType,
  FolderType,
  SyncBehaviorType,
  SyncType,
} from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { syncsData, syncsFoldersData } from '~/db/data/syncs/syncs_data';
import { workspaceConnectionsData } from '~/db/data/connections/workspaceConnections_data';
import { connectionsData } from '~/db/data/connections/connections_data';
import TableToolbar from '~/components/Tables/TableToolbar/TableToolbar';
import { useSyncToolbar, type SyncTableRowType } from '~/hooks/useSyncToolbar';
import type { FolderBreadcrumb } from '~/contexts/BreadcrumbContext';

// Create enhanced sync type that includes connection info
export type EnhancedSyncType = SyncType & {
  type: 'sync';
  destinationConnection?: {
    id: number;
    name: string | null;
    connectionService: {
      id: number;
      connectionServiceName: string;
      connectionServiceType: string;
      logo: string;
    };
  };
};

export type TableRowType = EnhancedSyncType | (FolderType & { type: 'folder' });

export default function Syncs() {
  const { clearBreadcrumbs, setFolderBreadcrumbs, clearFolderBreadcrumbs } =
    useBreadcrumbs();

  const { version } = useParams();
  const navigate = useNavigate();
  const { syncs, datasets, destinations } = useOutletContext() as {
    syncs: SyncType[];
    datasets: DatasetType[];
    destinations: ConnectionType[];
  };

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Helper function to get child folders of a parent folder
  const getChildFolders = (parentId: string | null) => {
    return syncsFoldersData.filter((folder) => folder.parentId === parentId);
  };

  // Helper function to get sibling folders (folders at the same level)
  const getSiblingFolders = (folderId: string) => {
    const folder = syncsFoldersData.find((f) => f.id === folderId);
    if (!folder) return [];
    return syncsFoldersData.filter((f) => f.parentId === folder.parentId);
  };

  const handleFolderSelect = useCallback(
    (folderId: string | null) => {
      setSelectedFolderId(folderId);
    },
    [setSelectedFolderId]
  );

  // Hierarchical up navigation
  const handleGoUp = () => {
    if (!selectedFolderId) return;

    const currentFolder = syncsFoldersData.find(
      (f) => f.id === selectedFolderId
    );
    if (currentFolder?.parentId) {
      handleFolderSelect(currentFolder.parentId);
    } else {
      handleFolderSelect(null);
    }
  };

  // Helper function to get folder path for breadcrumbs
  const getFolderPath = useCallback(
    (folderId: string | null): Array<{ id: string; name: string }> => {
      if (!folderId) return [];

      const folder = syncsFoldersData.find((f) => f.id === folderId);
      if (!folder) return [];

      const path = [{ id: folder.id, name: folder.name }];
      if (folder.parentId) {
        path.unshift(...getFolderPath(folder.parentId));
      }

      return path;
    },
    []
  );

  // Helper function to get connection info for a sync
  const getConnectionInfo = (destinationId: number | string | undefined) => {
    if (!destinationId) return undefined;

    const workspaceConnection = workspaceConnectionsData.find(
      (wc) => wc.id === Number(destinationId)
    );

    if (!workspaceConnection) return undefined;

    const connectionService = connectionsData.find(
      (cs) => cs.id === workspaceConnection.connectionId
    );

    if (!connectionService) return undefined;

    return {
      id: workspaceConnection.id,
      name: workspaceConnection.name,
      connectionService: {
        id: connectionService.id,
        connectionServiceName: connectionService.connectionServiceName,
        connectionServiceType: connectionService.connectionServiceType,
        logo: connectionService.logo,
      },
    };
  };

  // Create combined data for the table
  const getTableData = (): TableRowType[] => {
    if (!selectedFolderId) {
      // At root level: show top-level folders first, then syncs without folders
      const rootFolders: TableRowType[] = getChildFolders(null).map(
        (folder) => ({
          type: 'folder' as const,
          id: folder.id,
          name: folder.name,
          createdAt: new Date(),
          updatedAt: new Date(),
          parentId: folder.parentId,
          system: folder.system,
        })
      );

      const rootSyncs: TableRowType[] = syncsData
        .filter((s) => !s.folderId)
        .map((s) => ({
          ...s,
          type: 'sync' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          folderId: s.folderId || null,
          behavior: s.behavior as SyncBehaviorType,
          destinationConnection: getConnectionInfo(s.destination),
        }));

      return [...rootFolders, ...rootSyncs];
    } else {
      // In a folder: show child folders first, then syncs from this folder
      const childFolders: TableRowType[] = getChildFolders(
        selectedFolderId
      ).map((folder) => ({
        type: 'folder' as const,
        id: folder.id,
        name: folder.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        parentId: folder.parentId,
        system: folder.system,
      }));

      const folderSyncs: TableRowType[] = syncsData
        .filter((s) => s.folderId === selectedFolderId)
        .map((s) => ({
          ...s,
          type: 'sync' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          folderId: s.folderId || null,
          behavior: s.behavior as SyncBehaviorType,
          destinationConnection: getConnectionInfo(s.destination),
        }));

      return [...childFolders, ...folderSyncs];
    }
  };

  const tableData = getTableData();

  // Update getSelectedItems function to separate syncs from folders:
  const getSelectedItems = () => {
    return tableData.filter((item) => selectedRows[item.id]);
  };

  const getSelectedSyncs = () => {
    return tableData.filter(
      (item) => selectedRows[item.id] && item.type === 'sync'
    );
  };

  const selectedItems = getSelectedItems();
  const selectedSyncs = getSelectedSyncs();

  // Update folder breadcrumbs when selectedFolderId changes
  useEffect(() => {
    const folderPath = getFolderPath(selectedFolderId);

    // Always start with "All Syncs" as the root
    const folderBreadcrumbs: FolderBreadcrumb[] = [
      {
        id: null,
        name: 'All Syncs',
        onClick: handleFolderSelect,
        siblings: undefined,
      },
    ];

    // Add folder path if we're in a folder
    if (folderPath.length > 0) {
      const additionalBreadcrumbs = folderPath.map((folder, index) => {
        const siblingFolders = getSiblingFolders(folder.id);
        const hasMultipleSiblings = siblingFolders.length > 1;

        return {
          id: folder.id,
          name: folder.name,
          onClick: handleFolderSelect,
          siblings: hasMultipleSiblings ? siblingFolders : undefined,
        };
      });

      folderBreadcrumbs.push(...additionalBreadcrumbs);
    }

    setFolderBreadcrumbs(folderBreadcrumbs);
  }, [
    selectedFolderId,
    getFolderPath,
    handleFolderSelect,
    setFolderBreadcrumbs,
    clearFolderBreadcrumbs,
  ]);

  useEffect(() => {
    clearBreadcrumbs();
    clearFolderBreadcrumbs();
  }, [clearBreadcrumbs, clearFolderBreadcrumbs]);

  // Add cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      clearFolderBreadcrumbs();
    };
  }, [clearFolderBreadcrumbs]);

  const toolbarConfig = useSyncToolbar({
    selectedFolderId,
    selectedItems: selectedItems as unknown as SyncTableRowType[],
    selectedSyncs: selectedSyncs as unknown as SyncTableRowType[],
    onGoUp: handleGoUp,
    onDeleteItems: () => {
      // Handle delete logic
      console.log('Delete items:', selectedItems);
    },
    onRunSyncs: () => {
      // Handle run syncs logic
      console.log('Run syncs:', selectedSyncs);
    },
    onPauseSyncs: () => {
      // Handle pause syncs logic
      console.log('Pause syncs:', selectedSyncs);
    },
    onRefreshSyncs: () => {
      // Handle refresh syncs logic
      console.log('Refresh syncs');
    },
    onSelectionCleared: () => {
      setSelectedRows({});
    },
    onSubscribeToSyncs: () => {
      // Handle subscribe to syncs logic
      console.log('Subscribe to syncs:', selectedSyncs);
    },
    foldersData: syncsFoldersData,
  });

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={selectedFolderId ? '' : 'Syncs'}
        button={{
          label: 'New Sync',
          onClick: () => navigate(`/${version}/syncs/new`),
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col grow h-full">
          <TableToolbar {...toolbarConfig} />

          <DataTable
            columns={columns}
            data={tableData}
            onFolderClick={handleFolderSelect}
            onRowSelectionChange={setSelectedRows}
            selectedRows={selectedRows}
          />
        </div>
      </div>
    </div>
  );
}
