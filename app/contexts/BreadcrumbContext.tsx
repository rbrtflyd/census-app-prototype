import React, { createContext, useContext, useMemo, useState } from 'react';

type Breadcrumb = {
  label: string;
  href: string;
};

type BreadcrumbContextType = {
  breadcrumbs: Breadcrumb[];
  addBreadcrumb: (breadcrumb: Breadcrumb | Breadcrumb[]) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  clearBreadcrumbs: () => void;
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

  const addBreadcrumb = (breadcrumb: Breadcrumb | Breadcrumb[]) => {
    if (Array.isArray(breadcrumb)) {
      setBreadcrumbs((prev) => [...prev, ...breadcrumb]);
    } else {
      setBreadcrumbs((prev) => [...prev, breadcrumb]);
    }
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  const value = useMemo(
    () => ({ breadcrumbs, addBreadcrumb, setBreadcrumbs, clearBreadcrumbs }),
    [breadcrumbs, addBreadcrumb, clearBreadcrumbs]
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
