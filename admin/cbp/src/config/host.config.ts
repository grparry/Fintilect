// Host-based configuration

/**
 * Client configuration interface
 */
export interface ClientConfig {
  url: string;
  hostname: string;
  environment: 'production' | 'test' | 'development';
  clientApiUrl: string;
  adminApiUrl: string;
  clientId: number;
  tenantId: number;
  sponsorId?: number; // Optional sponsor ID for calendar API
  logoUrl: string;
  name: string;
  isAdmin: boolean;
}

/**
 * Client configurations mapped by hostname for direct lookup
 * Configuration is loaded from /public/config/client-config.json
 * This file is required for the application to function
 */
export let CLIENT_CONFIGS_BY_HOSTNAME: Record<string, ClientConfig> = {};

/**
 * Secondary index by client ID and environment for precise client selection
 * Key format: `${clientId}_${environment}`
 */
export let CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT: Record<string, ClientConfig> = {};

/**
 * Get the current hostname, with support for development mode override via query parameter
 * Only works in development mode for testing purposes
 */
export const getCurrentHostname = (): string => {
  // Only allow hostname override in development mode
  if (process.env.NODE_ENV === 'development') {
    // Check for hostname override in query string
    const urlParams = new URLSearchParams(window.location.search);
    const hostnameParam = urlParams.get('hostname');
    
    // Only use the override if it exists in our configuration
    if (hostnameParam && CLIENT_CONFIGS_BY_HOSTNAME[hostnameParam]) {
      console.log(`Using hostname override: ${hostnameParam}`);
      return hostnameParam;
    }
  }
  
  return window.location.hostname;
};

/**
 * Initialize client configurations
 * This function loads the configuration from the JSON file synchronously
 * The file is required - if it cannot be loaded, the application will display an error
 */
const initializeClientConfigs = (): void => {
  try {
    // Use XMLHttpRequest for synchronous loading
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/config/client-config.json', false); // false = synchronous
    xhr.send();
    
    if (xhr.status !== 200) {
      throw new Error(`Failed to load client configuration: ${xhr.status} ${xhr.statusText}`);
    }
    
    const config = JSON.parse(xhr.responseText);
    if (config && config.clientConfigs) {
      CLIENT_CONFIGS_BY_HOSTNAME = config.clientConfigs;
      console.log('Client configuration loaded from JSON file');
    } else {
      throw new Error('Invalid client configuration format');
    }
    
    // Build the client ID and environment index for precise lookup
    CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT = Object.values(CLIENT_CONFIGS_BY_HOSTNAME)
      .reduce((acc, config) => {
        // Create a composite key of clientId and environment
        const key = `${config.clientId}_${config.environment}`;
        acc[key] = config;
        return acc;
      }, {} as Record<string, ClientConfig>);
  } catch (error) {
    console.error('Error loading client configuration:', error);
    // Display critical error to user
    document.body.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1>Configuration Error</h1>
        <p>The application could not load its configuration file.</p>
        <p>Error details: ${error instanceof Error ? error.message : String(error)}</p>
        <p>Please contact your system administrator.</p>
      </div>
    `;
    throw error; // Re-throw to stop application initialization
  }
};

// Initialize configuration immediately
try {
  initializeClientConfigs();
} catch (error) {
  console.error('Failed to initialize client configuration:', error);
}

/**
 * Get the current client configuration based on hostname
 */
export const getCurrentClientConfig = (): ClientConfig => {
  const hostname = getCurrentHostname();
  const config = CLIENT_CONFIGS_BY_HOSTNAME[hostname];
  
  if (!config) {
    const errorMessage = `No configuration found for hostname: ${hostname}`;
    console.error(errorMessage);
    
    // Display critical error to user
    document.body.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h1>Configuration Error</h1>
        <p>${errorMessage}</p>
        <p>Please check that the correct configuration is available for this hostname.</p>
        <p>Contact your system administrator for assistance.</p>
      </div>
    `;
    
    throw new Error(errorMessage);
  }
  
  return config;
};

/**
 * Check if the current hostname is an admin hostname
 */
export const isAdminHostname = (): boolean => {
  return getCurrentClientConfig().isAdmin;
};

/**
 * Check if the current hostname is a valid client hostname
 */
export const isClientHostname = (): boolean => {
  return !getCurrentClientConfig().isAdmin;
};

/**
 * Extract tenant ID from hostname if present
 */
export const getTenantFromHostname = (): string => {
  return getCurrentClientConfig().tenantId.toString();
};

/**
 * Get the current environment based on hostname
 */
export const getEnvironment = (): 'production' | 'test' | 'development' => {
  return getCurrentClientConfig().environment;
};

/**
 * Get client API URL for the current hostname or selected client
 */
export const getClientApiUrl = (): string => {
  // Check if there's a selected client in sessionStorage (for admin users)
  const savedClientId = sessionStorage.getItem('selectedClientId');
  const currentEnvironment = getEnvironment();
  
  if (savedClientId) {
    const clientId = parseInt(savedClientId, 10);
    // Try to find a client with matching ID and environment
    const key = `${clientId}_${currentEnvironment}`;
    
    if (CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key]) {
      const selectedClient = CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key];
      console.log(`[Client API URL] Using selected client: ${selectedClient.name}, ClientId: ${selectedClient.clientId}, Environment: ${selectedClient.environment}`);
      return selectedClient.clientApiUrl;
    }
    
    console.log(`[Client API URL] No client configuration found for ID ${clientId} in environment ${currentEnvironment}`);
  }
  
  // Fall back to host-based configuration
  return getCurrentClientConfig().clientApiUrl;
};

/**
 * Get admin API URL for the current hostname
 */
export const getAdminApiUrl = (): string => {
  return getCurrentClientConfig().adminApiUrl;
};

/**
 * Get all available client configurations
 * Used for admin client selection
 */
export const getAllClientConfigs = (): Record<string, ClientConfig> => {
  return CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT;
};

/**
 * Get sponsor ID for the current hostname or selected client
 * Returns the sponsor ID if available, otherwise returns 0 (which gets all holidays)
 */
export const getSponsorId = (): number => {
  // Check if there's a selected client in sessionStorage (for admin users)
  const savedClientId = sessionStorage.getItem('selectedClientId');
  const currentEnvironment = getEnvironment();
  
  let config: ClientConfig;
  let source = 'Host Context';
  
  if (savedClientId) {
    const clientId = parseInt(savedClientId, 10);
    // Try to find a client with matching ID and environment
    const key = `${clientId}_${currentEnvironment}`;
    
    if (CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key]) {
      config = CLIENT_CONFIGS_BY_ID_AND_ENVIRONMENT[key];
      source = 'Selected Client (ID and Environment match)';
    }
    else {
      config = getCurrentClientConfig();
      console.log(`[getSponsorId] No client configuration found for ID ${clientId} in environment ${currentEnvironment}`);
    }
  } else {
    config = getCurrentClientConfig();
  }
  
  console.log(`[getSponsorId] Using configuration from ${source}:`, {
    name: config.name,
    clientId: config.clientId,
    sponsorId: config.sponsorId || 0,
    environment: config.environment
  });
  
  return config.sponsorId || 0;
};
