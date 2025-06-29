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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 animate-float-delayed"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-32 w-24 h-24 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-30 animate-float-delayed"></div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Header with Literary Style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/20 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-400"></div>
              <Sparkles className="h-5 w-5 text-purple-600 mx-3 animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
            <h1 className="text-7xl font-bold text-gray-800 mb-3 tracking-wide bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              智慧論壇
              <span className="text-4xl text-purple-700 ml-3">·</span>
              <span className="text-4xl text-purple-700 ml-1">思辨雅集</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium tracking-wide">💡 智者相聚，思想碰撞，共創美好未來</p>
            <div className="flex items-center justify-center mt-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full mx-3 animate-bounce"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Actions with modern design */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                <Input
                  placeholder="🔍 探尋智慧的足跡..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-14 bg-white/70 backdrop-blur-lg border-2 border-indigo-200/50 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200/30 rounded-3xl transition-all duration-300 hover:bg-white/80 text-lg hover:shadow-xl"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-52 h-14 bg-white/70 backdrop-blur-lg border-2 border-purple-200/50 hover:bg-white/80 transition-all duration-300 rounded-3xl hover:shadow-xl text-lg">
                  <SelectValue placeholder="📚 話題分類" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-2 border-purple-200/50 rounded-3xl shadow-2xl">
                  <SelectItem value="all" className="text-lg py-3">🌟 所有話題</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-lg py-3">
                      📝 {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="h-14 px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg font-semibold">
                <Plus className="h-5 w-5 mr-2" />
                ✨ 發表新見解
              </Button>
            </div>

            {/* Forum Posts with modern cards */}
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`group hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-lg border-2 border-indigo-100/50 hover:border-indigo-200 hover:scale-[1.02] animate-in fade-in-50 slide-in-from-left-4 rounded-3xl overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="bg-gradient-to-r from-white/80 to-indigo-50/80 backdrop-blur-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="ring-4 ring-white/70 shadow-lg w-12 h-12">
                          <AvatarImage src={post.users?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-700 font-bold text-lg">
                            {post.users?.name?.[0] || "智"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-bold text-gray-800 text-lg">{post.users?.name || "匿名智者"}</span>
                            {post.is_hot && (
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-2xl px-3 py-1 shadow-lg">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                🔥 熱門
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-indigo-400" />
                            📅 {formatTimeAgo(post.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {post.forum_categories && (
                          <Badge className={`${post.forum_categories.color || "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800"} px-4 py-2 rounded-2xl font-medium shadow-sm`}>
                            📚 {post.forum_categories.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-white/60 backdrop-blur-lg p-6">
                    <CardTitle className="text-2xl mb-4 hover:text-indigo-600 cursor-pointer transition-all duration-300 font-bold leading-tight group-hover:text-purple-600">
                      💭 {post.title}
                    </CardTitle>
                    <CardDescription className="mb-6 line-clamp-3 text-gray-700 leading-relaxed text-lg">
                      {post.content}
                    </CardDescription>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-6">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-sm border-2 border-indigo-300 text-indigo-700 bg-indigo-50/80 rounded-2xl px-4 py-2 hover:bg-indigo-100/80 transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                          >
                            🏷️ {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center group cursor-pointer hover:bg-white/60 rounded-xl px-3 py-2 transition-all duration-300">
                          <MessageSquare className="h-5 w-5 mr-2 group-hover:text-indigo-600 transition-colors text-gray-600" />
                          <span className="font-medium text-gray-700">💬 {Array.isArray(post.forum_replies) ? post.forum_replies.length : 0} 回覆</span>
                        </div>
                        <div className="flex items-center group cursor-pointer hover:bg-white/60 rounded-xl px-3 py-2 transition-all duration-300">
                          <Heart className="h-5 w-5 mr-2 group-hover:text-red-500 transition-colors text-gray-600" />
                          <span className="font-medium text-gray-700">❤️ {post.likes} 讚</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-5 w-5 mr-2 text-gray-500" />
                          <span className="font-medium text-gray-600">👁️ {post.views} 瀏覽</span>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        🚀 參與討論
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

          {/* Sidebar with modern design */}
          <div className="space-y-8">
            {/* Categories */}
            <Card className="bg-white/70 backdrop-blur-lg border-2 border-indigo-100/50 rounded-3xl overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6">
                <CardTitle className="text-xl text-gray-800 flex items-center font-bold">
                  <BookOpen className="h-6 w-6 mr-3 text-indigo-600" />
                  📚 話題分類
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/80 cursor-pointer transition-all duration-300 group hover:shadow-lg"
                    onClick={() => setCategoryFilter(category.id)}
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                        📝 {category.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-sm bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-2xl px-3 py-1 shadow-sm">
                      {posts.filter(p => p.category_id === category.id).length}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hot Topics */}
            <Card className="bg-white/70 backdrop-blur-lg border-2 border-red-100/50 rounded-3xl overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 p-6">
                <CardTitle className="text-xl flex items-center text-gray-800 font-bold">
                  <TrendingUp className="h-6 w-6 mr-3 text-red-600" />
                  🔥 熱門話題
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {filteredPosts
                  .filter((post) => post.is_hot)
                  .slice(0, 3)
                  .map((post) => (
                    <div key={post.id} className="border-l-4 border-red-400 pl-6 py-4 bg-white/60 rounded-r-2xl hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md">
                      <h4 className="text-lg font-bold hover:text-red-600 cursor-pointer line-clamp-2 transition-colors mb-2">
                        💭 {post.title}
                      </h4>
                      <div className="text-sm text-gray-600 mt-3 flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-red-500" />
                          <span>❤️ {Array.isArray(post.forum_replies) ? post.forum_replies.length : 0} 回覆</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-gray-500" />
                          <span>👁️ {post.views} 瀏覽</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Forum Guidelines */}
            <Card className="bg-white/70 backdrop-blur-lg border-2 border-green-100/50 rounded-3xl overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 p-6">
                <CardTitle className="text-xl text-gray-800 flex items-center font-bold">
                  <Coffee className="h-6 w-6 mr-3 text-green-600" />
                  ☕ 論壇公約
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-700 space-y-4 p-6">
                <div className="flex items-start space-x-4 p-3 bg-green-50/60 rounded-2xl">
                  <span className="text-2xl">🌟</span>
                  <p className="font-medium">用溫暖的語言分享你的智慧</p>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-blue-50/60 rounded-2xl">
                  <span className="text-2xl">💝</span>
                  <p className="font-medium">尊重每個人不同的觀點與見解</p>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-purple-50/60 rounded-2xl">
                  <span className="text-2xl">🌈</span>
                  <p className="font-medium">分享真實美好的人生體悟</p>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-pink-50/60 rounded-2xl">
                  <span className="text-2xl">☕</span>
                  <p className="font-medium">讓這裡成為智慧交流的雅集</p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-6 w-full bg-white/80 border-2 border-green-300 text-green-700 hover:bg-green-50 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold py-3"
                >
                  📖 查看完整指南
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
