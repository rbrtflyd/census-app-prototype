import React, { createContext, useContext, useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  items: [],
  setItems: () => {},
});

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export function useBreadcrumbs(items: BreadcrumbItem[]) {
  const { setItems } = useContext(BreadcrumbContext);

  React.useEffect(() => {
    setItems(items);
    return () => setItems([]);
  }, [items]);
}

export function useBreadcrumbItems() {
  const { items } = useContext(BreadcrumbContext);
  return items;
}
