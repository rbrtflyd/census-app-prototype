import React from 'react';
import { FolderType, DatasetType } from '~/db/types';
import { Button } from '~/components/ui/button';
import { Folder, Database } from 'lucide-react';

interface SimpleFolderNavigationProps {
  folders: FolderType[];
  datasets: DatasetType[];
  onFolderSelect: (folderId: string | null) => void;
  selectedFolderId: string | null;
}

export const SimpleFolderNavigation: React.FC<SimpleFolderNavigationProps> = ({
  folders,
  datasets,
  onFolderSelect,
  selectedFolderId,
}) => {
  const getDatasetCountForFolder = (folderId: string | null) => {
    return datasets.filter((d) => d.folderId === folderId).length;
  };

  return (
    <div className="w-80 bg-white border-r border-base flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          {/* All Datasets */}
          <Button
            variant={selectedFolderId === null ? 'secondary' : 'ghost'}
            size="small"
            className="w-full justify-start mb-1"
            onClick={() => onFolderSelect(null)}>
            <Database className="h-4 w-4 mr-2" />
            <span className="flex-1 text-left">All Datasets</span>
            <span className="text-xs text-light">
              {getDatasetCountForFolder(null)}
            </span>
          </Button>

          {/* Folders */}
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant={selectedFolderId === folder.id ? 'secondary' : 'ghost'}
              size="small"
              className="w-full justify-start mb-1"
              onClick={() => onFolderSelect(folder.id)}>
              <Folder className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{folder.name}</span>
              <span className="text-xs text-light">
                {getDatasetCountForFolder(folder.id)}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
