import { http, HttpResponse } from 'msw';
import { Holiday } from '../../types/bill-pay.types';

const mockHolidays: Holiday[] = [
  {
    id: 1,
    name: 'New Year\'s Day',
    date: '2025-01-01',
    type: 'Federal',
    status: 'Active',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  },
  {
    id: 2,
    name: 'Martin Luther King Jr. Day',
    date: '2025-01-20',
    type: 'Federal',
    status: 'Active',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  },
  {
    id: 3,
    name: 'Presidents\' Day',
    date: '2025-02-17',
    type: 'Federal',
    status: 'Active',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  },
  {
    id: 4,
    name: 'Memorial Day',
    date: '2025-05-26',
    type: 'Federal',
    status: 'Active',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  },
  {
    id: 5,
    name: 'Independence Day',
    date: '2025-07-04',
    type: 'Federal',
    status: 'Active',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z'
  }
];

export const holidayHandlers = [
  // Get holidays
  http.get('*/holidays', () => {
    console.log('MSW: Handling get holidays request');
    console.log('MSW: Returning holidays', mockHolidays);

    return HttpResponse.json({
      success: true,
      data: mockHolidays
    });
  }),

  // Get holiday by ID
  http.get('*/holidays/:id', ({ params }) => {
    console.log('MSW: Handling get holiday request', params);
    const { id } = params;
    const holiday = mockHolidays.find(h => h.id === Number(id));

    if (!holiday) {
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: Returning holiday', holiday);

    return HttpResponse.json({
      success: true,
      data: holiday
    });
  }),

  // Create holiday
  http.post('*/holidays', async ({ request }) => {
    console.log('MSW: Handling create holiday request');
    const input = await request.json() as any;

    const newHoliday: Holiday = {
      id: mockHolidays.length + 1,
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockHolidays.push(newHoliday);
    console.log('MSW: Created new holiday', newHoliday);

    return HttpResponse.json({
      success: true,
      data: newHoliday
    });
  }),

  // Update holiday
  http.patch('*/holidays/:id', async ({ params, request }) => {
    console.log('MSW: Handling update holiday request', params);
    const { id } = params;
    const input = await request.json() as any;

    const index = mockHolidays.findIndex(h => h.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedHoliday: Holiday = {
      ...mockHolidays[index],
      ...input,
      updatedAt: new Date().toISOString()
    };

    mockHolidays[index] = updatedHoliday;
    console.log('MSW: Updated holiday', updatedHoliday);

    return HttpResponse.json({
      success: true,
      data: updatedHoliday
    });
  }),

  // Delete holiday
  http.delete('*/holidays/:id', ({ params }) => {
    console.log('MSW: Handling delete holiday request', params);
    const { id } = params;

    const index = mockHolidays.findIndex(h => h.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockHolidays.splice(index, 1);
    console.log('MSW: Deleted holiday', id);

    return HttpResponse.json({
      success: true,
      data: null
    });
  })
];
