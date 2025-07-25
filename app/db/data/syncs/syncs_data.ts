import { SyncType, SyncStatusType } from '~/db/types';

const syncsData = [
  {
    id: 1,
    label: 'Daily Sync for Dataset 1',
    source: 1,
    destination: 2,
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 2,
    source: 2,
    destination: 3,
    label: 'Weekly Sync for Dataset 2',
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 3,
    source: 3,
    destination: 4,
    label: 'Monthly Sync for Dataset 3',
    description: 'Syncs Dataset 3 on the first day of every month',
    behavior: 'update only',
    status: 'failing',
    lastRun: null,
  },
  {
    id: 4,
    source: 4,
    destination: 5,
    label: 'Hourly Sync for Dataset 4',
    description: 'Syncs Dataset 4 every hour',
    behavior: 'update and create',
    status: 'active',
    lastRun: null,
  },
  {
    id: 5,
    source: 5,
    destination: 6,
    label: 'Hourly Sync for Dataset 5',
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
