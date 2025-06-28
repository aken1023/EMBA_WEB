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
import { PlusCircle, Edit, Trash2, Users, Mail, Building, MapPin } from "lucide-react"
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/database"
import { toast } from "sonner"

interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  phone?: string
  company?: string
  job_title?: string
  graduation_year?: number
  location?: string
  website?: string
  bio?: string
  skills?: string[]
  interests?: string[]
  created_at: string
  updated_at: string
}

const initialUserData = {
  email: "",
  name: "",
  avatar_url: "",
  phone: "",
  company: "",
      job_title: "",
  graduation_year: 2024,
  location: "",
  website: "",
  bio: "",
  skills: [],
  interests: []
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<any>(initialUserData)
  const [skillsInput, setSkillsInput] = useState("")
  const [interestsInput, setInterestsInput] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await getUsers()
      if (error) {
        toast.error("載入用戶資料失敗")
        console.error(error)
      } else {
        setUsers(data || [])
      }
    } catch (error) {
      toast.error("載入用戶資料失敗")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        ...user,
        graduation_year: user.graduation_year || 2024
      })
      setSkillsInput(user.skills?.join(", ") || "")
      setInterestsInput(user.interests?.join(", ") || "")
    } else {
      setEditingUser(null)
      setFormData(initialUserData)
      setSkillsInput("")
      setInterestsInput("")
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData(initialUserData)
    setSkillsInput("")
    setInterestsInput("")
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: typeof initialUserData) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const userData = {
        ...formData,
        skills: skillsInput.split(",").map(s => s.trim()).filter(s => s),
        interests: interestsInput.split(",").map(s => s.trim()).filter(s => s),
        graduation_year: parseInt(formData.graduation_year) || 2024
      }

      if (editingUser) {
        const { error } = await updateUser(editingUser.id, userData)
        if (error) {
          toast.error("更新用戶失敗")
          return
        }
        toast.success("用戶更新成功")
      } else {
        const { error } = await createUser(userData)
        if (error) {
          toast.error("創建用戶失敗")
          return
        }
        toast.success("用戶創建成功")
      }

      handleCloseDialog()
      loadUsers()
    } catch (error) {
      toast.error(editingUser ? "更新用戶失敗" : "創建用戶失敗")
      console.error(error)
    }
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`確定要刪除用戶 "${userName}" 嗎？此操作無法復原。`)) {
      return
    }

    try {
      const { error } = await deleteUser(userId)
      if (error) {
        toast.error("刪除用戶失敗")
        return
      }
      toast.success("用戶已刪除")
      loadUsers()
    } catch (error) {
      toast.error("刪除用戶失敗")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">用戶管理</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      <div className="h-3 w-48 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">用戶管理</h1>
          <p className="text-muted-foreground">
            管理系統中的所有用戶
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
            新增用戶
          </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingUser ? "編輯用戶" : "新增用戶"}</DialogTitle>
              <DialogDescription>
                {editingUser ? "修改用戶資訊" : "創建新的用戶帳號"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="請輸入姓名"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">電子郵件</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="請輸入電子郵件"
                  />
        </div>
      </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">電話</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="請輸入電話號碼"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation_year">畢業年份</Label>
                  <Select
                    value={formData.graduation_year?.toString()}
                    onValueChange={(value) => handleInputChange("graduation_year", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇畢業年份" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 15}, (_, i) => 2024 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">公司</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="請輸入公司名稱"
                  />
                </div>
                <div className="space-y-2">
                                  <Label htmlFor="job_title">職位</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => handleInputChange("job_title", e.target.value)}
                    placeholder="請輸入職位"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">地點</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="請輸入地點"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">網站</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="請輸入個人網站"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">個人簡介</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="請輸入個人簡介"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">專業技能 (用逗號分隔)</Label>
                <Input
                  id="skills"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="例如：管理, 行銷, 財務"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">興趣愛好 (用逗號分隔)</Label>
                <Input
                  id="interests"
                  value={interestsInput}
                  onChange={(e) => setInterestsInput(e.target.value)}
                  placeholder="例如：閱讀, 旅行, 運動"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url">頭像 URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => handleInputChange("avatar_url", e.target.value)}
                  placeholder="請輸入頭像圖片 URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                取消
              </Button>
              <Button onClick={handleSubmit}>
                {editingUser ? "更新" : "創建"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            用戶列表 ({users.length})
          </CardTitle>
          <CardDescription>
            系統中所有註冊用戶的列表
          </CardDescription>
        </CardHeader>
        <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用戶</TableHead>
                <TableHead>聯絡資訊</TableHead>
                <TableHead>工作資訊</TableHead>
                      <TableHead>畢業年份</TableHead>
                <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
              {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                    <div className="space-y-1">
                      {user.phone && (
                        <div className="text-sm">{user.phone}</div>
                      )}
                      {user.location && (
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </div>
                      )}
                          </div>
                        </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.company && (
                        <div className="text-sm flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {user.company}
                        </div>
                      )}
                      {user.position && (
                        <div className="text-sm text-muted-foreground">
                          {user.position}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.graduation_year || "未設定"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user.id, user.name)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
          
          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              暫無用戶資料
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
