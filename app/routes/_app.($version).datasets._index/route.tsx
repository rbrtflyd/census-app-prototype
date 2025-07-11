import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';

import { foldersData } from '~/db/data/datasets/datasets_data';
import { Input } from '~/components/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '~/components/ui/breadcrumb';

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
          <div className="flex flex-row gap-2 px-6 py-3 border-b border-base">
            <Breadcrumb>
              <BreadcrumbItem>
                {selectedFolderId ? (
                  <BreadcrumbLink>{currentFolder?.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbLink>Datasets</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Breadcrumb>
            <Input placeholder="Search datasets" />
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
