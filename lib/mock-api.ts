import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Define interfaces for User and Role
interface ApiUser {
  id: number;
  name: string;
  email: string;
  // Add other properties that come from the API
}

export interface User extends ApiUser {
  role: string;
  status: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

// User API (using JSONPlaceholder)
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<ApiUser[]>(`${API_BASE_URL}/users`);
  return response.data.map(user => ({
    ...user,
    role: 'User', // Default role
    status: 'Active' // Default status
  }));
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post<ApiUser>(`${API_BASE_URL}/users`, user);
  return { ...response.data, role: user.role, status: user.status };
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  const response = await axios.patch<ApiUser>(`${API_BASE_URL}/users/${id}`, updates);
  return { ...response.data, role: updates.role || 'User', status: updates.status || 'Active' };
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};

// Custom mock data for roles and permissions
let roles: Role[] = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'User', permissions: ['read'] },
];

let permissions: string[] = ['read', 'write', 'delete'];

// Role API
export const mockFetchRoles = async (): Promise<Role[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return roles;
};

export const mockAddRole = async (role: Omit<Role, 'id'>): Promise<Role> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newRole = { ...role, id: roles.length + 1 };
  roles.push(newRole);
  return newRole;
};

export const mockUpdateRole = async (id: number, updates: Partial<Role>): Promise<Role> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = roles.findIndex(role => role.id === id);
  if (index !== -1) {
    roles[index] = { ...roles[index], ...updates };
    return roles[index];
  }
  throw new Error('Role not found');
};

export const mockDeleteRole = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  roles = roles.filter(role => role.id !== id);
};

// Permission API
export const mockFetchPermissions = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return permissions;
};

export const mockAddPermission = async (permission: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (!permissions.includes(permission)) {
    permissions.push(permission);
  }
  return permission;
};

export const mockDeletePermission = async (permission: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  permissions = permissions.filter(p => p !== permission);
};

