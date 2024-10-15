import React from 'react';
import { Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="w-full h-full p-8">
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 bg-deep p-8 rounded-lg">
        <div className="flex flex-col space-y-3">
          <Text className="text-lg">{title}</Text>
          <Text>{description}</Text>
        </div>
        <Button onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  );
};

export default EmptyState;
