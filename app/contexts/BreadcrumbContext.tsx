import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

type Breadcrumb = {
  label: string;
  href: string;
};

type FolderBreadcrumb = {
  id: string | null;
  name: string;
  onClick?: (folderId: string | null) => void;
  siblings?: Array<{ id: string; name: string }>;
};

type BreadcrumbContextType = {
  breadcrumbs: Breadcrumb[];
  addBreadcrumb: (breadcrumb: Breadcrumb | Breadcrumb[]) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  clearBreadcrumbs: () => void;
  // Folder-specific breadcrumbs
  folderBreadcrumbs: FolderBreadcrumb[];
  setFolderBreadcrumbs: (folderBreadcrumbs: FolderBreadcrumb[]) => void;
  clearFolderBreadcrumbs: () => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<
    FolderBreadcrumb[]
  >([]);

  const addBreadcrumb = useCallback((breadcrumb: Breadcrumb | Breadcrumb[]) => {
    if (Array.isArray(breadcrumb)) {
      setBreadcrumbs((prev) => [...prev, ...breadcrumb]);
    } else {
      setBreadcrumbs((prev) => [...prev, breadcrumb]);
    }
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  const clearFolderBreadcrumbs = useCallback(() => {
    setFolderBreadcrumbs([]);
  }, []);

  const value = useMemo(
    () => ({
      breadcrumbs,
      addBreadcrumb,
      setBreadcrumbs,
      clearBreadcrumbs,
      folderBreadcrumbs,
      setFolderBreadcrumbs,
      clearFolderBreadcrumbs,
    }),
    [
      breadcrumbs,
      folderBreadcrumbs,
      addBreadcrumb,
      clearBreadcrumbs,
      clearFolderBreadcrumbs,
    ]
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
  }
  return context;
}

export type { FolderBreadcrumb };
