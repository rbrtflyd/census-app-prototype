import { useState, useMemo } from 'react';
import {
  faArrowsUpDownLeftRight,
  faChevronRight,
  faArrowLeft,
} from '@fortawesome/pro-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@radix-ui/themes';
import { toast } from 'sonner';
import { TableRowType } from '~/routes/_app.($version).datasets._index/route';
import { faFolder, faFolderOpen } from '@fortawesome/pro-regular-svg-icons';

interface FolderType {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  system: boolean;
}

export default function MoveTableItemDialog({
  moveFolderDialogOpen,
  setMoveFolderDialogOpen,
  selectedItems,
  foldersData,
  setSelectedRows,
}: {
  moveFolderDialogOpen: boolean;
  setMoveFolderDialogOpen: (open: boolean) => void;
  selectedItems: TableRowType[];
  foldersData: FolderType[];
  setSelectedRows: (rows: Record<string, boolean>) => void;
}) {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    string | null
  >(null);

  // Helper function to get child folders of a parent folder
  const getChildFolders = (parentId: string | null) => {
    return foldersData.filter((folder) => folder.parentId === parentId);
  };

  // Helper function to check if a folder has children
  const hasChildren = (folderId: string) => {
    return getChildFolders(folderId).length > 0;
  };

  // Get current folder path for breadcrumbs
  const getCurrentFolderPath = useMemo(() => {
    if (!currentFolderId) return [];

    const path: FolderType[] = [];
    let folderId = currentFolderId;

    while (folderId) {
      const folder = foldersData.find((f) => f.id === folderId);
      if (!folder) break;
      path.unshift(folder);
      folderId = folder.parentId || '';
    }

    return path;
  }, [currentFolderId, foldersData]);

  // Get folders to display in current view
  const currentFolders = useMemo(() => {
    return getChildFolders(currentFolderId);
  }, [currentFolderId, foldersData]);

  // Handle folder click - either navigate into it or select it as destination
  const handleFolderClick = (folder: FolderType) => {
    if (hasChildren(folder.id)) {
      // Navigate into folder if it has children
      setCurrentFolderId(folder.id);
      setSelectedDestinationId(null); // Clear selection when navigating
    } else {
      // Select folder as destination if it has no children
      setSelectedDestinationId(folder.id);
    }
  };

  // Handle back navigation
  const handleGoBack = () => {
    if (!currentFolderId) return;

    const currentFolder = foldersData.find((f) => f.id === currentFolderId);
    setCurrentFolderId(currentFolder?.parentId || null);
    setSelectedDestinationId(null); // Clear selection when navigating
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (folderId: string | null) => {
    setCurrentFolderId(folderId);
    setSelectedDestinationId(null); // Clear selection when navigating
  };

  // Handle move action
  const handleMove = () => {
    if (!selectedDestinationId) return;

    setTimeout(() => {
      const destinationFolder = foldersData.find(
        (f) => f.id === selectedDestinationId
      );
      toast.success(
        `Moved ${selectedItems.length} item${
          selectedItems.length !== 1 ? 's' : ''
        } to ${destinationFolder?.name || 'folder'}`
      );
      setMoveFolderDialogOpen(false);
      setSelectedRows({});
      // Reset dialog state
      setCurrentFolderId(null);
      setSelectedDestinationId(null);
    }, 500);
  };

  // Reset dialog state when dialog closes
  const handleDialogChange = (open: boolean) => {
    setMoveFolderDialogOpen(open);
    if (!open) {
      setCurrentFolderId(null);
      setSelectedDestinationId(null);
    }
  };

  return (
    <Dialog
      open={moveFolderDialogOpen}
      onOpenChange={handleDialogChange}>
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
      <DialogContent className="max-w-md flex flex-col h-[550px]">
        <DialogHeader>
          {/* Header */}
          <div className="flex flex-col gap-3 leading-none">
            <Text className="font-medium">
              Move {selectedItems.length} item
              {selectedItems.length !== 1 ? 's' : ''} to...
            </Text>

            {/* Navigation breadcrumbs */}

            <div className="flex items-center gap-2 text-xs text-lighter">
              <button
                onClick={() => handleBreadcrumbClick(null)}
                className="hover:text-slate-900 transition-colors">
                All Folders
              </button>
              {getCurrentFolderPath.map((folder, index) => (
                <div
                  key={folder.id}
                  className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[8px] leading-none"
                  />
                  <button
                    onClick={() => handleBreadcrumbClick(folder.id)}
                    className="hover:text-slate-900 transition-colors">
                    {folder.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2 h-full p-2 overflow-y-auto">
          {currentFolders.length === 0 ? (
            <div className="text-center py-4 text-slate-500">
              <Text>No folders available</Text>
            </div>
          ) : (
            currentFolders.map((folder) => {
              const folderHasChildren = hasChildren(folder.id);
              const isSelected = selectedDestinationId === folder.id;

              return (
                <button
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className={`flex flex-row gap-2 items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors ${
                    isSelected ? 'bg-plum-100' : ''
                  }`}>
                  <div className="flex flex-row gap-2 items-center">
                    <FontAwesomeIcon
                      icon={isSelected ? faFolderOpen : faFolder}
                      className={`text-xxs ${
                        isSelected ? 'text-plum-500' : ''
                      }`}
                    />
                    <Text
                      className={isSelected ? 'text-plum-500 font-medium' : ''}>
                      {folder.name}
                    </Text>
                  </div>
                  {folderHasChildren && (
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xs text-slate-400"
                    />
                  )}
                </button>
              );
            })
          )}
        </div>

        <DialogFooter>
          <div className="flex flex-row justify-between w-full">
            <Button
              variant="ghost"
              size="small">
              New Folder
            </Button>
            <div className="flex flex-row gap-4">
              <Button
                variant="secondary"
                size="small">
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={!selectedDestinationId}
                onClick={handleMove}
                size="small">
                Move
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
