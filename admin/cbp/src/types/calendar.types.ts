/**
 * Calendar API type definitions
 */

/**
 * Holiday type enum
 */
export enum HolidayType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  BANK = 'BANK',
  CUSTOM = 'CUSTOM'
}

/**
 * Holiday status enum
 */
export enum HolidayStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

/**
 * Holiday model
 */
export interface Holiday {
  id: number;
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
  sponsorID?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Holiday input model for creating/updating holidays
 */
export interface HolidayInput {
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
}

/**
 * Holiday validation result
 */
export interface HolidayValidation {
  isValid: boolean;
  errors: {
    name?: string;
    date?: string;
    type?: string;
    description?: string;
    status?: string;
  };
}

/**
 * Holiday create request for the Calendar API
 */
export interface HolidayCreateRequest {
  sponsorID: string | null;
  date: string;
  description: string | null;
}

/**
 * Holiday update request for the Calendar API
 */
export interface HolidayUpdateRequest {
  id: number;
  sponsorID: string | null;
  date: string;
  description: string | null;
}

/**
 * Holiday response from the Calendar API
 */
export interface HolidayResponse {
  id: number;
  sponsorID: string | null;
  date: string;
  description: string | null;
  type?: number;
  status?: number;
}

/**
 * Holiday list response from the Calendar API
 */
export interface HolidayListResponse {
  holidays: HolidayResponse[];
}
