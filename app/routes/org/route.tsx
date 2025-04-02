import { useLocation, Link, Outlet } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Tabs, TabsTrigger, TabsList } from '~/components/ui/tabs';
import { Text } from '@radix-ui/themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function OrganizationHome() {
  const location = useLocation();

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'overview-v2';
  };

  const activeTab = getActiveTab(location.pathname);

  return (
    <div className="flex flex-col h-screen w-full ">
      <div className="pt-4 px-6 bg-white border-b border-base">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-5">
          <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/logos/census/census-logo-full.svg"
                alt="Census Logo"
                className="w-auto h-7"
              />
              <Text className="-left-20 relative">Org Name</Text>
            </div>
            <div className="flex flex-row gap-8 items-center">
              <div className="flex flex-row gap-4 text-sm">
                <Link to="/docs">Changelog</Link>
                <Link to="/docs">Docs</Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="h-10 w-10 rounded-full bg-white border border-base text-xs">
                  UN
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/org/settings">Updates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/org/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="max-w-[1200px] w-full mx-auto flex flex-row gap-8 items-end">
            <Tabs
              value={activeTab}
              className="w-full px-0">
              <TabsList>
                {[
                  'workspaces',
                  'members',
                  'billing',
                  'credits',
                  'organization-settings',
                  'user-settings',
                  'integrations',
                ].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    asChild>
                    <Link
                      to={tab}
                      className={cn(
                        'px-3 py-1.5',
                        activeTab === tab
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-500 hover:text-gray-700'
                      )}>
                      {tab
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full w-full overflow-y-auto px-6 bg-subtle">
        <div className="max-w-[1200px] w-full mx-auto pt-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
