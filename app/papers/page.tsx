"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Plus,
  Award,
  Heart,
  Coffee,
  Sparkles,
} from "lucide-react"
import { getPapers } from "@/lib/database"

interface Paper {
  id: string
  title: string
  abstract: string
  category: string
  keywords: string[]
  journal: string
  publish_date: string
  pages: number
  is_open_access: boolean
  allow_comments: boolean
  status: string
  downloads: number
  views: number
  likes: number
  rating: number
  created_by: string
  created_at: string
  updated_at: string
  paper_authors?: { name: string; affiliation?: string; is_primary: boolean; order_index: number }[]
  users?: { name: string; avatar_url?: string }
}

const categories = [
  { name: "商業策略", count: 23, color: "bg-blue-100 text-blue-700", icon: "💼" },
  { name: "金融投資", count: 18, color: "bg-green-100 text-green-700", icon: "💰" },
  { name: "科技創新", count: 31, color: "bg-purple-100 text-purple-700", icon: "🚀" },
  { name: "人力資源", count: 15, color: "bg-orange-100 text-orange-700", icon: "👥" },
  { name: "行銷管理", count: 12, color: "bg-pink-100 text-pink-700", icon: "📢" },
  { name: "永續經營", count: 19, color: "bg-emerald-100 text-emerald-700", icon: "🌱" },
]

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    loadPapers()
  }, [])

  const loadPapers = async () => {
    try {
      const { data, error } = await getPapers()
      if (error) {
        console.error("Error loading papers:", error)
      } else {
        setPapers(data || [])
      }
    } catch (error) {
      console.error("Error loading papers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || paper.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">載入論文資料中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with cute style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
              <FileText className="h-5 w-5 text-blue-500 mx-3 animate-bounce" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-700 mb-3 tracking-wide">
              學術論文
              <span className="text-2xl text-blue-500 ml-3">·</span>
              <span className="text-2xl text-blue-500 ml-1">知識分享</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">分享學術成果，促進知識交流</p>
            <div className="flex items-center justify-center mt-3">
              <Sparkles className="h-4 w-4 text-blue-400 mx-2 animate-pulse" />
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
              <Sparkles className="h-4 w-4 text-blue-400 mx-2 animate-pulse" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-1/2 mx-auto bg-white/70 backdrop-blur-sm rounded-full p-1">
            <TabsTrigger value="browse" className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              瀏覽論文
            </TabsTrigger>
            <TabsTrigger value="featured" className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              精選推薦
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter with cute design */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-3 h-4 w-4 text-blue-400 group-hover:text-blue-500 transition-colors" />
                <Input
                  placeholder="尋找有趣的研究..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/80 backdrop-blur-sm border-blue-200/50 focus:border-blue-400 focus:ring-blue-200 rounded-full transition-all duration-300 hover:bg-white/90"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm border-blue-200/50 hover:bg-white/90 transition-all duration-300 rounded-full">
                  <Filter className="h-4 w-4 mr-2 text-blue-400" />
                  <SelectValue placeholder="研究領域" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-blue-200/50 rounded-2xl">
                  <SelectItem value="all">所有領域</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                分享研究
              </Button>
            </div>

            {/* Papers Grid */}
            <div className="space-y-6">
              {filteredPapers.map((paper, index) => (
                <Card
                  key={paper.id}
                  className="bg-gradient-to-br from-white to-blue-50/50 border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 animate-in fade-in-50 slide-in-from-left-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="bg-white/60 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categories.find((c) => c.name === paper.category)?.color || "bg-blue-100 text-blue-700"}>
                            {categories.find((c) => c.name === paper.category)?.icon} {paper.category}
                          </Badge>
                          <Badge
                            variant={paper.status === "已發表" ? "default" : "secondary"}
                            className="rounded-full px-3 py-1"
                          >
                            {paper.status}
                          </Badge>
                          {paper.is_open_access && (
                            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50/80 rounded-full px-3 py-1">
                              開放取得
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg text-gray-700">{paper.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">發表於 {paper.journal}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-medium">{paper.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="bg-white/40 backdrop-blur-sm">
                    <CardDescription className="mb-4 line-clamp-3 text-gray-700 leading-relaxed">
                      {paper.abstract}
                    </CardDescription>

                    {/* Authors */}
                    <div className="flex items-center mb-4">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <div className="flex items-center space-x-2">
                        {paper.paper_authors?.slice(0, 3).map((author, authorIndex) => (
                          <div key={authorIndex} className="flex items-center">
                            <span className="text-sm text-gray-600">
                              {author.name}
                              {author.is_primary && <span className="text-blue-600 ml-1">*</span>}
                            </span>
                            {authorIndex < Math.min(2, (paper.paper_authors?.length || 1) - 1) && (
                              <span className="mx-1 text-gray-400">•</span>
                            )}
                          </div>
                        ))}
                        {(paper.paper_authors?.length || 0) > 3 && (
                          <span className="text-sm text-gray-500">等 {paper.paper_authors?.length} 位作者</span>
                        )}
                      </div>
                    </div>

                    {/* Keywords */}
                    {paper.keywords && paper.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.keywords.map((keyword, keywordIndex) => (
                          <Badge
                            key={keywordIndex}
                            variant="outline"
                            className="text-xs border-blue-300 text-blue-700 bg-blue-50/60 rounded-full px-3 py-1 hover:bg-blue-100/80 transition-colors"
                          >
                            #{keyword}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(paper.publish_date)}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {paper.pages} 頁
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {paper.downloads} 下載
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {paper.views} 瀏覽
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Download className="h-3 w-3 mr-1" />
                          下載
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Heart className="h-3 w-3 mr-1" />
                          收藏
                        </Button>
                        {paper.allow_comments && (
                          <Button variant="outline" size="sm" className="rounded-full">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            討論
                          </Button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {paper.likes} 人喜歡
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">找不到符合條件的論文</h3>
                <p className="text-gray-500">請嘗試調整搜尋條件或瀏覽其他領域</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">精選論文功能開發中</h3>
              <p className="text-gray-500">即將為您推薦優質學術論文</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Sidebar section moved to main content area */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Research Categories */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <CardTitle className="text-lg text-gray-700 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                研究領域
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/60 cursor-pointer transition-all duration-300 group"
                  onClick={() => setCategoryFilter(category.name)}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 rounded-full">
                    {papers.filter(p => p.category === category.name).length}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="text-lg text-gray-700 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                統計資訊
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">總論文數</span>
                <span className="font-bold text-purple-600">{papers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">開放取得</span>
                <span className="font-bold text-green-600">{papers.filter(p => p.is_open_access).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">總下載數</span>
                <span className="font-bold text-blue-600">{papers.reduce((sum, p) => sum + p.downloads, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">總瀏覽數</span>
                <span className="font-bold text-orange-600">{papers.reduce((sum, p) => sum + p.views, 0)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
