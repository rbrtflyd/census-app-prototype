import { BreadcrumbProvider as OriginalProvider } from '~/contexts/BreadcrumbContext';

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
