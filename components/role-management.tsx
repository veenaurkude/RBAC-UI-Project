import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockAddRole, mockUpdateRole, mockDeleteRole } from '@/lib/mock-api'

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

type Permission = string;

interface RoleManagementProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  permissions: Permission[];
}

export function RoleManagement({ roles, setRoles, permissions }: RoleManagementProps) {
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({ name: '', permissions: [] })
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddRole = async () => {
    const addedRole = await mockAddRole(newRole)
    setRoles([...roles, addedRole])
    setNewRole({ name: '', permissions: [] })
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

  const handleDeleteRole = async (id: number) => {
    await mockDeleteRole(id)
    setRoles(roles.filter(role => role.id !== id))
  }

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Role Name
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissions</Label>
                <div className="col-span-3">
                  {permissions.map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={newRole.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] })
                          } else {
                            setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) })
                          }
                        }}
                      />
                      <label htmlFor={permission}>{permission}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleAddRole}>Add Role</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            {permissions.map(permission => (
              <TableHead key={permission}>{permission}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              {permissions.map(permission => (
                <TableCell key={permission}>
                  <Checkbox
                    checked={role.permissions.includes(permission)}
                    onCheckedChange={() => handleUpdateRolePermission(role.id, permission)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

