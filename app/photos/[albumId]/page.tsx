"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
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
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
  Image as ImageIcon,
} from "lucide-react"
import Link from "next/link"
import { getAlbumById, getMedia } from "@/lib/database"

interface Album {
  id: string
  title: string
  description?: string
  event_id?: string
  class_id?: string
  created_by: string
  is_public: boolean
  created_at: string
  date?: string
  location?: string
  photos?: Photo[]
  photoCount?: number
  tags?: string[]
  likes?: number
  views?: number
}

interface Media {
  id: string
  album_id: string
  url: string
  caption?: string
  uploaded_by: string
  created_at: string
  media_type: 'image' | 'video' | 'audio'
  mime_type?: string
  file_size?: number
  duration?: number
  thumbnail_url?: string
  tags?: string[]
  likes?: number
  comments?: number
}

// 為了向後兼容，保留Photo介面
interface Photo extends Media {}

export default function AlbumDetailPage({ params }: { params: { albumId: string } }) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [medias, setMedias] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadCaption, setUploadCaption] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadAlbumData()
  }, [params.albumId])

  const loadAlbumData = async () => {
    try {
      setLoading(true)
      
      // 載入相簿資料
      const { data: albumData, error: albumError } = await getAlbumById(params.albumId)
      if (albumError) {
        console.error('Error loading album:', albumError)
        setError("載入相簿失敗")
        return
      }

      // 載入媒體資料
      const { data: mediasData, error: mediasError } = await getMedia(params.albumId)
      if (mediasError) {
        console.error('Error loading media:', mediasError)
        setError("載入媒體失敗")
        return
      }

      setAlbum({
        ...albumData,
        photoCount: mediasData?.length || 0,
        tags: [], // 暫時使用空陣列
        likes: albumData.id ? parseInt(albumData.id.slice(-2), 16) % 100 : 0, // 使用固定的值
        views: albumData.id ? parseInt(albumData.id.slice(-3), 16) % 500 : 0, // 使用固定的值
        date: albumData.events?.date,
        location: albumData.events?.location,
      })

      setMedias(mediasData?.map((media: any, index: number) => ({
        ...media,
        tags: [], // 暫時使用空陣列
        likes: media.id ? parseInt(media.id.slice(-2), 16) % 50 : index * 3, // 使用固定的值
        comments: media.id ? parseInt(media.id.slice(-1), 16) % 20 : index * 2, // 使用固定的值
      })) || [])

    } catch (err) {
      console.error('Failed to load album data:', err)
      setError("載入資料時發生錯誤")
    } finally {
      setLoading(false)
    }
  }

  const openMediaModal = (media: Media, index: number) => {
    setSelectedMedia(media)
    setCurrentMediaIndex(index)
    setIsPlaying(false)
  }

  const navigateMedia = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentMediaIndex - 1 + medias.length) % medias.length
        : (currentMediaIndex + 1) % medias.length

    setCurrentMediaIndex(newIndex)
    setSelectedMedia(medias[newIndex])
    setIsPlaying(false)
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
  }

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'audio':
        return <Volume2 className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const detectMediaType = (file: File): 'image' | 'video' | 'audio' => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('audio/')) return 'audio'
    return 'image' // 預設為圖片
  }

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(file)
      video.onloadedmetadata = () => {
        resolve(Math.round(video.duration))
        URL.revokeObjectURL(video.src)
      }
      video.onerror = () => resolve(0)
    })
  }

  const handleUploadMedia = async () => {
    if (!uploadFile) {
      alert("請選擇要上傳的檔案")
      return
    }

    try {
      setIsUploading(true)
      
      // 將檔案轉換為 base64 URL (模擬上傳)
      const reader = new FileReader()
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string
        
        const mediaType = detectMediaType(uploadFile)
        let duration: number | undefined = undefined
        
        if (mediaType === 'video') {
          duration = await getVideoDuration(uploadFile)
        }

        const mediaData = {
          album_id: params.albumId,
          url: dataUrl,
          caption: uploadCaption,
          uploaded_by: '11111111-1111-1111-1111-111111111111', // 暫時使用系統用戶ID
          media_type: mediaType,
          mime_type: uploadFile.type,
          file_size: uploadFile.size,
          duration: duration
        }

        // TODO: 這裡應該調用實際的媒體上傳 API
        console.log('上傳媒體資料:', mediaData)
        
        // 模擬上傳成功，重新載入媒體列表
        await loadAlbumData()
        
        // 重置表單
        setUploadFile(null)
        setUploadCaption("")
        setShowUploadModal(false)
        alert("媒體上傳成功！")
      }
      
      reader.readAsDataURL(uploadFile)
      
    } catch (err) {
      console.error('上傳媒體失敗:', err)
      alert("上傳媒體時發生錯誤")
    } finally {
      setIsUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">載入中...</div>
        </div>
      </div>
    )
  }

  if (error || !album) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">{error || "相簿不存在"}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Navigation and Upload */}
        <div className="mb-6 flex items-center justify-between">
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
          
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300"
          >
            <Camera className="h-4 w-4 mr-2" />
            上傳媒體
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">{album.title}</h1>
            <p className="text-lg text-gray-700 mb-4 max-w-2xl leading-relaxed">{album.description || "暫無描述"}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-amber-600" />
                {album.date || "未指定日期"}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-amber-600" />
                {album.location || "未指定地點"}
              </div>
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-1 text-amber-600" />
                {album.photoCount || 0} 個媒體
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-amber-600" />
                {album.created_by || "未知"}
              </div>
            </div>
            {album.tags && album.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {album.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-amber-600" />
                {album.likes || 0} 雅賞
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-amber-600" />
                {album.views || 0} 瀏覽
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full mx-4 animate-bounce"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {medias.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medias.map((media, index) => (
              <Card
                key={media.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white/80 backdrop-blur-sm border-amber-200/50 hover:border-amber-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openMediaModal(media, index)}
              >
                <div className="relative aspect-square overflow-hidden">
                  {media.media_type === 'video' ? (
                    <>
                      {media.thumbnail_url ? (
                        <img
                          src={media.thumbnail_url}
                          alt={media.caption || "影片縮圖"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <video
                          src={media.url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          muted
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.url || "/placeholder.svg"}
                      alt={media.caption || "圖片"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                      {getMediaIcon(media.media_type)}
                      <span className="ml-1">{media.media_type === 'video' ? '影片' : media.media_type === 'audio' ? '音訊' : '圖片'}</span>
                      {media.duration && <span className="ml-1">({formatDuration(media.duration)})</span>}
                    </Badge>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/70 text-white text-xs p-3 rounded-lg backdrop-blur-sm">
                      <p className="line-clamp-2 mb-2 leading-relaxed">{media.caption || "暫無描述"}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-200">by {media.uploaded_by || "未知"}</span>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {media.likes || 0}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {media.comments || 0}
                          </div>
                        </div>
                      </div>
                      {media.file_size && (
                        <div className="text-amber-200 text-xs mt-1">
                          {formatFileSize(media.file_size)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">暫無媒體</h3>
            <p className="text-gray-500">這個相簿還沒有上傳任何照片或影片</p>
          </div>
        )}

        {/* Media Detail Modal */}
        {selectedMedia && (
          <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] bg-white/95 backdrop-blur-sm border-amber-200/50">
              <DialogHeader>
                <DialogTitle className="text-xl text-amber-800">媒體雅賞</DialogTitle>
                <DialogDescription className="text-gray-600">
                  欣賞精彩瞬間，品味美好時光
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Media with Navigation */}
                <div className="relative">
                  {selectedMedia.media_type === 'video' ? (
                    <div className="relative">
                      <video
                        src={selectedMedia.url}
                        controls
                        className="w-full h-auto max-h-[60vh] rounded-lg shadow-lg"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        muted={isMuted}
                      />
                    </div>
                  ) : (
                    <img
                      src={selectedMedia.url || "/placeholder.svg"}
                      alt={selectedMedia.caption}
                      className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-lg"
                    />
                  )}
                  
                  {/* Navigation Buttons */}
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMedia("prev")}
                      className="ml-2 bg-white/80 border-amber-300 hover:bg-amber-50 pointer-events-auto"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMedia("next")}
                      className="mr-2 bg-white/80 border-amber-300 hover:bg-amber-50 pointer-events-auto"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getMediaIcon(selectedMedia.media_type)}
                      <Badge variant="outline" className="text-xs">
                        {selectedMedia.media_type === 'video' ? '影片' : selectedMedia.media_type === 'audio' ? '音訊' : '圖片'}
                      </Badge>
                      {selectedMedia.duration && (
                        <Badge variant="outline" className="text-xs">
                          {formatDuration(selectedMedia.duration)}
                        </Badge>
                      )}
                      {selectedMedia.file_size && (
                        <Badge variant="outline" className="text-xs">
                          {formatFileSize(selectedMedia.file_size)}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-wide">{selectedMedia.caption || "暫無標題"}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-amber-100 text-amber-700">
                            {selectedMedia.uploaded_by?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-amber-700 font-medium">{selectedMedia.uploaded_by || "未知用戶"}</span>
                      </div>
                      <span>{selectedMedia.created_at ? selectedMedia.created_at.split('T')[0] : "未知時間"}</span>
                    </div>
                  </div>
                  
                  {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      雅賞 ({selectedMedia.likes || 0})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      品評 ({selectedMedia.comments || 0})
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

                  <div className="border-t border-amber-200 pt-6">
                    <h4 className="font-bold mb-4 text-amber-800">雅士品評 ({selectedMedia.comments || 0})</h4>
                    <div className="space-y-4 max-h-48 overflow-y-auto">
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                        <p>暫無品評，歡迎留下您的雅評</p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-amber-100 text-amber-700">我</AvatarFallback>
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
            </DialogContent>
          </Dialog>
        )}

        {/* Upload Media Modal */}
        {showUploadModal && (
          <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
            <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-amber-200/50">
              <DialogHeader>
                <DialogTitle className="text-xl text-amber-800">上傳媒體</DialogTitle>
                <DialogDescription className="text-gray-600">
                  添加照片、影片或音訊到這個雅集
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-amber-800 font-medium">選擇檔案</Label>
                  <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 text-center">
                    <input
                      type="file"
                      accept="image/*,video/*,audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="media-upload"
                    />
                    <label
                      htmlFor="media-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      {uploadFile ? (
                        <>
                          <div className="text-amber-600">
                            {getMediaIcon(detectMediaType(uploadFile))}
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-gray-800">{uploadFile.name}</p>
                            <p className="text-gray-500">
                              {formatFileSize(uploadFile.size)} • {detectMediaType(uploadFile)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Camera className="h-12 w-12 text-amber-400" />
                          <div className="text-sm">
                            <p className="font-medium text-gray-800">點擊選擇檔案</p>
                            <p className="text-gray-500">支援圖片、影片、音訊格式</p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Caption Input */}
                <div className="space-y-2">
                  <Label className="text-amber-800 font-medium">描述說明</Label>
                  <Input
                    placeholder="為這個媒體添加描述..."
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    className="border-amber-200 focus:border-amber-400 rounded-xl"
                  />
                </div>

                {/* File Preview */}
                {uploadFile && (
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-medium">預覽</Label>
                    <div className="rounded-xl overflow-hidden border border-amber-200">
                      {detectMediaType(uploadFile) === 'video' ? (
                        <video
                          src={URL.createObjectURL(uploadFile)}
                          controls
                          className="w-full h-48 object-cover"
                        />
                      ) : detectMediaType(uploadFile) === 'image' ? (
                        <img
                          src={URL.createObjectURL(uploadFile)}
                          alt="預覽"
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <Volume2 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">音訊檔案</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUploadModal(false)
                      setUploadFile(null)
                      setUploadCaption("")
                    }}
                    className="flex-1 border-gray-300 text-gray-600 rounded-xl"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleUploadMedia}
                    disabled={!uploadFile || isUploading}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl"
                  >
                    {isUploading ? "上傳中..." : "確認上傳"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}


