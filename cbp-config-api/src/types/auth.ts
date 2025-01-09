export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface JwtUser {
  id: string;
  email: string;
  roles: UserRole[];
}
