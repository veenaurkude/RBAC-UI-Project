"use client"

import { useState, useEffect } from 'react'
import { UserManagement } from '@/components/user-management'
import { fetchUsers, mockFetchRoles } from '@/lib/mock-api'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

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
      <h1 className="text-3xl font-bold mb-6 pl-8 md:pl-0">User Management</h1>
      <UserManagement users={users} setUsers={setUsers} roles={roles} />
    </div>
  )
}

