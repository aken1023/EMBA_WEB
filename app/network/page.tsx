"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Building, Users, Globe, MessageCircle, UserPlus } from "lucide-react"
import { searchAlumni } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"

// Mock data for demo mode
const mockAlumni = [
  {
    id: "1",
    name: "張志明",
    company: "創新科技股份有限公司",
    position1: "執行長", // 更新為 position1
    location: "台北市",
    graduation_year: 2018,
    skills: ["AI", "區塊鏈", "數位轉型"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: false,
    mutualConnections: 12,
  },
  {
    id: "2",
    name: "李美華",
    company: "國際金融集團",
    position1: "投資總監", // 更新為 position1
    location: "香港",
    graduation_year: 2017,
    skills: ["投資", "風險管理", "金融科技"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: true,
    mutualConnections: 8,
  },
  {
    id: "3",
    name: "王大明",
    company: "綠能科技公司",
    position1: "創辦人", // 更新為 position1
    location: "新竹市",
    graduation_year: 2019,
    skills: ["永續能源", "創業", "環保科技"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: false,
    mutualConnections: 15,
  },
  {
    id: "4",
    name: "陳淑芬",
    company: "醫療器材公司",
    position1: "營運長", // 更新為 position1
    location: "台中市",
    graduation_year: 2016,
    skills: ["醫療科技", "營運管理", "國際貿易"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: true,
    mutualConnections: 6,
  },
  {
    id: "5",
    name: "林志豪",
    company: "電商平台",
    position1: "技術長", // 更新為 position1
    location: "新加坡",
    graduation_year: 2020,
    skills: ["電子商務", "軟體開發", "數據分析"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: false,
    mutualConnections: 9,
  },
  {
    id: "6",
    name: "黃雅婷",
    company: "品牌行銷公司",
    position1: "創意總監", // 更新為 position1
    location: "上海",
    graduation_year: 2018,
    skills: ["品牌行銷", "創意設計", "數位行銷"],
    avatar_url: "/placeholder.svg?height=60&width=60",
    isConnected: false,
    mutualConnections: 11,
  },
]

const locations = [
  { name: "台北市", count: 245, coordinates: [25.033, 121.5654] },
  { name: "新竹市", count: 89, coordinates: [24.8138, 120.9675] },
  { name: "台中市", count: 156, coordinates: [24.1477, 120.6736] },
  { name: "高雄市", count: 134, coordinates: [22.6273, 120.3014] },
  { name: "香港", count: 78, coordinates: [22.3193, 114.1694] },
  { name: "新加坡", count: 65, coordinates: [1.3521, 103.8198] },
  { name: "上海", count: 92, coordinates: [31.2304, 121.4737] },
  { name: "東京", count: 43, coordinates: [35.6762, 139.6503] },
]

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [alumni, setAlumni] = useState(mockAlumni)
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAlumni()
    loadConnections()
  }, [searchTerm, selectedLocation, selectedYear])

  const loadAlumni = async () => {
    if (!isSupabaseConfigured) {
      setAlumni(mockAlumni)
      setLoading(false)
      return
    }

    try {
      const graduationYear = selectedYear === "all" ? undefined : Number.parseInt(selectedYear)
      const { data, error } = await searchAlumni(searchTerm, selectedLocation, graduationYear)

      if (error) {
        console.error("Error loading alumni:", error)
        setAlumni(mockAlumni)
      } else {
        setAlumni(data || [])
      }
    } catch (error) {
      console.error("Error loading alumni:", error)
      setAlumni(mockAlumni)
    } finally {
      setLoading(false)
    }
  }

  const loadConnections = async () => {
    if (!isSupabaseConfigured) {
      return
    }

    try {
      // This would need the current user ID
      // const { data, error } = await getUserConnections(currentUserId)
      // if (!error) setConnections(data || [])
    } catch (error) {
      console.error("Error loading connections:", error)
    }
  }

  const handleConnect = async (alumniId: string) => {
    if (!isSupabaseConfigured) {
      // Demo mode - just update UI
      setAlumni((prev) => prev.map((person) => (person.id === alumniId ? { ...person, isConnected: true } : person)))
      return
    }

    try {
      // This would need the current user ID
      // const { error } = await createConnection(currentUserId, alumniId)
      // if (!error) {
      //   loadAlumni()
      // }
    } catch (error) {
      console.error("Error creating connection:", error)
    }
  }

  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation = selectedLocation === "all" || person.location === selectedLocation
    const matchesYear = selectedYear === "all" || person.graduation_year.toString() === selectedYear

    return matchesSearch && matchesLocation && matchesYear
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">人脈網絡</h1>
          <p className="text-gray-600">探索全球校友網絡，建立有價值的商業連結</p>
          {!isSupabaseConfigured && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">🔧 目前為展示模式，顯示模擬資料</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="directory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="directory">校友名錄</TabsTrigger>
            <TabsTrigger value="map">全球分布</TabsTrigger>
            <TabsTrigger value="connections">我的人脈</TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜尋校友姓名、公司或專業技能..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="所在地" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部地區</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      {location.name} ({location.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="畢業年份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部年份</SelectItem>
                  {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">載入校友資料中...</p>
              </div>
            ) : (
              /* Alumni Grid */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((person) => (
                  <Card key={person.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={person.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">{person.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="h-3 w-3 mr-1" />
                            {person.position1}
                          </CardDescription>
                          <CardDescription className="flex items-center">
                            <span className="text-sm">{person.company}</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {person.location} • {person.graduation_year}年畢業
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {person.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{person.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      {person.mutualConnections > 0 && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-1" />
                          {person.mutualConnections} 位共同聯絡人
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        {person.isConnected ? (
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            發送訊息
                          </Button>
                        ) : (
                          <Button size="sm" className="flex-1" onClick={() => handleConnect(person.id)}>
                            <UserPlus className="h-3 w-3 mr-1" />
                            建立連結
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          查看檔案
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  全球校友分布
                </CardTitle>
                <CardDescription>探索世界各地的校友分布情況</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 這裡可以整合地圖組件，如 Google Maps 或 Mapbox */}
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Globe className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">互動式地圖將在此顯示</p>
                    <p className="text-sm text-gray-400">顯示全球校友分布位置</p>
                  </div>
                </div>

                {/* Location Statistics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {locations.map((location) => (
                    <div key={location.name} className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{location.name}</h4>
                          <p className="text-2xl font-bold text-blue-600">{location.count}</p>
                          <p className="text-sm text-gray-500">位校友</p>
                        </div>
                        <MapPin className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">我的連結</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">127</div>
                    <p className="text-sm text-gray-600">位校友</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">待處理邀請</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">5</div>
                    <p className="text-sm text-gray-600">個邀請</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">本月新增</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">12</div>
                    <p className="text-sm text-gray-600">位校友</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>最近連結的校友</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlumni
                    .filter((person) => person.isConnected)
                    .map((person) => (
                      <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={person.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{person.name}</h4>
                            <p className="text-sm text-gray-600">
                              {person.position1} • {person.company}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          訊息
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
