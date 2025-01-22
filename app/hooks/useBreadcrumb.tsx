import { useEffect } from 'react';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';

export function useBreadcrumbs(items: Array<{ label: string; href: string }>) {
  const { setBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs(items);
    return () => setBreadcrumbs([]);
  }, [items, setBreadcrumbs]);
}
