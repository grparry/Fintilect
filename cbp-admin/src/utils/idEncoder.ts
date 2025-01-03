// Using URL-safe encoding for IDs
const ID_PREFIX = 'cbp_';
const ID_PATTERN = /^[A-Za-z0-9\-_]+$/;

export const encodeId = (id: string | number): string => {
  // Convert to string if number
  const strId = String(id);
  
  // Add a salt/prefix to make IDs less guessable
  const salted = `${ID_PREFIX}${strId}_${Date.now()}`;
  
  // Use browser's built-in btoa and make URL safe
  return btoa(salted)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const isValidEncodedId = (encoded: string): boolean => {
  // Check if the string matches our URL-safe base64 pattern
  if (!ID_PATTERN.test(encoded)) {
    return false;
  }

  try {
    // Try to decode and validate the format
    const decoded = decodeId(encoded);
    return decoded !== null;
  } catch {
    return false;
  }
};

export const decodeId = (encoded: string): string => {
  try {
    // Validate input format
    if (!ID_PATTERN.test(encoded)) {
      throw new Error('Invalid ID format: contains invalid characters');
    }

    // Add back padding if needed (always add enough to make length multiple of 4)
    const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
    
    // Replace URL-safe characters and decode
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    
    // Extract the original ID using our known prefix
    if (!decoded.startsWith(ID_PREFIX)) {
      throw new Error('Invalid ID format: missing prefix');
    }
    
    const parts = decoded.slice(ID_PREFIX.length).split('_');
    if (parts.length !== 2) {
      throw new Error('Invalid ID format: malformed structure');
    }
    
    return parts[0];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error decoding ID:', error.message);
      throw error;
    }
    throw new Error('Failed to decode ID');
  }
};
