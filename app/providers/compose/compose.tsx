import { ReactNode } from 'react';

export const composeProviders = (
  providers: Array<React.ComponentType<{ children: ReactNode }>>,
  children: ReactNode
) => {
  return providers.reduceRight(
    (child, Provider) => <Provider>{child}</Provider>,
    children
  );
};
