import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data.map(user => ({
    ...user,
    role: 'User', 
    status: 'Active' 
  }));
};

export const addUser = async (user) => {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return { ...response.data, role: user.role, status: user.status };
};

export const updateUser = async (id, updates) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, updates);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};

let roles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'User', permissions: ['read'] },
];

let permissions = ['read', 'write', 'delete'];

export const mockFetchRoles = async () => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return roles;
};

export const mockAddRole = async (role) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newRole = { ...role, id: roles.length + 1 };
  roles.push(newRole);
  return newRole;
};

export const mockUpdateRole = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = roles.findIndex(role => role.id === id);
  if (index !== -1) {
    roles[index] = { ...roles[index], ...updates };
    return roles[index];
  }
  throw new Error('Role not found');
};

export const mockDeleteRole = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  roles = roles.filter(role => role.id !== id);
};

// Permission API
export const mockFetchPermissions = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return permissions;
};

export const mockAddPermission = async (permission) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (!permissions.includes(permission)) {
    permissions.push(permission);
  }
  return permission;
};

export const mockDeletePermission = async (permission) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  permissions = permissions.filter(p => p !== permission);
};

