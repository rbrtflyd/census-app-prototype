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
import { MigrationNotification } from './components/Toasts/MigrationNotification';
import { Toaster } from './components/ui/sonner';
import styles from './tailwind.css?url';
import './styles.scss';
import { OperatorProvider } from './contexts/OperatorContext';
import OperatorToolbar from './components/Toasts/OperatorToolbar/OperatorToolbar';
import { EnrichEnhanceProvider } from './routes/_app.($version).datasets.$id/EnrichEnhanceHub/context/EnrichEnhanceContext';

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
        <MigrationNotification />
        <div className="flex h-screen flex-row">
          <OperatorProvider>
            <EnrichEnhanceProvider>
              <BreadcrumbProvider>
                <div className="grow overflow-hidden">
                  <Outlet />
                </div>
                <OperatorToolbar />
              </BreadcrumbProvider>
            </EnrichEnhanceProvider>
          </OperatorProvider>
          <Toaster />
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
