import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Outlet } from '@remix-run/react';
import PageHeader from '../../components/Structural/Headers/PageHeader';
import {
  NewDatasetProvider,
  useNewDatasetContext,
} from '../../contexts/NewDatasetContext';

const StepContent = () => {
  const { currentStep } = useNewDatasetContext();

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
    <div className="flex flex-col w-full h-[180px] bg-subtle border-b border-base px-6 *:max-w-[1400px] *:mx-auto *:w-full justify-center shrink-0">
      <Text className="text-2xl font-medium">{content.title}</Text>
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
