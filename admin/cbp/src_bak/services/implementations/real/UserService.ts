import { IUserService } from '../../interfaces/IUserService';
import { User, UserGroup, UserPreferences, UserStatus } from '../../types/client.types';
import { PaginatedResponse, QueryOptions } from '../../types/index';
import { BaseService } from './BaseService';

export class UserService extends BaseService implements IUserService {
    constructor(basePath: string = '/api/v1/users') {
        super(basePath);
    }

    async getUser(userId: string): Promise<User> {
        return this.get<User>(`/${userId}`);
    }

    async getUsers(queryParams: QueryOptions): Promise<PaginatedResponse<User>> {
        const response = await this.get<PaginatedResponse<User>>('', {
            page: queryParams.pagination?.page || 1,
            limit: queryParams.pagination?.limit || 10,
            ...queryParams.filter,




            ...queryParams.filter,
            ...queryParams.sort?.field && { sortBy: queryParams.sort.field },
            ...queryParams.sort?.direction && { sortOrder: queryParams.sort.direction }










            ...queryParams.filter,
            ...queryParams.sort?.field && { sortBy: queryParams.sort.field },
            ...queryParams.sort?.direction && { sortOrder: queryParams.sort.direction }

