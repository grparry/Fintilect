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
import { BaseMockService } from './BaseMockService';
import { mockMembers } from './data/members/mockMemberData';
import { mockMemberActivity } from './data/members/mockActivityData';
import { PaginatedResponse } from '@/types/api.types';

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
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      }
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
    const memberIndex = this.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      throw new Error(`Member with id ${memberId} not found`);
    }

    this.members[memberIndex] = {
      ...this.members[memberIndex],
      status
    };
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
      ...settings
    };
  }
  async getMemberDevices(memberId: string): Promise<Device[]> {
    return this.devices.get(memberId) || [];
  }
  async removeDevice(memberId: string, deviceId: string): Promise<void> {
    const member = this._getMemberById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    if (!member.devices) {
      throw new Error('No devices found for member');
    }
    member.devices = member.devices.filter(d => d.id !== deviceId);
    this._updateMember(member);
  }
  async updateDevices(memberId: string, devices: Device[]): Promise<void> {
    const member = this._getMemberById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    member.devices = devices;
    this._updateMember(member);
  }
  async createMember(member: Omit<Member, 'id'>): Promise<Member> {
    const newMember: Member = {
      id: String(this.members.length + 1),
      ...member
    };
    this.members.push(newMember);
    return newMember;
  }
  async updateMember(memberId: string, updates: Partial<Member>): Promise<Member> {
    const index = this.members.findIndex(m => m.id === memberId);
    if (index === -1) {
      throw this.createError(`Member not found: ${memberId}`, 404);
    }
    const updatedMember = {
      ...this.members[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.members[index] = updatedMember;
    return updatedMember;
  }
  async deleteMember(memberId: string): Promise<void> {
    const index = this.members.findIndex(m => m.id === memberId);
    if (index === -1) {
      throw this.createError(`Member not found: ${memberId}`, 404);
    }
    this.members.splice(index, 1);
  }
  async addDevice(memberId: string, device: Omit<Device, 'id'>): Promise<Device> {
    const memberDevices = this.devices.get(memberId) || [];
    const newDevice: Device = {
      id: String(memberDevices.length + 1),
      ...device
    };
    memberDevices.push(newDevice);
    this.devices.set(memberId, memberDevices);
    return newDevice;
  }
  async getDevice(memberId: string, deviceId: string): Promise<Device> {
    const device = this.devices.get(memberId)?.find(d => d.id === deviceId);
    if (!device) {
      throw new Error('Device not found');
    }
    return device;
  }
  // Helper methods for testing
  _setMembers(members: Member[]): void {
    this.members = members;
  }
  _setMemberActivities(memberId: string, activities: MemberActivity[]): void {
    this.activities[memberId] = activities;
  }
  _setMemberAlerts(memberId: string, alerts: Alert[]): void {
    this.alerts[memberId] = alerts;
  }
  _setSecuritySettings(memberId: string, settings: SecuritySettings): void {
    this.securitySettings[memberId] = settings;
  }
  _setDevices(memberId: string, devices: Device[]): void {
    this.devices.set(memberId, devices);
  }
  private _getMemberById(memberId: string): Member | undefined {
    return this.members.find(m => m.id === memberId);
  }
  private _updateMember(member: Member): void {
    const index = this.members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.members[index] = member;
    }
  }
}