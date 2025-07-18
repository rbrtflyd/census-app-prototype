import { SyncType, SyncStatusType } from '~/db/types';

const syncsData = [
  {
    id: 1,
    name: 'Daily Sync for Dataset 1',
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 2,
    name: 'Weekly Sync for Dataset 2',
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 3,
    datasetId: 3,
    name: 'Monthly Sync for Dataset 3',
    description: 'Syncs Dataset 3 on the first day of every month',
    behavior: 'update only',
    status: 'failing',
    lastRun: null,
  },
  {
    id: 4,
    datasetId: 4,
    name: 'Hourly Sync for Dataset 4',
    description: 'Syncs Dataset 4 every hour',
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 5,
    datasetId: 5,
    name: 'Hourly Sync for Dataset 5',
    description: 'Syncs Dataset 5 every hour',
    folderId: 'user_syncs',
    behavior: 'update and create',
    status: 'not run',
    lastRun: null,
  },
];

export const syncsFoldersData = [
  {
    id: 'system_syncs',
    name: 'Census System Managed Syncs',
    parentId: null,
    system: true,
  },
  {
    id: 'user_syncs',
    name: 'User Managed Syncs',
    parentId: null,
    system: false,
  },
  {
    id: 'braze',
    name: 'Braze',
    parentId: null,
    system: false,
  },
  {
    id: 'advertising',
    name: 'Advertising',
    parentId: null,
    system: false,
  },
  {
    id: 'google_ads',
    name: 'Google Ads',
    parentId: 'advertising',
    system: false,
  },
];

export { syncsData };
