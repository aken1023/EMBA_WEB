"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/database"
import { toast } from "sonner"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  max_attendees: number
  price: number
  category: string
  status: string
  image_url?: string
  created_by: string
  created_at: string
  updated_at: string
  event_registrations?: { count: number }[]
}

const initialEventData = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  max_attendees: 100,
  price: 0,
  category: "聚會",
  status: "報名中",
  image_url: "",
  created_by: "11111111-1111-1111-1111-111111111111" // 假設使用管理員ID
}

const eventCategories = [
  { value: "聚會", label: "聚會" },
  { value: "論壇", label: "論壇" },
  { value: "講座", label: "講座" },
  { value: "運動", label: "運動" },
  { value: "旅遊", label: "旅遊" },
  { value: "培訓", label: "培訓" },
  { value: "其他", label: "其他" }
]

const eventStatuses = [
  { value: "報名中", label: "報名中" },
  { value: "已額滿", label: "已額滿" },
  { value: "已結束", label: "已結束" },
  { value: "已取消", label: "已取消" }
]

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState<any>(initialEventData)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await getEvents()
      if (error) {
        toast.error("載入活動資料失敗")
        console.error(error)
      } else {
        setEvents(data || [])
      }
    } catch (error) {
      toast.error("載入活動資料失敗")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        ...event,
        max_attendees: event.max_attendees || 100,
        price: event.price || 0
      })
    } else {
      setEditingEvent(null)
      setFormData(initialEventData)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingEvent(null)
    setFormData(initialEventData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: typeof initialEventData) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const eventData = {
        ...formData,
        max_attendees: parseInt(formData.max_attendees) || 100,
        price: parseFloat(formData.price) || 0
      }

      if (editingEvent) {
        const { error } = await updateEvent(editingEvent.id, eventData)
        if (error) {
          toast.error("更新活動失敗")
          return
        }
        toast.success("活動更新成功")
      } else {
        const { error } = await createEvent(eventData)
        if (error) {
          toast.error("創建活動失敗")
          return
        }
        toast.success("活動創建成功")
      }

      handleCloseDialog()
      loadEvents()
    } catch (error) {
      toast.error(editingEvent ? "更新活動失敗" : "創建活動失敗")
      console.error(error)
    }
  }

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`確定要刪除活動 "${eventTitle}" 嗎？此操作無法復原。`)) {
      return
    }

    try {
      const { error } = await deleteEvent(eventId)
      if (error) {
        toast.error("刪除活動失敗")
        return
      }
      toast.success("活動已刪除")
      loadEvents()
    } catch (error) {
      toast.error("刪除活動失敗")
      console.error(error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "報名中":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>
      case "已額滿":
        return <Badge className="bg-orange-100 text-orange-800">{status}</Badge>
      case "已結束":
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
      case "已取消":
        return <Badge className="bg-red-100 text-red-800">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-TW")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">活動管理</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">活動管理</h1>
          <p className="text-muted-foreground">
            管理系統中的所有活動
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              新增活動
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "編輯活動" : "新增活動"}</DialogTitle>
              <DialogDescription>
                {editingEvent ? "修改活動資訊" : "創建新的活動"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">活動標題</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="請輸入活動標題"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">活動描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="請輸入活動描述"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">活動日期</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">活動時間</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    placeholder="例如：14:00-17:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">活動地點</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="請輸入活動地點"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max_attendees">最大參與人數</Label>
                  <Input
                    id="max_attendees"
                    type="number"
                    value={formData.max_attendees}
                    onChange={(e) => handleInputChange("max_attendees", e.target.value)}
                    placeholder="100"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">活動費用 (NT$)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">活動類別</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇活動類別" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">活動狀態</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇活動狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">活動圖片 URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                  placeholder="請輸入活動圖片 URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                取消
              </Button>
              <Button onClick={handleSubmit}>
                {editingEvent ? "更新" : "創建"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            活動列表 ({events.length})
          </CardTitle>
          <CardDescription>
            系統中所有活動的列表
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>活動資訊</TableHead>
                <TableHead>時間地點</TableHead>
                <TableHead>參與狀況</TableHead>
                <TableHead>費用</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.description.length > 60 
                          ? `${event.description.substring(0, 60)}...` 
                          : event.description}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.event_registrations?.[0]?.count || 0} / {event.max_attendees}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{
                            width: `${Math.min(
                              ((event.event_registrations?.[0]?.count || 0) / event.max_attendees) * 100, 
                              100
                            )}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {event.price === 0 ? "免費" : `NT$ ${event.price.toLocaleString()}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(event.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id, event.title)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {events.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              暫無活動資料
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
