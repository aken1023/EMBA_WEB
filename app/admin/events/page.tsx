"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  MapPin,
} from "lucide-react"

const events = [
  {
    id: "1",
    title: "2024年度校友聚會",
    date: "2024-12-15",
    time: "18:00-22:00",
    location: "台北君悅酒店",
    category: "聚會",
    status: "published",
    attendees: 156,
    maxAttendees: 200,
    price: 1500,
    createdBy: "管理員",
    createdAt: "2024-10-01",
  },
  {
    id: "2",
    title: "AI時代的商業轉型論壇",
    date: "2024-11-28",
    time: "14:00-17:00",
    location: "台大管理學院",
    category: "講座",
    status: "published",
    attendees: 89,
    maxAttendees: 120,
    price: 800,
    createdBy: "張志明",
    createdAt: "2024-10-15",
  },
  {
    id: "3",
    title: "高爾夫球友誼賽",
    date: "2024-11-20",
    time: "08:00-16:00",
    location: "台北高爾夫俱樂部",
    category: "運動",
    status: "draft",
    attendees: 32,
    maxAttendees: 40,
    price: 2500,
    createdBy: "李美華",
    createdAt: "2024-11-01",
  },
  {
    id: "4",
    title: "創業經驗分享會",
    date: "2024-11-10",
    time: "19:00-21:00",
    location: "信義區創業基地",
    category: "講座",
    status: "ended",
    attendees: 67,
    maxAttendees: 80,
    price: 0,
    createdBy: "王大明",
    createdAt: "2024-10-20",
  },
]

export default function EventsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">已發布</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">草稿</Badge>
      case "ended":
        return <Badge className="bg-gray-100 text-gray-800">已結束</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">已取消</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      聚會: "bg-blue-100 text-blue-800",
      講座: "bg-purple-100 text-purple-800",
      運動: "bg-green-100 text-green-800",
      旅遊: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">活動管理</h1>
          <p className="text-gray-600">管理校友活動與報名狀況</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            匯出報告
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新增活動
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <p className="text-sm text-gray-600">總活動數</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">89</div>
                <p className="text-sm text-gray-600">進行中</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <p className="text-sm text-gray-600">待審核</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">3,247</div>
                <p className="text-sm text-gray-600">總報名數</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>活動列表</CardTitle>
          <CardDescription>管理所有校友活動</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜尋活動名稱或地點..."
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
                <SelectItem value="published">已發布</SelectItem>
                <SelectItem value="draft">草稿</SelectItem>
                <SelectItem value="ended">已結束</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="類型篩選" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部類型</SelectItem>
                <SelectItem value="聚會">聚會</SelectItem>
                <SelectItem value="講座">講座</SelectItem>
                <SelectItem value="運動">運動</SelectItem>
                <SelectItem value="旅遊">旅遊</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>活動資訊</TableHead>
                  <TableHead>日期時間</TableHead>
                  <TableHead>地點</TableHead>
                  <TableHead>類型</TableHead>
                  <TableHead>報名狀況</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500">
                          建立者: {event.createdBy} • {event.createdAt}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.date}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(event.category)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {event.attendees}/{event.maxAttendees}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round((event.attendees / event.maxAttendees) * 100)}% 滿額
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
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
                            編輯活動
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            報名名單
                          </DropdownMenuItem>
                          {event.status === "draft" && (
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              發布活動
                            </DropdownMenuItem>
                          )}
                          {event.status === "published" && (
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              取消活動
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            刪除活動
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              顯示 {filteredEvents.length} 筆結果中的 1-{Math.min(10, filteredEvents.length)} 筆
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
        </CardContent>
      </Card>
    </div>
  )
}
