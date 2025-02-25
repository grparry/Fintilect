// Host-based configuration

// Admin hostnames that are allowed to access admin features
const ADMIN_HOSTNAMES = [
  'cfssadminsvc.cfssinternal.com',
  'cfssadminsvc-test.cfssinternal.com',
  'localhost'
] as const;

// Client portal hostnames
const CLIENT_HOSTNAMES = [
  '-adminsvc.cfssinternal.com',       // Production client wildcard
  '-adminsvc-test.cfssinternal.com',  // Test client wildcard
  'localhost'                          // Development
] as const;

type AdminHostname = typeof ADMIN_HOSTNAMES[number];
type ClientHostnameSuffix = typeof CLIENT_HOSTNAMES[number];

/**
 * Check if the current hostname is an admin hostname
 */
export const isAdminHostname = (): boolean => {
  const currentHostname = window.location.hostname;
  return ADMIN_HOSTNAMES.includes(currentHostname as AdminHostname);
};

/**
 * Check if the current hostname is a valid client hostname
 */
export const isClientHostname = (): boolean => {
  const currentHostname = window.location.hostname;
  if (currentHostname === 'localhost') return true;
  
  return CLIENT_HOSTNAMES.some(suffix => 
    currentHostname.endsWith(suffix) && currentHostname !== suffix
  );
};

/**
 * Extract tenant ID from hostname if present
 */
export const getTenantFromHostname = (): string | null => {
  const hostname = window.location.hostname;
  if (hostname === 'localhost') return null;
  
  for (const suffix of CLIENT_HOSTNAMES) {
    if (hostname.endsWith(suffix)) {
      const tenant = hostname.slice(0, -suffix.length);
      return tenant || null;
    }
  }
  
  return null;
};

/**
 * Get the current environment based on hostname
 */
export const getEnvironment = (): 'production' | 'test' | 'development' => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost') {
    return 'development';
  }
  
  if (hostname.includes('-test.')) {
    return 'test';
  }
  
  return 'production';
};
