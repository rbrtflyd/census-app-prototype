import { useEffect, useState, useCallback } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType, FolderType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { foldersData } from '~/db/data/datasets/datasets_data';

import type { FolderBreadcrumb } from '~/contexts/BreadcrumbContext';

import TableToolbar from '~/components/Tables/TableToolbar/TableToolbar';
import { useDatasetToolbar } from '~/hooks/useDatasetToolbar';

// Create a union type for table rows
export type TableRowType =
  | (DatasetType & { type: 'dataset' })
  | (FolderType & { type: 'folder' });

export default function Datasets() {
  const { clearBreadcrumbs, setFolderBreadcrumbs, clearFolderBreadcrumbs } =
    useBreadcrumbs();
  const { version } = useParams();
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [moveFolderDialogOpen, setMoveFolderDialogOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  // Navigation history state
  const [navigationHistory, setNavigationHistory] = useState<(string | null)[]>(
    [null]
  );
  const [historyIndex, setHistoryIndex] = useState(0);

  // Helper function to get child folders of a parent folder
  const getChildFolders = (parentId: string | null) => {
    return foldersData.filter((folder) => folder.parentId === parentId);
  };

  // Helper function to get sibling folders (folders at the same level)
  const getSiblingFolders = (folderId: string) => {
    const folder = foldersData.find((f) => f.id === folderId);
    if (!folder) return [];
    return foldersData.filter((f) => f.parentId === folder.parentId);
  };

  const handleFolderSelect = useCallback(
    (folderId: string | null) => {
      setSelectedFolderId(folderId);

      // Update navigation history
      setNavigationHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        if (newHistory[newHistory.length - 1] !== folderId) {
          newHistory.push(folderId);
          setHistoryIndex(newHistory.length - 1);
        }
        return newHistory;
      });
    },
    [historyIndex]
  );

  // Hierarchical up navigation
  const handleGoUp = () => {
    if (!selectedFolderId) return;

    const currentFolder = foldersData.find((f) => f.id === selectedFolderId);
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

      const folder = foldersData.find((f) => f.id === folderId);
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
      // At root level: show top-level folders first, then datasets without folders
      const rootFolders: TableRowType[] = getChildFolders(null).map(
        (folder) => ({
          type: 'folder' as const,
          id: folder.id,
          name: folder.name,
          createdAt: folder.createdAt,
          updatedAt: folder.updatedAt,
          parentId: folder.parentId,
        })
      );

      const rootDatasets: TableRowType[] = datasets
        .filter((d) => !d.folderId)
        .map((d) => ({ ...d, type: 'dataset' as const }));

      return [...rootFolders, ...rootDatasets];
    } else {
      // In a folder: show child folders first, then datasets from this folder
      const childFolders: TableRowType[] = getChildFolders(
        selectedFolderId
      ).map((folder) => ({
        type: 'folder' as const,
        id: folder.id,
        name: folder.name,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
        parentId: folder.parentId,
      }));

      const folderDatasets: TableRowType[] = datasets
        .filter((d) => d.folderId === selectedFolderId)
        .map((d) => ({ ...d, type: 'dataset' as const }));

      return [...childFolders, ...folderDatasets];
    }
  };

  const tableData = getTableData();

  // Update getSelectedItems function to separate datasets from folders:
  const getSelectedItems = () => {
    return tableData.filter((item) => selectedRows[item.id]);
  };

  const getSelectedDatasets = () => {
    return tableData.filter(
      (item) => selectedRows[item.id] && item.type === 'dataset'
    );
  };

  const selectedItems = getSelectedItems();
  const selectedDatasets = getSelectedDatasets();

  // Update folder breadcrumbs when selectedFolderId changes
  useEffect(() => {
    const folderPath = getFolderPath(selectedFolderId);

    // Always start with "All Datasets" as the root
    const folderBreadcrumbs: FolderBreadcrumb[] = [
      {
        id: null,
        name: 'All Datasets',
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

  const toolbarConfig = useDatasetToolbar({
    selectedFolderId,
    selectedItems,
    selectedDatasets,
    onGoUp: handleGoUp,
    onDeleteItems: () => {
      // Handle delete logic
      console.log('Delete items:', selectedItems);
    },
    onDeduplicate: () => {
      // Handle deduplicate logic
      console.log('Deduplicate datasets:', selectedDatasets);
    },
    onEnrichEnhance: () => {
      // Handle enrich & enhance logic
      console.log('Enrich & enhance datasets:', selectedDatasets);
    },
    onSelectionCleared: () => setSelectedRows({}),
    foldersData,
  });

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={selectedFolderId ? '' : 'Datasets'}
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
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
