import { json } from '@remix-run/node';
import {
  useLoaderData,
  useParams,
  useLocation,
  Link,
  Outlet,
} from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Tabs, TabsTrigger, TabsList } from '~/components/ui/tabs';
import { Text } from '@radix-ui/themes';
export async function loader() {
  return json({});
}

export default function OrganizationHome() {
  const data = useLoaderData<typeof loader>();

  const params = useParams();
  const location = useLocation();

  const getActiveTab = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1] || 'overview-v2';
  };

  const activeTab = getActiveTab(location.pathname);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="p-4 bg-white border-b bordder-base">
        <div className="max-w-[1200px] w-full mx-auto">Settings</div>
      </div>
      <div className="bg-subtle border-b border-base pt-12">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8">
          <Text className="text-2xl">Org Name</Text>
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
                      'px-3 py-1.5 text-sm font-medium',
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
      <div className="flex-1 h-full w-full overflow-y-auto">
        <div className="max-w-[1200px] w-full mx-auto pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
