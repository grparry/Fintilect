export interface BankAccount {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  bankName: string;
  accountHolderName: string;
  isActive: boolean;
}

export interface BankAccountValidationResult {
  isValid: boolean;
  errors?: string[];
  details?: {
    bankName?: string;
    branchLocation?: string;
    accountType?: string;
  };
}

export interface RoutingNumberValidationResult {
  isValid: boolean;
  errors?: string[];
  details?: {
    bankName?: string;
    location?: string;
    federalReserveDistrict?: string;
  };
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AddressValidationResult {
  isValid: boolean;
  errors?: string[];
  standardized?: Address;
  details?: {
    latitude?: number;
    longitude?: number;
    timeZone?: string;
    isResidential?: boolean;
  };
}
