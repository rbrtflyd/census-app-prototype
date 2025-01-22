// import { useEffect, useRef } from 'react';
// import { useBreadcrumbContext } from '~/providers/breadcrumbContext';

// export function useBreadcrumbs(items: Array<{ label: string; href: string }>) {
//   const { setBreadcrumbs } = useBreadcrumbContext();
//   const previousItemsRef = useRef<typeof items>();

//   useEffect(() => {
//     // Deep comparison of the arrays
//     const hasChanged =
//       !previousItemsRef.current || !isEqual(previousItemsRef.current, items);

//     if (hasChanged) {
//       setBreadcrumbs(items);
//       previousItemsRef.current = items;
//     }

//     return () => setBreadcrumbs([]);
//   }, [items, setBreadcrumbs]);
// }
