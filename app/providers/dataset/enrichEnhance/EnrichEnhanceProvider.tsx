import { EnrichEnhanceProvider as OriginalProvider } from '~/contexts/EnrichEnhanceContext';

export function EnrichEnhanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
