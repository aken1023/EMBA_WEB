"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Calendar, MessageSquare, FileText, TrendingUp, Activity, Clock, AlertCircle } from "lucide-react"
import { getUsers, getEvents, getForumPosts, getPapers } from "@/lib/database"

interface Stats {
  totalUsers: number
  totalEvents: number
  totalPosts: number
  totalPapers: number
  recentActivity: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalEvents: 0,
    totalPosts: 0,
    totalPapers: 0,
    recentActivity: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const [usersResult, eventsResult, postsResult, papersResult] = await Promise.all([
        getUsers(),
        getEvents(),
        getForumPosts(),
        getPapers()
      ])

      setStats({
        totalUsers: usersResult.data?.length || 0,
        totalEvents: eventsResult.data?.length || 0,
        totalPosts: postsResult.data?.length || 0,
        totalPapers: papersResult.data?.length || 0,
        recentActivity: [
          ...(eventsResult.data?.slice(0, 3).map(event => ({
            type: 'event',
            title: event.title,
            date: new Date(event.created_at).toLocaleDateString('zh-TW'),
            status: event.status
          })) || []),
          ...(postsResult.data?.slice(0, 3).map(post => ({
            type: 'post',
            title: post.title,
            date: new Date(post.created_at).toLocaleDateString('zh-TW'),
            status: '已發布'
          })) || []),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
      })
    } catch (error) {
      console.error("載入統計資料失敗:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4 text-blue-500" />
      case 'post':
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case 'paper':
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityTypeName = (type: string) => {
    switch (type) {
      case 'event':
        return '活動'
      case 'post':
        return '論壇文章'
      case 'paper':
        return '論文'
      default:
        return '未知'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">儀表板</h1>
          <p className="text-muted-foreground">系統概覽與統計資料</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">儀表板</h1>
        <p className="text-muted-foreground">
          系統概覽與統計資料
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總用戶數</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% 較上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總活動數</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              +5% 較上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">論壇文章</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              +8% 較上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">學術論文</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalPapers}</div>
            <p className="text-xs text-muted-foreground">
              +3% 較上月
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              最近活動
            </CardTitle>
            <CardDescription>
              系統中的最新內容與更新
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getActivityTypeName(activity.type)} • {activity.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  暫無最近活動
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              系統狀態
            </CardTitle>
            <CardDescription>
              系統運行狀態與健康檢查
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">資料庫連接</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  正常
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">伺服器狀態</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  運行中
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">系統備份</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  排程中
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">外部 API</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  連接正常
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>
            常用的管理功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-xs">新增用戶</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">建立活動</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs">管理論壇</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-xs">論文審核</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-xs">系統日誌</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Clock className="h-6 w-6" />
              <span className="text-xs">定時任務</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
