"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Eye,
  Calendar,
  MapPin,
  Users,
  Camera,
  Upload,
  Grid3X3,
  List,
  Sparkles,
} from "lucide-react"

interface Album {
  id: string
  title: string
  description: string
  coverImage: string
  photoCount: number
  date: string
  location: string
  createdBy: string
  createdAt: string
  likes: number
  views: number
  isPublic: boolean
  eventId?: string
  classId?: string
  tags: string[]
}

const initialAlbums: Album[] = [
  {
    id: "1",
    title: "歲末雅集·校友聚會",
    description: "歲末時光，故友相聚，共話桑麻，溫酒論今昔",
    coverImage: "/elegant-ballroom-event.png",
    photoCount: 156,
    date: "2024-12-15",
    location: "台北君悅酒店",
    createdBy: "活動組",
    createdAt: "2024-12-16",
    likes: 89,
    views: 1234,
    isPublic: true,
    eventId: "1",
    tags: ["雅集", "年度盛會", "台北"],
  },
  {
    id: "2",
    title: "智慧論壇·AI商道",
    description: "探討人工智慧時代的商業智慧，科技與人文的交融",
    coverImage: "/modern-conference-ai.png",
    photoCount: 45,
    date: "2024-11-28",
    location: "台大管理學院",
    createdBy: "張志明",
    createdAt: "2024-11-29",
    likes: 67,
    views: 892,
    isPublic: true,
    eventId: "2",
    tags: ["智慧論壇", "科技", "商道"],
  },
  {
    id: "3",
    title: "綠茵雅韻·高球會",
    description: "綠茵場上展風采，君子之交淡如水",
    coverImage: "/golf-course-green.png",
    photoCount: 78,
    date: "2024-11-20",
    location: "台北高爾夫俱樂部",
    createdBy: "李美華",
    createdAt: "2024-11-21",
    likes: 45,
    views: 567,
    isPublic: true,
    eventId: "3",
    tags: ["高球雅集", "運動", "友誼"],
  },
  {
    id: "4",
    title: "創業心得·智者分享",
    description: "創業路上的智慧分享，前輩經驗薪火相傳",
    coverImage: "/startup-presentation.png",
    photoCount: 32,
    date: "2024-11-10",
    location: "信義區創業基地",
    createdBy: "王大明",
    createdAt: "2024-11-11",
    likes: 38,
    views: 445,
    isPublic: true,
    eventId: "4",
    tags: ["創業智慧", "經驗分享", "傳承"],
  },
  {
    id: "5",
    title: "同窗情深·2018級聚會",
    description: "同窗數載情如故，歲月如歌友誼長",
    coverImage: "/placeholder.svg?height=300&width=400",
    photoCount: 89,
    date: "2024-10-25",
    location: "台北雅緻餐廳",
    createdBy: "陳淑芬",
    createdAt: "2024-10-26",
    likes: 72,
    views: 623,
    isPublic: false,
    classId: "2018",
    tags: ["同窗情", "2018級", "聚會"],
  },
  {
    id: "6",
    title: "校園憶往·青春歲月",
    description: "重溫求學時光，青春歲月如詩如畫",
    coverImage: "/placeholder.svg?height=300&width=400",
    photoCount: 124,
    date: "2024-09-15",
    location: "母校校園",
    createdBy: "校友會",
    createdAt: "2024-09-16",
    likes: 156,
    views: 1567,
    isPublic: true,
    tags: ["校園回憶", "青春", "母校"],
  },
]

