import { Drawer } from '../../../components/ui/drawer';
import { useState } from 'react';
import NewConnectionStep1 from './Steps/NewConnectionStep1';

interface ConnectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectionDrawer({ isOpen, onClose }: ConnectionDrawerProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NewConnectionStep1 onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <NewConnectionStep2
            onBack={() => setCurrentStep(1)}
            onComplete={() => {
              // Handle completion
              onClose();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}>
      <div className="p-4">{renderStep()}</div>
    </Drawer>
  );
}
