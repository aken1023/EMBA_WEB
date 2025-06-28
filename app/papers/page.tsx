"use client"

import { useState } from "react"
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

const papers = [
  {
    id: 1,
    title: "📖 小企業的溫暖轉型故事",
    abstract: "記錄了十家小企業如何在數位時代中保持人情味，用溫暖的方式擁抱科技變化...",
    authors: ["小雨", "阿明", "花花"],
    authorAvatars: ["/business-executive.png", "/placeholder.svg", "/placeholder.svg"],
    category: "溫暖管理",
    keywords: ["數位轉型", "小企業", "人情味", "溫暖"],
    publishDate: "2024-10-15",
    pages: 45,
    downloads: 234,
    views: 1567,
    likes: 89,
    comments: 23,
    rating: 4.8,
    status: "已發表",
    journal: "溫暖管理學報",
    isOpenAccess: true,
    graduationYear: "2018",
    mood: "溫馨",
    color: "from-pink-100 to-rose-100",
  },
  {
    id: 2,
    title: "🌱 永續投資的美好實踐",
    abstract: "探索如何讓投資不只是賺錢，更是為地球和未來世代創造美好的可能性...",
    authors: ["綠茶", "小樹"],
    authorAvatars: ["/placeholder.svg", "/placeholder.svg"],
    category: "永續金融",
    keywords: ["ESG", "永續投資", "美好未來", "責任投資"],
    publishDate: "2024-09-28",
    pages: 38,
    downloads: 189,
    views: 1234,
    likes: 67,
    comments: 18,
    rating: 4.6,
    status: "同儕審查中",
    journal: "永續金融研究",
    isOpenAccess: false,
    graduationYear: "2017",
    mood: "清新",
    color: "from-green-100 to-emerald-100",
  },
  {
    id: 3,
    title: "🤖 AI與人類的溫暖協作",
    abstract: "當科技遇上人性，如何讓AI成為我們生活中溫暖的夥伴，而不是冰冷的工具...",
    authors: ["科技女孩", "暖心工程師", "AI小助手"],
    authorAvatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "人性科技",
    keywords: ["人工智慧", "人性化", "溫暖協作", "科技倫理"],
    publishDate: "2024-11-05",
    pages: 52,
    downloads: 312,
    views: 2145,
    likes: 124,
    comments: 35,
    rating: 4.9,
    status: "已發表",
    journal: "人性科技學刊",
    isOpenAccess: true,
    graduationYear: "2019",
    mood: "創新",
    color: "from-blue-100 to-indigo-100",
  },
]

const categories = [
  { name: "溫暖管理", count: 23, color: "bg-pink-100 text-pink-700", icon: "💝" },
  { name: "永續金融", count: 18, color: "bg-green-100 text-green-700", icon: "🌱" },
  { name: "人性科技", count: 31, color: "bg-blue-100 text-blue-700", icon: "🤖" },
  { name: "創意生活", count: 15, color: "bg-purple-100 text-purple-700", icon: "🎨" },
  { name: "療癒心理", count: 12, color: "bg-orange-100 text-orange-700", icon: "🌈" },
  { name: "美好教育", count: 19, color: "bg-yellow-100 text-yellow-700", icon: "📚" },
]

const topAuthors = [
  { name: "小雨", papers: 8, citations: 156, avatar: "/business-executive.png", mood: "溫暖" },
  { name: "綠茶", papers: 6, citations: 134, avatar: "/placeholder.svg", mood: "清新" },
  { name: "科技女孩", papers: 5, citations: 98, avatar: "/placeholder.svg", mood: "創新" },
  { name: "花花", papers: 7, citations: 142, avatar: "/placeholder.svg", mood: "可愛" },
]