const photos = [
  {
    id: "1",
    albumId: "1",
    url: "/elegant-ballroom-event.png",
    thumbnail: "/elegant-ballroom-event.png",
    caption: "開場致詞，賓朋滿座，其樂融融",
    uploadedBy: "活動組",
    uploadedAt: "2024-12-16",
    likes: 23,
    comments: 5,
    tags: ["開場", "致詞"],
  },
  {
    id: "2",
    albumId: "1",
    url: "/placeholder.svg?height=400&width=600",
    thumbnail: "/placeholder.svg?height=200&width=300",
    caption: "晚宴時光，美食佳餚，談笑風生",
    uploadedBy: "活動組",
    uploadedAt: "2024-12-16",
    likes: 45,
    comments: 12,
    tags: ["晚宴", "美食"],
  },
  {
    id: "3",
    albumId: "2",
    url: "/modern-conference-ai.png",
    thumbnail: "/modern-conference-ai.png",
    caption: "智者論道，AI時代的商業智慧",
    uploadedBy: "張志明",
    uploadedAt: "2024-11-29",
    likes: 34,
    comments: 8,
    tags: ["智慧論壇", "AI"],
  },
  {
    id: "4",
    albumId: "3",
    url: "/golf-course-green.png",
    thumbnail: "/golf-course-green.png",
    caption: "一桿進洞，技藝精湛，眾人喝彩",
    uploadedBy: "李美華",
    uploadedAt: "2024-11-21",
    likes: 67,
    comments: 15,
    tags: ["高球", "精彩瞬間"],
  },
]

