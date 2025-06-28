"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Building, Mail, Phone, MapPin, Globe, Edit, Save, Camera } from "lucide-react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: "張志明",
    email: "zhang.zhiming@example.com",
    phone: "+886-912-345-678",
    company: "創新科技股份有限公司",
    position1: "執行長", // 更新為 position1
    graduation_year: 2018,
    location: "台北市",
    website: "https://www.innovatech.com",
    bio: "專注於AI與區塊鏈技術的應用，致力於推動企業數位轉型。擁有15年的科技業經驗，曾任職於多家知名科技公司。",
    skills: ["人工智慧", "區塊鏈", "數位轉型", "策略規劃", "團隊管理"],
    interests: ["科技創新", "創業投資", "高爾夫", "攝影"],
    privacy: {
      showEmail: true,
      showPhone: false,
      showCompany: true,
      showLocation: true,
    },
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile, error } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile:", error)
        return
      }

      if (profile) {
        setProfileData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          company: profile.company || "",
          position1: profile.position1 || "", // 使用 position1
          graduation_year: profile.graduation_year || new Date().getFullYear(),
          location: profile.location || "",
          website: profile.website || "",
          bio: profile.bio || "",
          skills: profile.skills || [],
          interests: profile.interests || [],
          privacy: {
            showEmail: true,
            showPhone: false,
            showCompany: true,
            showLocation: true,
          },
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!isSupabaseConfigured) {
      setIsEditing(false)
      console.log("Demo mode - Profile saved:", profileData)
      return
    }

    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: profileData.email,
        name: profileData.name,
        phone: profileData.phone,
        company: profileData.company,
        position1: profileData.position1, // 使用 position1
        graduation_year: profileData.graduation_year,
        location: profileData.location,
        website: profileData.website,
        bio: profileData.bio,
        skills: profileData.skills,
        interests: profileData.interests,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error saving profile:", error)
        return
      }

      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value },
    }))
  }

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addInterest = (interest: string) => {
    if (interest && !profileData.interests.includes(interest)) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((interest) => interest !== interestToRemove),
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">個人檔案</h1>
          <p className="text-gray-600">管理您的個人資訊與隱私設定</p>
          {!isSupabaseConfigured && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">🔧 目前為展示模式，資料變更不會儲存到資料庫</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">基本資料</TabsTrigger>
            <TabsTrigger value="professional">專業資訊</TabsTrigger>
            <TabsTrigger value="privacy">隱私設定</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>基本資料</CardTitle>
                    <CardDescription>您的個人基本資訊</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        儲存中...
                      </>
                    ) : isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        儲存
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        編輯
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">{profileData.name[0]}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      更換照片
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">電子郵件</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">電話</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">所在地</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">畢業年份</Label>
                    <Select
                      value={profileData.graduation_year.toString()}
                      onValueChange={(value) => handleInputChange("graduation_year", Number.parseInt(value))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => 2024 - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}年
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">個人網站</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">個人簡介</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="介紹您的專業背景、經驗與興趣..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>專業資訊</CardTitle>
                <CardDescription>您的工作經歷與專業技能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">目前任職公司</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position1">職位</Label>
                    <Input
                      id="position1"
                      value={profileData.position1}
                      onChange={(e) => handleInputChange("position1", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>專業技能</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                        {isEditing && (
                          <button className="ml-2 text-xs hover:text-red-600" onClick={() => removeSkill(skill)}>
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const skill = prompt("請輸入新技能:")
                          if (skill) addSkill(skill)
                        }}
                      >
                        + 新增技能
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>興趣領域</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                        {isEditing && (
                          <button className="ml-2 text-xs hover:text-red-600" onClick={() => removeInterest(interest)}>
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const interest = prompt("請輸入新興趣:")
                          if (interest) addInterest(interest)
                        }}
                      >
                        + 新增興趣
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>隱私設定</CardTitle>
                <CardDescription>控制您的個人資訊對其他校友的可見性</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>顯示電子郵件</Label>
                      <p className="text-sm text-gray-600">其他校友可以看到您的電子郵件地址</p>
                    </div>
                    <Switch
                      checked={profileData.privacy.showEmail}
                      onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>顯示電話號碼</Label>
                      <p className="text-sm text-gray-600">其他校友可以看到您的電話號碼</p>
                    </div>
                    <Switch
                      checked={profileData.privacy.showPhone}
                      onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>顯示公司資訊</Label>
                      <p className="text-sm text-gray-600">其他校友可以看到您的公司與職位</p>
                    </div>
                    <Switch
                      checked={profileData.privacy.showCompany}
                      onCheckedChange={(checked) => handlePrivacyChange("showCompany", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>顯示所在地</Label>
                      <p className="text-sm text-gray-600">其他校友可以看到您的所在地資訊</p>
                    </div>
                    <Switch
                      checked={profileData.privacy.showLocation}
                      onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">帳戶安全</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      更改密碼
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      雙重驗證設定
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      登入記錄
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
