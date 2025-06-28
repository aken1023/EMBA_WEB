"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PoeticDescriptionGenerator } from "@/components/poetic-description-generator"
import { Upload, ImageIcon, X, Plus, Camera, Sparkles, FileImage, Check, AlertCircle, Wand2 } from "lucide-react"

interface UploadFile {
  id: string
  file: File
  preview: string
  caption: string
  poeticCaption: string
  tags: string[]
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
}

const existingAlbums = [
  { id: "1", name: "歲末雅集·校友聚會", photoCount: 156 },
  { id: "2", name: "智慧論壇·AI商道", photoCount: 45 },
  { id: "3", name: "綠茵雅韻·高球會", photoCount: 78 },
  { id: "4", name: "創業心得·智者分享", photoCount: 32 },
]

export default function PhotoUploadPage() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState("")
  const [newAlbumName, setNewAlbumName] = useState("")
  const [newAlbumDescription, setNewAlbumDescription] = useState("")
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [editingFileId, setEditingFileId] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    handleFiles(files)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      caption: "",
      poeticCaption: "",
      tags: [],
      progress: 0,
      status: "pending",
    }))
    setUploadFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setUploadFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const updateFileCaption = (id: string, caption: string) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === id ? { ...file, caption } : file)))
  }

  const updateFilePoeticCaption = (id: string, poeticCaption: string) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === id ? { ...file, poeticCaption } : file)))
  }

  const addTag = (id: string, tag: string) => {
    if (!tag.trim()) return
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              tags: [...file.tags, tag.trim()].filter((t, i, arr) => arr.indexOf(t) === i),
            }
          : file,
      ),
    )
  }

  const removeTag = (id: string, tagToRemove: string) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              tags: file.tags.filter((tag) => tag !== tagToRemove),
            }
          : file,
      ),
    )
  }

  const simulateUpload = async (fileId: string) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "uploading" } : file)))

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
    }

    setUploadFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)))
  }

  const uploadAll = async () => {
    const pendingFiles = uploadFiles.filter((f) => f.status === "pending")
    for (const file of pendingFiles) {
      await simulateUpload(file.id)
    }
  }

  const getContextFromAlbum = (albumId: string): "event" | "class" | "academic" | "sports" | "casual" => {
    const album = existingAlbums.find((a) => a.id === albumId)
    if (!album) return "casual"

    if (album.name.includes("聚會") || album.name.includes("雅集")) return "event"
    if (album.name.includes("論壇") || album.name.includes("智慧")) return "academic"
    if (album.name.includes("高球") || album.name.includes("運動")) return "sports"
    if (album.name.includes("同學") || album.name.includes("班級")) return "class"

    return "casual"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Literary Style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <Sparkles className="h-5 w-5 text-amber-600 mx-3 animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-wide">
              上傳佳作
              <span className="text-2xl text-amber-700 ml-3">·</span>
              <span className="text-2xl text-amber-700 ml-1">分享雅韻</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium tracking-wide">將您的珍貴時光化作永恆的影像記憶</p>
            <div className="flex items-center justify-center mt-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full mx-3 animate-bounce"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg">
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-100 data-[state=active]:to-orange-100 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              上傳佳作
            </TabsTrigger>
            <TabsTrigger
              value="album"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-100 data-[state=active]:to-orange-100 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              雅集管理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Album Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  選擇雅集
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                      <SelectTrigger className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200">
                        <SelectValue placeholder="選擇現有雅集或建立新雅集" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-200/50">
                        {existingAlbums.map((album) => (
                          <SelectItem key={album.id} value={album.id}>
                            {album.name} ({album.photoCount} 張)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreatingAlbum(!isCreatingAlbum)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    新建雅集
                  </Button>
                </div>

                {isCreatingAlbum && (
                  <div className="space-y-4 p-4 bg-amber-50/50 rounded-lg border border-amber-200/50 animate-in slide-in-from-top-4 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="album-name" className="text-amber-800">
                        雅集名稱
                      </Label>
                      <Input
                        id="album-name"
                        value={newAlbumName}
                        onChange={(e) => setNewAlbumName(e.target.value)}
                        placeholder="輸入雅集名稱"
                        className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="album-description" className="text-amber-800">
                        雅集描述
                      </Label>
                      <Textarea
                        id="album-description"
                        value={newAlbumDescription}
                        onChange={(e) => setNewAlbumDescription(e.target.value)}
                        placeholder="描述這個雅集的內容與意境"
                        rows={3}
                        className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        建立雅集
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCreatingAlbum(false)}
                        className="border-amber-200 hover:bg-amber-50"
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Area */}
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  上傳影像
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-amber-400 bg-amber-50"
                      : "border-amber-300 hover:border-amber-400 hover:bg-amber-50/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-amber-100 rounded-full">
                        <FileImage className="h-12 w-12 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">拖拽影像至此處或點擊選擇</h3>
                      <p className="text-gray-600 mb-4">支援 JPG、PNG、GIF 格式，單檔最大 10MB</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          選擇影像
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Files List */}
            {uploadFiles.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-800 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      待上傳佳作 ({uploadFiles.length})
                    </CardTitle>
                    <Button
                      onClick={uploadAll}
                      disabled={uploadFiles.every((f) => f.status !== "pending")}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      全部上傳
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {uploadFiles.map((file, index) => (
                      <div
                        key={file.id}
                        className="border border-amber-200/50 rounded-lg p-4 bg-amber-50/30 animate-in fade-in-50 slide-in-from-bottom-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            {file.status === "completed" && (
                              <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Check className="h-6 w-6 text-green-600" />
                              </div>
                            )}
                            {file.status === "error" && (
                              <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <Label className="text-amber-800">基本描述</Label>
                              <Input
                                value={file.caption}
                                onChange={(e) => updateFileCaption(file.id, e.target.value)}
                                placeholder="為這張影像添加基本描述..."
                                className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                              />
                            </div>

                            {/* 詩意描述區域 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-amber-800">詩意描述</Label>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors bg-transparent"
                                      onClick={() => setEditingFileId(file.id)}
                                    >
                                      <Wand2 className="h-3 w-3 mr-1" />
                                      AI生成
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-amber-200/50">
                                    <DialogHeader>
                                      <DialogTitle className="text-amber-800">AI詩意描述生成</DialogTitle>
                                    </DialogHeader>
                                    <PoeticDescriptionGenerator
                                      originalCaption={file.caption}
                                      tags={file.tags}
                                      context={getContextFromAlbum(selectedAlbum)}
                                      onDescriptionSelect={(description) => {
                                        updateFilePoeticCaption(file.id, description)
                                      }}
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <Textarea
                                value={file.poeticCaption}
                                onChange={(e) => updateFilePoeticCaption(file.id, e.target.value)}
                                placeholder="AI將為您生成富有詩意的描述，或您可以手動輸入..."
                                rows={2}
                                className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                              />
                            </div>

                            <div>
                              <Label className="text-amber-800">標籤</Label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {file.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                                  >
                                    #{tag}
                                    <button onClick={() => removeTag(file.id, tag)} className="ml-1 hover:text-red-600">
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                              <Input
                                placeholder="輸入標籤後按 Enter"
                                className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    const target = e.target as HTMLInputElement
                                    addTag(file.id, target.value)
                                    target.value = ""
                                  }
                                }}
                              />
                            </div>
                            {file.status === "uploading" && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-700">上傳中...</span>
                                  <span className="text-amber-700">{file.progress}%</span>
                                </div>
                                <Progress value={file.progress} className="h-2" />
                              </div>
                            )}
                            {file.status === "completed" && (
                              <div className="text-sm text-green-600 flex items-center">
                                <Check className="h-4 w-4 mr-1" />
                                上傳完成
                              </div>
                            )}
                            {file.status === "error" && (
                              <div className="text-sm text-red-600 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                上傳失敗
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="album" className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  雅集管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {existingAlbums.map((album, index) => (
                    <Card
                      key={album.id}
                      className="border-amber-200/50 hover:border-amber-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg text-gray-800">{album.name}</h3>
                          <Badge className="bg-amber-100 text-amber-800">{album.photoCount} 張</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors bg-transparent"
                          >
                            編輯
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors bg-transparent"
                          >
                            查看
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
