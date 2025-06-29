"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { getAllAlumni, createAlumni, updateAlumni, deleteAlumni } from "@/lib/database"
import { 
  Search, 
  Filter,
  MapPin, 
  Building, 
  Calendar,
  Users,
  MessageCircle,
  Mail,
  Phone,
  Briefcase,
  Star,
  Award,
  Target,
  TrendingUp,
  Heart,
  UserPlus,
  Eye,
  Send,
  Network,
  Globe,
  GraduationCap,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from "lucide-react"

// 校友資料類型定義
interface Alumni {
  id: string
  name: string
  title: string
  company: string
  location: string
  graduationYear: number
  batch: string
  email: string
  phone: string
  avatar: string
  bio: string
  specialties: string[]
  experience: string
  achievements: string[]
  interests: string[]
  languages: string[]
  connections: number
  isOnline: boolean
  status: string
}

// 模擬校友資料
const alumniData = [
  {
    id: "alumni1",
    name: "張志明",
    title: "科技公司執行長",
    company: "創新科技股份有限公司",
    location: "台北市",
    graduationYear: 2022,
    batch: "第13屆",
    email: "zhang@innovatech.com",
    phone: "+886 912-345-678",
    avatar: "/placeholder-user.jpg",
    bio: "專注於AI科技創新，擁有15年科技業經驗，致力於推動台灣數位轉型。熱愛分享創業經驗，積極參與校友活動。",
    specialties: ["AI科技", "創業管理", "數位轉型", "策略規劃"],
    experience: "15年",
    achievements: ["創新企業獎", "優秀校友獎", "科技領導獎"],
    interests: ["科技創新", "創業投資", "高爾夫", "攝影"],
    languages: ["中文", "英文", "日文"],
    connections: 156,
    isOnline: true,
    status: "active"
  },
  {
    id: "alumni2",
    name: "林美麗",
    title: "投資總監",
    company: "國際投資集團",
    location: "香港",
    graduationYear: 2021,
    batch: "第12屆",
    email: "lin@globalinvest.com",
    phone: "+852 9876-5432",
    avatar: "/placeholder-user.jpg",
    bio: "專精於跨國投資與併購，管理超過50億資產。曾任職於多家知名投資銀行，擁有豐富的國際金融經驗。",
    specialties: ["金融投資", "併購策略", "風險管理", "國際金融"],
    experience: "12年",
    achievements: ["最佳投資組合獎", "女性領導力獎", "國際金融專家"],
    interests: ["投資理財", "藝術收藏", "瑜伽", "旅行"],
    languages: ["中文", "英文", "法文"],
    connections: 203,
    isOnline: false,
    status: "active"
  },
  {
    id: "alumni3",
    name: "王大明",
    title: "營運長",
    company: "台灣製造企業",
    location: "台中市",
    graduationYear: 2023,
    batch: "第14屆",
    email: "wang@manufacturing.com",
    phone: "+886 987-654-321",
    avatar: "/placeholder-user.jpg",
    bio: "製造業營運專家，專注於精實生產與供應鏈優化。領導團隊成功提升企業效率300%，獲得多項營運卓越獎項。",
    specialties: ["營運管理", "供應鏈", "精實生產", "品質管理"],
    experience: "18年",
    achievements: ["營運卓越獎", "精實生產認證", "品質管理專家"],
    interests: ["營運優化", "馬拉松", "讀書", "登山"],
    languages: ["中文", "英文"],
    connections: 89,
    isOnline: true,
    status: "active"
  },
  {
    id: "alumni4",
    name: "陳建華",
    title: "總經理",
    company: "綠能科技公司",
    location: "新竹市",
    graduationYear: 2020,
    batch: "第11屆",
    email: "chen@greentech.com",
    phone: "+886 956-789-123",
    avatar: "/placeholder-user.jpg",
    bio: "綠色能源領域先驅，致力於推動永續發展。公司在他領導下成為台灣再生能源領導品牌，獲得多項環保獎項。",
    specialties: ["綠色能源", "永續發展", "環保科技", "專案管理"],
    experience: "20年",
    achievements: ["綠色企業獎", "永續發展獎", "環保科技獎"],
    interests: ["環保", "太陽能", "自行車", "環保料理"],
    languages: ["中文", "英文", "德文"],
    connections: 142,
    isOnline: false,
    status: "active"
  },
  {
    id: "alumni5",
    name: "李淑芬",
    title: "財務長",
    company: "金融控股公司",
    location: "台北市",
    graduationYear: 2024,
    batch: "第15屆",
    email: "li@financial.com",
    phone: "+886 923-456-789",
    avatar: "/placeholder-user.jpg",
    bio: "財務管理專家，擁有豐富的企業財務規劃經驗。專精於資本市場操作與風險控制，協助多家企業成功上市。",
    specialties: ["企業財務", "資本市場", "風險控制", "財務規劃"],
    experience: "10年",
    achievements: ["最佳CFO獎", "財務創新獎", "風險管理專家"],
    interests: ["財務分析", "股票投資", "音樂", "美食"],
    languages: ["中文", "英文"],
    connections: 98,
    isOnline: true,
    status: "active"
  },
  {
    id: "alumni6",
    name: "黃志偉",
    title: "創辦人",
    company: "新創科技公司",
    location: "台南市",
    graduationYear: 2021,
    batch: "第12屆",
    email: "huang@startup.com",
    phone: "+886 934-567-890",
    avatar: "/placeholder-user.jpg",
    bio: "連續創業家，成功創立三家科技公司。專注於SaaS產品開發，致力於為中小企業提供數位化解決方案。",
    specialties: ["創業管理", "產品開發", "SaaS", "團隊建設"],
    experience: "8年",
    achievements: ["創業家獎", "產品創新獎", "年度新創獎"],
    interests: ["創業", "產品設計", "電競", "咖啡"],
    languages: ["中文", "英文"],
    connections: 176,
    isOnline: true,
    status: "active"
  }
]

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [graduationYearFilter, setGraduationYearFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [messageContent, setMessageContent] = useState("")
  const [alumniData, setAlumniData] = useState<Alumni[]>([])
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([])
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [isLoading, setIsLoading] = useState(true)
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null)
  
  // 新增/編輯表單資料
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    job_title: "",
    company: "",
    location: "",
    graduation_year: "",
    phone: "",
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    avatar_url: ""
  })

  // 載入校友資料
  useEffect(() => {
    loadAlumniData()
  }, [])

  const loadAlumniData = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await getAllAlumni()
      if (error) {
        console.error("載入校友資料錯誤:", error)
        // 如果資料庫失敗，使用模擬資料  
        setAlumniData(alumniData)
        toast({
          title: "使用模擬資料",
          description: "無法連接資料庫，已載入模擬資料"
        })
      } else if (!data || data.length === 0) {
        // 如果資料庫返回空數據，使用模擬資料
        setAlumniData(alumniData)
        toast({
          title: "使用模擬資料", 
          description: "資料庫中無校友資料，已載入模擬資料"
        })
      } else {
        // 轉換資料格式以符合現有介面
        const formattedData = data.map((user: any) => ({
          id: user.id,
          name: user.name || "",
          title: user.job_title || "",
          company: user.company || "",
          location: user.location || "",
          graduationYear: user.graduation_year || 2024,
          batch: `第${user.graduation_year ? user.graduation_year - 2009 : 15}屆`,
          email: user.email || "",
          phone: user.phone || "",
          avatar: user.avatar_url || "/placeholder-user.jpg",
          bio: user.bio || "",
          specialties: user.skills || [],
          experience: "5年",
          achievements: ["優秀校友"],
          interests: user.interests || [],
          languages: ["中文", "英文"],
          connections: Math.floor(Math.random() * 200) + 50,
          isOnline: Math.random() > 0.5,
          status: "active"
        }))
        setAlumniData(formattedData)
        toast({
          title: "載入成功",
          description: `成功載入 ${formattedData.length} 位校友資料`
        })
      }
    } catch (error) {
      console.error("載入校友資料異常:", error)
      // 異常時使用模擬資料
      setAlumniData(alumniData)
      toast({
        title: "使用模擬資料",
        description: "載入過程發生錯誤，已載入模擬資料"
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    let filtered = alumniData

    // 搜尋過濾
    if (searchTerm) {
      filtered = filtered.filter((alumni: Alumni) =>
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.specialties.some((specialty: string) => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // 地點過濾
    if (locationFilter !== "all") {
      filtered = filtered.filter((alumni: Alumni) => alumni.location === locationFilter)
    }

    // 畢業年份過濾
    if (graduationYearFilter !== "all") {
      filtered = filtered.filter(alumni => 
        alumni.graduationYear.toString() === graduationYearFilter
      )
    }

    // 專業領域過濾
    if (specialtyFilter !== "all") {
      filtered = filtered.filter(alumni => 
        alumni.specialties.includes(specialtyFilter)
      )
    }

    setFilteredAlumni(filtered)
  }, [searchTerm, locationFilter, graduationYearFilter, specialtyFilter])

  const openProfile = (alumni: Alumni) => {
    setSelectedAlumni(alumni)
    setIsProfileDialogOpen(true)
  }

  const openMessage = (alumni: Alumni) => {
    setSelectedAlumni(alumni)
    setIsMessageDialogOpen(true)
    setMessageContent("")
  }

  // CRUD 功能函數
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      job_title: "",
      company: "",
      location: "",
      graduation_year: "",
      phone: "",
      bio: "",
      skills: [],
      interests: [],
      avatar_url: ""
    })
  }

  const openAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  const openEditDialog = (alumni: Alumni) => {
    setEditingAlumni(alumni)
    setFormData({
      name: alumni.name,
      email: alumni.email,
      job_title: alumni.title,
      company: alumni.company,
      location: alumni.location,
      graduation_year: alumni.graduationYear.toString(),
      phone: alumni.phone,
      bio: alumni.bio,
      skills: alumni.specialties,
      interests: alumni.interests,
      avatar_url: alumni.avatar
    })
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const alumniData = {
        ...formData,
        graduation_year: parseInt(formData.graduation_year) || new Date().getFullYear()
      }

      if (editingAlumni) {
        // 更新
        const { error } = await updateAlumni(editingAlumni.id, alumniData)
        if (error) throw error
        toast({
          title: "更新成功",
          description: "校友資料已更新"
        })
        setIsEditDialogOpen(false)
      } else {
        // 新增
        const { error } = await createAlumni(alumniData)
        if (error) throw error
        toast({
          title: "新增成功", 
          description: "校友資料已新增"
        })
        setIsAddDialogOpen(false)
      }
      
      await loadAlumniData()
      setEditingAlumni(null)
    } catch (error) {
      toast({
        title: "操作失敗",
        description: (error as Error).message || "操作失敗",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除這位校友嗎？")) return
    
    try {
      const { error } = await deleteAlumni(id)
      if (error) throw error
      
      toast({
        title: "刪除成功",
        description: "校友資料已刪除"
      })
      await loadAlumniData()
    } catch (error) {
      toast({
        title: "刪除失敗",
        description: (error as Error).message || "刪除失敗",
        variant: "destructive"
      })
    }
  }

  const sendMessage = () => {
    // 模擬發送訊息
    console.log(`發送訊息給 ${selectedAlumni?.name}: ${messageContent}`)
    setIsMessageDialogOpen(false)
    setMessageContent("")
    // 這裡可以添加實際的訊息發送邏輯
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <div className="flex-1"></div>
                <div className="text-center">
                  <div className="relative inline-block">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                      🌐 校友網絡
                    </h1>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20"></div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button 
                    onClick={openAddDialog}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    新增校友
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                  探索並連結全球 中山大學EMBA 校友網絡 🌟<br/>
                  建立有意義的專業聯繫，共同成長 🚀
                </p>
              </div>
            </div>

            {/* 統計資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{alumniData.length}</div>
                  <div className="text-gray-600">位校友</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">8</div>
                  <div className="text-gray-600">個城市</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">50+</div>
                  <div className="text-gray-600">家企業</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Network className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">1000+</div>
                  <div className="text-gray-600">個連結</div>
                </CardContent>
              </Card>
            </div>

            {/* 搜尋和篩選 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-12">
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    placeholder="🔍 搜尋校友姓名、公司、職位或專業領域..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-16 h-14 text-lg rounded-2xl border-2 border-purple-200 bg-white shadow-sm focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="h-12 pl-12 rounded-xl border-2 border-purple-200 bg-white shadow-sm">
                      <SelectValue placeholder="📍 選擇地點" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🌏 所有地點</SelectItem>
                      <SelectItem value="台北市">🏙️ 台北市</SelectItem>
                      <SelectItem value="台中市">🏢 台中市</SelectItem>
                      <SelectItem value="高雄市">🌃 高雄市</SelectItem>
                      <SelectItem value="新竹市">🏭 新竹市</SelectItem>
                      <SelectItem value="台南市">🏛️ 台南市</SelectItem>
                      <SelectItem value="香港">🇭🇰 香港</SelectItem>
                      <SelectItem value="新加坡">🇸🇬 新加坡</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <Select value={graduationYearFilter} onValueChange={setGraduationYearFilter}>
                    <SelectTrigger className="h-12 pl-12 rounded-xl border-2 border-purple-200 bg-white shadow-sm">
                      <SelectValue placeholder="🎓 畢業年份" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">📅 所有年份</SelectItem>
                      <SelectItem value="2024">2024年</SelectItem>
                      <SelectItem value="2023">2023年</SelectItem>
                      <SelectItem value="2022">2022年</SelectItem>
                      <SelectItem value="2021">2021年</SelectItem>
                      <SelectItem value="2020">2020年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger className="h-12 pl-12 rounded-xl border-2 border-purple-200 bg-white shadow-sm">
                      <SelectValue placeholder="💼 專業領域" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🎯 所有領域</SelectItem>
                      <SelectItem value="AI科技">🤖 AI科技</SelectItem>
                      <SelectItem value="金融投資">💰 金融投資</SelectItem>
                      <SelectItem value="營運管理">⚙️ 營運管理</SelectItem>
                      <SelectItem value="創業管理">🚀 創業管理</SelectItem>
                      <SelectItem value="綠色能源">🌱 綠色能源</SelectItem>
                      <SelectItem value="企業財務">📊 企業財務</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-gray-700">
                  找到 <span className="text-purple-600 font-bold">{filteredAlumni.length}</span> 位校友
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("")
                    setLocationFilter("all")
                    setGraduationYearFilter("all")
                    setSpecialtyFilter("all")
                  }}
                  className="h-10 px-6 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  🔄 清除篩選
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 校友列表 */}
        <div className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredAlumni.length === 0 ? (
              <div className="text-center py-20">
                <Users className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-500 mb-4">找不到符合條件的校友</h3>
                <p className="text-gray-400">請嘗試調整搜尋條件或篩選選項</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAlumni.map((alumni) => (
                  <Card 
                    key={alumni.id}
                    className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardContent className="relative p-8">
                      {/* 頂部狀態和連結數 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          {alumni.isOnline ? (
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          ) : (
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          )}
                          <span className="text-sm text-gray-500">
                            {alumni.isOnline ? "在線" : "離線"}
                          </span>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                          {alumni.connections} 個連結
                        </Badge>
                      </div>

                      {/* 頭像和基本資訊 */}
                      <div className="text-center mb-6">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
                          <AvatarImage src={alumni.avatar} alt={alumni.name} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-2xl font-bold">
                            {alumni.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{alumni.name}</h3>
                        <p className="text-lg text-gray-600 mb-1">{alumni.title}</p>
                        <p className="text-purple-600 font-medium mb-2">{alumni.company}</p>
                        
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alumni.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            {alumni.batch}
                          </div>
                        </div>
                      </div>

                      {/* 專業領域標籤 */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {alumni.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-blue-50 border-blue-200 text-blue-700 text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                          {alumni.specialties.length > 3 && (
                            <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600 text-xs">
                              +{alumni.specialties.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* 簡介 */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {alumni.bio}
                      </p>

                      {/* 行動按鈕 */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => openProfile(alumni)}
                            className="flex-1 h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            查看檔案
                          </Button>
                          <Button 
                            onClick={() => openMessage(alumni)}
                            variant="outline"
                            className="flex-1 h-11 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-bold rounded-xl"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            發送訊息
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => openEditDialog(alumni)}
                            variant="outline"
                            className="flex-1 h-10 border-2 border-green-200 text-green-600 hover:bg-green-50 font-medium rounded-xl"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            編輯
                          </Button>
                          <Button 
                            onClick={() => handleDelete(alumni.id)}
                            variant="outline"
                            className="flex-1 h-10 border-2 border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-xl"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            刪除
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 校友檔案詳情對話框 */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedAlumni.name} 的檔案
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* 基本資訊區域 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-center lg:col-span-1">
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white shadow-xl">
                      <AvatarImage src={selectedAlumni.avatar} alt={selectedAlumni.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-3xl font-bold">
                        {selectedAlumni.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedAlumni.name}</h3>
                    <p className="text-lg text-gray-600 mb-2">{selectedAlumni.title}</p>
                    <p className="text-purple-600 font-medium mb-4">{selectedAlumni.company}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {selectedAlumni.location}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        {selectedAlumni.email}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        {selectedAlumni.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 space-y-6">
                    {/* 個人簡介 */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        個人簡介
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{selectedAlumni.bio}</p>
                    </div>
                    
                    {/* 專業資訊 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">專業經驗</h5>
                        <p className="text-gray-600">{selectedAlumni.experience}</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">畢業年份</h5>
                        <p className="text-gray-600">{selectedAlumni.graduationYear} ({selectedAlumni.batch})</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">網絡連結</h5>
                        <p className="text-gray-600">{selectedAlumni.connections} 個連結</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">語言能力</h5>
                        <p className="text-gray-600">{selectedAlumni.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 專業領域 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    專業領域
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedAlumni.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* 主要成就 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    主要成就
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAlumni.achievements.map((achievement, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-yellow-800 font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 興趣愛好 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    興趣愛好
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedAlumni.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-pink-50 border-pink-200 text-pink-700 px-4 py-2">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* 行動按鈕 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button 
                    onClick={() => openMessage(selectedAlumni)}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    發送訊息
                  </Button>
                  <Button className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl">
                    <UserPlus className="h-5 w-5 mr-2" />
                    建立連結
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-bold rounded-xl">
                    <Mail className="h-5 w-5 mr-2" />
                    發送郵件
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 發送訊息對話框 */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  發送訊息給 {selectedAlumni.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedAlumni.avatar} alt={selectedAlumni.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-bold">
                      {selectedAlumni.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-800">{selectedAlumni.name}</p>
                    <p className="text-sm text-gray-600">{selectedAlumni.title}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    訊息內容
                  </label>
                  <Textarea
                    placeholder="輸入您想發送的訊息..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={6}
                    className="rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={sendMessage}
                    disabled={!messageContent.trim()}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl disabled:opacity-50"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    發送訊息
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsMessageDialogOpen(false)}
                    className="h-12 px-6 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 新增校友對話框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              新增校友
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 基本資訊 */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-b pb-2">基本資訊</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="請輸入姓名"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="請輸入 Email"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">職位</label>
                  <Input
                    value={formData.job_title}
                    onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    placeholder="請輸入職位"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公司</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="請輸入公司名稱"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">地點</label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200">
                      <SelectValue placeholder="選擇地點" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="台北市">台北市</SelectItem>
                      <SelectItem value="台中市">台中市</SelectItem>
                      <SelectItem value="高雄市">高雄市</SelectItem>
                      <SelectItem value="新竹市">新竹市</SelectItem>
                      <SelectItem value="台南市">台南市</SelectItem>
                      <SelectItem value="香港">香港</SelectItem>
                      <SelectItem value="新加坡">新加坡</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">畢業年份</label>
                  <Input
                    type="number"
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({...formData, graduation_year: e.target.value})}
                    placeholder="請輸入畢業年份"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    min="2000"
                    max={new Date().getFullYear() + 5}
                  />
                </div>
              </div>
              
              {/* 詳細資訊 */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-b pb-2">詳細資訊</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">手機</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="請輸入手機號碼"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">個人簡介</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="請輸入個人簡介"
                    rows={4}
                    className="rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">專業技能（用逗號分隔）</label>
                  <Input
                    value={formData.skills.join(", ")}
                    onChange={(e) => setFormData({...formData, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                    placeholder="例如：AI科技, 金融投資, 營運管理"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">興趣愛好（用逗號分隔）</label>
                  <Input
                    value={formData.interests.join(", ")}
                    onChange={(e) => setFormData({...formData, interests: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                    placeholder="例如：高爾夫, 投資, 旅遊"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">頭像網址</label>
                  <Input
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                    placeholder="請輸入頭像圖片網址"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-6 border-t">
              <Button 
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl"
              >
                <Save className="h-5 w-5 mr-2" />
                新增校友
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                className="h-12 px-8 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
              >
                <X className="h-5 w-5 mr-2" />
                取消
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 編輯校友對話框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              編輯校友資料
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 基本資訊 */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-b pb-2">基本資訊</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="請輸入姓名"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="請輸入 Email"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">職位</label>
                  <Input
                    value={formData.job_title}
                    onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    placeholder="請輸入職位"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公司</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="請輸入公司名稱"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">地點</label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200">
                      <SelectValue placeholder="選擇地點" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="台北市">台北市</SelectItem>
                      <SelectItem value="台中市">台中市</SelectItem>
                      <SelectItem value="高雄市">高雄市</SelectItem>
                      <SelectItem value="新竹市">新竹市</SelectItem>
                      <SelectItem value="台南市">台南市</SelectItem>
                      <SelectItem value="香港">香港</SelectItem>
                      <SelectItem value="新加坡">新加坡</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">畢業年份</label>
                  <Input
                    type="number"
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({...formData, graduation_year: e.target.value})}
                    placeholder="請輸入畢業年份"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                    min="2000"
                    max={new Date().getFullYear() + 5}
                  />
                </div>
              </div>
              
              {/* 詳細資訊 */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-b pb-2">詳細資訊</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">手機</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="請輸入手機號碼"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">個人簡介</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="請輸入個人簡介"
                    rows={4}
                    className="rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">專業技能（用逗號分隔）</label>
                  <Input
                    value={formData.skills.join(", ")}
                    onChange={(e) => setFormData({...formData, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                    placeholder="例如：AI科技, 金融投資, 營運管理"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">興趣愛好（用逗號分隔）</label>
                  <Input
                    value={formData.interests.join(", ")}
                    onChange={(e) => setFormData({...formData, interests: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                    placeholder="例如：高爾夫, 投資, 旅遊"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">頭像網址</label>
                  <Input
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                    placeholder="請輸入頭像圖片網址"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-6 border-t">
              <Button 
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl"
              >
                <Save className="h-5 w-5 mr-2" />
                儲存修改
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="h-12 px-8 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
              >
                <X className="h-5 w-5 mr-2" />
                取消
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  )
} 