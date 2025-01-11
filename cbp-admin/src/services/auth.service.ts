import api from './api';
import { LoginCredentials } from '../types/auth.types';
import { ApiSuccessResponse } from '../types/api.types';
import { User } from '../types/client.types';

class AuthService {
  public async login(credentials: LoginCredentials): Promise<ApiSuccessResponse<User>> {
    console.log('AuthService: Attempting login with credentials:', credentials);
    const response = await api.post<ApiSuccessResponse<User>>(
      '/v1/auth/login',
      credentials
    );
    console.log('AuthService: Login response:', response);
    return response.data;
  }

  public async logout(): Promise<void> {
    await api.post('/v1/auth/logout');
  }

  public async refreshToken(): Promise<ApiSuccessResponse<{ accessToken: string; expiresIn: number }>> {
    const response = await api.post<ApiSuccessResponse<{ accessToken: string; expiresIn: number }>>(
      '/v1/auth/refresh'
    );
    return response.data;
  }
}

export const authService = new AuthService();
