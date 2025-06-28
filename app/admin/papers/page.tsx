"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, FileText, Download, Eye, Heart, Star, Clock } from "lucide-react"
import { getPapers, getUsers, createPaper, updatePaper, deletePaper } from "@/lib/database"

interface Paper {
  id: string
  title: string
  abstract: string
  content?: string
  keywords?: string[]
  journal?: string
  publication_date?: string
  doi?: string
  pdf_url?: string
  status: 'draft' | 'published' | 'reviewed'
  views?: number
  downloads?: number
  likes?: number
  rating?: number
  created_at: string
  updated_at: string
  authors?: {
    id: string
    name: string
    email?: string
  }[]
}

interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
}

const initialPaperData = {
  title: "",
  abstract: "",
  content: "",
  keywords: [] as string[],
  journal: "",
  publication_date: "",
  doi: "",
  pdf_url: "",
  status: "draft" as const
}

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)
  const [formData, setFormData] = useState(initialPaperData)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [papersResult, usersResult] = await Promise.all([
        getPapers(),
        getUsers()
      ])

      if (!papersResult.error && papersResult.data) {
        setPapers(papersResult.data)
      }

      if (!usersResult.error && usersResult.data) {
        setUsers(usersResult.data)
      }
    } catch (error) {
      console.error("載入資料失敗:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      const paperData = {
        ...formData,
        views: editingPaper?.views || 0,
        downloads: editingPaper?.downloads || 0,
        likes: editingPaper?.likes || 0,
        rating: editingPaper?.rating || 0
      }

      if (editingPaper) {
        const { error } = await updatePaper(editingPaper.id, paperData)
        if (error) throw error
      } else {
        const { error } = await createPaper(paperData)
        if (error) throw error
      }

      await loadData()
      setIsDialogOpen(false)
      setEditingPaper(null)
      setFormData(initialPaperData)
    } catch (error) {
      console.error("操作失敗:", error)
      alert("操作失敗，請稍後重試")
    }
  }

  const handleEdit = (paper: Paper) => {
    setEditingPaper(paper)
    setFormData({
      title: paper.title,
      abstract: paper.abstract,
      content: paper.content || "",
      keywords: paper.keywords || [],
      journal: paper.journal || "",
      publication_date: paper.publication_date || "",
      doi: paper.doi || "",
      pdf_url: paper.pdf_url || "",
      status: paper.status
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (paperId: string) => {
    if (!confirm("確定要刪除這篇論文嗎？")) return

    try {
      const { error } = await deletePaper(paperId)
      if (error) throw error
      
      await loadData()
    } catch (error) {
      console.error("刪除失敗:", error)
      alert("刪除失敗，請稍後重試")
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: "草稿", variant: "secondary" as const },
      published: { label: "已發表", variant: "default" as const },
      reviewed: { label: "審查中", variant: "outline" as const }
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">論文管理</h1>
          <p className="text-gray-600 mt-2">管理學術論文和研究資料</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPaper(null)
              setFormData(initialPaperData)
            }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              新增論文
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPaper ? "編輯論文" : "新增論文"}
              </DialogTitle>
              <DialogDescription>
                {editingPaper ? "修改論文資訊" : "添加新的學術論文"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">標題</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="abstract" className="text-right mt-2">摘要</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => handleInputChange("abstract", e.target.value)}
                  className="col-span-3 min-h-[100px]"
                  placeholder="論文摘要..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="journal" className="text-right">期刊</Label>
                <Input
                  id="journal"
                  value={formData.journal}
                  onChange={(e) => handleInputChange("journal", e.target.value)}
                  className="col-span-3"
                  placeholder="發表期刊名稱"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publication_date" className="text-right">發表日期</Label>
                <Input
                  id="publication_date"
                  type="date"
                  value={formData.publication_date}
                  onChange={(e) => handleInputChange("publication_date", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doi" className="text-right">DOI</Label>
                <Input
                  id="doi"
                  value={formData.doi}
                  onChange={(e) => handleInputChange("doi", e.target.value)}
                  className="col-span-3"
                  placeholder="10.1000/182"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pdf_url" className="text-right">PDF 連結</Label>
                <Input
                  id="pdf_url"
                  value={formData.pdf_url}
                  onChange={(e) => handleInputChange("pdf_url", e.target.value)}
                  className="col-span-3"
                  placeholder="論文PDF檔案連結"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="keywords" className="text-right">關鍵字</Label>
                <Input
                  id="keywords"
                  value={formData.keywords.join(", ")}
                  onChange={(e) => handleInputChange("keywords", e.target.value.split(", ").filter(keyword => keyword.trim()))}
                  className="col-span-3"
                  placeholder="用逗號分隔多個關鍵字"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">狀態</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="reviewed">審查中</SelectItem>
                    <SelectItem value="published">已發表</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right mt-2">內容</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="col-span-3 min-h-[150px]"
                  placeholder="論文完整內容..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.abstract}
              >
                {editingPaper ? "更新" : "創建"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總論文數</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{papers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總瀏覽數</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {papers.reduce((total, paper) => total + (paper.views || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總下載數</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {papers.reduce((total, paper) => total + (paper.downloads || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已發表</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {papers.filter(paper => paper.status === 'published').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Papers Table */}
      <Card>
        <CardHeader>
          <CardTitle>論文列表</CardTitle>
          <CardDescription>
            管理所有學術論文，包含編輯和刪除功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">載入中...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>標題</TableHead>
                  <TableHead>作者</TableHead>
                  <TableHead>期刊</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>統計</TableHead>
                  <TableHead>發表日期</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium line-clamp-2">{paper.title}</div>
                        {paper.keywords && paper.keywords.length > 0 && (
                          <div className="flex gap-1">
                            {paper.keywords.slice(0, 3).map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {paper.keywords.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{paper.keywords.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {paper.authors && paper.authors.length > 0 ? (
                          paper.authors.slice(0, 2).map((author, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {author.name?.charAt(0) || 'A'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{author.name}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">無作者資訊</span>
                        )}
                        {paper.authors && paper.authors.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{paper.authors.length - 2} 位作者
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{paper.journal || '未指定'}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(paper.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {paper.views || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {paper.downloads || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {paper.likes || 0}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {paper.publication_date ? formatDate(paper.publication_date) : formatDate(paper.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(paper)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(paper.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 