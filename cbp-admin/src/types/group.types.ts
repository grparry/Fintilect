export interface UserGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  members: number[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGroupData {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateGroupData {
  name?: string;
  description?: string;
  permissions?: string[];
  members?: number[];
}
