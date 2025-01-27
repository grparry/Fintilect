import {
  Contact,
  ContactType,
  Address,
  NotificationType
} from '../../../../../types/client.types';

export const contactTypes: ContactType[] = [
  'Primary',
  'Technical',
  'Billing'
];
export const mockContacts: Contact[] = [
  {
    id: "contact-1",
    type: "Primary",
    role: "Admin",
    name: "John Smith",
    title: "CEO",
    email: "john.smith@example.com",
    phone: "555-0123",
    address: {
      street1: "123 Main St",
      street2: "Suite 100",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    },
    notifications: ["Email", "SMS"]
  },
  {
    id: "contact-2",
    type: "Technical",
    role: "Technical",
    name: "Jane Doe",
    title: "CTO",
    email: "jane.doe@example.com",
    phone: "555-0124",
    address: {
      street1: "456 Market St",
      street2: "Floor 4",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    },
    notifications: ["Email"]
  }
];