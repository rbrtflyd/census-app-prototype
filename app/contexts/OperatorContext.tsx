import { createContext, useContext, useState } from 'react';

interface OperatorContextType {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
}

const OperatorContext = createContext<OperatorContextType | undefined>(
  undefined
);

export function OperatorProvider({ children }: { children: React.ReactNode }) {
  const [selectedLayout, setSelectedLayout] = useState('connections-v3');

  return (
    <OperatorContext.Provider value={{ selectedLayout, setSelectedLayout }}>
      {children}
    </OperatorContext.Provider>
  );
}

export function useOperator() {
  const context = useContext(OperatorContext);
  if (context === undefined) {
    throw new Error('useOperator must be used within an OperatorProvider');
  }
  return context;
}
