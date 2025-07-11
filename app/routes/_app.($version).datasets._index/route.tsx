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

  // Filter folders based on selection - show only current folder if one is selected
  const filteredFolders = selectedFolderId
    ? foldersData.filter((f) => f.id === selectedFolderId)
    : foldersData;

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
        <div className="flex flex-col gap-4 grow h-full">
          <div className="flex flex-col gap-4">
            {selectedFolderId && (
              <button
                onClick={handleBackToAll}
                className="text-left text-blue-600 hover:text-blue-800 underline">
                ← Back to All Folders
              </button>
            )}
            {filteredFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() =>
                  handleFolderSelect(selectedFolderId ? null : folder.id)
                }
                className="text-left">
                <h2>{folder.name}</h2>
              </button>
            ))}
          </div>
          <DataTable
            columns={columns}
            data={filteredDatasets}
          />
        </div>
      </div>
    </div>
  );
}
