import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import SidebarNavigation from './components/Navigation/Sidebar/SidebarNavigation';
import { BreadcrumbProvider } from './providers/breadcrumbContext';

import styles from './tailwind.css?url';
import './styles.scss';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen flex-row">
          <BreadcrumbProvider>
            <SidebarNavigation />
            <div className="grow overflow-hidden">{children}</div>
          </BreadcrumbProvider>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
