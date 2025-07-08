import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import { useNavigate } from 'react-router-dom';
import type { DatasetType } from '../../db/types';
import { columns } from './listing-columns';
import { DataTable } from './listing-table';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { SimpleFolderNavigation } from '~/components/Navigation/FolderNavigation/FolderNavigation';
import { foldersData } from '~/db/data/datasets/datasets_data';

export default function Datasets() {
  const { clearBreadcrumbs } = useBreadcrumbs();
  const { version } = useParams();
  const navigate = useNavigate();
  const { datasets } = useOutletContext() as { datasets: DatasetType[] };

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Filter datasets based on selected folder
  const filteredDatasets = selectedFolderId
    ? datasets.filter((d) => d.folderId === selectedFolderId)
    : datasets;

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

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title={currentFolder ? currentFolder.name : 'Datasets'}
        button={{
          label: 'New Dataset',
          onClick: () => navigate(`/${version}/datasets/new/step1`),
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <SimpleFolderNavigation
          folders={foldersData}
          datasets={datasets}
          onFolderSelect={handleFolderSelect}
          selectedFolderId={selectedFolderId}
        />

        <div className="flex flex-col gap-4 grow h-full">
          <DataTable
            columns={columns}
            data={filteredDatasets}
          />
        </div>
      </div>
    </div>
  );
}
