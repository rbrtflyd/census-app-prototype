import PageHeader from '../../components/Structural/Headers/PageHeader';
import { Link, Outlet, useLocation } from '@remix-run/react';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { cn } from '../../lib/utils';
import SettingsSidebar from '../../components/Navigation/Sidebar/SettingsSidebar';

export default function SettingsIndex() {
  const location = useLocation();

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'general';
  };

  const activeTab = getActiveTab(location.pathname);

  return (
    <div className="h-full flex flex-row">
      <SettingsSidebar />
      <div className="flex flex-col gap-4 grow h-full">
        <Outlet />
      </div>
    </div>
  );
}
