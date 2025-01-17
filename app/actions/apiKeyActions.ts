'use server';

import { v4 as uuidv4 } from 'uuid';
import { APIKey } from '../types';

export async function generateAPIKey(name: string): Promise<APIKey> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: uuidv4(),
    name,
    clientId: `client_${uuidv4().split('-')[0]}`,
    clientSecret: `secret_${uuidv4().replace(/-/g, '')}`,
    createdAt: new Date().toISOString(),
    lastRotated: null,
    showSecret: true,
    createdBy: 'test@example.com',
  };
}

export async function rotateAPIKey(keyId: string): Promise<APIKey> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: keyId,
    name: 'Rotated Key', // In a real scenario, you'd fetch the existing name
    clientId: `client_${uuidv4().split('-')[0]}`,
    clientSecret: `secret_${uuidv4().replace(/-/g, '')}`,
    createdAt: new Date().toISOString(),
    lastRotated: new Date().toISOString(),
    showSecret: true,
    createdBy: 'test@example.com',
  };
}

export async function revokeAPIKey(keyId: string): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // In a real scenario, you'd perform the revocation on the server
}
