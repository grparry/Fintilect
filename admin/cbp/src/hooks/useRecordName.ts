import { useState, useEffect, useCallback } from 'react';
import { ServiceFactory } from '../services/factory/ServiceFactory';
import { decodeId, isValidEncodedId } from '../utils/idEncoder';
import logger from '../utils/logger';

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
        logger.warn('Invalid encoded ID format:', encodedId);
        return null;
      }

      const clientId = decodeId(encodedId);
      if (!clientId) {
        logger.warn('Failed to decode client ID:', encodedId);
        return null;
      }

      const clientService = ServiceFactory.getInstance().getClientService();
      const client = await clientService.getClient(parseInt(clientId));
      if (client) {
        const name = client.name || clientId.toString();
        setCachedNames(prev => ({
          ...prev,
          clients: { ...prev.clients, [encodedId]: name }
        }));
        return name;
      }

      logger.warn('Client not found:', clientId);
      return null;
    } catch (error) {
      logger.error('Error fetching client name:', error);
      setCachedNames(prev => ({
        ...prev,
        clients: { ...prev.clients, [encodedId]: null }
      }));
      return null;
    }
  };

  const fetchUserName = async (encodedId: string, clientId: string): Promise<string | null> => {
    try {
      if (!isValidEncodedId(encodedId)) {
        logger.warn('Invalid encoded user ID format:', encodedId);
        return null;
      }

      const userId = decodeId(encodedId);
      if (!userId) {
        logger.warn('Failed to decode user ID:', encodedId);
        return null;
      }

      const clientService = ServiceFactory.getInstance().getClientService();
      const user = await clientService.getUser(parseInt(clientId), parseInt(userId));
      if (user) {
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || userId.toString();
        setCachedNames(prev => ({
          ...prev,
          users: { ...prev.users, [encodedId]: name }
        }));
        return name;
      }

      logger.warn('User not found:', userId);
      return null;
    } catch (error) {
      logger.error('Error fetching user name:', error);
      setCachedNames(prev => ({
        ...prev,
        users: { ...prev.users, [encodedId]: null }
      }));
      return null;
    }
  };

  const loadDisplayName = useCallback(async (
    encodedId: string,
    type: 'client' | 'user',
    clientId?: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Check if we need to load
      const cache = type === 'client' ? cachedNames.clients : cachedNames.users;
      if (encodedId in cache) return;

      // Set loading state in cache
      setCachedNames(prev => ({
        ...prev,
        [type === 'client' ? 'clients' : 'users']: {
          ...prev[type === 'client' ? 'clients' : 'users'],
          [encodedId]: 'Loading...'
        }
      }));

      if (type === 'client') {
        await fetchClientName(encodedId);
      } else if (clientId) {
        await fetchUserName(encodedId, clientId);
      }
    } finally {
      setIsLoading(false);
    }
  }, [cachedNames]);

  const getDisplayName = useCallback((
    encodedId: string,
    type: 'client' | 'user',
    clientId?: string
  ): string => {
    const cache = type === 'client' ? cachedNames.clients : cachedNames.users;
    return cache[encodedId] || encodedId;
  }, [cachedNames]);

  return {
    getDisplayName,
    loadDisplayName,
    isLoading
  };
}