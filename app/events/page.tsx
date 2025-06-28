"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Clock, Search, Filter, Heart, Star, Coffee, BookOpen } from "lucide-react"

const events = [
  {
    id: 1,
    title: "🌸 春日校友茶會",
    description: "在櫻花飛舞的季節裡，讓我們相聚品茶，分享彼此的故事與溫暖回憶",
    date: "2024-12-15",
    time: "14:00-17:00",
    location: "文青咖啡館 · 大安區",
    attendees: 24,
    maxAttendees: 30,
    price: 680,
    category: "聚會",
    status: "報名中",
    image: "/elegant-ballroom-event.png",
    mood: "溫馨",
    color: "from-pink-100 to-rose-100",
  },
  {
    id: 2,
    title: "📚 知識分享小聚",
    description: "在書香環繞的空間裡，聽聽大家的智慧分享，一起成長一起學習",
    date: "2024-11-28",
    time: "19:00-21:00",
    location: "獨立書店 · 師大商圈",
    attendees: 18,
    maxAttendees: 25,
    price: 450,
    category: "講座",
    status: "報名中",
    image: "/modern-conference-ai.png",
    mood: "文藝",
    color: "from-blue-100 to-indigo-100",
  },
  {
    id: 3,
    title: "🎨 手作工坊體驗",
    description: "用雙手創造美好，在陶藝與手作中找到內心的平靜與喜悅",
    date: "2024-11-20",
    time: "10:00-15:00",
    location: "手作工作室 · 華山文創",
    attendees: 12,
    maxAttendees: 16,
    price: 1200,
    category: "體驗",
    status: "報名中",
    image: "/golf-course-green.png",
    mood: "療癒",
    color: "from-green-100 to-emerald-100",
  },
  {
    id: 4,
    title: "🌙 夜晚音樂分享會",
    description: "在柔和的燈光下，聽著溫暖的音樂，分享生活中的小確幸",
    date: "2024-11-10",
    time: "19:30-22:00",
    location: "Live House · 西門町",
    attendees: 35,
    maxAttendees: 40,
    price: 0,
    category: "音樂",
    status: "已結束",
    image: "/startup-presentation.png",
    mood: "浪漫",
    color: "from-purple-100 to-violet-100",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with cute style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-pink-300"></div>
              <Coffee className="h-5 w-5 text-pink-500 mx-3 animate-bounce" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-700 mb-3 tracking-wide">
              活動小聚
              <span className="text-2xl text-pink-500 ml-3">·</span>
              <span className="text-2xl text-pink-500 ml-1">溫暖相遇</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">在每個美好的時光裡，遇見更好的彼此</p>
            <div className="flex items-center justify-center mt-3">
              <Heart className="h-4 w-4 text-pink-400 mx-2 animate-pulse" />
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
              <Heart className="h-4 w-4 text-pink-400 mx-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search and Filter with cute design */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-3 h-4 w-4 text-pink-400 group-hover:text-pink-500 transition-colors" />
            <Input
              placeholder="尋找心儀的活動..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/80 backdrop-blur-sm border-pink-200/50 focus:border-pink-400 focus:ring-pink-200 rounded-full transition-all duration-300 hover:bg-white/90"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48 bg-white/80 backdrop-blur-sm border-pink-200/50 hover:bg-white/90 transition-all duration-300 rounded-full">
              <Filter className="h-4 w-4 mr-2 text-pink-400" />
              <SelectValue placeholder="活動類型" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-pink-200/50 rounded-2xl">
              <SelectItem value="all">所有活動</SelectItem>
              <SelectItem value="聚會">溫馨聚會</SelectItem>
              <SelectItem value="講座">知識分享</SelectItem>
              <SelectItem value="體驗">手作體驗</SelectItem>
              <SelectItem value="音樂">音樂時光</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid with cute cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br ${event.color} border-0 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 rounded-3xl`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge
                    className={`${
                      event.status === "報名中"
                        ? "bg-green-400/90 text-white"
                        : event.status === "即將開始"
                          ? "bg-orange-400/90 text-white"
                          : "bg-gray-400/90 text-white"
                    } border-0 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium`}
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-2 line-clamp-1 tracking-wide drop-shadow-lg">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-pink-100 text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.date}
                    <MapPin className="h-3 w-3 ml-4 mr-1" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 bg-white/70 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="text-xs border-pink-300 text-pink-700 bg-pink-50/80 rounded-full px-3 py-1"
                  >
                    {event.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-purple-300 text-purple-700 bg-purple-50/80 rounded-full px-3 py-1"
                  >
                    {event.mood}
                  </Badge>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-2 text-pink-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-2 text-pink-400" />
                    {event.attendees}/{event.maxAttendees} 位朋友參加
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-pink-200/50">
                  <div className="text-lg font-bold text-gray-700">
                    {event.price === 0 ? (
                      <span className="text-green-600 flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        免費參加
                      </span>
                    ) : (
                      `NT$ ${event.price}`
                    )}
                  </div>
                  <Button
                    size="sm"
                    disabled={event.status === "已結束"}
                    className={`${
                      event.status === "已結束"
                        ? "bg-gray-300 text-gray-500"
                        : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
                    } rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg`}
                  >
                    {event.status === "已結束" ? "已結束" : "我要參加"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Event Button with cute style */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-pink-200/50">
            <BookOpen className="h-12 w-12 mx-auto text-pink-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">想要舉辦活動嗎？</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">分享你的想法，創造美好的聚會時光，讓更多朋友一起參與</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Star className="h-4 w-4 mr-2" />
              建立溫馨活動
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
