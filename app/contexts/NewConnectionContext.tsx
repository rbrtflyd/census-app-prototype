import React, { createContext, useContext, useState } from 'react';

import { ConnectionServiceType } from '~/db/types';

type Step = 'step1' | 'step2' | 'step3';

interface NewConnectionContextType {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  setSelectedSource: (source: ConnectionServiceType) => void;
  selectedSource: ConnectionServiceType | null;
  setSelectedConnectionId: (id: string) => void;
  selectedConnectionId: string | null;
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

  const [selectedConnectionId, setSelectedConnectionId] = useState<
    string | null
  >(null);

  return (
    <NewConnectionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedSource,
        setSelectedSource,
        setSelectedConnectionId,
        selectedConnectionId,
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
