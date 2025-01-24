import { NewConnectionProvider as OriginalProvider } from '~/contexts/NewConnectionContext';

export function NewConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
