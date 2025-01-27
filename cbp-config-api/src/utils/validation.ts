import { CreatePayeeRequest, UpdatePayeeRequest, ValidationError } from '@/types/payee';

export function validatePayeeData(data: CreatePayeeRequest | UpdatePayeeRequest): ValidationError[] {
  const errors: ValidationError[] = [];

  if ('name' in data && (!data.name?.trim() || data.name.length > 100)) {
    errors.push({ field: 'name', message: 'Name is required and must be less than 100 characters' });
  }

  if ('email' in data && data.email && !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if ('phone' in data && data.phone && !isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }

  if ('bankAccounts' in data && data.bankAccounts) {
    for (const account of data.bankAccounts) {
      if (!isValidRoutingNumber(account.routingNumber)) {
        errors.push({ field: 'routingNumber', message: 'Invalid routing number' });
      }
      if (!isValidAccountNumber(account.accountNumber)) {
        errors.push({ field: 'accountNumber', message: 'Invalid account number' });
      }
      if (!['checking', 'savings'].includes(account.accountType)) {
        errors.push({ field: 'accountType', message: 'Invalid account type' });
      }
    }
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

function isValidRoutingNumber(routingNumber: string): boolean {
  return /^\d{9}$/.test(routingNumber);
}

function isValidAccountNumber(accountNumber: string): boolean {
  return /^\d{9,17}$/.test(accountNumber);
}
