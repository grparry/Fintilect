import { Role, Group, UserGroup, GroupRole } from '../../../../../types/client.types';

// Define roles
export const mockRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator'
  },
  {
    id: 2,
    name: 'Bill Pay Operator'
  },
  {
    id: 3,
    name: 'Report Viewer'
  }
];

// Define groups
export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Administrator Group',
    clientId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Bill Pay Group',
    clientId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Define which roles each group has
export const mockGroupRoles: GroupRole[] = [
  {
    groupId: 1,
    roleId: 1 // Administrator group has Administrator role
  },
  {
    groupId: 2,
    roleId: 2 // Bill Pay group has Bill Pay Operator role
  }
];

// Define which users belong to which groups
export const mockUserGroups: UserGroup[] = [
  {
    userId: 1,
    groupId: 1 // User 1 is in Administrator group
  },
  {
    userId: 2,
    groupId: 2 // User 2 is in Bill Pay group
  }
];