import { useEffect, useState, useCallback } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { SegmentType, FolderType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import {
  segmentsData,
  segmentFoldersData,
} from '~/db/data/segments/segments_data';
import TableToolbar from '~/components/Tables/TableToolbar/TableToolbar';
import {
  useSegmentToolbar,
  type SegmentTableRowType,
} from '~/hooks/useSegmentToolbar';
import type { FolderBreadcrumb } from '~/contexts/BreadcrumbContext';

// Create enhanced segment type
export type EnhancedSegmentType = SegmentType & {
  type: 'segment';
};

export type TableRowType =
  | EnhancedSegmentType
  | (FolderType & { type: 'folder' });

export default function Segments() {
  const { clearBreadcrumbs, setFolderBreadcrumbs, clearFolderBreadcrumbs } =
    useBreadcrumbs();

  const { version } = useParams();
  const navigate = useNavigate();
  const { segments } = useOutletContext() as {
    segments: SegmentType[];
  };

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Helper function to get child folders of a parent folder
  const getChildFolders = (parentId: string | null) => {
    return segmentFoldersData.filter((folder) => folder.parentId === parentId);
  };

  // Helper function to get sibling folders (folders at the same level)
  const getSiblingFolders = (folderId: string) => {
    const folder = segmentFoldersData.find((f) => f.id === folderId);
    if (!folder) return [];
    return segmentFoldersData.filter((f) => f.parentId === folder.parentId);
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

    const currentFolder = segmentFoldersData.find(
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

      const folder = segmentFoldersData.find((f) => f.id === folderId);
      if (!folder) return [];

      const path = [{ id: folder.id, name: folder.name }];
      if (folder.parentId) {
        path.unshift(...getFolderPath(folder.parentId));
      }

      return path;
    },
    []
  );

  // Create combined data for the table
  const getTableData = (): TableRowType[] => {
    if (!selectedFolderId) {
      // At root level: show top-level folders first, then segments without folders
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

      const rootSegments: TableRowType[] = segmentsData
        .filter((s) => !s.folderId)
        .map((s) => ({
          ...s,
          type: 'segment' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          folderId: s.folderId || null,
        }));

      return [...rootFolders, ...rootSegments];
    } else {
      // In a folder: show child folders first, then segments from this folder
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

      const folderSegments: TableRowType[] = segmentsData
        .filter((s) => s.folderId === selectedFolderId)
        .map((s) => ({
          ...s,
          type: 'segment' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          folderId: s.folderId || null,
        }));

      return [...childFolders, ...folderSegments];
    }
  };

  const tableData = getTableData();

  // Update getSelectedItems function to separate segments from folders:
  const getSelectedItems = () => {
    return tableData.filter((item) => selectedRows[item.id]);
  };

  const getSelectedSegments = () => {
    return tableData.filter(
      (item) => selectedRows[item.id] && item.type === 'segment'
    );
  };

  const selectedItems = getSelectedItems();
  const selectedSegments = getSelectedSegments();

  // Update folder breadcrumbs when selectedFolderId changes
  useEffect(() => {
    const folderPath = getFolderPath(selectedFolderId);

    // Always start with "All Segments" as the root
    const folderBreadcrumbs: FolderBreadcrumb[] = [
      {
        id: null,
        name: 'All Segments',
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

  const toolbarConfig = useSegmentToolbar({
    selectedFolderId,
    selectedItems: selectedItems as unknown as SegmentTableRowType[],
    selectedSegments: selectedSegments as unknown as SegmentTableRowType[],
    onGoUp: handleGoUp,
    onDeleteItems: () => {
      // Handle delete logic
      console.log('Delete items:', selectedItems);
    },
    onRunSegments: () => {
      // Handle run segments logic
      console.log('Run segments:', selectedSegments);
    },
    onPauseSegments: () => {
      // Handle pause segments logic
      console.log('Pause segments:', selectedSegments);
    },
    onRefreshSegments: () => {
      // Handle refresh segments logic
      console.log('Refresh segments');
    },
    onSelectionCleared: () => {
      setSelectedRows({});
    },
    onSubscribeToSegments: () => {
      // Handle subscribe to segments logic
      console.log('Subscribe to segments:', selectedSegments);
    },
    foldersData: segmentFoldersData,
  });

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={selectedFolderId ? '' : 'Segments'}
        button={{
          label: 'New Segment',
          onClick: () => navigate(`/${version}/segments/new`),
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
