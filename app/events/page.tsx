"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, Edit, Trash2, MoreVertical, Upload, Image } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/database"

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
  image_url: string
  created_at: string
  updated_at: string
  event_registrations?: { count: number }[]
}

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  max_attendees: number
  price: number
  category: string
  image_url: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    max_attendees: 100,
    price: 0,
    category: "聚會",
    image_url: ""
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const { data, error } = await getEvents()
      if (error) {
        console.error("Error loading events:", error)
      } else {
        setEvents(data)
      }
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // 創建 FileReader 來轉換圖片為 base64
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setUploadedImage(base64String)
        handleInputChange("image_url", base64String)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("圖片上傳失敗")
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      max_attendees: 100,
      price: 0,
      category: "聚會",
      image_url: ""
    })
    setUploadedImage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const eventData = {
        ...formData,
        status: "報名中",
        created_by: "11111111-1111-1111-1111-111111111111" // 臨時使用管理員 ID，實際應該使用當前用戶 ID
      }

      const { data, error } = await createEvent(eventData)
      
      if (error) {
        console.error("Error creating event:", error)
        alert("建立活動失敗：" + (error as any)?.message || "未知錯誤")
      } else {
        alert("活動建立成功！")
        setIsDialogOpen(false)
        resetForm()
        loadEvents() // 重新載入活動列表
      }
    } catch (error) {
      console.error("Error creating event:", error)
      alert("建立活動時發生錯誤")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      max_attendees: event.max_attendees,
      price: event.price,
      category: event.category,
      image_url: event.image_url
    })
    setUploadedImage(event.image_url)
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return
    
    setIsSubmitting(true)

    try {
      const { data, error } = await updateEvent(editingEvent.id, formData)
      
      if (error) {
        console.error("Error updating event:", error)
        alert("更新活動失敗：" + (error as any)?.message || "未知錯誤")
      } else {
        alert("活動更新成功！")
        setIsEditDialogOpen(false)
        setEditingEvent(null)
        resetForm()
        loadEvents() // 重新載入活動列表
      }
    } catch (error) {
      console.error("Error updating event:", error)
      alert("更新活動時發生錯誤")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    try {
      const { error } = await deleteEvent(eventId)
      
      if (error) {
        console.error("Error deleting event:", error)
        alert("刪除活動失敗：" + (error as any)?.message || "未知錯誤")
      } else {
        alert("活動刪除成功！")
        loadEvents() // 重新載入活動列表
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("刪除活動時發生錯誤")
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "報名中":
        return "bg-gradient-to-r from-emerald-400 to-cyan-400 text-white shadow-lg"
      case "已結束":
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
      case "已額滿":
        return "bg-gradient-to-r from-red-400 to-pink-400 text-white shadow-lg"
      default:
        return "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "聚會":
        return "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md"
      case "講座":
        return "bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-md"
      case "運動":
        return "bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-md"
      case "體驗":
        return "bg-gradient-to-r from-purple-400 to-violet-400 text-white shadow-md"
      default:
        return "bg-gradient-to-r from-gray-400 to-slate-400 text-white"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-purple-200 mx-auto mb-6"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-purple-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">載入精彩活動中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              校友活動
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            🎉 參與精彩活動，擴展人脈網絡，共創美好回憶 ✨
          </p>
        </div>

        {/* Search, Filter and Add Button */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="🔍 搜尋你感興趣的活動..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-purple-200 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-64 h-14 border-2 border-purple-200 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
              <Filter className="h-5 w-5 mr-2 text-purple-500" />
              <SelectValue placeholder="選擇活動類型" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">🌟 所有類型</SelectItem>
              <SelectItem value="聚會">🎊 聚會</SelectItem>
              <SelectItem value="講座">📚 講座</SelectItem>
              <SelectItem value="運動">⚽ 運動</SelectItem>
              <SelectItem value="體驗">🎨 體驗</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Add Event Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <Plus className="h-5 w-5 mr-2" />
                新增活動
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ 新增活動
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-lg font-semibold text-gray-700">活動名稱 *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="輸入精彩的活動名稱"
                      className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-lg font-semibold text-gray-700">活動類型 *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-2 h-12 border-2 border-purple-200 rounded-xl">
                        <SelectValue placeholder="選擇活動類型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="聚會">🎊 聚會</SelectItem>
                        <SelectItem value="講座">📚 講座</SelectItem>
                        <SelectItem value="運動">⚽ 運動</SelectItem>
                        <SelectItem value="體驗">🎨 體驗</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-semibold text-gray-700">活動描述 *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="詳細描述你的精彩活動..."
                    rows={4}
                    className="mt-2 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date" className="text-lg font-semibold text-gray-700">活動日期 *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-lg font-semibold text-gray-700">活動時間 *</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      placeholder="例如：14:00-17:00"
                      className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-lg font-semibold text-gray-700">活動地點 *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="輸入活動舉辦地點"
                    className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="max_attendees" className="text-lg font-semibold text-gray-700">人數上限 *</Label>
                    <Input
                      id="max_attendees"
                      type="number"
                      min="1"
                      value={formData.max_attendees}
                      onChange={(e) => handleInputChange("max_attendees", parseInt(e.target.value))}
                      className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-lg font-semibold text-gray-700">活動費用 (NT$)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                      placeholder="0 表示免費"
                      className="mt-2 h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* 圖片上傳區域 */}
                <div>
                  <Label className="text-lg font-semibold text-gray-700">活動圖片</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          value={formData.image_url}
                          onChange={(e) => handleInputChange("image_url", e.target.value)}
                          placeholder="或直接輸入圖片網址"
                          className="h-12 border-2 border-purple-200 rounded-xl focus:border-purple-400"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 px-6 border-2 border-purple-200 rounded-xl hover:bg-purple-50"
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>載入中...</>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              上傳圖片
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* 圖片預覽 */}
                    {(formData.image_url || uploadedImage) && (
                      <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-purple-200">
                        <img
                          src={uploadedImage || formData.image_url}
                          alt="活動圖片預覽"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white font-semibold">圖片預覽</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                    disabled={isSubmitting}
                    className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    取消
                  </Button>
                  <Button 
                    type="submit" 
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "建立中..." : "建立活動"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Event Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ✏️ 編輯活動
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="edit-title" className="text-lg font-semibold text-gray-700">活動名稱 *</Label>
                    <Input
                      id="edit-title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="輸入精彩的活動名稱"
                      className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category" className="text-lg font-semibold text-gray-700">活動類型 *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-2 h-12 border-2 border-blue-200 rounded-xl">
                        <SelectValue placeholder="選擇活動類型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="聚會">🎊 聚會</SelectItem>
                        <SelectItem value="講座">📚 講座</SelectItem>
                        <SelectItem value="運動">⚽ 運動</SelectItem>
                        <SelectItem value="體驗">🎨 體驗</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-description" className="text-lg font-semibold text-gray-700">活動描述 *</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="詳細描述你的精彩活動..."
                    rows={4}
                    className="mt-2 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="edit-date" className="text-lg font-semibold text-gray-700">活動日期 *</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-time" className="text-lg font-semibold text-gray-700">活動時間 *</Label>
                    <Input
                      id="edit-time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      placeholder="例如：14:00-17:00"
                      className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-location" className="text-lg font-semibold text-gray-700">活動地點 *</Label>
                  <Input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="輸入活動舉辦地點"
                    className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="edit-max_attendees" className="text-lg font-semibold text-gray-700">人數上限 *</Label>
                    <Input
                      id="edit-max_attendees"
                      type="number"
                      min="1"
                      value={formData.max_attendees}
                      onChange={(e) => handleInputChange("max_attendees", parseInt(e.target.value))}
                      className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price" className="text-lg font-semibold text-gray-700">活動費用 (NT$)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                      placeholder="0 表示免費"
                      className="mt-2 h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* 編輯模式的圖片上傳區域 */}
                <div>
                  <Label className="text-lg font-semibold text-gray-700">活動圖片</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          value={formData.image_url}
                          onChange={(e) => handleInputChange("image_url", e.target.value)}
                          placeholder="或直接輸入圖片網址"
                          className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-400"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 px-6 border-2 border-blue-200 rounded-xl hover:bg-blue-50"
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>載入中...</>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              更換圖片
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* 圖片預覽 */}
                    {(formData.image_url || uploadedImage) && (
                      <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border-2 border-blue-200">
                        <img
                          src={uploadedImage || formData.image_url}
                          alt="活動圖片預覽"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white font-semibold">圖片預覽</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditDialogOpen(false)
                      setEditingEvent(null)
                      resetForm()
                    }}
                    disabled={isSubmitting}
                    className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    取消
                  </Button>
                  <Button 
                    type="submit" 
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "更新中..." : "更新活動"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 rounded-3xl">
              <div className="relative aspect-video bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-purple-400">
                    <div className="text-center">
                      <Image className="h-16 w-16 mx-auto mb-3 opacity-60" />
                      <p className="text-sm font-medium">活動圖片</p>
                    </div>
                  </div>
                )}
                
                {/* 漸變覆蓋 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 狀態徽章 */}
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(event.status) + " px-3 py-1 text-sm font-bold"}>
                    {event.status}
                  </Badge>
                </div>
                
                {/* 操作選單 */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="h-10 w-10 p-0 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                      <DropdownMenuItem onClick={() => handleEdit(event)} className="rounded-lg">
                        <Edit className="h-4 w-4 mr-2 text-blue-500" />
                        編輯
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="rounded-lg text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            刪除
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-gray-800">確認刪除活動</AlertDialogTitle>
                            <AlertDialogDescription className="text-lg text-gray-600">
                              確定要刪除「<span className="font-semibold text-purple-600">{event.title}</span>」這個活動嗎？此操作無法復原。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">取消</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(event.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl"
                            >
                              確認刪除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">{event.description}</p>
                </div>

                <div className="space-y-3 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-purple-500" />
                    <span className="font-medium">{event.date} {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-purple-500" />
                    <span className="font-medium">上限 {event.max_attendees} 人</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getCategoryColor(event.category) + " px-3 py-1 text-sm font-bold"}>
                      {event.category}
                    </Badge>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {event.price === 0 ? "免費" : `NT$ ${event.price}`}
                    </span>
                  </div>
                  <Button 
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    disabled={event.status === "已結束" || event.status === "已額滿"}
                  >
                    {event.status === "已結束" ? "已結束" : event.status === "已額滿" ? "已額滿" : "立即報名"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <Calendar className="h-24 w-24 mx-auto text-gray-300 mb-4" />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-20"></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">找不到符合條件的活動</h3>
            <p className="text-xl text-gray-500 max-w-md mx-auto">請嘗試調整搜尋條件或瀏覽其他精彩活動</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
