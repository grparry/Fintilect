import React, { createContext, useContext, ReactNode } from 'react';
import { 
  isAdminHostname, 
  isClientHostname, 
  getTenantFromHostname, 
  getEnvironment 
} from '../config/host.config';

interface HostContextType {
  isAdmin: boolean;
  isClient: boolean;
  tenant: string | null;
  environment: 'production' | 'test' | 'development';
}

const HostContext = createContext<HostContextType | null>(null);

interface HostProviderProps {
  children: ReactNode;
}

export const HostProvider: React.FC<HostProviderProps> = ({ children }) => {
  // These values are computed once when the app loads and remain constant
  const contextValue: HostContextType = {
    isAdmin: isAdminHostname(),
    isClient: isClientHostname(),
    tenant: getTenantFromHostname(),
    environment: getEnvironment()
  };

  return (
    <HostContext.Provider value={contextValue}>
      {children}
    </HostContext.Provider>
  );
};

export const useHost = (): HostContextType => {
  const context = useContext(HostContext);
  if (!context) {
    throw new Error('useHost must be used within a HostProvider');
  }
  return context;
};

// Export a hook to quickly check if we're in an admin context
export const useIsAdmin = (): boolean => {
  const { isAdmin } = useHost();
  return isAdmin;
};

// Export a hook to quickly check if we're in a client context
export const useIsClient = (): boolean => {
  const { isClient } = useHost();
  return isClient;
};

// Export a hook to get the current tenant
export const useTenant = (): string | null => {
  const { tenant } = useHost();
  return tenant;
};

// Export a hook to get the current environment
export const useEnvironment = (): 'production' | 'test' | 'development' => {
  const { environment } = useHost();
  return environment;
};
