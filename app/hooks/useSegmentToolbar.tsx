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

export type SegmentTableRowType = {
  id: string | number;
  name: string;
  type: 'segment' | 'folder';
  sourceId?: number | string;
  destinations?: number[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string | null;
  folderId: string | null;
  rowCount?: number;
  columnCount?: number;
  tags?: string[];
};

interface UseSegmentToolbarProps {
  selectedFolderId: string | null;
  selectedItems: SegmentTableRowType[];
  selectedSegments: SegmentTableRowType[];
  onGoUp: () => void;
  onDeleteItems: () => void;
  onRunSegments: () => void;
  onPauseSegments: () => void;
  onRefreshSegments: () => void;
  onSubscribeToSegments: () => void;
  onSelectionCleared: () => void;
  foldersData: any[];
}

export function useSegmentToolbar({
  selectedFolderId,
  selectedItems,
  selectedSegments,
  onGoUp,
  onDeleteItems,
  onRunSegments,
  onPauseSegments,
  onRefreshSegments,
  onSubscribeToSegments,
  onSelectionCleared,
  foldersData,
}: UseSegmentToolbarProps) {
  const leftActions: ToolbarAction[] = useMemo(
    () => [
      {
        id: 'go-up',
        label: '',
        icon: faArrowTurnUp,
        onClick: onGoUp,
        disabled: !selectedFolderId,
        title: 'Go up to parent folder',
      },
      {
        id: 'create-folder',
        label: 'New Folder',
        icon: faFolder,
        dialogType: 'create-folder',
      },
    ],
    [selectedFolderId, onGoUp]
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
        id: 'segment-actions',
        actions: [
          {
            id: 'run-segments',
            label: 'Run',
            icon: faPlay,
            onClick: onRunSegments,
            disabled: selectedSegments.length === 0,
            variant: 'primary' as const,
          },
          {
            id: 'pause-segments',
            label: 'Pause',
            icon: faPause,
            onClick: onPauseSegments,
            disabled: selectedSegments.length === 0,
          },
          {
            id: 'refresh-segments',
            label: 'Refresh',
            icon: faRefresh,
            onClick: onRefreshSegments,
          },
          {
            id: 'subscribe-to-segments',
            label: 'Subscribe',
            icon: faBell,
            onClick: onSubscribeToSegments,
          },
        ],
      },
    ],
    [
      selectedItems,
      selectedSegments,
      onDeleteItems,
      onRunSegments,
      onPauseSegments,
      onRefreshSegments,
    ]
  );

  return {
    leftActions,
    leftActionGroups,
    showSearch: true,
    searchPlaceholder: 'Search segments',
    selectedItems,
    foldersData,
    onSelectionCleared,
  };
}
