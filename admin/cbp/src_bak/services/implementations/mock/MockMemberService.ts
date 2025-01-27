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
import { BaseMockService } from './BaseMockService';
import { mockMembers } from './data/members/mockMemberData';
import { mockMemberActivity } from './data/members/mockActivityData';

export class MockMemberService extends BaseMockService implements IMemberService {
  private members: Member[] = [...mockMembers];
  private devices: Map<string, Device[]> = new Map();
  private activities: Record<string, MemberActivity[]> = {};
  private alerts: Record<string, Alert[]> = {};
  private securitySettings: Record<string, SecuritySettings> = {};

  constructor(basePath: string = '/api/v1/members') {
    super(basePath);
  }

  async searchMembers(filters: MemberSearchFilters): Promise<PaginatedResponse<MemberSearchResult>> {
    const memberResults = this.members.map(member => ({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      accountNumber: member.accountNumber,
      status: member.status,
      joinDate: member.joinDate,
      lastLogin: member.lastLogin
    }));

    const searchResult: MemberSearchResult = {
      totalCount: memberResults.length,
      members: memberResults
    };

    return {
      items: [searchResult],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    };
  }

  async getMember(memberId: string): Promise<Member> {
    const member = this.members.find(m => m.id === memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  }

  async getMemberActivity(memberId: string): Promise<MemberActivity[]> {
    const activities = mockMemberActivity[memberId];
    if (!activities) {
      return [];
    }
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getMemberAlerts(memberId: string): Promise<Alert[]> {
    return this.alerts[memberId] || [];
  }

  async updateMemberStatus(memberId: string, status: MemberStatus): Promise<void> {
    const member = await this.getMember(memberId);
    member.status = status;
  }

  async getSecuritySettings(memberId: string): Promise<SecuritySettings> {
    const settings = this.securitySettings[memberId];
    if (!settings) {
      return {
        twoFactorEnabled: false,
        preferredMethod: 'email',
        lastUpdated: new Date().toISOString()
      };
    }
    return settings;
  }

  async updateSecuritySettings(memberId: string, settings: Partial<SecuritySettings>): Promise<void> {
    const currentSettings = await this.getSecuritySettings(memberId);
    this.securitySettings[memberId] = {
      ...currentSettings,












      ...currentSettings,
      ...settings







      ...member


      ...this.members[index],
      ...updates,


      ...device


  // Helper methods for testing
  _setMembers(members: Member[]): void {

  _setMemberActivities(memberId: string, activities: MemberActivity[]): void {

  _setMemberAlerts(memberId: string, alerts: Alert[]): void {

  _setSecuritySettings(memberId: string, settings: SecuritySettings): void {

  _setDevices(memberId: string, devices: Device[]): void {


