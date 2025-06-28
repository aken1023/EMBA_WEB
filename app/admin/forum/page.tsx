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
import { PlusCircle, Edit, Trash2, MessageSquare, Heart, Eye, Clock, User } from "lucide-react"
import { getForumPosts, getForumCategories, getUsers, createForumPost, updateForumPost, deleteForumPost } from "@/lib/database"

interface ForumPost {
  id: string
  title: string
  content: string
  author_id: string
  category_id: string
  tags?: string[]
  is_pinned?: boolean
  is_locked?: boolean
  views?: number
  likes?: number
  created_at: string
  updated_at: string
  users?: {
    id: string
    name: string
    avatar_url?: string
  }
  forum_categories?: {
    id: string
    name: string
    color?: string
  }
  replies_count?: number
}

interface User {
  id: string
  name: string
  email: string
  avatar_url?: string
}

interface Category {
  id: string
  name: string
  description?: string
  color?: string
}

const initialPostData = {
  title: "",
  content: "",
  author_id: "",
  category_id: "",
  tags: [] as string[],
  is_pinned: false,
  is_locked: false
}

export default function AdminForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<ForumPost | null>(null)
  const [formData, setFormData] = useState(initialPostData)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [postsResult, usersResult, categoriesResult] = await Promise.all([
        getForumPosts(),
        getUsers(),
        getForumCategories()
      ])

      if (!postsResult.error && postsResult.data) {
        setPosts(postsResult.data)
      }

      if (!usersResult.error && usersResult.data) {
        setUsers(usersResult.data)
      }

      if (!categoriesResult.error && categoriesResult.data) {
        setCategories(categoriesResult.data)
      }
    } catch (error) {
      console.error("載入資料失敗:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingPost) {
        const { error } = await updateForumPost(editingPost.id, formData)
        if (error) throw error
      } else {
        const { error } = await createForumPost({
          ...formData,
          views: 0,
          likes: 0
        })
        if (error) throw error
      }

      await loadData()
      setIsDialogOpen(false)
      setEditingPost(null)
      setFormData(initialPostData)
    } catch (error) {
      console.error("操作失敗:", error)
      alert("操作失敗，請稍後重試")
    }
  }

  const handleEdit = (post: ForumPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      author_id: post.author_id,
      category_id: post.category_id,
      tags: post.tags || [],
      is_pinned: post.is_pinned || false,
      is_locked: post.is_locked || false
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm("確定要刪除這篇文章嗎？")) return

    try {
      const { error } = await deleteForumPost(postId)
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId)
  }

  const getCategoryById = (categoryId: string) => {
    return categories.find(category => category.id === categoryId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">論壇管理</h1>
          <p className="text-gray-600 mt-2">管理論壇文章和討論</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPost(null)
              setFormData(initialPostData)
            }}>
              <PlusCircle className="h-4 w-4 mr-2" />
              新增文章
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "編輯文章" : "新增文章"}
              </DialogTitle>
              <DialogDescription>
                {editingPost ? "修改文章資訊" : "創建新的論壇文章"}
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">作者</Label>
                <Select
                  value={formData.author_id}
                  onValueChange={(value) => handleInputChange("author_id", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇作者" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">分類</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => handleInputChange("category_id", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇分類" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right mt-2">內容</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="col-span-3 min-h-[120px]"
                  placeholder="輸入文章內容..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">標籤</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleInputChange("tags", e.target.value.split(", ").filter(tag => tag.trim()))}
                  className="col-span-3"
                  placeholder="用逗號分隔多個標籤"
                />
              </div>
              <div className="flex items-center space-x-4 col-span-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_pinned}
                    onChange={(e) => handleInputChange("is_pinned", e.target.checked)}
                  />
                  <span>置頂文章</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_locked}
                    onChange={(e) => handleInputChange("is_locked", e.target.checked)}
                  />
                  <span>鎖定文章</span>
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.content || !formData.author_id || !formData.category_id}
              >
                {editingPost ? "更新" : "創建"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總文章數</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總瀏覽數</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts.reduce((total, post) => total + (post.views || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總按讚數</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts.reduce((total, post) => total + (post.likes || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活躍分類</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>論壇文章</CardTitle>
          <CardDescription>
            管理所有論壇文章，包含編輯和刪除功能
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
                  <TableHead>分類</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>統計</TableHead>
                  <TableHead>建立時間</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => {
                  const author = getUserById(post.author_id)
                  const category = getCategoryById(post.category_id)
                  
                  return (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{post.title}</div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={author?.avatar_url} alt={author?.name} />
                            <AvatarFallback>
                              {author?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{author?.name || '未知用戶'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {category && (
                          <Badge 
                            variant="secondary"
                            style={{ backgroundColor: category.color + '20', color: category.color }}
                          >
                            {category.name}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {post.is_pinned && (
                            <Badge variant="default" className="text-xs">置頂</Badge>
                          )}
                          {post.is_locked && (
                            <Badge variant="destructive" className="text-xs">鎖定</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.likes || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.replies_count || 0}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDate(post.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 