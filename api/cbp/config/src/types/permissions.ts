export enum ExceptionPermissions {
  VIEW_EXCEPTIONS = 'exceptions:view',
  UPDATE_EXCEPTIONS = 'exceptions:update',
  PROCESS_REFUNDS = 'exceptions:refund',
  SEND_NOTIFICATIONS = 'exceptions:notify'
}

export interface RolePermissions {
  ADMIN: ExceptionPermissions[];
  SUPERVISOR: ExceptionPermissions[];
  OPERATOR: ExceptionPermissions[];
}
