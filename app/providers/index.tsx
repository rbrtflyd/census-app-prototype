import { ReactNode } from 'react';
import { composeProviders } from './compose/compose';
import { EnrichEnhanceProvider } from './dataset/enrichEnhance/EnrichEnhanceProvider';
import { NewConnectionProvider } from './connection/NewConnectionProvider';
import { BreadcrumbProvider } from './breadcrumb/BreadcrumbProvider';
import { OperatorProvider } from './operator/OperatorProvider';
import { NewDatasetProvider } from './dataset/newDataset/NewDatasetProvider';
import { SettingsProvider } from './settings/SettingsProvider';

const providers = [
  EnrichEnhanceProvider,
  BreadcrumbProvider,
  OperatorProvider,
  NewConnectionProvider,
  NewDatasetProvider,
  SettingsProvider,
];

export function RootProvider({ children }: { children: ReactNode }) {
  return composeProviders(providers, children);
}
