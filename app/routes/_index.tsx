import type { MetaFunction } from '@remix-run/node';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';

export const meta: MetaFunction = () => {
  return [
    { title: 'Census Prototype' },
    { name: 'description', content: 'Welcome to Census!' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen flex-row">
      <SidebarNavigation />
      <div className="grow">Main content</div>
    </div>
  );
}
