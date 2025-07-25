import { useMemo } from 'react';
import { faTrash, faPlug, faRefresh } from '@fortawesome/pro-solid-svg-icons';
import type {
  ToolbarAction,
  ToolbarActionGroup,
} from '~/components/Tables/TableToolbar/TableToolbar';

interface UseConnectionToolbarProps {
  selectedItems: any[];
  onDeleteItems: () => void;
  onTestConnections: () => void;
  onRefreshConnections: () => void;
}

export function useConnectionToolbar({
  selectedItems,
  onDeleteItems,
  onTestConnections,
  onRefreshConnections,
}: UseConnectionToolbarProps) {
  const leftActionGroups: ToolbarActionGroup[] = useMemo(
    () => [
      {
        id: 'connection-actions',
        actions: [
          {
            id: 'test-connections',
            label: 'Test Connection',
            icon: faPlug,
            onClick: onTestConnections,
            disabled: selectedItems.length === 0,
          },
          {
            id: 'refresh-connections',
            label: 'Refresh',
            icon: faRefresh,
            onClick: onRefreshConnections,
          },
          {
            id: 'delete-connections',
            label: 'Delete',
            icon: faTrash,
            onClick: onDeleteItems,
            disabled: selectedItems.length === 0,
          },
        ],
      },
    ],
    [selectedItems, onDeleteItems, onTestConnections, onRefreshConnections]
  );

  return {
    leftActionGroups,
    showSearch: true,
    searchPlaceholder: 'Search connections',
  };
}
