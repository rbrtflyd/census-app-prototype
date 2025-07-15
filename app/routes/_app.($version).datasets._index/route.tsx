import { useEffect, useState, useCallback } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { foldersData } from '~/db/data/datasets/datasets_data';
import { Button, Input } from '~/components/ui';
import type { FolderBreadcrumb } from '~/contexts/BreadcrumbContext';
import { faArrowLeft, faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsMinimize,
  faArrowsUpDownLeftRight,
  faSparkles,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons';

// Create a union type for table rows
export type TableRowType =
  | (DatasetType & { type: 'dataset' })
  | {
      type: 'folder';
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      parentId?: string | null;
    };

export default function Datasets() {
  const { clearBreadcrumbs, setFolderBreadcrumbs, clearFolderBreadcrumbs } =
    useBreadcrumbs();
  const { version } = useParams();
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

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

  const handleFolderSelect = useCallback((folderId: string | null) => {
    setSelectedFolderId(folderId);
  }, []);

  const handleGoToParent = () => {
    if (!selectedFolderId) {
      // Already at root, do nothing or could navigate elsewhere
      return;
    }

    const currentFolder = foldersData.find((f) => f.id === selectedFolderId);
    if (currentFolder?.parentId) {
      // Go to parent folder
      setSelectedFolderId(currentFolder.parentId);
    } else {
      // Go to root level
      setSelectedFolderId(null);
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

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={selectedFolderId ? '' : 'Datasets'} // Hide title when in folders
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col grow h-full">
          {/* Action bar - keeping the action buttons */}
          <div className="flex flex-row items-center gap-2 px-6 py-3 border-b border-base justify-between">
            <div className="flex flex-row gap-2.5 items-center">
              <Button
                onClick={handleGoToParent}
                variant="secondary"
                size="small"
                disabled={!selectedFolderId}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-xxs"
                />
              </Button>
              <div className="h-7 w-px bg-slate-75 mx-2" />
              <Button
                variant="secondary"
                size="small">
                <FontAwesomeIcon
                  icon={faArrowsMinimize}
                  className="mr-2 text-xxs"
                />
                Deduplicate
              </Button>
              <Button
                variant="fancy"
                size="small">
                <FontAwesomeIcon
                  icon={faSparkles}
                  className="mr-2 text-xxs"
                />
                Enrich & Enhance
              </Button>
              <div className="h-7 w-px bg-slate-75 mx-2" />
              <Button
                variant="secondary"
                size="small">
                <FontAwesomeIcon
                  icon={faArrowsUpDownLeftRight}
                  className="mr-2 text-xxs"
                />
                Move
              </Button>
              <Button
                variant="secondary"
                size="small"
                disabled>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="mr-2 text-xxs"
                />
                Delete
              </Button>
              <Button
                variant="secondary"
                size="small">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 text-xxs"
                />
                New Folder
              </Button>
            </div>

            <Input
              placeholder="Search datasets"
              className="w-80"
            />
          </div>
          <DataTable
            columns={columns}
            data={tableData}
            onFolderClick={handleFolderSelect}
          />
        </div>
      </div>
    </div>
  );
}
