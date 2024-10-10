import { SyncType, SyncStatusType } from '~/db/types';

const syncsData: SyncType[] = [
  {
    id: 1,
    datasetId: 1,
    name: 'Daily Sync for Dataset 1',
    description: 'Syncs Dataset 1 every day at midnight',
  },
  {
    id: 2,
    datasetId: 2,
    name: 'Weekly Sync for Dataset 2',
    description: 'Syncs Dataset 2 every Sunday at 2 AM',
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

export default syncsData;
