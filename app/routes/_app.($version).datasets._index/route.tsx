import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';

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
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

// Create a union type for table rows
export type TableRowType =
  | (DatasetType & { type: 'dataset' })
  | {
      type: 'folder';
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };

export default function Datasets() {
  const { clearBreadcrumbs } = useBreadcrumbs();
  const { version } = useParams();
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Create combined data for the table
  const getTableData = (): TableRowType[] => {
    const tableData: TableRowType[] = [];

    if (!selectedFolderId) {
      // At root level: show folders first, then datasets without folders
      const folderRows: TableRowType[] = foldersData.map((folder) => ({
        type: 'folder' as const,
        id: folder.id,
        name: folder.name,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
      }));

      const rootDatasets: TableRowType[] = datasets
        .filter((d) => !d.folderId)
        .map((d) => ({ ...d, type: 'dataset' as const }));

      return [...folderRows, ...rootDatasets];
    } else {
      // In a folder: show only datasets from that folder
      return datasets
        .filter((d) => d.folderId === selectedFolderId)
        .map((d) => ({ ...d, type: 'dataset' as const }));
    }
  };

  const tableData = getTableData();

  // Get current folder name for header
  const currentFolder = selectedFolderId
    ? foldersData.find((f) => f.id === selectedFolderId)
    : null;

  useEffect(() => {
    clearBreadcrumbs();
  }, []);

  const handleFolderSelect = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  const handleBackToAll = () => {
    setSelectedFolderId(null);
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
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BreadcrumbLink>All Datasets</BreadcrumbLink>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleBackToAll}>
                          All Datasets
                        </DropdownMenuItem>
                        {foldersData.map((folder) => (
                          <DropdownMenuItem
                            key={folder.id}
                            onClick={() => handleFolderSelect(folder.id)}>
                            {folder.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  {selectedFolderId && (
                    <>
                      <BreadcrumbSeparator />

                      <BreadcrumbItem>
                        {selectedFolderId ? (
                          <BreadcrumbLink>{currentFolder?.name}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbLink>Datasets</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
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
            </div>
            <div>
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
