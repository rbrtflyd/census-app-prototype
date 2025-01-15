import PageHeader from '../../components/Structural/Headers/PageHeader';
import { Link, Outlet, useLocation } from '@remix-run/react';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { cn } from '../../lib/utils';

export default function SettingsIndex() {
  const location = useLocation();

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'general';
  };

  const activeTab = getActiveTab(location.pathname);

  return (
    <div className="h-full flex flex-col">
      <PageHeader title="Settings" />
      <Tabs
        value={activeTab}
        className="w-full">
        <TabsList>
          {['general', 'admin', 'storage', 'integrations'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              asChild>
              <Link
                to={tab}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium',
                  activeTab === tab
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700'
                )}>
                {tab.split('-')[0].charAt(0).toUpperCase() +
                  tab.split('-')[0].slice(1)}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-4 p-6 grow h-full">
        <Outlet />
      </div>
    </div>
  );
}
