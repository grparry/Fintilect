import { http, HttpResponse } from 'msw';
import { mockMembers } from '../emerge-admin/members';
import { mockActivities } from '../emerge-admin/activity';
import { ApiSuccessResponse } from '../../types/api.types';
import { Member, MemberActivity, MemberSearchResult } from '../../types/member-center.types';

export const memberHandlers = [
  // Search members
  http.get('*/members/search', ({ request }) => {
    console.log('MSW: Handling member search request');
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm');
    const status = url.searchParams.get('status');
    
    console.log('MSW: Search params:', { searchTerm, status });
    
    let filteredMembers = [...mockMembers];
    
    if (searchTerm) {
      filteredMembers = filteredMembers.filter(member => 
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.accountNumber.includes(searchTerm)
      );
    }

    if (status && status !== 'all') {
      filteredMembers = filteredMembers.filter(member => member.status === status);
    }

    console.log('MSW: Filtered members count:', filteredMembers.length);

    const response: ApiSuccessResponse<MemberSearchResult> = {
      success: true,
      data: {
        members: filteredMembers,
        totalCount: filteredMembers.length
      }
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // Get member details
  http.get('*/members/:id', ({ params }) => {
    console.log('MSW: Handling get member request for ID:', params.id);
    const member = mockMembers.find(m => m.accountNumber === params.id);
    
    if (!member) {
      console.log('MSW: Member not found');
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: Found member:', member);
    const response: ApiSuccessResponse<Member> = {
      success: true,
      data: member
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // Get member activities (plural endpoint)
  http.get('*/members/:id/activities', ({ params }) => {
    console.log('MSW: Handling get member activities request for ID:', params.id);
    const activities = mockActivities.filter(a => a.memberId === params.id);
    
    console.log('MSW: Found activities:', activities);
    const response: ApiSuccessResponse<MemberActivity[]> = {
      success: true,
      data: activities
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // Get member activity (singular endpoint)
  http.get('*/members/:id/activity', ({ params }) => {
    console.log('MSW: Handling get member activity request for ID:', params.id);
    const activities = mockActivities.filter(a => a.memberId === params.id);
    
    console.log('MSW: Found activities:', activities);
    const response: ApiSuccessResponse<MemberActivity[]> = {
      success: true,
      data: activities
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // Update member status
  http.put('*/members/:id', async ({ params, request }) => {
    const response: ApiSuccessResponse<{ success: boolean }> = {
      success: true,
      data: { success: true }
    };
    return HttpResponse.json(response, { status: 200 });
  })
];
