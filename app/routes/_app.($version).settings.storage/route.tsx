import { Text } from '@radix-ui/themes';
import { Separator } from '~/components/ui';
import APIKeyManager from './APIKeyManager/APIKeyManager';

export default function SettingsStorage() {
  return (
    <div className="h-full flex flex-col w-full mx-auto max-w-[1400px] gap-8">
      <Text className="text-xl font-bold">Storage</Text>
      <Separator />
      <div>
        <div className="flex flex-col gap-2">
          <APIKeyManager />
        </div>
      </div>
    </div>
  );
}
