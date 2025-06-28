"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  GraduationCap, 
  Users, 
  Calendar,
  Search,
  Filter,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Star,
  Award,
  Target,
  TrendingUp,
  Heart,
  MessageCircle,
  UserPlus,
  Building
} from "lucide-react"

// 模擬班級資料
const classesData = [
  {
    id: "emba2024",
    year: "2024",
    batch: "第15屆",
    name: "EMBA 2024級",
    description: "最新一屆的菁英學員，正在學習成長中",
    totalStudents: 45,
    activeStudents: 42,
    status: "current",
    startDate: "2024-09",
    endDate: "2026-06",
    classPhoto: "/placeholder.jpg",
    specialties: ["科技創新", "數位轉型", "永續經營"],
    achievements: ["創業專案優秀獎", "社會影響力專案"],
    location: "台北校區",
    students: [
      { id: 1, name: "張志明", title: "科技公司執行長", company: "創新科技", avatar: "/placeholder-user.jpg", specialty: "AI科技" },
      { id: 2, name: "林美麗", title: "投資總監", company: "國際投資", avatar: "/placeholder-user.jpg", specialty: "金融投資" },
      { id: 3, name: "王大明", title: "營運長", company: "製造企業", avatar: "/placeholder-user.jpg", specialty: "營運管理" },
    ]
  },
  {
    id: "emba2023",
    year: "2023",
    batch: "第14屆",
    name: "EMBA 2023級",
    description: "充滿活力的一屆，在各領域都有傑出表現",
    totalStudents: 48,
    activeStudents: 46,
    status: "active",
    startDate: "2023-09",
    endDate: "2025-06",
    classPhoto: "/placeholder.jpg",
    specialties: ["永續發展", "ESG投資", "綠色科技"],
    achievements: ["最佳團隊合作獎", "永續發展創新獎", "國際交流優秀獎"],
    location: "台北校區",
    students: [
      { id: 4, name: "陳建華", title: "總經理", company: "綠能科技", avatar: "/placeholder-user.jpg", specialty: "綠色能源" },
      { id: 5, name: "李淑芬", title: "財務長", company: "金融控股", avatar: "/placeholder-user.jpg", specialty: "企業財務" },
      { id: 6, name: "黃志偉", title: "創辦人", company: "新創公司", avatar: "/placeholder-user.jpg", specialty: "創業管理" },
    ]
  },
  {
    id: "emba2022",
    year: "2022",
    batch: "第13屆",
    name: "EMBA 2022級",
    description: "已畢業的優秀學長姐，在職場上發光發熱",
    totalStudents: 50,
    activeStudents: 48,
    status: "graduated",
    startDate: "2022-09",
    endDate: "2024-06",
    classPhoto: "/placeholder.jpg",
    specialties: ["數位行銷", "電商經營", "品牌管理"],
    achievements: ["畢業專案特優獎", "校友網絡建設獎", "國際合作優秀獎"],
    location: "台北校區",
    students: [
      { id: 7, name: "劉志強", title: "執行董事", company: "集團企業", avatar: "/placeholder-user.jpg", specialty: "策略管理" },
      { id: 8, name: "楊雅惠", title: "行銷總監", company: "品牌公司", avatar: "/placeholder-user.jpg", specialty: "品牌行銷" },
      { id: 9, name: "吳明輝", title: "技術長", company: "軟體公司", avatar: "/placeholder-user.jpg", specialty: "技術創新" },
    ]
  },
  {
    id: "emba2021",
    year: "2021",
    batch: "第12屆",
    name: "EMBA 2021級",
    description: "疫情期間堅持學習的堅強一屆",
    totalStudents: 44,
    activeStudents: 42,
    status: "graduated",
    startDate: "2021-09",
    endDate: "2023-06",
    classPhoto: "/placeholder.jpg",
    specialties: ["危機管理", "遠距協作", "韌性領導"],
    achievements: ["抗疫創新獎", "線上學習優秀獎", "社會責任獎"],
    location: "台北校區",
    students: [
      { id: 10, name: "鄭宏志", title: "區域總裁", company: "跨國企業", avatar: "/placeholder-user.jpg", specialty: "國際貿易" },
      { id: 11, name: "蔡佩君", title: "人資長", company: "科技公司", avatar: "/placeholder-user.jpg", specialty: "人力資源" },
      { id: 12, name: "許志明", title: "投資長", company: "創投基金", avatar: "/placeholder-user.jpg", specialty: "創業投資" },
    ]
  }
]

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClass, setSelectedClass] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filteredClasses, setFilteredClasses] = useState(classesData)

  useEffect(() => {
    let filtered = classesData

    // 搜尋過濾
    if (searchTerm) {
      filtered = filtered.filter(classData =>
        classData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classData.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classData.year.includes(searchTerm)
      )
    }

    // 狀態過濾
    if (filterStatus !== "all") {
      filtered = filtered.filter(classData => classData.status === filterStatus)
    }

    setFilteredClasses(filtered)
  }, [searchTerm, filterStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case "current": return "bg-blue-500"
      case "active": return "bg-green-500"
      case "graduated": return "bg-purple-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "current": return "目前學習中"
      case "active": return "即將畢業"
      case "graduated": return "已畢業"
      default: return "未知狀態"
    }
  }

  const openClassDetail = (classData) => {
    setSelectedClass(classData)
    setIsDialogOpen(true)
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
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  🎓 EMBA 班級
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20"></div>
              </div>
              
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                探索各屆 EMBA 班級，認識優秀的學長姐和同學們 ✨<br/>
                每一屆都有獨特的故事和傑出的成就 🏆
              </p>
            </div>

            {/* 搜尋和篩選 */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                  placeholder="🔍 搜尋班級、屆數或年份..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 h-14 text-lg rounded-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm shadow-lg focus:border-purple-400 focus:ring-purple-300"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48 h-14 pl-12 rounded-2xl border-2 border-purple-200 bg-white/90 backdrop-blur-sm shadow-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">📚 所有班級</SelectItem>
                      <SelectItem value="current">📖 學習中</SelectItem>
                      <SelectItem value="active">⏳ 即將畢業</SelectItem>
                      <SelectItem value="graduated">🎓 已畢業</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 班級列表 */}
        <div className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredClasses.length === 0 ? (
              <div className="text-center py-20">
                <GraduationCap className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-500 mb-4">找不到符合條件的班級</h3>
                <p className="text-gray-400">請嘗試調整搜尋條件或篩選選項</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredClasses.map((classData) => (
                  <Card 
                    key={classData.id}
                    className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden cursor-pointer"
                    onClick={() => openClassDetail(classData)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 班級照片 */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={classData.classPhoto} 
                        alt={classData.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* 狀態徽章 */}
                      <Badge className={`absolute top-4 right-4 ${getStatusColor(classData.status)} text-white px-4 py-2 text-sm font-bold`}>
                        {getStatusText(classData.status)}
                      </Badge>
                      
                      {/* 班級資訊覆蓋 */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold mb-1">{classData.name}</h3>
                        <p className="text-lg opacity-90">{classData.batch}</p>
                      </div>
                    </div>

                    <CardContent className="relative p-8">
                      <div className="mb-6">
                        <p className="text-gray-600 leading-relaxed mb-4">{classData.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {classData.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">{classData.totalStudents} 位學員</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">{classData.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">{classData.startDate} - {classData.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Heart className="h-5 w-5 text-purple-500" />
                          <span className="font-medium">{classData.activeStudents} 位活躍</span>
                        </div>
                      </div>

                      <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                        查看班級詳情
                        <GraduationCap className="h-5 w-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 班級詳情對話框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedClass && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedClass.name} 詳細資訊
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* 班級概覽 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={selectedClass.classPhoto} 
                      alt={selectedClass.name}
                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">班級資訊</h4>
                      <div className="space-y-2 text-gray-600">
                        <p><span className="font-medium">屆數：</span>{selectedClass.batch}</p>
                        <p><span className="font-medium">學期：</span>{selectedClass.startDate} - {selectedClass.endDate}</p>
                        <p><span className="font-medium">地點：</span>{selectedClass.location}</p>
                        <p><span className="font-medium">總學員：</span>{selectedClass.totalStudents} 位</p>
                        <p><span className="font-medium">活躍學員：</span>{selectedClass.activeStudents} 位</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">專業領域</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedClass.specialties.map((specialty, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-700 border-purple-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 班級成就 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    班級成就
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedClass.achievements.map((achievement, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-yellow-800 font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 代表學員 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    代表學員
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedClass.students.map((student) => (
                      <Card key={student.id} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-4">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xl font-bold">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">{student.name}</h5>
                          <p className="text-gray-600 mb-2">{student.title}</p>
                          <p className="text-gray-500 text-sm mb-3">{student.company}</p>
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            {student.specialty}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 行動按鈕 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    聯繫班級
                  </Button>
                  <Button className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl">
                    <UserPlus className="h-5 w-5 mr-2" />
                    加入聯繫網
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-bold rounded-xl">
                    <Calendar className="h-5 w-5 mr-2" />
                    查看活動
                  </Button>
                </div>
              </div>
            </>
          )}
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
      `}</style>
    </div>
  )
} 