export default function PapersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || paper.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with cute style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
              <BookOpen className="h-5 w-5 text-blue-500 mx-3 animate-bounce" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-700 mb-3 tracking-wide">
              知識花園
              <span className="text-2xl text-blue-500 ml-3">·</span>
              <span className="text-2xl text-blue-500 ml-1">智慧分享</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">在這裡播種知識，收穫智慧的花朵</p>
            <div className="flex items-center justify-center mt-3">
              <Sparkles className="h-4 w-4 text-blue-400 mx-2 animate-pulse" />
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
              <Sparkles className="h-4 w-4 text-blue-400 mx-2 animate-pulse" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm border-0 rounded-full p-1">
            <TabsTrigger
              value="browse"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-400 data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              📚 瀏覽論文
            </TabsTrigger>
            <TabsTrigger
              value="my-papers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-pink-400 data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              ✨ 我的作品
            </TabsTrigger>
            <TabsTrigger
              value="collaborate"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-orange-400 data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              🤝 研究夥伴
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-yellow-400 data-[state=active]:text-white rounded-full transition-all duration-300"
            >
              🎁 寫作資源
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

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Featured Paper */}
                <Card className={`border-0 bg-gradient-to-br ${papers[2].color} rounded-3xl overflow-hidden shadow-xl`}>
                  <CardHeader className="bg-white/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-4 py-2">
                        <Award className="h-3 w-3 mr-1" />
                        本月精選
                      </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50/80 rounded-full">
                        已發表
                      </Badge>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 cursor-pointer transition-colors">
                      {papers[2].title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1 text-blue-400" />
                        {papers[2].authors.join("、")}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-blue-400" />
                        {papers[2].publishDate}
                      </div>
                      <Badge
                        variant="outline"
                        className="border-purple-300 text-purple-700 bg-purple-50/80 rounded-full"
                      >
                        {papers[2].mood}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-white/40 backdrop-blur-sm">
                    <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{papers[2].abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {papers[2].keywords.slice(0, 3).map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1"
                        >
                          #{keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1 text-blue-400" />
                          {papers[2].downloads}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-blue-400" />
                          {papers[2].views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1 text-red-400" />
                          {papers[2].likes}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {papers[2].rating}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full bg-transparent"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          預覽
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          下載
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Papers List */}
                <div className="space-y-6">
                  {filteredPapers.map((paper, index) => (
                    <Card
                      key={paper.id}
                      className={`hover:shadow-xl transition-all duration-500 bg-gradient-to-br ${paper.color} border-0 hover:scale-[1.02] animate-in fade-in-50 slide-in-from-bottom-4 rounded-3xl overflow-hidden`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="bg-white/60 backdrop-blur-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={`${categories.find((c) => c.name === paper.category)?.color} rounded-full px-3 py-1`}
                              >
                                {categories.find((c) => c.name === paper.category)?.icon} {paper.category}
                              </Badge>
                              <Badge
                                variant={paper.status === "已發表" ? "default" : "secondary"}
                                className="rounded-full px-3 py-1"
                              >
                                {paper.status}
                              </Badge>
                              {paper.isOpenAccess && (
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-600 rounded-full px-3 py-1"
                                >
                                  開放閱讀
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className="border-purple-300 text-purple-700 bg-purple-50/80 rounded-full px-3 py-1"
                              >
                                {paper.mood}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer mb-2 transition-colors">
                              {paper.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <div className="flex -space-x-2 mr-2">
                                  {paper.authorAvatars.slice(0, 3).map((avatar, index) => (
                                    <Avatar
                                      key={index}
                                      className="h-6 w-6 border-2 border-white ring-1 ring-purple-200"
                                    >
                                      <AvatarImage src={avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700">
                                        {paper.authors[index]?.[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                                {paper.authors.join("、")}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-blue-400" />
                                {paper.publishDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="bg-white/40 backdrop-blur-sm">
                        <p className="text-gray-700 mb-3 line-clamp-2 leading-relaxed">{paper.abstract}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {paper.keywords.slice(0, 4).map((keyword) => (
                            <Badge
                              key={keyword}
                              variant="outline"
                              className="text-xs border-blue-300 text-blue-700 bg-blue-50/60 rounded-full px-3 py-1 hover:bg-blue-100/80 transition-colors"
                            >
                              #{keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Download className="h-3 w-3 mr-1 text-blue-400" />
                              {paper.downloads}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1 text-blue-400" />
                              {paper.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1 text-red-400" />
                              {paper.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1 text-purple-400" />
                              {paper.comments}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full bg-transparent"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              預覽
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              下載
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar with cute design */}
              <div className="space-y-6">
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
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{category.icon}</span>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 rounded-full">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Authors */}
                <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <CardTitle className="text-lg flex items-center text-gray-700">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                      活躍作者
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    {topAuthors.map((author, index) => (
                      <div
                        key={author.name}
                        className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-white/60 transition-all duration-300"
                      >
                        <div className="text-sm font-medium text-purple-500 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                          #{index + 1}
                        </div>
                        <Avatar className="h-8 w-8 ring-2 ring-purple-200">
                          <AvatarImage src={author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700">
                            {author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate text-gray-700">{author.name}</h4>
                          <div className="flex items-center space-x-2">
                            <p className="text-xs text-gray-500">
                              {author.papers}篇 • {author.citations}次引用
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs border-purple-300 text-purple-700 bg-purple-50/80 rounded-full"
                            >
                              {author.mood}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/60 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-orange-100">
                    <CardTitle className="text-lg text-gray-700 flex items-center">
                      <Coffee className="h-5 w-5 mr-2 text-pink-500" />
                      快速操作
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/60 border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full transition-all duration-300"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      分享新研究
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/60 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-300"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      進階搜尋
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/60 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full transition-all duration-300"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      寫作指南
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/60 border-green-300 text-green-700 hover:bg-green-50 rounded-full transition-all duration-300"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      尋找夥伴
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-papers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-700">我的研究作品</h2>
                <p className="text-gray-600">記錄你的學術成長足跡</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                新增作品
              </Button>
            </div>

            {/* Stats Cards with cute design */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "已發表作品", value: "5", color: "from-blue-400 to-purple-400", icon: FileText },
                { label: "總下載次數", value: "1,234", color: "from-green-400 to-emerald-400", icon: Download },
                { label: "收到喜歡", value: "89", color: "from-pink-400 to-rose-400", icon: Heart },
                { label: "平均評分", value: "4.7", color: "from-orange-400 to-yellow-400", icon: Star },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className={`bg-gradient-to-br ${stat.color} border-0 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center bg-white/20 backdrop-blur-sm">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-white" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <p className="text-sm text-white/90">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* My Papers List */}
            <div className="space-y-6">
              {papers.slice(0, 2).map((paper, index) => (
                <Card
                  key={paper.id}
                  className={`bg-gradient-to-br ${paper.color} border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 animate-in fade-in-50 slide-in-from-left-4`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="bg-white/60 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`${categories.find((c) => c.name === paper.category)?.color} rounded-full px-3 py-1`}
                          >
                            {categories.find((c) => c.name === paper.category)?.icon} {paper.category}
                          </Badge>
                          <Badge
                            variant={paper.status === "已發表" ? "default" : "secondary"}
                            className="rounded-full px-3 py-1"
                          >
                            {paper.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-purple-300 text-purple-700 bg-purple-50/80 rounded-full px-3 py-1"
                          >
                            {paper.mood}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-gray-700">{paper.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">發表於 {paper.journal}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50 rounded-full bg-transparent"
                      >
                        編輯
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-white/40 backdrop-blur-sm">
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-white/60 rounded-2xl">
                        <p className="text-gray-500 mb-1">下載次數</p>
                        <p className="font-bold text-blue-600">{paper.downloads}</p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-2xl">
                        <p className="text-gray-500 mb-1">瀏覽次數</p>
                        <p className="font-bold text-green-600">{paper.views}</p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-2xl">
                        <p className="text-gray-500 mb-1">收到喜歡</p>
                        <p className="font-bold text-pink-600">{paper.likes}</p>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-2xl">
                        <p className="text-gray-500 mb-1">評分</p>
                        <p className="font-bold flex items-center justify-center text-orange-600">
                          <Star className="h-3 w-3 mr-1 fill-orange-400 text-orange-400" />
                          {paper.rating}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaborate" className="space-y-6">
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-purple-200/50">
                <MessageSquare className="h-16 w-16 mx-auto text-purple-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-700 mb-3">尋找研究夥伴</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  一個人走得快，一群人走得遠。在這裡找到志同道合的研究夥伴，一起探索知識的奧秘
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  發布合作需求
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "📝 寫作小貼士",
                  description: "讓文字變得更有溫度的寫作技巧",
                  icon: FileText,
                  color: "from-blue-100 to-indigo-100",
                  buttonColor: "from-blue-400 to-indigo-400",
                },
                {
                  title: "📚 引用格式",
                  description: "各種學術引用格式的可愛範本",
                  icon: BookOpen,
                  color: "from-green-100 to-emerald-100",
                  buttonColor: "from-green-400 to-emerald-400",
                },
                {
                  title: "🏆 投稿指南",
                  description: "如何讓你的研究被更多人看見",
                  icon: Award,
                  color: "from-purple-100 to-violet-100",
                  buttonColor: "from-purple-400 to-violet-400",
                },
                {
                  title: "🎨 視覺設計",
                  description: "讓圖表和數據變得更美觀",
                  icon: Sparkles,
                  color: "from-pink-100 to-rose-100",
                  buttonColor: "from-pink-400 to-rose-400",
                },
                {
                  title: "☕ 寫作咖啡館",
                  description: "在溫馨的環境中專心寫作",
                  icon: Coffee,
                  color: "from-orange-100 to-yellow-100",
                  buttonColor: "from-orange-400 to-yellow-400",
                },
                {
                  title: "💝 分享心得",
                  description: "學長姐的寫作經驗分享",
                  icon: Heart,
                  color: "from-red-100 to-pink-100",
                  buttonColor: "from-red-400 to-pink-400",
                },
              ].map((resource, index) => (
                <Card
                  key={resource.title}
                  className={`bg-gradient-to-br ${resource.color} border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="bg-white/60 backdrop-blur-sm text-center">
                    <resource.icon className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                    <CardTitle className="text-lg text-gray-700">{resource.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white/40 backdrop-blur-sm">
                    <Button
                      className={`w-full bg-gradient-to-r ${resource.buttonColor} hover:shadow-lg text-white rounded-full transition-all duration-300 transform hover:scale-105`}
                    >
                      探索更多
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
