// Regular expressions for sensitive data patterns
const PATTERNS = {
  ACCOUNT_NUMBER: /\b\d{10,12}\b/g,
  CREDIT_CARD: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g,
  SSN: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  PHONE: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g
};

// Mask patterns with appropriate replacement
const MASK_REPLACEMENTS = {
  ACCOUNT_NUMBER: (match: string) => `****${match.slice(-4)}`,
  CREDIT_CARD: (match: string) => `****-****-****-${match.slice(-4)}`,
  SSN: (match: string) => `***-**-${match.slice(-4)}`,
  EMAIL: (match: string) => {
    const [local, domain] = match.split('@');
    return `${local.charAt(0)}***@${domain}`;
  },
  PHONE: (match: string) => `***-***-${match.slice(-4)}`
};

/**
 * Masks sensitive data in the provided text
 * @param text - Text that may contain sensitive data
 * @returns Text with sensitive data masked
 */
export function maskSensitiveData(text: string | any): string {
  if (typeof text !== 'string') {
    text = JSON.stringify(text);
  }

  Object.entries(PATTERNS).forEach(([key, pattern]) => {
    text = text.replace(pattern, (match) => {
      return MASK_REPLACEMENTS[key as keyof typeof MASK_REPLACEMENTS](match);
    });
  });

  return text;
}

/**
 * Validates if a string contains sensitive data
 * @param text - Text to validate
 * @returns Object containing validation results
 */
export function containsSensitiveData(text: string): { 
  hasSensitiveData: boolean;
  matches: { [key: string]: string[] };
} {
  const matches: { [key: string]: string[] } = {};
  let hasSensitiveData = false;

  Object.entries(PATTERNS).forEach(([key, pattern]) => {
    const found = text.match(pattern);
    if (found) {
      matches[key] = found;
      hasSensitiveData = true;
    }
  });

  return { hasSensitiveData, matches };
}

/**
 * Validates input against SQL injection patterns
 * @param input - Input to validate
 * @returns True if input is safe, false if potential SQL injection detected
 */
export function isSqlInjectionSafe(input: string): boolean {
  const sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER)\b)/i,
    /(\b(UNION|JOIN)\b.*\b(SELECT)\b)/i,
    /('.*--)/,
    /(;\s*$)/,
    /(\b(EXEC|EXECUTE)\b.*\b(sp_|xp_))/i
  ];

  return !sqlInjectionPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitizes input for safe database operations
 * @param input - Input to sanitize
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .trim();
}

/**
 * Creates a hash for sensitive values
 * @param value - Value to hash
 * @returns Hashed value
 */
export function hashSensitiveValue(value: string): string {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('hex');
}
