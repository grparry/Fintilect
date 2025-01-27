import { useState, useEffect, useCallback } from 'react';
import { clientService } from './services/factory/ServiceFactory';
import { decodeId, isValidEncodedId } from './utils/idEncoder';

interface CachedNames {
  clients: Record<string, string | null>;
  users: Record<string, string | null>;
}

interface UseRecordNameResult {
  getDisplayName: (encodedId: string, type: 'client' | 'user', clientId?: string) => string;
  loadDisplayName: (encodedId: string, type: 'client' | 'user', clientId?: string) => Promise<void>;
  isLoading: boolean;
}

export function useRecordName(): UseRecordNameResult {
  const [cachedNames, setCachedNames] = useState<CachedNames>({
    clients: {},
    users: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchClientName = async (encodedId: string): Promise<string | null> => {
    try {
      if (!isValidEncodedId(encodedId)) {
        console.warn('Invalid encoded ID format:', encodedId);
        return null;
      }

      const clientId = decodeId(encodedId);
      if (!clientId) {
        console.warn('Failed to decode client ID:', encodedId);
        return null;
      }

      const client = await clientService.getClient(clientId);
      if (client) {
        const name = client.name || client.id;
        setCachedNames(prev => ({
          ...prev,







          ...prev,
      
        ...prev,



      
          ...prev,
      
        ...prev,

  ): Promise<void> => {
      // Check if we need to load

      // Set loading state in cache
        ...prev,
        [type === 'client' ? 'clients' : 'users']: {
          ...prev[type === 'client' ? 'clients' : 'users'],
          [encodedId]: 'Loading...'

      // Fetch the name

  ): string => {

