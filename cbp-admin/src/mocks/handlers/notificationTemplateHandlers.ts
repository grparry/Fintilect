import { http, HttpResponse } from 'msw';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationVariable,
  NotificationPreview,
  NotificationType,
  NotificationCategory
} from '../../types/bill-pay.types';

const mockTemplates: NotificationTemplate[] = [
  {
    id: 1,
    name: 'Payment Success Template',
    type: NotificationType.PAYMENT_COMPLETED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Successfully Processed',
    content: 'Dear {{customerName}}, your payment of {{amount}} has been processed successfully.',
    active: true,
    lastModified: '2024-12-26T10:00:00Z',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z',
    variables: [
      {
        name: 'customerName',
        description: 'Name of the customer',
        example: 'John Doe'
      },
      {
        name: 'amount',
        description: 'Payment amount',
        example: '$100.00'
      }
    ]
  },
  {
    id: 2,
    name: 'Payment Failed Template',
    type: NotificationType.PAYMENT_FAILED,
    category: NotificationCategory.PAYMENT,
    subject: 'Payment Failed',
    content: 'Dear {{customerName}}, your payment of {{amount}} has failed. Error: {{errorMessage}}',
    active: true,
    lastModified: '2024-12-26T10:00:00Z',
    createdAt: '2024-12-26T10:00:00Z',
    updatedAt: '2024-12-26T10:00:00Z',
    variables: [
      {
        name: 'customerName',
        description: 'Name of the customer',
        example: 'John Doe'
      },
      {
        name: 'amount',
        description: 'Payment amount',
        example: '$100.00'
      },
      {
        name: 'errorMessage',
        description: 'Error message',
        example: 'Insufficient funds'
      }
    ]
  }
];

const mockVariables: NotificationVariable[] = [
  {
    name: 'customerName',
    description: 'Name of the customer',
    example: 'John Doe'
  },
  {
    name: 'amount',
    description: 'Payment amount',
    example: '$100.00'
  },
  {
    name: 'date',
    description: 'Date of the transaction',
    example: '2024-12-26'
  },
  {
    name: 'time',
    description: 'Time of the transaction',
    example: '10:00 AM'
  },
  {
    name: 'errorMessage',
    description: 'Error message if payment fails',
    example: 'Insufficient funds'
  }
];

export const notificationTemplateHandlers = [
  // Get templates
  http.get('*/notification-templates', ({ request }) => {
    console.log('MSW: Handling notification templates request');
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('searchTerm') || '';
    const type = url.searchParams.get('type') || 'all';
    const category = url.searchParams.get('category') || 'all';

    let filteredTemplates = [...mockTemplates];

    // Apply filters
    if (searchTerm) {
      filteredTemplates = filteredTemplates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (type !== 'all') {
      filteredTemplates = filteredTemplates.filter(template => template.type === type);
    }

    if (category !== 'all') {
      filteredTemplates = filteredTemplates.filter(template => template.category === category);
    }

    console.log('MSW: Returning filtered templates', filteredTemplates);

    return HttpResponse.json({
      success: true,
      data: {
        templates: filteredTemplates,
        total: filteredTemplates.length
      }
    });
  }),

  // Get template by ID
  http.get('*/notification-templates/:id', ({ params }) => {
    console.log('MSW: Handling get template request', params);
    const { id } = params;
    const template = mockTemplates.find(t => t.id === Number(id));

    if (!template) {
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: Returning template', template);

    return HttpResponse.json({
      success: true,
      data: template
    });
  }),

  // Create template
  http.post('*/notification-templates', async ({ request }) => {
    console.log('MSW: Handling create template request');
    const input = await request.json() as NotificationTemplateInput;

    const newTemplate: NotificationTemplate = {
      id: mockTemplates.length + 1,
      ...input,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variables: []
    };

    mockTemplates.push(newTemplate);
    console.log('MSW: Created new template', newTemplate);

    return HttpResponse.json({
      success: true,
      data: newTemplate
    });
  }),

  // Update template
  http.put('*/notification-templates/:id', async ({ params, request }) => {
    console.log('MSW: Handling update template request', params);
    const { id } = params;
    const input = await request.json() as NotificationTemplateInput;

    const index = mockTemplates.findIndex(t => t.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedTemplate: NotificationTemplate = {
      ...mockTemplates[index],
      ...input,
      lastModified: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockTemplates[index] = updatedTemplate;
    console.log('MSW: Updated template', updatedTemplate);

    return HttpResponse.json({
      success: true,
      data: updatedTemplate
    });
  }),

  // Delete template
  http.delete('*/notification-templates/:id', ({ params }) => {
    console.log('MSW: Handling delete template request', params);
    const { id } = params;

    const index = mockTemplates.findIndex(t => t.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockTemplates.splice(index, 1);
    console.log('MSW: Deleted template', id);

    return HttpResponse.json({
      success: true,
      data: null
    });
  }),

  // Get available variables
  http.get('*/notification-templates/variables', () => {
    console.log('MSW: Handling get variables request');
    console.log('MSW: Returning variables', mockVariables);

    return HttpResponse.json({
      success: true,
      data: mockVariables
    });
  }),

  // Preview template
  http.post('*/notification-templates/:id/preview', async ({ params, request }) => {
    console.log('MSW: Handling preview template request', params);
    const { id } = params;
    const template = mockTemplates.find(t => t.id === Number(id));

    if (!template) {
      return new HttpResponse(null, { status: 404 });
    }

    const sampleData = await request.json() as Record<string, string>;
    let previewContent = template.content;
    let previewSubject = template.subject;

    // Replace variables in content and subject
    Object.entries(sampleData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      previewContent = previewContent.replace(regex, value);
      previewSubject = previewSubject.replace(regex, value);
    });

    const preview: NotificationPreview = {
      subject: previewSubject,
      content: previewContent,
      sampleData
    };

    console.log('MSW: Returning preview', preview);

    return HttpResponse.json({
      success: true,
      data: preview
    });
  })
];
