import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
} from "lucide-react"

const stats = [
  {
    title: "總用戶數",
    value: "2,547",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "活動數量",
    value: "156",
    change: "+8%",
    changeType: "positive",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "論壇主題",
    value: "1,234",
    change: "+15%",
    changeType: "positive",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "論文數量",
    value: "89",
    change: "+5%",
    changeType: "positive",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "user",
    title: "新用戶註冊",
    description: "張志明 加入了校友網",
    time: "5分鐘前",
    status: "success",
  },
  {
    id: 2,
    type: "event",
    title: "活動報名",
    description: "2024年度校友聚會 新增 15 位報名者",
    time: "1小時前",
    status: "info",
  },
  {
    id: 3,
    type: "forum",
    title: "論壇討論",
    description: "AI時代的商業轉型 收到新回覆",
    time: "2小時前",
    status: "info",
  },
  {
    id: 4,
    type: "paper",
    title: "論文審核",
    description: "數位轉型研究 等待審核",
    time: "3小時前",
    status: "warning",
  },
  {
    id: 5,
    type: "system",
    title: "系統警告",
    description: "資料庫連線異常",
    time: "4小時前",
    status: "error",
  },
]

const pendingTasks = [
  {
    id: 1,
    title: "論文審核",
    count: 5,
    priority: "high",
    href: "/admin/papers",
  },
  {
    id: 2,
    title: "活動審批",
    count: 3,
    priority: "medium",
    href: "/admin/events",
  },
  {
    id: 3,
    title: "用戶申請",
    count: 12,
    priority: "low",
    href: "/admin/users",
  },
  {
    id: 4,
    title: "舉報處理",
    count: 2,
    priority: "high",
    href: "/admin/forum",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs 上月</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>最近活動</CardTitle>
              <CardDescription>系統最新動態與用戶活動</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-100"
                          : activity.status === "warning"
                            ? "bg-yellow-100"
                            : activity.status === "error"
                              ? "bg-red-100"
                              : "bg-blue-100"
                      }`}
                    >
                      {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.status === "warning" && <Clock className="h-4 w-4 text-yellow-600" />}
                      {activity.status === "error" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {activity.status === "info" && <Eye className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>待處理事項</CardTitle>
              <CardDescription>需要您關注的任務</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="w-2 h-2 p-0 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.count} 項待處理</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={task.href}>處理</a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                匯出用戶資料
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                生成報告
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageSquare className="h-4 w-4 mr-2" />
                發送通知
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
