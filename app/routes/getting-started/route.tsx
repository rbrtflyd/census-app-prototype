import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { Outlet } from '@remix-run/react';

import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/pro-solid-svg-icons';
import { useNavigate } from '@remix-run/react';
import { useHref } from '@remix-run/react';
export const loader = async () => {
  // Add any necessary data fetching logic here
  return json({});
};

const steps = [
  {
    id: 1,
    title: 'Connect a data source',
    description: 'Connect your data to the platform',
  },
  {
    id: 2,
    title: 'Create a dataset',
    description: 'Connect your data to the platform',
  },
  {
    id: 3,
    title: 'Sync your data',
    description: 'Connect your data to the platform',
  },
];

const useCases = [
  {
    id: 1,
    title: 'Sync warehouse data to a business app',
    description: 'Connect your data to the platform',
  },
  {
    id: 2,
    title: 'Sync CRM data to a business app',
    description: 'Connect your data to the platform',
  },
  {
    id: 3,
    title: 'Use AI to enhance customer profiles',
    description: 'Connect your data to the platform',
  },
  {
    id: 4,
    title: 'Enrich company and user profiles with 3rd party data',
    description: 'Connect your data to the platform',
  },
  {
    id: 5,
    title: 'De-duplicate sales leads ',
    description: 'Connect your data to the platform',
  },
];

export default function GetStarted() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const docsUrl = 'https://docs.getcensus.com/';

  return (
    <div className="flex flex-col w-full h-screen">
      <PageHeader title="Getting Started" />
      <div className="px-6 pt-10 h-full overflow-hidden *:max-w-[900px] *:mx-auto *:w-full space-y-9">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Text className="text-xl font-medium text-dark">
              Welcome to Census
            </Text>
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                window.open(docsUrl, '_blank');
              }}>
              <FontAwesomeIcon
                icon={faBook}
                className="mr-2 icon-light text-sm"
              />
              Read the docs
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4 grow">
            <Text className="text-lg font-medium">Get Started with Census</Text>
            {steps.map((step) => (
              <button
                key={step.id}
                className="flex flex-row gap-5 border border-base rounded-lg p-4 leading-none hover:bg-plum-100 hover:border-plum-500 transition-all duration-75 group">
                <div className="rounded-full size-9 bg-slate-50 leading-none font-bold place-items-center justify-center flex group-hover:bg-plum-500 group-hover:text-white">
                  <Text>{step.id}</Text>
                </div>
                <div className="flex flex-col gap-1 items-start ">
                  <Text className="text-lg text-dark group-hover:text-plum-500 font-medium">
                    {step.title}
                  </Text>
                  <Text className="text-sm text-lighter group-hover:text-plum-500">
                    {step.description}
                  </Text>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-1/3 bg-white rounded-lg p-4 shadow">
            <Text className="text-lg font-medium text-dark">
              What to use Census for
            </Text>
            <div className="flex flex-col gap-0.5">
              {useCases.map((useCase) => (
                <button
                  key={useCase.id}
                  className="flex flex-col gap-1 items-start text-left hover:bg-plum-100 transition-all duration-75 p-2 rounded-md">
                  <Text className="font-medium leading-tight">
                    {useCase.title}
                  </Text>
                  <Text className="text-sm text-lighter">
                    {useCase.description}
                  </Text>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
