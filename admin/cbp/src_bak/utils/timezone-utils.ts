/**
 * List of common time zones.
 * This is a subset of all available time zones, focusing on major cities and regions.
 */
export const timeZones = [
  // US & Canada
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
  'America/Anchorage',
  'America/Toronto',
  'America/Vancouver',

  // Europe
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Europe/Moscow',

  // Asia
  'Asia/Dubai',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Asia/Hong_Kong',

  // Australia & New Zealand
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Perth',
  'Pacific/Auckland'
];

/**
 * Validates if a given time zone string is valid.
 * @param timeZone - The time zone to validate
 * @returns boolean indicating if the time zone is valid
 */
export const isValidTimeZone = (timeZone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Gets the current offset for a given time zone.
 * @param timeZone - The time zone to get the offset for
 * @returns string representation of the offset (e.g., "UTC+01:00")
 */
export const getTimeZoneOffset = (timeZone: string): string => {
  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    });
    return formatter.format(date).split(' ').pop() || '';
  } catch (error) {
    return '';
  }
};

/**
 * Formats a date for a specific time zone.
 * @param date - The date to format
 * @param timeZone - The target time zone
 * @returns formatted date string
 */
export const formatDateForTimeZone = (date: Date, timeZone: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }).format(date);
};

/**
 * Converts a time from one time zone to another.
 * @param date - The date to convert
 * @param fromTimeZone - Source time zone
 * @param toTimeZone - Target time zone
 * @returns converted Date object
 */
export const convertTimeZone = (
  date: Date,
  fromTimeZone: string,
  toTimeZone: string
): Date => {
  const fromFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: fromTimeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const toFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toTimeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const fromParts = fromFormatter.formatToParts(date);
  const toParts = toFormatter.formatToParts(date);

  const fromValues = fromParts.reduce((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = parseInt(part.value, 10);
    }
    return acc;
  }, {} as Record<string, number>);

  const toValues = toParts.reduce((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = parseInt(part.value, 10);
    }
    return acc;
  }, {} as Record<string, number>);

  return new Date(
    toValues.year,
    toValues.month - 1,
    toValues.day,
    toValues.hour,
    toValues.minute,
    toValues.second
  );
};
