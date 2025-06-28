"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Building, Calendar, Users, MessageCircle, Mail } from "lucide-react"
import { searchAlumni } from "@/lib/database"

interface Alumni {
  id: string
  name: string
  email: string
  company?: string
  job_title?: string
  location?: string
  graduation_year?: number
  skills?: string[]
  avatar_url?: string
  bio?: string
}

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [graduationYearFilter, setGraduationYearFilter] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)

  // 載入初始校友資料
  useEffect(() => {
    loadAlumni()
  }, [])

  const loadAlumni = async (
    query: string = "",
    location: string = "",
    graduationYear: string = "",
    skills: string = ""
  ) => {
    setIsLoading(true)
    try {
      const filters: any = {}
      
      if (location) filters.location = location
      if (graduationYear) filters.graduation_year = parseInt(graduationYear)
      if (skills) filters.skills = [skills]

      const { data, error } = await searchAlumni(query, filters)
      
      if (error) {
        console.error("搜尋校友失敗:", error)
        setAlumni([])
        setTotalResults(0)
      } else {
        setAlumni(data || [])
        setTotalResults(data?.length || 0)
      }
    } catch (error) {
      console.error("載入校友資料失敗:", error)
      setAlumni([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    loadAlumni(searchQuery, locationFilter, graduationYearFilter, skillFilter)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setGraduationYearFilter("")
    setSkillFilter("")
    loadAlumni()
  }

  // 獲取所有可能的畢業年份（從當前年份往前推20年）
  const graduationYears = Array.from({ length: 20 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return year.toString()
  })

  // 常見技能列表
  const commonSkills = [
    "管理", "行銷", "財務", "策略規劃", "專案管理", "數據分析", 
    "商業開發", "人力資源", "營運管理", "國際貿易", "創業", "投資"
  ]

  // 地點列表
  const locations = [
    { name: "台北市" },
    { name: "台中市" },
    { name: "高雄市" },
    { name: "新竹市" },
    { name: "台南市" },
    { name: "桃園市" },
    { name: "上海" },
    { name: "香港" },
    { name: "新加坡" },
    { name: "美國" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">校友網絡</h1>
          <p className="text-gray-600">
            探索並連結全球 EMBA 校友，擴展您的專業人脈
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              搜尋校友
            </CardTitle>
            <CardDescription>
              使用關鍵字、地點、畢業年份或技能來找到相關的校友
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Input
                  placeholder="搜尋姓名、公司或職位..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="選擇地點" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">所有地點</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={graduationYearFilter} onValueChange={setGraduationYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="畢業年份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">所有年份</SelectItem>
                  {graduationYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="專業技能" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">所有技能</SelectItem>
                  {commonSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                搜尋
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                清除篩選
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {isLoading ? "搜尋中..." : `找到 ${totalResults} 位校友`}
            </p>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                活躍校友網絡
              </span>
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : alumni.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alumni.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatar_url} alt={person.name} />
                        <AvatarFallback>
                          {person.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">
                          {person.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {person.job_title} {person.company && `at ${person.company}`}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      {person.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {person.location}
                        </div>
                      )}
                      {person.company && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {person.company}
                        </div>
                      )}
                      {person.graduation_year && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          畢業於 {person.graduation_year}
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    {person.bio && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {person.bio}
                      </p>
                    )}

                    {/* Skills */}
                    {person.skills && person.skills.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">專業技能</p>
                        <div className="flex flex-wrap gap-1">
                          {person.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {person.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{person.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        聯繫
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                未找到符合條件的校友
              </h3>
              <p className="text-gray-600 mb-4">
                嘗試調整搜尋條件或清除篩選以查看更多結果
              </p>
              <Button onClick={clearFilters}>
                清除篩選
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
