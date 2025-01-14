export type PermissionAction = 'view' | 'edit' | 'delete' | 'process' | 'approve' | 'export' | 'create';

export type PermissionCategoryType = 'System' | 'BillPay' | 'Client' | 'MoneyDesktop' | 'Users' | 'Security' | 'Settings' | 'Reports';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategoryType;
  actions: PermissionAction[];
  createdAt: string;
  updatedAt: string;
}

export interface PermissionCategory {
  [key: string]: PermissionAction[];
}

export interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  permissions: PermissionCategory;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface PermissionGroupInput {
  name: string;
  description: string;
  permissions: PermissionCategory;
}

export interface PermissionGroupFilters {
  searchTerm?: string;
  hasPermission?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface PermissionGroupValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface PermissionCategoryDefinition {
  [key: string]: string[];
}
