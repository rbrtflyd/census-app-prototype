import { EnrichEnhanceProvider as OriginalProvider } from '~/routes/_app.($version).datasets.$id/EnrichEnhanceHub/context/EnrichEnhanceContext';

export function EnrichEnhanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
