"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Clock, Search, Filter, Heart, Star, Coffee, BookOpen } from "lucide-react"
import { getEvents } from "@/lib/database"

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const { data, error } = await getEvents()
      if (error) {
        console.error("Error loading events:", error)
      } else {
        setEvents(data || [])
      }
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
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
        return "bg-green-100 text-green-800"
      case "已結束":
        return "bg-gray-100 text-gray-800"
      case "已額滿":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "聚會":
        return "bg-pink-100 text-pink-800"
      case "講座":
        return "bg-blue-100 text-blue-800"
      case "運動":
        return "bg-green-100 text-green-800"
      case "體驗":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">載入活動資料中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">校友活動</h1>
          <p className="text-xl text-gray-600">參與精彩活動，擴展人脈網絡</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋活動..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="活動類型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有類型</SelectItem>
              <SelectItem value="聚會">聚會</SelectItem>
              <SelectItem value="講座">講座</SelectItem>
              <SelectItem value="運動">運動</SelectItem>
              <SelectItem value="體驗">體驗</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-purple-400">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">活動圖片</p>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {event.title}
                  </h3>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{event.date} {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-500" />
                    <span>上限 {event.max_attendees} 人</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                    <span className="text-lg font-bold text-purple-600">
                      {event.price === 0 ? "免費" : `NT$ ${event.price}`}
                    </span>
                  </div>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
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
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">找不到符合條件的活動</h3>
            <p className="text-gray-500">請嘗試調整搜尋條件或瀏覽其他活動</p>
          </div>
        )}
      </div>
    </div>
  )
}
