"use client"

import { useState, useEffect } from 'react'
import { PermissionManagement } from '@/components/permission-management'
import { mockFetchPermissions, mockFetchRoles } from '@/lib/mock-api'

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPermissions = await mockFetchPermissions()
      const fetchedRoles = await mockFetchRoles()
      setPermissions(fetchedPermissions)
      setRoles(fetchedRoles)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Permission Management</h1>
      <PermissionManagement permissions={permissions} setPermissions={setPermissions} roles={roles} setRoles={setRoles} />
    </div>
  )
}

