import { type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { useEffect } from 'react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import {
  NewConnectionProvider,
  useNewConnectionContext,
} from '~/contexts/NewConnectionContext';
import { ConnectionServiceType } from '~/db/types/connectionService';
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { ConnectionType } from '~/db/types';

export async function loader({ params }: LoaderFunctionArgs) {
  const { version } = params;
  return { version };
}

export default function NewConnection() {
  const { version } = useLoaderData<typeof loader>();
  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbContext();
  const { connections, workspaceConnections } = useOutletContext() as {
    connections: ConnectionServiceType[];
    workspaceConnections: ConnectionType[];
  };

  useEffect(() => {
    clearBreadcrumbs();
    addBreadcrumb({
      label: 'Connections',
      href: `/${version}/connections`,
    });
  }, [version, addBreadcrumb, clearBreadcrumbs]);

  const StepContent = () => {
    const { currentStep, setCurrentStep } = useNewConnectionContext();

    const stepContent = {
      step1: {
        title: 'Get started with a new connection',
        description:
          'Select a warehouse, database, event stream, or business app to get started.',
      },
      step2: {
        title: 'Configure your new connection',
        description:
          'Set up the connection details for your selected data source.',
      },
      step3: {
        title: 'Preview your dataset',
        description:
          'Review and confirm the data before creating your dataset.',
      },
    };

    const content = stepContent[currentStep];

    return (
      <div className="flex flex-col w-full h-[140px] 2xl:h-[180px] bg-subtle border-b border-base px-6 *:max-w-[1400px] *:mx-auto *:w-full justify-center shrink-0">
        <div className="flex flex-row gap-2">
          {currentStep !== 'step1' && (
            <Button
              variant="ghost"
              onClick={() => {
                const prevStep = currentStep === 'step3' ? 'step2' : 'step1';
                setCurrentStep(prevStep);
                window.history.back();
              }}>
              Back
            </Button>
          )}
          <Text
            className={`${
              currentStep === 'step1' ? 'text-xl' : 'text-lg'
            } font-medium`}>
            {content.title}
          </Text>
        </div>
        <Text className="text-lg text-lighter">{content.description}</Text>
      </div>
    );
  };

  return (
    <NewConnectionProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <PageHeader title="New Connection" />
        <StepContent />
        <div className="px-6 h-full pb-6 -mt-7 overflow-hidden *:max-w-[1400px] *:mx-auto *:w-full">
          <Outlet context={{ connections, workspaceConnections }} />
        </div>
      </div>
    </NewConnectionProvider>
  );
}
