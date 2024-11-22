"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Define the type for a log entry
interface LogEntry {
  id: number;
  action: string;
  details: string;
  timestamp: string;
}

// Mock audit log data
const mockAuditLogs: LogEntry[] = [
  { id: 1, action: 'User Created', details: 'New user "Alice" created', timestamp: '2023-05-01 10:30:00' },
  { id: 2, action: 'Role Updated', details: 'Added "delete" permission to "Editor" role', timestamp: '2023-05-02 14:45:00' },
  { id: 3, action: 'Permission Deleted', details: 'Removed "archive" permission', timestamp: '2023-05-03 09:15:00' },
  // Add more mock data as needed
]

export default function AuditLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulating API call to fetch audit logs
    const fetchLogs = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      setLogs(mockAuditLogs)
    }
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Audit Logs</h1>
      <Input
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map(log => (
            <TableRow key={log.id}>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

