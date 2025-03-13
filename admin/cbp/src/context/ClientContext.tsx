import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CLIENT_CONFIGS_BY_ID, 
  ClientConfig, 
  getCurrentClientConfig, 
  isAdminHostname 
} from '../config/host.config';

interface ClientContextType {
  selectedClient: ClientConfig;
  availableClients: Record<number, ClientConfig>;
  setSelectedClient: (clientId: number) => void;
  isAdmin: boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [selectedClient, setSelectedClientState] = useState<ClientConfig>(getCurrentClientConfig());
  const [availableClients, setAvailableClients] = useState<Record<number, ClientConfig>>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current user is on an admin hostname
    const adminStatus = isAdminHostname();
    setIsAdmin(adminStatus);

    // Get the current client config based on hostname
    const currentClient = getCurrentClientConfig();
    
    // If admin, load all available clients for selection
    if (adminStatus) {
      setAvailableClients(CLIENT_CONFIGS_BY_ID);
      
      // Check if there's a previously selected client in localStorage
      const savedClientId = localStorage.getItem('selectedClientId');
      if (savedClientId && CLIENT_CONFIGS_BY_ID[parseInt(savedClientId, 10)]) {
        setSelectedClientState(CLIENT_CONFIGS_BY_ID[parseInt(savedClientId, 10)]);
      } else {
        setSelectedClientState(currentClient);
      }
    } else {
      // For client users, only make their own client available
      setAvailableClients({ [currentClient.clientId]: currentClient });
      setSelectedClientState(currentClient);
    }
  }, []);

  const setSelectedClient = (clientId: number) => {
    const client = CLIENT_CONFIGS_BY_ID[clientId];
    if (client) {
      setSelectedClientState(client);
      // We could potentially store this in localStorage for persistence
      localStorage.setItem('selectedClientId', clientId.toString());
    } else {
      console.error(`Client with ID ${clientId} not found`);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        selectedClient,
        availableClients,
        setSelectedClient,
        isAdmin
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
