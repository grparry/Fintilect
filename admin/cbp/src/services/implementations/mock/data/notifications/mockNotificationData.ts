import {
    NotificationResponse,
    NotificationListResponse,
    SavedNotificationResponse,
    SavedNotificationListResponse
} from '../../../../../types/notification.types';
import { v4 as uuidv4 } from 'uuid';

// Mock notification data
export const mockNotifications: NotificationResponse[] = [
    {
        id: uuidv4(),
        errorNumber: 1001,
        statusCode: 400,
        matchMode: 1,
        matchOrder: 1,
        matchText: "Payment failed",
        messageSubject: "Payment Processing Error",
        messageBody: "There was an error processing your payment. Please try again.",
        emailMember: true,
        emailMemberServices: true,
        emailSysOp: false,
        notes: "Standard payment failure notification",
        symmetry: true,
        emerge: false
    },
    {
        id: uuidv4(),
        errorNumber: 1002,
        statusCode: 404,
        matchMode: 2,
        matchOrder: 2,
        matchText: "Payee not found",
        messageSubject: "Payee Not Found",
        messageBody: "The payee you attempted to pay could not be found in our system.",
        emailMember: true,
        emailMemberServices: false,
        emailSysOp: true,
        notes: "Notification for missing payee",
        symmetry: false,
        emerge: true
    },
    {
        id: uuidv4(),
        errorNumber: 1003,
        statusCode: 500,
        matchMode: 1,
        matchOrder: 3,
        matchText: "System error",
        messageSubject: "System Error",
        messageBody: "A system error occurred. Our team has been notified.",
        emailMember: true,
        emailMemberServices: true,
        emailSysOp: true,
        notes: "Critical system error notification",
        symmetry: true,
        emerge: true
    }
];

export const mockNotificationListResponse: NotificationListResponse = {
    notifications: mockNotifications
};

// Mock saved notification data
export const mockSavedNotifications: SavedNotificationResponse[] = [
    {
        ID: 1,
        statusCode: 400,
        statusCodeDescription: "Bad Request",
        date: new Date().toISOString(),
        memberID: "MEM12345",
        paymentID: "PAY98765",
        paymentDate: new Date().toISOString(),
        name: "John Doe",
        memberEmail: "john.doe@example.com",
        subject: "Payment Processing Error",
        body: "There was an error processing your payment. Please try again.",
        sent: true
    },
    {
        ID: 2,
        statusCode: 404,
        statusCodeDescription: "Not Found",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        memberID: "MEM54321",
        paymentID: "PAY12345",
        paymentDate: new Date(Date.now() - 86400000).toISOString(),
        name: "Jane Smith",
        memberEmail: "jane.smith@example.com",
        subject: "Payee Not Found",
        body: "The payee you attempted to pay could not be found in our system.",
        sent: true
    },
    {
        ID: 3,
        statusCode: 500,
        statusCodeDescription: "Internal Server Error",
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        memberID: "MEM67890",
        paymentID: "PAY45678",
        paymentDate: new Date(Date.now() - 172800000).toISOString(),
        name: "Bob Johnson",
        memberEmail: "bob.johnson@example.com",
        subject: "System Error",
        body: "A system error occurred. Our team has been notified.",
        sent: false
    }
];

export const mockSavedNotificationListResponse: SavedNotificationListResponse = {
    savedNotifications: mockSavedNotifications
};