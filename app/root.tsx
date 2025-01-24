import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { MigrationNotification } from './components/Toasts/MigrationNotification';
import { Toaster } from './components/ui/sonner';
import styles from './tailwind.css?url';
import './styles.scss';

import { RootProvider } from './providers';

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
        <RootProvider>
          <MigrationNotification />
          <div className="flex h-screen flex-row overflow-hidden">
            <Outlet />
            <Toaster />
          </div>

          <ScrollRestoration />
          <Scripts />
        </RootProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