export default function PhotosPage() {
  const [albums, setAlbums] = useState(initialAlbums)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAlbumData, setNewAlbumData] = useState({
    title: "",
    description: "",
    tags: "",
    isPublic: true
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateAlbum = async () => {
    console.log('handleCreateAlbum 被調用', newAlbumData)
    
    if (!newAlbumData.title.trim()) {
      alert('請輸入雅集標題')
      return
    }

    setIsCreating(true)
    
    try {
      console.log('開始建立相簿')
      
      // 創建新相簿對象
      const newAlbum: Album = {
        id: (albums.length + 1).toString(),
        title: newAlbumData.title,
        description: newAlbumData.description,
        coverImage: "/placeholder.svg?height=300&width=400",
        photoCount: 0,
        date: new Date().toISOString().split('T')[0],
        location: "待更新",
        createdBy: "目前用戶",
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0,
        isPublic: newAlbumData.isPublic,
        tags: newAlbumData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }
      
      console.log('新相簿對象:', newAlbum)
      
      // 更新相簿列表
      setAlbums(prev => {
        const updated = [...prev, newAlbum]
        console.log('更新後的相簿列表:', updated)
        return updated
      })
      
      // 重置表單
      setNewAlbumData({
        title: "",
        description: "",
        tags: "",
        isPublic: true
      })
      
      setIsCreateDialogOpen(false)
      alert('雅集建立成功！')
      console.log('相簿建立完成')
    } catch (error) {
      console.error('建立雅集失敗:', error)
      alert('建立雅集失敗，請稍後再試')
    } finally {
      setIsCreating(false)
    }
  }

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      categoryFilter === "all" ||
      (categoryFilter === "events" && album.eventId) ||
      (categoryFilter === "classes" && album.classId) ||
      (categoryFilter === "public" && album.isPublic) ||
      (categoryFilter === "private" && !album.isPublic)

    return matchesSearch && matchesCategory
  })

  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.likes - a.likes
      case "photos":
        return b.photoCount - a.photoCount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Literary Style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <Sparkles className="h-5 w-5 text-amber-600 mx-3 animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-wide">
              光影記憶
              <span className="text-2xl text-amber-700 ml-3">·</span>
              <span className="text-2xl text-amber-700 ml-1">影像雅集</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">記錄美好時光，分享人生雅韻</p>
            <div className="flex items-center justify-center mt-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full mx-3 animate-bounce"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="albums" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg">
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-100 data-[state=active]:to-orange-100 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              相簿雅集
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-100 data-[state=active]:to-orange-100 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              新近佳作
            </TabsTrigger>
            <TabsTrigger
              value="my-photos"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-100 data-[state=active]:to-orange-100 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              個人典藏
            </TabsTrigger>
          </TabsList>

          <TabsContent value="albums" className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Search and Filters with Literary Style */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-3 h-4 w-4 text-amber-600 group-hover:text-amber-700 transition-colors" />
                <Input
                  placeholder="搜尋相簿雅韻、描述或標籤..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/80 backdrop-blur-sm border-amber-200/50 focus:border-amber-400 focus:ring-amber-200 transition-all duration-300 hover:bg-white/90"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm border-amber-200/50 hover:bg-white/90 transition-all duration-300">
                  <Filter className="h-4 w-4 mr-2 text-amber-600" />
                  <SelectValue placeholder="分類篩選" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-200/50">
                  <SelectItem value="all">全部雅集</SelectItem>
                  <SelectItem value="events">活動記錄</SelectItem>
                  <SelectItem value="classes">班級聚會</SelectItem>
                  <SelectItem value="public">公開典藏</SelectItem>
                  <SelectItem value="private">私人珍藏</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm border-amber-200/50 hover:bg-white/90 transition-all duration-300">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-200/50">
                  <SelectItem value="latest">時間新近</SelectItem>
                  <SelectItem value="popular">雅韻共賞</SelectItem>
                  <SelectItem value="photos">影像豐富</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      : "border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      : "border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      console.log('建立雅集按鈕被點擊')
                      setIsCreateDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    建立雅集
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-amber-200/50">
                  <DialogHeader>
                    <DialogTitle className="text-amber-800">建立新雅集</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      建立一個新的影像雅集來分享您的珍貴回憶
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="album-title" className="text-amber-800">
                        雅集標題 *
                      </Label>
                      <Input
                        id="album-title"
                        placeholder="輸入雅集標題"
                        value={newAlbumData.title}
                        onChange={(e) => setNewAlbumData(prev => ({ ...prev, title: e.target.value }))}
                        className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="album-description" className="text-amber-800">
                        雅集描述
                      </Label>
                      <Textarea
                        id="album-description"
                        placeholder="描述這個雅集的內容與意境"
                        rows={3}
                        value={newAlbumData.description}
                        onChange={(e) => setNewAlbumData(prev => ({ ...prev, description: e.target.value }))}
                        className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="album-tags" className="text-amber-800">
                        標籤
                      </Label>
                      <Input
                        id="album-tags"
                        placeholder="用逗號分隔多個標籤，例如：聚會,回憶,溫馨"
                        value={newAlbumData.tags}
                        onChange={(e) => setNewAlbumData(prev => ({ ...prev, tags: e.target.value }))}
                        className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="album-public"
                        checked={newAlbumData.isPublic}
                        onChange={(e) => setNewAlbumData(prev => ({ ...prev, isPublic: e.target.checked }))}
                        className="rounded border-amber-300 text-amber-600 focus:ring-amber-200"
                      />
                      <Label htmlFor="album-public" className="text-amber-800">
                        公開雅集（其他校友可以瀏覽）
                      </Label>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsCreateDialogOpen(false)
                          setNewAlbumData({ title: "", description: "", tags: "", isPublic: true })
                        }}
                        disabled={isCreating}
                        className="border-amber-200 hover:bg-amber-50"
                      >
                        取消
                      </Button>
                      <Button
                        onClick={handleCreateAlbum}
                        disabled={isCreating || !newAlbumData.title.trim()}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCreating ? "建立中..." : "建立雅集"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Albums Grid/List with Animations */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedAlbums.map((album, index) => (
                  <Card
                    key={album.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={album.coverImage || "/placeholder.svg"}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-500" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {!album.isPublic && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-900/80 text-amber-100 border-0 backdrop-blur-sm"
                          >
                            私藏
                          </Badge>
                        )}
                        <Badge variant="secondary" className="bg-amber-900/80 text-amber-100 border-0 backdrop-blur-sm">
                          <Camera className="h-3 w-3 mr-1" />
                          {album.photoCount}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-2 line-clamp-1 tracking-wide">{album.title}</h3>
                        <div className="flex items-center text-amber-100 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {album.date}
                          <MapPin className="h-3 w-3 ml-4 mr-1" />
                          <span className="truncate">{album.location}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{album.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {album.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                          >
                            #{tag}
                          </Badge>
                        ))}
                        {album.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                            +{album.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center group/like">
                            <Heart className="h-3 w-3 mr-1 group-hover/like:text-red-500 transition-colors" />
                            {album.likes}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {album.views}
                          </div>
                        </div>
                        <span className="text-amber-700 font-medium">by {album.createdBy}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedAlbums.map((album, index) => (
                  <Card
                    key={album.id}
                    className="hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 animate-in fade-in-50 slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={album.coverImage || "/placeholder.svg"}
                            alt={album.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <Badge
                            variant="secondary"
                            className="absolute bottom-2 right-2 bg-amber-900/80 text-amber-100 border-0 text-xs backdrop-blur-sm"
                          >
                            {album.photoCount}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-xl text-gray-800 tracking-wide">{album.title}</h3>
                            {!album.isPublic && (
                              <Badge variant="outline" className="border-amber-300 text-amber-700">
                                私藏
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2 leading-relaxed">{album.description}</p>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Calendar className="h-3 w-3 mr-1 text-amber-600" />
                            {album.date}
                            <MapPin className="h-3 w-3 ml-4 mr-1 text-amber-600" />
                            {album.location}
                            <Users className="h-3 w-3 ml-4 mr-1 text-amber-600" />
                            {album.createdBy}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {album.tags.slice(0, 4).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1 text-amber-600" />
                                {album.likes}
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1 text-amber-600" />
                                {album.views}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 tracking-wide">新近佳作</h2>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <Upload className="h-4 w-4 mr-2" />
                上傳佳作
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <Card
                  key={photo.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer group bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={photo.thumbnail || "/placeholder.svg"}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-3 right-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-black/70 text-white text-xs p-3 rounded-lg backdrop-blur-sm">
                        <p className="line-clamp-2 mb-2 leading-relaxed">{photo.caption}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-amber-200">by {photo.uploadedBy}</span>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {photo.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              {photo.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-photos" className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 tracking-wide">個人典藏</h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  上傳佳作
                </Button>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  建立雅集
                </Button>
              </div>
            </div>

            {/* My Albums Stats with Animations */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "我的雅集", value: "8", color: "text-amber-600", icon: Camera },
                { label: "上傳佳作", value: "234", color: "text-orange-600", icon: Upload },
                { label: "總瀏覽數", value: "1,567", color: "text-yellow-600", icon: Eye },
                { label: "收到雅賞", value: "89", color: "text-red-500", icon: Heart },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* My Albums */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.slice(0, 3).map((album, index) => (
                <Card
                  key={album.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-amber-900/80 text-amber-100 border-0 backdrop-blur-sm">
                        <Camera className="h-3 w-3 mr-1" />
                        {album.photoCount}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">{album.title}</h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{album.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-amber-600" />
                          {album.likes}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-amber-600" />
                          {album.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-50 transition-colors">
                        管理
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Photo Detail Modal with Literary Style */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-sm border-amber-200/50">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <img
                    src={selectedPhoto.url || "/placeholder.svg"}
                    alt={selectedPhoto.caption}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-wide">{selectedPhoto.caption}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-amber-100 text-amber-700">
                            {selectedPhoto.uploadedBy[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-amber-700 font-medium">{selectedPhoto.uploadedBy}</span>
                      </div>
                      <span>{selectedPhoto.uploadedAt}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags?.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      雅賞 ({selectedPhoto.likes})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      品評 ({selectedPhoto.comments})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      典藏
                    </Button>
                  </div>

                  <div className="border-t border-amber-200 pt-6">
                    <h4 className="font-bold mb-4 text-amber-800">雅士品評 ({selectedPhoto.comments})</h4>
                    <div className="space-y-4 max-h-48 overflow-y-auto">
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-amber-100 text-amber-700">張</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200/50">
                            <p className="text-sm leading-relaxed">此作甚佳！活動精彩紛呈，令人回味無窮</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">張志明 • 2小時前</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-amber-100 text-amber-700">李</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200/50">
                            <p className="text-sm leading-relaxed">感謝分享這些珍貴的美好時光！</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">李美華 • 1小時前</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-amber-100 text-amber-700">我</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="寫下您的雅評..."
                          className="text-sm border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
