import { useState, useCallback } from 'react';
import { APIKey } from '../types';

export function useAPIKeys(initialKeys: APIKey[] = []) {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(initialKeys);

  const addKey = useCallback((newKey: APIKey) => {
    setApiKeys((prevKeys) => [...prevKeys, newKey]);
  }, []);

  const updateKey = useCallback((updatedKey: APIKey) => {
    setApiKeys((prevKeys) =>
      prevKeys.map((key) => (key.id === updatedKey.id ? updatedKey : key))
    );
  }, []);

  const removeKey = useCallback((keyId: string) => {
    setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== keyId));
  }, []);

  return { apiKeys, addKey, updateKey, removeKey };
}
