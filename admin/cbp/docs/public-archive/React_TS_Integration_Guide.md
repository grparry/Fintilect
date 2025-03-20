# React.js TypeScript Integration Guide

## Overview
This document provides implementation details for integrating the new permission-based admin UI with the C# API.

## API Integration
Use `fetch` or Axios to interact with the backend API. Example:

```typescript
const fetchRoles = async () => {
    const response = await fetch('/api/roles');
    const roles = await response.json();
    return roles;
};
```

## UI Components

### User Management
- **User List**
- **Role Assignment**
- **Group Membership**

### Role & Group Management
- **Role Creation**
- **Group Assignment**
- **Permission Assignment**

### Hooks for Permission Checks

Use React Context or a custom hook:

```typescript
import { useEffect, useState } from 'react';

const usePermissions = (userId: number) => {
    const [permissions, setPermissions] = useState<string[]>([]);

    useEffect(() => {
        fetch(`/api/users/${userId}/permissions`)
            .then((res) => res.json())
            .then((data) => setPermissions(data));
    }, [userId]);

    return permissions;
};
```

## UI Access Control
Use conditional rendering:

```typescript
const permissions = usePermissions(user.id);

if (!permissions.includes('Admin')) {
    return <p>Access Denied</p>;
}
```

This guide provides implementation details for React.js TypeScript developers to integrate the permission system.
