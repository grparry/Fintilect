import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import logger from '../utils/logger';
import { 
  CLIENT_CONFIGS_BY_HOSTNAME,
  CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT,
  getCurrentClientConfig, 
  isAdminHostname,
  ClientConfig
} from '../config/host.config';

interface ClientContextType {
  selectedClient: ClientConfig;
  availableClients: Record<number, ClientConfig>;
  setSelectedClient: (clientId: number) => void;
  isAdmin: boolean;
  usesClientApi: boolean;
  setUsesClientApi: (uses: boolean) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

// Create a global variable to persist the selected client ID across renders
let persistedClientId: number | null = null;

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [selectedClient, setSelectedClientState] = useState<ClientConfig>(getCurrentClientConfig());
  const [availableClients, setAvailableClients] = useState<Record<number, ClientConfig>>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [usesClientApi, setUsesClientApi] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current user is on an admin hostname
    const adminStatus = isAdminHostname();
    setIsAdmin(adminStatus);
    logger.log(`[Client Context] Admin status: ${adminStatus}`);

    // Get the current client config based on hostname
    const currentClient = getCurrentClientConfig();
    logger.log('[Client Context] Current client config:', {
      hostname: currentClient.hostname,
      environment: currentClient.environment,
      clientApiUrl: currentClient.clientApiUrl,
      isAdmin: currentClient.isAdmin
    });
    
    // If admin, load available clients for selection
    if (adminStatus) {
      // Filter clients to only include those matching the current environment
      const currentEnvironment = currentClient.environment;
      logger.log(`[Client Context] Current environment: ${currentEnvironment}`);
      
      // Debug: Log total available clients before filtering
      logger.log(`[Client Context] Total available clients before filtering: ${Object.keys(CLIENT_CONFIGS_BY_HOSTNAME).length}`);
      
      // Debug: Log all client environments to verify they exist
      const environments = new Set<string>();
      Object.values(CLIENT_CONFIGS_BY_HOSTNAME).forEach(client => {
        environments.add(client.environment);
      });
      logger.log('[Client Context] Available environments:', Array.from(environments));
      
      // Filter clients by environment and valid clientApiUrl
      const filteredClients: Record<number, ClientConfig> = {};
      Object.values(CLIENT_CONFIGS_BY_HOSTNAME).forEach(client => {
        // Debug: Log each client being evaluated
        logger.log(`[Client Context] Evaluating client: ${client.name}`, {
          hostname: client.hostname,
          environment: client.environment,
          currentEnvironment,
          clientApiUrl: client.clientApiUrl,
          matchesEnvironment: client.environment === currentEnvironment,
          hasValidApiUrl: client.clientApiUrl !== "N/A",
          isAdmin: client.isAdmin
        });
        
        // Only include clients that:
        // 1. Match the current environment
        // 2. Have a valid clientApiUrl (not "N/A")
        // 3. Are NOT admin clients (isAdmin is false)
        if (client.environment === currentEnvironment && 
            client.clientApiUrl !== "N/A" && 
            client.isAdmin === false) {
          // Create a composite key of clientId and environment for the new structure
          const key = `${client.clientId}_${client.environment}`;
          filteredClients[client.clientId] = client;
          logger.log(`[Client Context] Added client to filtered list: ${client.name} with key ${key}`);
        }
      });
      
      logger.log(`[Client Context] Filtered ${Object.keys(filteredClients).length} clients for environment: ${currentEnvironment}`);
      
      // Debug: Log the filtered clients
      logger.log('[Client Context] Filtered clients:', Object.values(filteredClients).map(c => ({ 
        id: c.clientId, 
        name: c.name, 
        environment: c.environment,
        clientApiUrl: c.clientApiUrl
      })));
      
      setAvailableClients(filteredClients);
      
      // First check for persisted client ID in memory
      if (persistedClientId && filteredClients[persistedClientId]) {
        setSelectedClientState(filteredClients[persistedClientId]);
        logger.log('[Client Context] Using persisted client ID:', persistedClientId);
      } 
      // Then check sessionStorage
      else {
        const savedClientId = sessionStorage.getItem('selectedClientId');
        if (savedClientId && filteredClients[parseInt(savedClientId, 10)]) {
          const clientId = parseInt(savedClientId, 10);
          setSelectedClientState(filteredClients[clientId]);
          persistedClientId = clientId; // Update the persisted client ID
          logger.log('[Client Context] Using saved client ID from sessionStorage:', clientId);
        } else {
          // Default to the current client from hostname
          setSelectedClientState(currentClient);
          persistedClientId = currentClient.clientId; // Update the persisted client ID
          logger.log('[Client Context] Using default client ID from hostname:', currentClient.clientId);
        }
      }
    } else {
      // For client users, only make their own client available
      setAvailableClients({ [currentClient.clientId]: currentClient });
      setSelectedClientState(currentClient);
      persistedClientId = currentClient.clientId; // Update the persisted client ID
      logger.log('[Client Context] Client user - using host client ID:', currentClient.clientId);
    }
  }, []); // Empty dependency array means this only runs once on mount

  const setSelectedClient = (clientId: number) => {
    logger.log(`[Client Context] Setting selected client ID: ${clientId}`);
    
    // Store in sessionStorage
    if (clientId) {
      sessionStorage.setItem('selectedClientId', clientId.toString());
      
      // Get the current environment
      const currentEnvironment = getCurrentClientConfig().environment;
      
      // Try to find a client with matching ID and environment
      const key = `${clientId}_${currentEnvironment}`;
      
      if (CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key]) {
        const client = CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key];
        logger.log(`[Client Context] Selected client with environment match: ${client.name}, Environment: ${client.environment}`);
        setSelectedClientState(client);
      } else if (availableClients[clientId]) {
        // Fall back to the filtered available clients if no exact match
        const client = availableClients[clientId];
        logger.log(`[Client Context] Selected client from available clients: ${client.name}, Environment: ${client.environment}`);
        setSelectedClientState(client);
      } else {
        logger.log(`[Client Context] Warning: Selected client ID ${clientId} not found in available clients or environment-specific lookup`);
      }
    } else {
      sessionStorage.removeItem('selectedClientId');
      logger.log('[Client Context] Cleared selected client');
    }
    
    // Update persisted client ID
    persistedClientId = clientId;
  };

  return (
    <ClientContext.Provider
      value={{
        selectedClient,
        availableClients,
        setSelectedClient,
        isAdmin,
        usesClientApi,
        setUsesClientApi
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
