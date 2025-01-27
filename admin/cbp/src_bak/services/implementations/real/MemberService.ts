import { IMemberService } from '../../interfaces/IMemberService';
import {
    Member,
    MemberSearchFilters,
    MemberSearchResult,
    MemberActivity,
    Alert,
    MemberStatus,
    SecuritySettings,
    Device
} from '../../../types/member-center.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';

export class MemberService extends BaseService implements IMemberService {
    constructor(basePath: string = '/api/v1/members') {
        super(basePath);
    }

    async searchMembers(filters: MemberSearchFilters): Promise<PaginatedResponse<MemberSearchResult>> {
        try {
            const response = await this.get<PaginatedResponse<Member>>('/search', { params: filters });
            const members = response.items;
            



            









                `/${memberId}/devices/${deviceId}`,
            );

    /**
     * Update member devices
     * @param memberId Member identifier
     * @param devices Updated list of devices
     */


