import { ReactNode } from 'react';
import { composeProviders } from './compose/compose';
import { EnrichEnhanceProvider } from './enrichEnhance/EnrichEnhanceProvider';
import { NewConnectionProvider } from './connection/NewConnectionProvider';
import { BreadcrumbProvider } from './breadcrumb/BreadcrumbProvider';
import { OperatorProvider } from './operator/OperatorProvider';
import { NewDatasetProvider } from './dataset/NewDatasetProvider';

const providers = [
  EnrichEnhanceProvider,
  BreadcrumbProvider,
  OperatorProvider,
  NewConnectionProvider,
  NewDatasetProvider,
];

export function RootProvider({ children }: { children: ReactNode }) {
  return composeProviders(providers, children);
}
