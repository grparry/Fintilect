import { NotificationResponse } from '../../../../../types/notification.types';
import { v4 as uuidv4 } from 'uuid';

// Mock notification data aligned with the API specification
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
        symmetry: false,
        emerge: true
    },
    {
        id: uuidv4(),
        errorNumber: 1004,
        statusCode: 200,
        matchMode: 1,
        matchOrder: 1,
        matchText: "Payment successful",
        messageSubject: "Payment Successful",
        messageBody: "Your payment has been processed successfully.",
        emailMember: true,
        emailMemberServices: false,
        emailSysOp: false,
        notes: "Standard success notification",
        symmetry: true,
        emerge: false
    },
    {
        id: uuidv4(),
        errorNumber: 1005,
        statusCode: 202,
        matchMode: 1,
        matchOrder: 1,
        matchText: "Payment pending",
        messageSubject: "Payment Pending",
        messageBody: "Your payment is being processed and is currently pending.",
        emailMember: true,
        emailMemberServices: false,
        emailSysOp: false,
        notes: "Pending payment notification",
        symmetry: true,
        emerge: false
    }
];