import React, { createContext, useContext, ReactNode } from 'react';
import { useBreadcrumb, BreadcrumbItem } from '~/hooks/useBreadcrumb';

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  addBreadcrumb: (newItem: BreadcrumbItem) => void;
  updateBreadcrumb: (
    index: number,
    updatedItem: Partial<BreadcrumbItem>
  ) => void;
  removeBreadcrumb: (index: number) => void;
  clearBreadcrumbs: () => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const breadcrumbHook = useBreadcrumb();

  return (
    <BreadcrumbContext.Provider value={breadcrumbHook}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbContext = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error(
      'useBreadcrumbContext must be used within a BreadcrumbProvider'
    );
  }
  return context;
};
