import { type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';

export async function loader({ params }: LoaderFunctionArgs) {
  const { version } = params;
  return { version };
}

export default function NewConnection() {
  const { version } = useLoaderData<typeof loader>();
  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbContext();

  useEffect(() => {
    clearBreadcrumbs();
    addBreadcrumb({
      label: 'Connections',
      href: `/${version}/connections`,
    });
  }, [version, addBreadcrumb, clearBreadcrumbs]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader title="New Connection" />

      <main className="h-full px-6 overflow-y-auto *:mx-auto *:w-full *:max-w-[1400px]">
        <div className="flex flex-col gap-4 py-6">
          <p className="text-base">Create a new connection</p>
        </div>
      </main>
    </div>
  );
}
