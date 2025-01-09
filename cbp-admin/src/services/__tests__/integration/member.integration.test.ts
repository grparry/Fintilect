import { api } from '../../../utils/api';
import { memberService } from '../../member.service';
import type { Member, MemberActivity, Alert, Device } from '../../../types/member-center.types';

// Mock the API client
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Member Service Integration', () => {
  const mockMember: Member = {
    id: 'member_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    accountNumber: 'ACC123456',
    status: 'Active',
    joinDate: '2025-01-09T22:24:59.544Z',
    lastLogin: '2025-01-09T22:24:59.544Z',
  };

  const mockActivity: MemberActivity = {
    id: 'activity_1',
    memberId: 'member_1',
    type: 'Login',
    description: 'User logged in',
    timestamp: '2025-01-09T22:24:59.544Z',
    ipAddress: '192.168.1.1',
  };

  const mockAlert: Alert = {
    id: 'alert_1',
    type: 'Security',
    message: 'Suspicious login attempt',
    severity: 'warning',
    createdAt: '2025-01-09T22:24:59.544Z',
    acknowledged: false,
  };

  const mockDevice: Device = {
    id: 'device_1',
    name: 'iPhone 12',
    type: 'Mobile',
    lastUsed: '2025-01-09T22:24:59.544Z',
    lastAccess: '2025-01-09T22:24:59.544Z',
    status: 'Active',
    trusted: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Member Search and Retrieval', () => {
    it('should search members with filters', async () => {
      const mockResponse = {
        success: true,
        data: {
          totalCount: 1,
          members: [mockMember],
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const filters = {
        searchTerm: 'John',
        searchType: 'name' as const,
        status: 'all' as const,
      };

      const response = await memberService.searchMembers(filters);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/search', {
        params: {
          searchTerm: 'John',
          searchType: 'name',
          status: undefined,
          startDate: undefined,
          endDate: undefined,
          alertType: undefined,
        },
      });
    });

    it('should get member details', async () => {
      const mockResponse = {
        success: true,
        data: mockMember,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.getMemberDetails('member_1');
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/member_1/details');
    });
  });

  describe('Member Activity', () => {
    it('should get member activity with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockActivity],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.getMemberActivity('member_1', 1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/member_1/activity', {
        params: { page: 1, limit: 20 },
      });
    });
  });

  describe('Alert Management', () => {
    it('should get member alerts with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockAlert],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.getMemberAlerts('member_1', 1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/member_1/alerts', {
        params: { page: 1, limit: 20 },
      });
    });

    it('should acknowledge an alert', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.acknowledgeAlert('member_1', 'alert_1');
      expect(response).toEqual(mockResponse);
      expect(api.post).toHaveBeenCalledWith('/members/member_1/alerts/alert_1/acknowledge', {});
    });
  });

  describe('Device Management', () => {
    it('should get member devices with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          items: [mockDevice],
          pagination: {
            total: 1,
            page: 1,
            limit: 20,
            pages: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.getDevices('member_1', 1, 20);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/member_1/devices', {
        params: { page: 1, limit: 20 },
      });
    });

    it('should remove a device', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.removeDevice('member_1', 'device_1');
      expect(response).toEqual(mockResponse);
      expect(api.delete).toHaveBeenCalledWith('/members/member_1/devices/device_1');
    });
  });

  describe('Member Profile and Status', () => {
    it('should update member status', async () => {
      const mockResponse = {
        success: true,
        data: undefined,
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.updateMemberStatus('member_1', 'Active');
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/members/member_1/status', { status: 'Active' });
    });

    it('should update member profile', async () => {
      const mockResponse = {
        success: true,
        data: {
          ...mockMember,
          firstName: 'Updated',
          lastName: 'Name',
        },
      };

      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
      };

      const response = await memberService.updateMemberProfile('member_1', updateData);
      expect(response).toEqual(mockResponse);
      expect(api.patch).toHaveBeenCalledWith('/members/member_1/profile', updateData);
    });
  });

  describe('Dashboard and Statistics', () => {
    it('should get member dashboard statistics', async () => {
      const mockResponse = {
        success: true,
        data: {
          totalMembers: 100,
          activeMembers: 80,
          newMembersToday: 5,
          activeAlerts: 10,
          membersByStatus: {
            Active: 80,
            Inactive: 10,
            Suspended: 5,
            Pending: 5,
          },
          alertsByType: {
            Security: 5,
            Account: 3,
            Transaction: 1,
            System: 1,
          },
        },
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await memberService.getMemberDashboardStats();
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/dashboard/stats');
    });
  });

  describe('Data Export', () => {
    it('should export member data with filters', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      const mockResponse = {
        success: true,
        data: mockBlob,
      };

      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const filters = {
        searchTerm: 'John',
        searchType: 'name' as const,
        status: 'Active' as const,
      };

      const response = await memberService.exportMemberData(filters);
      expect(response).toEqual(mockResponse);
      expect(api.get).toHaveBeenCalledWith('/members/export', {
        params: {
          searchTerm: 'John',
          searchType: 'name',
          status: 'Active',
          startDate: undefined,
          endDate: undefined,
          alertType: undefined,
        },
        responseType: 'blob',
      });
    });
  });
});
