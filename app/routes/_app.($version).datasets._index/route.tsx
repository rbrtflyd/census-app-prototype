import { useEffect, useState, useCallback } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { foldersData } from '~/db/data/datasets/datasets_data';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
} from '~/components/ui';
import { Text } from '@radix-ui/themes';
import type { FolderBreadcrumb } from '~/contexts/BreadcrumbContext';
import {
  faArrowLeft,
  faPlus,
  faArrowUp,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsMinimize,
  faArrowsUpDownLeftRight,
  faArrowTurnUp,
  faFolder,
  faSparkles,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import { toast } from 'sonner';
import CreateNewFolderDialog from '~/components/Dialogs/FolderDialogs/CreateNewFolderDialog';

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

  const getSelectedItems = () => {
    return tableData.filter((item) => selectedRows[item.id]);
  };

  const selectedItems = getSelectedItems();

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
        title={selectedFolderId ? '' : 'Datasets'}
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col grow h-full">
          <div className="flex flex-row items-center gap-2 px-6 py-3 border-b border-base justify-between">
            <div className="flex flex-row gap-2.5 items-center">
              {/* Up/Parent Folder Button */}
              <Button
                onClick={handleGoUp}
                variant="secondary"
                size="small"
                disabled={!selectedFolderId}
                title="Go up to parent folder">
                <FontAwesomeIcon
                  icon={faArrowTurnUp}
                  className="text-xxs"
                />
              </Button>
              <CreateNewFolderDialog
                createFolderDialogOpen={createFolderDialogOpen}
                setCreateFolderDialogOpen={setCreateFolderDialogOpen}
              />
              {selectedItems.length > 0 && (
                <div className="flex flex-row items-center gap-2">
                  <div className="h-7 w-px bg-slate-75 mx-2" />
                  <Text className="text-sm text-muted-foreground">
                    {selectedItems.length} selected
                  </Text>

                  <Button
                    variant="secondary"
                    size="small"
                    disabled={selectedItems.length === 0}>
                    <FontAwesomeIcon
                      icon={faArrowsMinimize}
                      className="mr-2 text-xxs"
                    />
                    Deduplicate
                  </Button>
                  <Button
                    variant="fancy"
                    size="small"
                    disabled={selectedItems.length === 0}>
                    <FontAwesomeIcon
                      icon={faSparkles}
                      className="mr-2 text-xxs"
                    />
                    Enrich & Enhance
                  </Button>
                  <div className="h-7 w-px bg-slate-75 mx-2" />
                  <Dialog
                    open={moveFolderDialogOpen}
                    onOpenChange={setMoveFolderDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="small"
                        disabled={selectedItems.length === 0}>
                        <FontAwesomeIcon
                          icon={faArrowsUpDownLeftRight}
                          className="mr-2 text-xxs"
                        />
                        Move
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-4 flex flex-col gap-4 *:flex">
                      <div className="flex flex-col gap-1 leading-none">
                        <Text className="font-medium">
                          Move {selectedItems.length} item
                          {selectedItems.length !== 1 ? 's' : ''}
                        </Text>
                        <Text className="text-sm text-muted-foreground">
                          Selected:{' '}
                          {selectedItems.map((item) => item.name).join(', ')}
                        </Text>
                      </div>
                      <div className="flex flex-col gap-2">
                        {foldersData.map((folder) => (
                          <button
                            key={folder.id}
                            className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon
                              icon={faFolder}
                              className="text-xxs"
                            />
                            <Text>{folder.name}</Text>
                          </button>
                        ))}
                      </div>
                      <div className="flex-row justify-between">
                        <Button
                          variant="secondary"
                          size="small">
                          New Folder
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setTimeout(() => {
                              toast.success(
                                `Moved ${selectedItems.length} item${
                                  selectedItems.length !== 1 ? 's' : ''
                                }`
                              );
                              setMoveFolderDialogOpen(false);
                              setSelectedRows({});
                            }, 500);
                          }}>
                          <FontAwesomeIcon
                            icon={faArrowsUpDownLeftRight}
                            className="mr-2 text-xxs"
                          />
                          Move Items
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="secondary"
                    size="small"
                    disabled={selectedItems.length === 0}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="mr-2 text-xxs"
                    />
                    Delete
                  </Button>
                </div>
              )}
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
            onRowSelectionChange={setSelectedRows}
            selectedRows={selectedRows}
          />
        </div>
      </div>
    </div>
  );
}
