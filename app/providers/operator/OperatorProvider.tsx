import { OperatorProvider as OriginalProvider } from '~/contexts/OperatorContext';

export function OperatorProvider({ children }: { children: React.ReactNode }) {
  return <OriginalProvider>{children}</OriginalProvider>;
}
