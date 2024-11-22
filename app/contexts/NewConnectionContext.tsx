import React, { createContext, useContext, useState } from 'react';

import { ConnectionServiceType } from '~/db/types';

type Step = 'step1' | 'step2' | 'step3';

interface NewConnectionContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  setSelectedSource: (source: ConnectionServiceType) => void;
  selectedSource: ConnectionServiceType | null;
}

const NewConnectionContext = createContext<
  NewConnectionContextType | undefined
>(undefined);

export const NewConnectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('step1');
  const [selectedSource, setSelectedSource] =
    useState<ConnectionServiceType | null>(null);
  return (
    <NewConnectionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedSource,
        setSelectedSource,
      }}>
      {children}
    </NewConnectionContext.Provider>
  );
};

export const useNewConnectionContext = () => {
  const context = useContext(NewConnectionContext);
  if (context === undefined) {
    throw new Error(
      'useNewConnectionContext must be used within a NewConnectionProvider'
    );
  }
  return context;
};
