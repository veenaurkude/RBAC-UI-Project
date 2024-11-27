import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { mockAddPermission, mockDeletePermission, mockUpdateRole } from '@/lib/mock-api'

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

type Permission = string;

interface PermissionManagementProps {
  permissions: Permission[];
  setPermissions: React.Dispatch<React.SetStateAction<Permission[]>>;
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

export function PermissionManagement({ permissions, setPermissions, roles, setRoles }: PermissionManagementProps) {
  const [newPermission, setNewPermission] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddPermission = async () => {
    if (newPermission && !permissions.includes(newPermission)) {
      const addedPermission = await mockAddPermission(newPermission)
      setPermissions([...permissions, addedPermission])
      setNewPermission('')
    }
  }

  const handleDeletePermission = async (permission: Permission) => {
    await mockDeletePermission(permission)
    setPermissions(permissions.filter(p => p !== permission))
    // Remove the permission from all roles
    const updatedRoles = await Promise.all(roles.map(async (role) => {
      if (role.permissions.includes(permission)) {
        const updatedPermissions = role.permissions.filter(p => p !== permission)
        return await mockUpdateRole(role.id, { permissions: updatedPermissions })
      }
      return role
    }))
    setRoles(updatedRoles)
  }

  const handleUpdateRolePermission = async (roleId: number, permission: Permission) => {
    const role = roles.find(r => r.id === roleId)
    if (role) {
      const updatedPermissions = role.permissions.includes(permission)
        ? role.permissions.filter(p => p !== permission)
        : [...role.permissions, permission]
      const updatedRole = await mockUpdateRole(roleId, { permissions: updatedPermissions })
      setRoles(roles.map(r => r.id === roleId ? updatedRole : r))
    }
  }

  const filteredPermissions = permissions.filter(permission => 
    permission.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Permission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Permission</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="permission" className="text-right">
                  Permission Name
                </Label>
                <Input
                  id="permission"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddPermission}>Add Permission</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission Name</TableHead>
            {roles.map(role => (
              <TableHead key={role.id}>{role.name}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPermissions.map(permission => (
            <TableRow key={permission}>
              <TableCell>{permission}</TableCell>
              {roles.map(role => (
                <TableCell key={role.id}>
                  <Checkbox
                    checked={role.permissions.includes(permission)}
                    onCheckedChange={() => handleUpdateRolePermission(role.id, permission)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeletePermission(permission)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

