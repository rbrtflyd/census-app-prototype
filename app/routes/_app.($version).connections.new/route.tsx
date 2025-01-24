import { type LoaderFunctionArgs } from '@remix-run/node';
import {
  Navigate,
  Outlet,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from '@remix-run/react';
import { useEffect } from 'react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { useNewConnectionContext } from '~/contexts/NewConnectionContext';
import { ConnectionServiceType } from '~/db/types/connectionService';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { ConnectionType } from '~/db/types';

export async function loader({ params }: LoaderFunctionArgs) {
  const { version } = params;
  return { version };
}

export default function NewConnection() {
  const { version } = useLoaderData<typeof loader>();
  const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumbs();
  const { connections, workspaceConnections, setSelectedConnectionId } =
    useOutletContext() as {
      connections: ConnectionServiceType[];
      workspaceConnections: ConnectionType[];
      setSelectedConnectionId: (id: string) => void;
    };
  const { isScrollable, setIsScrollable } = useNewConnectionContext();

  useEffect(() => {
    clearBreadcrumbs();
    addBreadcrumb({
      label: 'Connections',
      href: `/${version}/connections`,
    });
  }, [version, addBreadcrumb, clearBreadcrumbs]);

  const StepContent = () => {
    const navigate = useNavigate();
    const { currentStep, setCurrentStep } = useNewConnectionContext();

    const stepContent = {
      step1: {
        title: 'Get started with a new connection',
        description:
          'Select a warehouse, database, event stream, or business app to get started.',
      },
      step2: {
        title: 'Choose how Census can access this connection',
        description:
          'Select the permissions you want Census to have for this connection.',
      },
      step3: {
        title: 'Configure credentials and test',
        description:
          'Enter the credentials for your connection and test it to make sure it works.',
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
                navigate(`/${version}/connections/new/${prevStep}`);
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
    <div className={`flex flex-col h-full w-full`}>
      <PageHeader title="New Connection" />
      <div
        className={`flex flex-col h-full w-full ${
          isScrollable ? 'overflow-auto' : 'overflow-hidden'
        }`}>
        <StepContent />
        <div
          className={`px-6 h-full pb-6 -mt-7 *:max-w-[1400px] *:mx-auto *:w-full ${
            isScrollable ? '' : 'overflow-hidden'
          }`}>
          <Outlet
            context={{
              connections,
              workspaceConnections,
              setSelectedConnectionId,
            }}
          />
        </div>
      </div>
    </div>
  );
}
