import { useState } from 'react';
import { useAPIKeys } from '../../../hooks/useAPIKeys';
import {
  generateAPIKey,
  rotateAPIKey,
  revokeAPIKey,
} from '../../../actions/apiKeyActions';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Text } from '@radix-ui/themes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { AlertCircle, Copy, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { APIKeyManagerTable } from './APIKeyManagerTable';
import { APIKeyManagerTableColumns } from './APIKeyManagerTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

export default function APIKeyManager() {
  const { apiKeys, addKey, updateKey, removeKey } = useAPIKeys();
  const [newKeyName, setNewKeyName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKey = async () => {
    if (apiKeys.length >= 6) {
      toast.error('Maximum keys reached', {
        description: 'You can only have up to 6 API keys.',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const newKey = await generateAPIKey(
        newKeyName || `Catalog API Key ${apiKeys.length + 1}`
      );
      // Add showSecret flag to the new key
      addKey({ ...newKey, showSecret: true, createdBy: 'test@example.com' });
      setNewKeyName('');
      toast.success('API Key Generated', {
        description:
          "Your new API key has been created successfully. Make sure to copy your secret now - you won't be able to see it again.",
      });
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to generate API key. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const hideSecret = (keyId: string) => {
    const key = apiKeys.find((k) => k.id === keyId)!;
    updateKey({ ...key, showSecret: false });
  };

  const handleRotateKey = async (keyId: string) => {
    try {
      const rotatedKey = await rotateAPIKey(keyId);
      updateKey(rotatedKey);
      toast.success('API Key Rotated', {
        description: 'Your API key has been rotated successfully.',
      });
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to rotate API key. Please try again.',
      });
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      await revokeAPIKey(keyId);
      removeKey(keyId);
      toast.success('API Key Revoked', {
        description: 'Your API key has been revoked successfully.',
      });
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to revoke API key. Please try again.',
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied', {
      description: 'The value has been copied to your clipboard.',
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {apiKeys.length > 0 ? (
        <APIKeyManagerTable
          data={apiKeys}
          columns={APIKeyManagerTableColumns({
            handleRotateKey,
            handleRevokeKey,
            copyToClipboard,
            hideSecret,
          })}
        />
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <AlertCircle className="mx-auto h-6 w-6 text-gray-400 mb-2" />
          <span className="text-gray-500">No API keys generated yet.</span>
        </div>
      )}
      <div className="flex flex-row gap-3">
        <Input
          placeholder="Enter API Key Name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="w-[350px]"
        />
        <Button
          variant="secondary"
          onClick={handleGenerateKey}
          disabled={isGenerating || apiKeys.length >= 6}>
          <FontAwesomeIcon
            icon={faPlus}
            className="mr-1 text-sm"
          />
          {isGenerating ? 'Generating...' : 'Add New Key'}
        </Button>
      </div>
    </div>
  );
}
