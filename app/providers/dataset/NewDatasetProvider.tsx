import { NewDatasetProvider as OriginalProvider } from '~/contexts/NewDatasetContext';

export function NewDatasetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
