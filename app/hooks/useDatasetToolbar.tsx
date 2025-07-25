import { useMemo } from 'react';
import {
  faArrowTurnUp,
  faFolder,
  faArrowsUpDownLeftRight,
  faTrash,
  faArrowsMinimize,
  faSparkles,
} from '@fortawesome/pro-solid-svg-icons';
import type {
  ToolbarAction,
  ToolbarActionGroup,
} from '~/components/Tables/TableToolbar/TableToolbar';
import type { TableRowType } from '~/routes/_app.($version).datasets._index/route';

interface UseDatasetToolbarProps {
  selectedFolderId: string | null;
  selectedItems: TableRowType[];
  selectedDatasets: TableRowType[];
  onGoUp: () => void;
  onDeleteItems: () => void;
  onDeduplicate: () => void;
  onEnrichEnhance: () => void;
  onSelectionCleared: () => void;
  foldersData: any[];
}

export function useDatasetToolbar({
  selectedFolderId,
  selectedItems,
  selectedDatasets,
  onGoUp,
  onDeleteItems,
  onDeduplicate,
  onEnrichEnhance,
  onSelectionCleared,
  foldersData,
}: UseDatasetToolbarProps) {
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
        id: 'dataset-actions',
        actions: [
          {
            id: 'deduplicate',
            label: 'Deduplicate',
            icon: faArrowsMinimize,
            onClick: onDeduplicate,
            disabled: selectedDatasets.length === 0,
          },
          {
            id: 'enrich-enhance',
            label: 'Enrich & Enhance',
            icon: faSparkles,
            onClick: onEnrichEnhance,
            disabled: selectedDatasets.length === 0,
            variant: 'fancy' as const,
          },
        ],
      },
    ],
    [
      selectedItems,
      selectedDatasets,
      onDeleteItems,
      onDeduplicate,
      onEnrichEnhance,
    ]
  );

  return {
    leftActions,
    leftActionGroups,
    showSearch: true,
    searchPlaceholder: 'Search datasets',
    selectedItems,
    foldersData,
    onSelectionCleared,
  };
}
