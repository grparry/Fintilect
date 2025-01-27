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
  if (!encoded || typeof encoded !== 'string') {
    return false;
  }

  // Check if the string matches our URL-safe base64 pattern
  if (!ID_PATTERN.test(encoded)) {
    return false;
  }

  try {
    // Try to decode and validate the format
    const decoded = decodeId(encoded);
    return decoded !== null && decoded !== undefined && decoded !== '';
  } catch {
    return false;
  }
};

export const decodeId = (encoded: string): string => {
  if (!encoded || typeof encoded !== 'string') {
    throw new Error('Invalid input: ID must be a non-empty string');
  }

  try {
    // Validate input format
    if (!ID_PATTERN.test(encoded)) {
      throw new Error('Invalid ID format: contains invalid characters');
    }

    // Add back padding if needed (always add enough to make length multiple of 4)
    const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4);
    
    // Restore standard base64 characters
    const standard = padded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Decode and extract original ID
    const decoded = atob(standard);
    
    // Validate prefix and extract ID
    if (!decoded.startsWith(ID_PREFIX)) {
      throw new Error('Invalid ID format: missing prefix');
    }
    
    // Extract original ID (remove prefix and timestamp)
    const [rawId] = decoded.slice(ID_PREFIX.length).split('_');
    
    if (!rawId) {
      throw new Error('Invalid ID format: could not extract ID');
    }
    
    return rawId;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to decode ID: ' + String(error));
  }
};