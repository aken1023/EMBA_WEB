"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "儀表板",
    href: "/admin",
    icon: BarChart3,
    exact: true
  },
  {
    name: "用戶管理",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "活動管理", 
    href: "/admin/events",
    icon: Calendar,
  },
  {
    name: "論壇管理",
    href: "/admin/forum",
    icon: MessageSquare,
  },
  {
    name: "論文管理",
    href: "/admin/papers",
    icon: FileText,
  },
  {
    name: "系統設定",
    href: "/admin/settings",
    icon: Settings,
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "bg-white shadow-sm border-r transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-lg">管理後台</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href, item.exact)
                
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        sidebarCollapsed ? "px-2" : "px-3",
                        active && "bg-blue-600 text-white hover:bg-blue-700"
                      )}
                    >
                      <Icon className={cn(
                        "h-4 w-4", 
                        sidebarCollapsed ? "mx-auto" : "mr-2"
                      )} />
                      {!sidebarCollapsed && item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Return to main site */}
            <div className="p-4 border-t">
              <Link href="/">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    sidebarCollapsed ? "px-2" : "px-3"
                  )}
                >
                  <Home className={cn(
                    "h-4 w-4", 
                    sidebarCollapsed ? "mx-auto" : "mr-2"
                  )} />
                  {!sidebarCollapsed && "回到主站"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  EMBA 管理後台
                </h1>
                <p className="text-sm text-gray-500">
                  管理系統數據與用戶內容
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  系統正常
                </Badge>
                <div className="text-sm text-gray-500">
                  管理員: 系統管理員
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
