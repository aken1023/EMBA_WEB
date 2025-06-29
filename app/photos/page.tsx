"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Heart, MessageCircle, Share2, Eye, Camera, Users, CalendarDays, MapPin, Tag, Lock, Plus, Search, Filter, SortAsc, SortDesc, Grid3X3, List } from "lucide-react"
import Link from "next/link"
import { getAlbums, createAlbum } from "@/lib/database"

interface Album {
  id: string
  title: string
  description?: string
  event_id?: string
  class_id?: string
  created_by: string
  is_public: boolean
  created_at: string
  coverImage?: string
  date?: string
  location?: string
  photos?: any[]
  photoCount?: number
  tags?: string[]
  likes?: number
  views?: number
  createdBy?: string
}

export default function PhotosPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

  const [newAlbumData, setNewAlbumData] = useState({
    title: "",
    description: "",
    tags: "",
    isPublic: true,
  })

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = async () => {
    try {
      setLoading(true)
      const { data, error } = await getAlbums()
      
      if (error) {
        console.error('Error loading albums:', error)
        setError("載入相簿失敗")
        return
      }

      // 處理資料格式
      const processedAlbums = data?.map((album: any) => ({
        id: album.id,
        title: album.title,
        description: album.description,
        event_id: album.event_id,
        class_id: album.class_id,
        created_by: album.created_by,
        is_public: album.is_public,
        created_at: album.created_at,
        coverImage: album.media && album.media.length > 0 ? album.media[0].url : "/placeholder.svg",
        date: album.events?.date,
        location: album.events?.location,
        photos: album.media || [],
        photoCount: album.media?.length || 0,
        tags: [], // 從資料庫獲取標籤
        likes: album.id ? parseInt(album.id.slice(-2), 16) % 100 : 0, // 使用固定的值
        views: album.id ? parseInt(album.id.slice(-3), 16) % 500 : 0, // 使用固定的值
        createdBy: "系統管理員" // 暫時使用固定值
      })) || []

      setAlbums(processedAlbums)
    } catch (err) {
      console.error('Failed to load albums:', err)
      setError("載入相簿時發生錯誤")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAlbum = async () => {
    if (!newAlbumData.title.trim()) {
      alert("請輸入相簿標題")
      return
    }

    try {
      setIsCreating(true)
      
      const albumData = {
        title: newAlbumData.title,
        description: newAlbumData.description,
        is_public: newAlbumData.isPublic,
        created_by: '11111111-1111-1111-1111-111111111111' // 暫時使用系統管理員ID
      }

      const { data, error } = await createAlbum(albumData)
      
      if (error) {
        console.error('Error creating album:', error)
        alert("建立相簿失敗")
        return
      }

      // 重新載入相簿列表
      await loadAlbums()

      // 重置表單
      setNewAlbumData({
        title: "",
        description: "",
        tags: "",
        isPublic: true,
      })
      setShowCreateForm(false)
      alert("相簿建立成功！")
    } catch (err) {
      console.error('Failed to create album:', err)
      alert("建立相簿時發生錯誤")
    } finally {
      setIsCreating(false)
    }
  }

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch = 
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = 
      categoryFilter === "all" ||
      (categoryFilter === "events" && album.event_id) ||
      (categoryFilter === "classes" && album.class_id) ||
      (categoryFilter === "public" && album.is_public) ||
      (categoryFilter === "private" && !album.is_public)

    return matchesSearch && matchesCategory
  })

  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
              case "media":
          return (b.photoCount || 0) - (a.photoCount || 0)
      case "likes":
        return (b.likes || 0) - (a.likes || 0)
      case "latest":
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/40 rounded-full blur-lg animate-float-delayed"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-300/25 rounded-full blur-xl animate-float-delayed"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight">
            影像雅集 📸
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            記錄美好時光，分享珍貴回憶，讓每個瞬間都成為永恆的藝術
          </p>
        </div>

        <Tabs defaultValue="albums" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl">
            <TabsTrigger 
              value="albums" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl"
            >
              相簿雅集
            </TabsTrigger>
            <TabsTrigger 
              value="my-photos" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl"
            >
              我的作品
            </TabsTrigger>
          </TabsList>

          <TabsContent value="albums" className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Controls */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">搜尋雅集</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        placeholder="搜尋標題、描述..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-amber-200 focus:border-amber-400 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">分類篩選</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部雅集</SelectItem>
                        <SelectItem value="events">活動記錄</SelectItem>
                        <SelectItem value="classes">班級記憶</SelectItem>
                        <SelectItem value="public">公開分享</SelectItem>
                        <SelectItem value="private">私人收藏</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">排序方式</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">最新建立</SelectItem>
                        <SelectItem value="title">標題排序</SelectItem>
                        <SelectItem value="media">媒體豐富</SelectItem>
                        <SelectItem value="likes">雅賞數量</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">檢視模式</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="flex-1 rounded-xl"
                      >
                        <Grid3X3 size={16} />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="flex-1 rounded-xl"
                      >
                        <List size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Create Album Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-amber-800">建立新雅集</h3>
                    <Button
                      onClick={() => setShowCreateForm(!showCreateForm)}
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl"
                    >
                      <Plus size={16} className="mr-2" />
                      {showCreateForm ? "收起表單" : "展開表單"}
                    </Button>
                  </div>
                  
                  {showCreateForm && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="album-title" className="text-amber-800">
                            雅集標題 *
                          </Label>
                          <Input
                            id="album-title"
                            placeholder="為您的雅集命名..."
                            value={newAlbumData.title}
                            onChange={(e) => setNewAlbumData(prev => ({ ...prev, title: e.target.value }))}
                            className="border-amber-200 focus:border-amber-400 rounded-xl"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="album-description" className="text-amber-800">
                            雅集描述
                          </Label>
                          <Textarea
                            id="album-description"
                            placeholder="描述這個雅集的故事..."
                            value={newAlbumData.description}
                            onChange={(e) => setNewAlbumData(prev => ({ ...prev, description: e.target.value }))}
                            className="border-amber-200 focus:border-amber-400 rounded-xl"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Switch
                            id="album-public"
                            checked={newAlbumData.isPublic}
                            onCheckedChange={(checked) => setNewAlbumData(prev => ({ ...prev, isPublic: checked }))}
                          />
                          <Label htmlFor="album-public" className="text-amber-800">
                            公開分享
                          </Label>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setNewAlbumData({ title: "", description: "", tags: "", isPublic: true })
                              setShowCreateForm(false)
                            }}
                            className="border-gray-300 text-gray-600 rounded-xl"
                          >
                            取消
                          </Button>
                          <Button
                            onClick={handleCreateAlbum}
                            disabled={isCreating || !newAlbumData.title.trim()}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl"
                          >
                            {isCreating ? "建立中..." : "建立雅集"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Albums Grid/List with Animations */}
            <div className={viewMode === "grid" ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
              {sortedAlbums.map((album, index) => (
                <Card 
                  key={album.id}
                  className="group overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {!album.is_public && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-none">
                          <Lock size={12} className="mr-1" />
                          私人
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 text-sm">
                        <Camera size={16} />
                        <span>{album.photoCount || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2 line-clamp-1 tracking-wide">{album.title}</h3>
                    <div className="flex items-center text-white/90 text-sm mb-3 space-x-4">
                      <span>{album.date || "未指定日期"}</span>
                      <span className="truncate">{album.location || "未指定地點"}</span>
                    </div>
                  </CardContent>
                  
                  <CardContent className="px-6 pb-6">
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{album.description}</p>
                    
                    {album.tags && album.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="mr-2 mb-2 bg-amber-100 text-amber-800 border-amber-200">
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    
                    {album.tags && album.tags.length > 3 && (
                      <Badge variant="outline" className="mb-2">
                        +{album.tags.length - 3}
                      </Badge>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {album.likes || 0}
                        </span>
                        <span className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {album.views || 0}
                        </span>
                      </div>
                      <span className="text-amber-700 font-medium">by {album.created_by || "未知"}</span>
                    </div>
                    
                    <Link href={`/photos/${album.id}`}>
                      <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300">
                        進入雅集
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {sortedAlbums.length === 0 && (
              <div className="text-center py-20">
                <Camera size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">暫無相簿</h3>
                <p className="text-gray-500 mb-6">開始建立您的第一個影像雅集吧！</p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl"
                >
                  <Plus size={16} className="mr-2" />
                  建立雅集
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-photos" className="animate-in fade-in-50 duration-500">
            <div className="text-center py-20">
              <Camera size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">我的作品集</h3>
              <p className="text-gray-500 mb-6">這裡將顯示您上傳的所有照片作品</p>
              <Link href="/photos/upload">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                  <Plus size={16} className="mr-2" />
                  上傳作品
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Photo Detail Modal with Literary Style */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-sm border-amber-200/50">
              <DialogHeader>
                <DialogTitle className="text-xl text-amber-800">影像雅賞</DialogTitle>
                <DialogDescription className="text-gray-600">
                  欣賞精彩瞬間，品味美好時光
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Photo */}
                <div className="relative">
                  <img
                    src={selectedPhoto.url || "/placeholder.svg"}
                    alt={selectedPhoto.caption}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                
                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{selectedPhoto.caption}</h3>
                    <p className="text-gray-600 text-sm">
                      影像編號 {selectedPhoto.id} / 瀏覽次數 {selectedPhoto.views || 0}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-medium">
                        {selectedPhoto.uploaded_by?.[0] || "?"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-700">{selectedPhoto.uploaded_by || "未知用戶"}</p>
                      <p className="text-sm text-gray-500">{selectedPhoto.created_at || "未知時間"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {selectedPhoto.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          <Heart size={16} className="mr-2" />
                          雅賞 ({selectedPhoto.likes || 0})
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                          <MessageCircle size={16} className="mr-2" />
                          品評 ({selectedPhoto.comments || 0})
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600">
                          <Share2 size={16} className="mr-2" />
                          分享
                        </Button>
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
