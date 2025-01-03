// Mock data for users
const mockUsers = [
  {
    id: 1,
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    permissionGroup: 'Admin',
    lastLogin: '2024-01-15T10:30:00',
    locked: false,
  },
  {
    id: 2,
    username: 'jane.smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    permissionGroup: 'User',
    lastLogin: '2024-01-14T15:45:00',
    locked: true,
  },
];

export const fetchUsers = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

export const createUser = async (userData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        ...userData,
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        lastLogin: null,
        locked: false,
      };
      mockUsers.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const updateUser = async (userData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === userData.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
        resolve(mockUsers[index]);
      }
    }, 500);
  });
};

export const deleteUser = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((u) => u.id === userId);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      resolve();
    }, 500);
  });
};

export const toggleUserLock = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        user.locked = !user.locked;
        resolve(user);
      }
    }, 500);
  });
};
