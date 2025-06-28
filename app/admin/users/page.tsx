"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, UserPlus, Download, Eye, Edit, Trash2, Ban, CheckCircle } from "lucide-react"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"

// Mock data for demo mode
const mockUsers = [
  {
    id: "1",
    name: "張志明",
    email: "zhang.zhiming@example.com",
    company: "創新科技股份有限公司",
    position1: "執行長", // 更新為 position1
    graduation_year: 2018,
    location: "台北市",
    status: "active",
    created_at: "2024-01-15",
    updated_at: "2024-11-20",
    avatar_url: "/business-executive.png",
  },
  {
    id: "2",
    name: "李美華",
    email: "li.meihua@example.com",
    company: "國際金融集團",
    position1: "投資總監", // 更新為 position1
    graduation_year: 2017,
    location: "香港",
    status: "active",
    created_at: "2024-02-20",
    updated_at: "2024-11-19",
    avatar_url: "/placeholder.svg",
  },
  {
    id: "3",
    name: "王大明",
    email: "wang.daming@example.com",
    company: "綠能科技公司",
    position1: "創辦人", // 更新為 position1
    graduation_year: 2019,
    location: "新竹市",
    status: "pending",
    created_at: "2024-11-18",
    updated_at: "2024-11-18",
    avatar_url: "/placeholder.svg",
  },
  {
    id: "4",
    name: "陳淑芬",
    email: "chen.shufen@example.com",
    company: "醫療器材公司",
    position1: "營運長", // 更新為 position1
    graduation_year: 2016,
    location: "台中市",
    status: "suspended",
    created_at: "2023-12-10",
    updated_at: "2024-11-15",
    avatar_url: "/placeholder.svg",
  },
]

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [users, setUsers] = useState(mockUsers)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 2547,
    active: 2489,
    pending: 45,
    suspended: 13,
  })

  useEffect(() => {
    loadUsers()
    loadStats()
  }, [])

  const loadUsers = async () => {
    if (!isSupabaseConfigured) {
      setUsers(mockUsers)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading users:", error)
        setUsers(mockUsers)
      } else {
        // Add status field for demo (this would come from your user management system)
        const usersWithStatus =
          data?.map((user) => ({
            ...user,
            status: "active", // This would be determined by your business logic
          })) || []
        setUsers(usersWithStatus)
      }
    } catch (error) {
      console.error("Error loading users:", error)
      setUsers(mockUsers)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    if (!isSupabaseConfigured) {
      return
    }

    try {
      const { count: totalCount } = await supabase.from("users").select("*", { count: "exact", head: true })

      if (totalCount !== null) {
        setStats((prev) => ({
          ...prev,
          total: totalCount,
          active: Math.floor(totalCount * 0.95), // Approximate
          pending: Math.floor(totalCount * 0.02),
          suspended: Math.floor(totalCount * 0.03),
        }))
      }
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesYear = yearFilter === "all" || user.graduation_year?.toString() === yearFilter

    return matchesSearch && matchesStatus && matchesYear
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">啟用</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">待審核</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">停用</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-TW")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">用戶管理</h1>
          <p className="text-gray-600">管理校友帳戶與權限設定</p>
          {!isSupabaseConfigured && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              🔧 目前為展示模式，顯示模擬資料
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            匯出資料
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            新增用戶
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.total.toLocaleString()}</div>
            <p className="text-sm text-gray-600">總用戶數</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.active.toLocaleString()}</div>
            <p className="text-sm text-gray-600">啟用用戶</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">待審核</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <p className="text-sm text-gray-600">停用用戶</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>用戶列表</CardTitle>
          <CardDescription>管理所有校友帳戶</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋姓名、電子郵件或公司..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="狀態篩選" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="active">啟用</SelectItem>
                <SelectItem value="pending">待審核</SelectItem>
                <SelectItem value="suspended">停用</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="畢業年份" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部年份</SelectItem>
                <SelectItem value="2024">2024年</SelectItem>
                <SelectItem value="2023">2023年</SelectItem>
                <SelectItem value="2022">2022年</SelectItem>
                <SelectItem value="2021">2021年</SelectItem>
                <SelectItem value="2020">2020年</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">載入用戶資料中...</p>
            </div>
          ) : (
            <>
              {/* Users Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用戶</TableHead>
                      <TableHead>公司職位</TableHead>
                      <TableHead>畢業年份</TableHead>
                      <TableHead>所在地</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>註冊日期</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.position1 || "未設定"}</div>
                            <div className="text-sm text-gray-500">{user.company || "未設定"}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.graduation_year ? `${user.graduation_year}年` : "未設定"}</TableCell>
                        <TableCell>{user.location || "未設定"}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-sm text-gray-500">{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                查看詳情
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                編輯資料
                              </DropdownMenuItem>
                              {user.status === "pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  批准申請
                                </DropdownMenuItem>
                              )}
                              {user.status === "active" && (
                                <DropdownMenuItem>
                                  <Ban className="h-4 w-4 mr-2" />
                                  停用帳戶
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                刪除用戶
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  顯示 {filteredUsers.length} 筆結果中的 1-{Math.min(10, filteredUsers.length)} 筆
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    上一頁
                  </Button>
                  <Button variant="outline" size="sm">
                    下一頁
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
