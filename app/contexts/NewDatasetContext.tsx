import React, { createContext, useContext, useState } from 'react';

import { ConnectionServiceType } from '~/db/types';

type Step = 'step1' | 'step2' | 'step3';

interface NewDatasetContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  setSelectedSource: (source: ConnectionServiceType) => void;
  selectedSource: ConnectionServiceType | null;
}

const NewDatasetContext = createContext<NewDatasetContextType | undefined>(
  undefined
);

export const NewDatasetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('step1');
  const [selectedSource, setSelectedSource] =
    useState<ConnectionServiceType | null>(null);
  return (
    <NewDatasetContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedSource,
        setSelectedSource,
      }}>
      {children}
    </NewDatasetContext.Provider>
  );
};

export const useNewDatasetContext = () => {
  const context = useContext(NewDatasetContext);
  if (context === undefined) {
    throw new Error(
      'useNewDatasetContext must be used within a NewDatasetProvider'
    );
  }
  return context;
};
