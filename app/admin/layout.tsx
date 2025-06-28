"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  Menu,
  Shield,
  Database,
  Bell,
  Home,
  Camera,
} from "lucide-react"

const navigation = [
  { name: "總覽", href: "/admin", icon: BarChart3 },
  { name: "用戶管理", href: "/admin/users", icon: Users },
  { name: "活動管理", href: "/admin/events", icon: Calendar },
  { name: "論壇管理", href: "/admin/forum", icon: MessageSquare },
  { name: "論文管理", href: "/admin/papers", icon: FileText },
  { name: "相簿管理", href: "/admin/photos", icon: Camera },
  { name: "權限管理", href: "/admin/permissions", icon: Shield },
  { name: "系統設定", href: "/admin/settings", icon: Settings },
  { name: "資料庫", href: "/admin/database", icon: Database },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-6"}`}>
      <div className="flex items-center mb-8">
        <Shield className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-xl font-bold">管理後台</h1>
          <p className="text-sm text-gray-500">EMBA 校友網</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t pt-4">
        <Link
          href="/"
          className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <Home className="h-5 w-5 mr-3" />
          返回前台
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="fixed top-4 left-4 z-40 md:hidden" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-900 ml-12 md:ml-0">
                    {navigation.find((item) => item.href === pathname)?.name || "管理後台"}
                  </h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Badge variant="secondary">管理員</Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
