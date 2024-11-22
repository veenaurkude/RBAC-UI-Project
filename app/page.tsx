"use client"

import { useState, useEffect } from 'react'
import { UserManagement } from '@/components/user-management'
import { fetchUsers, mockFetchRoles } from '@/lib/mock-api'

// Define types for User and Role
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers()
      const fetchedRoles = await mockFetchRoles()
      setUsers(fetchedUsers)
      setRoles(fetchedRoles)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <UserManagement users={users} setUsers={setUsers} roles={roles} />
    </div>
  )
}

