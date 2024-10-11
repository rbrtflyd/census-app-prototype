import { SyncType, SyncStatusType } from '~/db/types';

const syncsData = [
  {
    id: 1,

    name: 'Daily Sync for Dataset 1',
  },
  {
    id: 2,

    name: 'Weekly Sync for Dataset 2',
  },
  {
    id: 3,
    datasetId: 3,
    name: 'Monthly Sync for Dataset 3',
    description: 'Syncs Dataset 3 on the first day of every month',
  },
  {
    id: 4,
    datasetId: 4,
    name: 'Hourly Sync for Dataset 4',
    description: 'Syncs Dataset 4 every hour',
  },
];

export { syncsData };
