import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Outlet } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import {
  NewDatasetProvider,
  useNewDatasetContext,
} from '../../contexts/NewDatasetContext';

const StepContent = () => {
  const { currentStep, setCurrentStep } = useNewDatasetContext();

  const stepContent = {
    step1: {
      title: 'Get started with a new dataset',
      description:
        'Select a warehouse, database, event stream, or business app to get started.',
    },
    step2: {
      title: 'Configure your data source',
      description:
        'Set up the connection details for your selected data source.',
    },
    step3: {
      title: 'Preview your dataset',
      description: 'Review and confirm the data before creating your dataset.',
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
            currentStep === 'step1' ? 'text-2xl' : 'text-xl'
          } font-medium`}>
          {content.title}
        </Text>
      </div>
      <Text className="text-lg text-lighter">{content.description}</Text>
    </div>
  );
};

export default function NewDataset() {
  return (
    <NewDatasetProvider>
      <div className="flex flex-col w-full h-full">
        <PageHeader title="Create New Dataset" />
        <StepContent />
        <div className="px-6 h-full pb-6 -mt-7 overflow-hidden *:max-w-[1400px] *:mx-auto *:w-full">
          <Outlet />
        </div>
      </div>
    </NewDatasetProvider>
  );
}
