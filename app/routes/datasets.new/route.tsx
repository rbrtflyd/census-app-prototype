import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';

export const loader = async () => {
  // Add any necessary data fetching logic here
  return json({
    // Return any data needed for the component
  });
};

export default function NewDataset() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <Text className="text-2xl font-bold mb-4">Create New Dataset</Text>
      {/* Add your form or content for creating a new dataset here */}
    </div>
  );
}
