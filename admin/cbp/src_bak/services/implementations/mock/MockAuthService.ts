import { IAuthService } from '../../interfaces/IAuthService';
import {
  LoginCredentials,
  TokenResponse,
  AuthenticationResponse,
  SessionInfo,
  UserSession
} from '../../../types/auth.types';
import { mockUsers } from './data/users/mockUserData';
import { AuthError } from '../../../utils/errors';

export class MockAuthService implements IAuthService {
  private currentSession: SessionInfo | null = null;
  private activeSessions: UserSession[] = [];
  private mockTokens: TokenResponse = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresIn: 3600
  };

  readonly basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
    const user = mockUsers.find(u => u.username === credentials.username);
    





    

    // Mock user permissions based on roles







      ...this.mockTokens,







    )?.id;


        'admin:read',
        'admin:write',
        'user:read',
        'user:write',
        'settings:read',
        'settings:write'
      ],
        'user:read',
        'settings:read'
      ]

