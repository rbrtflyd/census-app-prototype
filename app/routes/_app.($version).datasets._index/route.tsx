import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { Text } from '@radix-ui/themes';
import { foldersData } from '~/db/data/datasets/datasets_data';
import { Button, Input } from '~/components/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { faCaretDown, faFolder } from '@fortawesome/pro-solid-svg-icons';

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
  const { clearBreadcrumbs } = useBreadcrumbs();
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

  // Helper function to get folder path for breadcrumbs
  const getFolderPath = (
    folderId: string | null
  ): Array<{ id: string; name: string }> => {
    if (!folderId) return [];

    const folder = foldersData.find((f) => f.id === folderId);
    if (!folder) return [];

    const path = [{ id: folder.id, name: folder.name }];
    if (folder.parentId) {
      path.unshift(...getFolderPath(folder.parentId));
    }

    return path;
  };

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

  // Get current folder name for header
  const currentFolder = selectedFolderId
    ? foldersData.find((f) => f.id === selectedFolderId)
    : null;

  // Get folder path for breadcrumbs
  const folderPath = getFolderPath(selectedFolderId);

  useEffect(() => {
    clearBreadcrumbs();
  }, []);

  const handleFolderSelect = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  const handleBackToAll = () => {
    setSelectedFolderId(null);
  };

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={'Datasets'}
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col grow h-full">
          <div className="flex flex-row items-center gap-2 px-6 py-3 border-b border-base justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem
                    onClick={handleBackToAll}
                    className="cursor-pointer">
                    <BreadcrumbLink>All Datasets</BreadcrumbLink>
                  </BreadcrumbItem>

                  {folderPath.map((folder, index) => {
                    const siblingFolders = getSiblingFolders(folder.id);
                    const hasMultipleSiblings = siblingFolders.length > 1;

                    return (
                      <div
                        key={folder.id}
                        className="flex items-center gap-2">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="flex flex-row items-center">
                          {hasMultipleSiblings ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="flex items-center">
                                <BreadcrumbLink className="flex items-center">
                                  <FontAwesomeIcon
                                    icon={faFolder}
                                    className="mr-2"
                                  />
                                  <Text>{folder.name}</Text>
                                  <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className="text-xs ml-2"
                                  />
                                </BreadcrumbLink>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="min-w-48 max-w-90">
                                {siblingFolders.map((siblingFolder) => (
                                  <DropdownMenuItem
                                    key={siblingFolder.id}
                                    onClick={() => {
                                      // Navigate to the sibling folder while preserving the path structure
                                      const pathToParent = getFolderPath(
                                        siblingFolder.parentId
                                      );
                                      const newPath = [
                                        ...pathToParent,
                                        {
                                          id: siblingFolder.id,
                                          name: siblingFolder.name,
                                        },
                                      ];

                                      // If we're switching at a deeper level, we need to navigate to that sibling
                                      // and potentially continue down the same relative path
                                      if (index < folderPath.length - 1) {
                                        // We're switching a parent folder, so just go to the sibling
                                        handleFolderSelect(siblingFolder.id);
                                      } else {
                                        // We're switching the current folder
                                        handleFolderSelect(siblingFolder.id);
                                      }
                                    }}>
                                    <FontAwesomeIcon
                                      icon={faFolder}
                                      className="mr-2 icon-lighter"
                                    />
                                    <Text className="w-full truncate">
                                      {siblingFolder.name}
                                    </Text>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <BreadcrumbLink
                              className="cursor-pointer flex items-center"
                              onClick={() => handleBreadcrumbClick(folder.id)}>
                              <FontAwesomeIcon
                                icon={faFolder}
                                className="mr-2"
                              />
                              <Text>{folder.name}</Text>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </div>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-2 ml-auto">
                <Button
                  variant="secondary"
                  size="small">
                  Move
                </Button>
                <Button
                  variant="secondary"
                  size="small">
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  size="small">
                  New Folder
                </Button>
              </div>
              <Input placeholder="Search datasets" />
            </div>
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
