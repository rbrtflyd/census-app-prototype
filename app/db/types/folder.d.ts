interface FolderType {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  system: boolean;
}

export { FolderType };
