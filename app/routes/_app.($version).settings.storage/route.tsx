import { Text } from '@radix-ui/themes';
import { Separator } from '~/components/ui';
import APIKeyManager from './APIKeyManager/APIKeyManager';

export default function SettingsStorage() {
  return (
    <div className="h-full flex flex-col w-full mx-auto max-w-[1400px] gap-8">
      <Text className="text-2xl font-bold">Storage</Text>
      <Separator />
      <div>
        <div className="flex flex-col gap-2">
          <Text className="text-lg font-medium">Storage API</Text>
          <Text>
            The Storage API is used to manage your storage settings. You can
            configure the storage provider and the storage bucket.
          </Text>
          <APIKeyManager />
        </div>
      </div>
    </div>
  );
}
