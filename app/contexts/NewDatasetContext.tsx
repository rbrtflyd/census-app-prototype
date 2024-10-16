import React, { createContext, useContext, useState } from 'react';

type Step = 'step1' | 'step2' | 'step3';

interface NewDatasetContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
}

const NewDatasetContext = createContext<NewDatasetContextType | undefined>(
  undefined
);

export const NewDatasetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('step1');

  return (
    <NewDatasetContext.Provider value={{ currentStep, setCurrentStep }}>
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
