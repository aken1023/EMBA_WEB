"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Eye,
  Calendar,
  MapPin,
  Users,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const albumData = {
  id: "1",
  title: "歲末雅集·校友聚會",
  description:
    "歲末時光，故友相聚，共話桑麻，溫酒論今昔。此次聚會匯聚了來自各地的校友，在溫馨的氛圍中分享彼此的成長與收穫。",
  coverImage: "/elegant-ballroom-event.png",
  photoCount: 156,
  date: "2024-12-15",
  location: "台北君悅酒店",
  createdBy: "活動組",
  createdAt: "2024-12-16",
  likes: 89,
  views: 1234,
  tags: ["雅集", "年度盛會", "台北"],
}

const photos = [
  {
    id: "1",
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
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    caption: "晚宴時光，美食佳餚，談笑風生",
    uploadedBy: "活動組",
    uploadedAt: "2024-12-16",
    likes: 45,
    comments: 12,
    tags: ["晚宴", "美食"],
  },
  {
    id: "3",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    caption: "校友合影，歲月如歌，友誼長存",
    uploadedBy: "張志明",
    uploadedAt: "2024-12-16",
    likes: 67,
    comments: 18,
    tags: ["合影", "友誼"],
  },
  {
    id: "4",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    caption: "頒獎典禮，表彰優秀校友的傑出成就",
    uploadedBy: "李美華",
    uploadedAt: "2024-12-16",
    likes: 34,
    comments: 8,
    tags: ["頒獎", "成就"],
  },
  {
    id: "5",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    caption: "文藝表演，才華橫溢，精彩紛呈",
    uploadedBy: "王大明",
    uploadedAt: "2024-12-16",
    likes: 56,
    comments: 15,
    tags: ["表演", "文藝"],
  },
  {
    id: "6",
    url: "/placeholder.svg?height=600&width=800",
    thumbnail: "/placeholder.svg?height=300&width=400",
    caption: "溫馨時刻，師長與學生的深情對話",
    uploadedBy: "陳淑芬",
    uploadedAt: "2024-12-16",
    likes: 42,
    comments: 10,
    tags: ["師生", "溫馨"],
  },
]

export default function AlbumDetailPage({ params }: { params: { albumId: string } }) {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const openPhotoModal = (photo: any, index: number) => {
    setSelectedPhoto(photo)
    setCurrentPhotoIndex(index)
  }

  const navigatePhoto = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentPhotoIndex - 1 + photos.length) % photos.length
        : (currentPhotoIndex + 1) % photos.length

    setCurrentPhotoIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            asChild
            className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
          >
            <Link href="/photos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回雅集
            </Link>
          </Button>
        </div>

        {/* Album Header */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-8 py-6 inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <Sparkles className="h-6 w-6 text-amber-600 mx-4 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">{albumData.title}</h1>
            <p className="text-lg text-gray-700 mb-4 max-w-2xl leading-relaxed">{albumData.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.date}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.location}
              </div>
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.photoCount} 張佳作
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.createdBy}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {albumData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.likes} 雅賞
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-amber-600" />
                {albumData.views} 瀏覽
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full mx-4 animate-bounce"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openPhotoModal(photo, index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={photo.thumbnail || "/placeholder.svg"}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-sm mb-2 line-clamp-2 leading-relaxed">{photo.caption}</p>
                    <div className="flex items-center justify-between text-xs">
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
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {photo.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="text-amber-700 font-medium">{photo.uploadedAt}</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1 text-amber-600" />
                      {photo.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1 text-amber-600" />
                      {photo.comments}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-white/95 backdrop-blur-sm border-amber-200/50 p-0">
              <div className="relative">
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                  onClick={() => navigatePhoto("prev")}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                  onClick={() => navigatePhoto("next")}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative">
                    <img
                      src={selectedPhoto.url || "/placeholder.svg"}
                      alt={selectedPhoto.caption}
                      className="w-full h-[70vh] object-contain bg-black"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-2">{selectedPhoto.caption}</h3>
                        <div className="text-sm text-amber-200">
                          {currentPhotoIndex + 1} / {photos.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-6 bg-white/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle className="text-xl text-amber-800">影像詳情</DialogTitle>
                      <DialogDescription className="text-gray-600">{selectedPhoto.caption}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-amber-100 text-amber-700">
                            {selectedPhoto.uploadedBy[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-amber-700">{selectedPhoto.uploadedBy}</p>
                          <p className="text-sm text-gray-500">{selectedPhoto.uploadedAt}</p>
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

                      <div className="grid grid-cols-2 gap-4">
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
                    </div>

                    <div className="border-t border-amber-200 pt-4">
                      <h4 className="font-semibold mb-3 text-amber-800">雅士品評</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        <div className="flex space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-amber-100 text-amber-700 text-xs">張</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200/50">
                              <p className="text-sm">此作甚佳！活動精彩紛呈，令人回味無窮</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">張志明 • 2小時前</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-amber-100 text-amber-700 text-xs">李</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200/50">
                              <p className="text-sm">感謝分享這些珍貴的美好時光！</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">李美華 • 1小時前</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-amber-100 text-amber-700 text-xs">我</AvatarFallback>
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
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
