"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Eye, Search, Plus, TrendingUp, Clock, Heart, Coffee, BookOpen, Sparkles } from "lucide-react"
import { getForumPosts, getForumCategories } from "@/lib/database"

interface ForumPost {
  id: string
  title: string
  content: string
  category_id: string
  author_id: string
  tags: string[]
  is_hot: boolean
  views: number
  likes: number
  created_at: string
  updated_at: string
  users?: { name: string; avatar_url?: string }
  forum_categories?: { name: string; color?: string }
  forum_replies?: { count: number }[]
}

interface ForumCategory {
  id: string
  name: string
  description: string
  color: string
}

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [postsResult, categoriesResult] = await Promise.all([
        getForumPosts(),
        getForumCategories()
      ])

      if (postsResult.error) {
        console.error("Error loading forum posts:", postsResult.error)
      } else {
        setPosts(postsResult.data || [])
      }

      if (categoriesResult.error) {
        console.error("Error loading forum categories:", categoriesResult.error)
      } else {
        setCategories(categoriesResult.data || [])
      }
    } catch (error) {
      console.error("Error loading forum data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || post.category_id === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "剛剛"
    if (diffInHours < 24) return `${diffInHours}小時前`
    if (diffInHours < 48) return "1天前"
    return `${Math.floor(diffInHours / 24)}天前`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">載入論壇資料中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with cute style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-300"></div>
              <MessageSquare className="h-5 w-5 text-purple-500 mx-3 animate-bounce" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-300"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-700 mb-3 tracking-wide">
              溫暖論壇
              <span className="text-2xl text-purple-500 ml-3">·</span>
              <span className="text-2xl text-purple-500 ml-1">分享時光</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">在這裡分享生活的美好與智慧</p>
            <div className="flex items-center justify-center mt-3">
              <Sparkles className="h-4 w-4 text-purple-400 mx-2 animate-pulse" />
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
              <Sparkles className="h-4 w-4 text-purple-400 mx-2 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Actions with cute design */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-3 h-4 w-4 text-purple-400 group-hover:text-purple-500 transition-colors" />
                <Input
                  placeholder="尋找有趣的話題..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/80 backdrop-blur-sm border-purple-200/50 focus:border-purple-400 focus:ring-purple-200 rounded-full transition-all duration-300 hover:bg-white/90"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm border-purple-200/50 hover:bg-white/90 transition-all duration-300 rounded-full">
                  <SelectValue placeholder="話題分類" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200/50 rounded-2xl">
                  <SelectItem value="all">所有話題</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                分享想法
              </Button>
            </div>

            {/* Forum Posts with cute cards */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-purple-50/50 border-0 hover:scale-[1.02] animate-in fade-in-50 slide-in-from-left-4 rounded-3xl overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="bg-white/60 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-white/50">
                          <AvatarImage src={post.users?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700">
                            {post.users?.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-700">{post.users?.name || "匿名用戶"}</span>
                            {post.is_hot && (
                              <Badge className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs rounded-full px-2 py-1">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                熱門
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(post.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {post.forum_categories && (
                          <Badge className={post.forum_categories.color || "bg-purple-100 text-purple-800"}>
                            {post.forum_categories.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-white/40 backdrop-blur-sm">
                    <CardTitle className="text-lg mb-3 hover:text-purple-600 cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mb-4 line-clamp-2 text-gray-700 leading-relaxed">
                      {post.content}
                    </CardDescription>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs border-purple-300 text-purple-700 bg-purple-50/60 rounded-full px-3 py-1 hover:bg-purple-100/80 transition-colors"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center group cursor-pointer">
                          <MessageSquare className="h-4 w-4 mr-1 group-hover:text-purple-500 transition-colors" />
                          {Array.isArray(post.forum_replies) ? post.forum_replies.length : 0} 回覆
                        </div>
                        <div className="flex items-center group cursor-pointer">
                          <Heart className="h-4 w-4 mr-1 group-hover:text-red-500 transition-colors" />
                          {post.likes} 喜歡
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-gray-400" />
                          {post.views} 瀏覽
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:bg-purple-100/50 rounded-full px-4"
                      >
                        參與討論
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">找不到符合條件的討論</h3>
                <p className="text-gray-500">請嘗試調整搜尋條件或瀏覽其他話題</p>
              </div>
            )}
          </div>

          {/* Sidebar with cute design */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <CardTitle className="text-lg text-gray-700 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                  話題分類
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/60 cursor-pointer transition-all duration-300 group"
                    onClick={() => setCategoryFilter(category.id)}
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 rounded-full">
                      {posts.filter(p => p.category_id === category.id).length}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hot Topics */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                <CardTitle className="text-lg flex items-center text-gray-700">
                  <TrendingUp className="h-5 w-5 mr-2 text-pink-500" />
                  熱門話題
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {filteredPosts
                  .filter((post) => post.is_hot)
                  .slice(0, 3)
                  .map((post) => (
                    <div key={post.id} className="border-l-3 border-pink-400 pl-4 py-2 bg-white/40 rounded-r-2xl">
                      <h4 className="text-sm font-medium hover:text-pink-600 cursor-pointer line-clamp-2 transition-colors">
                        {post.title}
                      </h4>
                      <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <Heart className="h-3 w-3 mr-1 text-pink-400" />
                        {Array.isArray(post.forum_replies) ? post.forum_replies.length : 0} 回覆 • {post.views} 瀏覽
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Forum Guidelines */}
            <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
                <CardTitle className="text-lg text-gray-700 flex items-center">
                  <Coffee className="h-5 w-5 mr-2 text-green-500" />
                  溫馨提醒
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-3 p-4">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500">🌟</span>
                  <p>用溫暖的語言分享你的想法</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">💝</span>
                  <p>尊重每個人不同的觀點</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-500">🌈</span>
                  <p>分享真實美好的生活體驗</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-500">☕</span>
                  <p>讓這裡成為溫暖的交流空間</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full bg-white/60 border-green-300 text-green-700 hover:bg-green-50 rounded-full transition-all duration-300"
                >
                  查看完整指南
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
