"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, UserPlus, Shield, Key, FileText, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        variant="none"
        size={15}
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
      
        <Menu className={`h-4 w-4 ${isOpen ? "text-white" : ""} `} />
      </Button> 
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 pt-8 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h1 className="text-2xl font-bold mb-8">RBAC Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
                <Users className="h-5 w-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link href="/roles" className="flex items-center space-x-2 hover:text-gray-300">
                <Shield className="h-5 w-5" />
                <span>Roles</span>
              </Link>
            </li>
            <li>
              <Link href="/permissions" className="flex items-center space-x-2 hover:text-gray-300">
                <Key className="h-5 w-5" />
                <span>Permissions</span>
              </Link>
            </li>
            <li>
              <Link href="/logs" className="flex items-center space-x-2 hover:text-gray-300">
                <FileText className="h-5 w-5" />
                <span>Audit Logs</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

