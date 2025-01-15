import { useState } from 'react';
import { useAPIKeys } from '../../../hooks/useAPIKeys';
import {
  generateAPIKey,
  rotateAPIKey,
  revokeAPIKey,
} from '../../../actions/apiKeyActions';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
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

export default function APIKeyManager() {
  const { apiKeys, addKey, updateKey, removeKey } = useAPIKeys();
  const [newKeyName, setNewKeyName] = useState('');
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
        newKeyName || `API Key ${apiKeys.length + 1}`
      );
      addKey(newKey);
      setNewKeyName('');
      toast.success('API Key Generated', {
        description: 'Your new API key has been created successfully.',
      });
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to generate API key. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
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
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter API Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={handleGenerateKey}
            disabled={isGenerating || apiKeys.length >= 6}>
            {isGenerating ? 'Generating...' : 'Generate Key'}
          </Button>
        </div>
      </div>

      {apiKeys.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Rotated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{key.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">{key.clientId}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(key.clientId)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(key.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {key.lastRotated
                    ? new Date(key.lastRotated).toLocaleString()
                    : 'Never'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleRotateKey(key.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Rotate
                    </Button>
                    <Button onClick={() => handleRevokeKey(key.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Revoke
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <AlertCircle className="mx-auto h-6 w-6 text-gray-400 mb-2" />
          <span className="text-gray-500">No API keys generated yet.</span>
        </div>
      )}
    </div>
  );
}
