"use client"

import { useState, useEffect } from 'react'
import { RoleManagement } from '@/components/role-management'
import { mockFetchRoles, mockFetchPermissions } from '@/lib/mock-api'

export default function RolesPage() {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRoles = await mockFetchRoles()
      const fetchedPermissions = await mockFetchPermissions()
      setRoles(fetchedRoles)
      setPermissions(fetchedPermissions)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      <RoleManagement roles={roles} setRoles={setRoles} permissions={permissions} />
    </div>
  )
}

