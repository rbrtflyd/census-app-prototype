import { useMemo } from 'react';
import {
  faArrowTurnUp,
  faFolder,
  faArrowsUpDownLeftRight,
  faTrash,
  faPlay,
  faPause,
  faRefresh,
  faBell,
} from '@fortawesome/pro-solid-svg-icons';
import type {
  ToolbarAction,
  ToolbarActionGroup,
} from '~/components/Tables/TableToolbar/TableToolbar';

export type SyncTableRowType = {
  id: string;
  name: string;
  type: 'sync' | 'folder';
  status?: string;
  datasetId?: number | string;
  destinationId?: number | string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string | null;
  folderId: string | null;
};

interface UseSyncToolbarProps {
  selectedFolderId: string | null;
  selectedItems: SyncTableRowType[];
  selectedSyncs: SyncTableRowType[];
  onGoUp: () => void;
  onDeleteItems: () => void;
  onRunSyncs: () => void;
  onPauseSyncs: () => void;
  onRefreshSyncs: () => void;
  onSubscribeToSyncs: () => void;
  onSelectionCleared: () => void;
  foldersData: any[];
}

export function useSyncToolbar({
  selectedFolderId,
  selectedItems,
  selectedSyncs,
  onGoUp,
  onDeleteItems,
  onRunSyncs,
  onPauseSyncs,
  onRefreshSyncs,
  onSubscribeToSyncs,
  onSelectionCleared,
  foldersData,
}: UseSyncToolbarProps) {
  const leftActions: ToolbarAction[] = useMemo(
    () => [
      {
        id: 'create-folder',
        label: 'New Folder',
        icon: faFolder,
        dialogType: 'create-folder',
      },
    ],
    []
  );

  const leftActionGroups: ToolbarActionGroup[] = useMemo(
    () => [
      {
        id: 'item-actions',
        actions: [
          {
            id: 'move-items',
            label: 'Move',
            icon: faArrowsUpDownLeftRight,
            dialogType: 'move-items',
            disabled: selectedItems.length === 0,
          },
          {
            id: 'delete-items',
            label: 'Delete',
            icon: faTrash,
            onClick: onDeleteItems,
            disabled: selectedItems.length === 0,
          },
        ],
      },
      {
        id: 'sync-actions',
        actions: [
          {
            id: 'subscribe-to-syncs',
            label: 'Subscribe',
            icon: faBell,
            onClick: onSubscribeToSyncs,
          },
        ],
      },
    ],
    [
      selectedItems,
      selectedSyncs,
      onDeleteItems,
      onRunSyncs,
      onPauseSyncs,
      onRefreshSyncs,
    ]
  );

  return {
    leftActions,
    leftActionGroups,
    showSearch: true,
    searchPlaceholder: 'Search syncs',
    selectedItems,
    foldersData,
    onSelectionCleared,
  };
}
