import { useState, useCallback } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function useBreadcrumb(initialItems: BreadcrumbItem[] = []) {
  const [items, setItems] = useState<BreadcrumbItem[]>(initialItems);

  const addBreadcrumb = useCallback((newItem: BreadcrumbItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  }, []);

  const updateBreadcrumb = useCallback(
    (index: number, updatedItem: Partial<BreadcrumbItem>) => {
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index ? { ...item, ...updatedItem } : item
        )
      );
    },
    []
  );

  const removeBreadcrumb = useCallback((index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addBreadcrumb,
    updateBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
  };
}
