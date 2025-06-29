"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Building,
  Trophy,
  Target,
  Briefcase
} from "lucide-react"

export default function LeaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* 浮動背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            🎓 明門的頭目
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            認識我們的 大家長 .....
          </p>
        </div>

        {/* 教授基本資訊卡片 */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-12">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              {/* 頭像區域 */}
              <div className="text-center">
                <Avatar className="w-48 h-48 mx-auto mb-6 ring-8 ring-purple-100 shadow-2xl">
                  <AvatarImage src="https://db.cm.nsysu.edu.tw/webpagePhoto/%E9%BB%83%E6%98%8E%E6%96%B0.jpg?0.81211100%201751134203" alt="黃明新教授" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-6xl">
                    黃
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">黃明新 教授</h2>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
                  企業管理學系
                </Badge>
              </div>

              {/* 基本資料 */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">專長領域</p>
                    <p className="text-gray-600">數位行銷、品牌管理、通路管理、顧客關係管理</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">研究室</p>
                    <p className="text-gray-600">管4109</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">分機</p>
                    <p className="text-gray-600">4661</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">電子郵件</p>
                    <p className="text-gray-600">minhsin@faculty.nsysu.edu.tw</p>
                  </div>
                </div>
              </div>

              {/* 學歷與經歷 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <GraduationCap className="h-6 w-6 mr-2 text-purple-600" />
                    學歷
                  </h3>
                  <p className="text-gray-700 bg-purple-50 p-4 rounded-xl">
                    2004年 博士<br />
                    美國俄亥俄州立大學
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-indigo-600" />
                    現職
                  </h3>
                  <p className="text-gray-700 bg-indigo-50 p-4 rounded-xl">
                    2017-08-01 ~ 迄今<br />
                    國立中山大學企業管理學系 教授
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 學術成就區域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
                近期重要著作
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-purple-400 pl-4">
                <Badge variant="outline" className="mb-2 border-purple-300 text-purple-700">2024</Badge>
                <p className="text-sm font-medium text-gray-800">Organizational Climate and Risk in AIGC</p>
                <p className="text-xs text-gray-600">Journal of Information Management (TSSCI)</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <Badge variant="outline" className="mb-2 border-green-300 text-green-700">2023</Badge>
                <p className="text-sm font-medium text-gray-800">The Behavioral Intention of Hospitals</p>
                <p className="text-xs text-gray-600">SUSTAINABILITY (SSCI)</p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-4">
                <Badge variant="outline" className="mb-2 border-blue-300 text-blue-700">2017</Badge>
                <p className="text-sm font-medium text-gray-800">How Can Online Customers Be More Loyal?</p>
                <p className="text-xs text-gray-600">Journal of Management and Business Research (TSSCI)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <Trophy className="h-6 w-6 mr-3 text-yellow-600" />
                榮譽與職務
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-yellow-600 mr-2" />
                  <Badge className="bg-yellow-500 text-white">2025</Badge>
                </div>
                <p className="text-sm font-medium text-gray-800">副院長</p>
                <p className="text-xs text-gray-600">國立中山大學管理學院</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Building className="h-5 w-5 text-purple-600 mr-2" />
                  <Badge className="bg-purple-500 text-white">2020-2023</Badge>
                </div>
                <p className="text-sm font-medium text-gray-800">系主任</p>
                <p className="text-xs text-gray-600">企業管理學系(含企研所、醫管所)</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  <Badge className="bg-green-500 text-white">持續</Badge>
                </div>
                <p className="text-sm font-medium text-gray-800">校研究績優教師</p>
                <p className="text-xs text-gray-600">多年獲獎 (2017-2020)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 學術服務與指導學生 */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <Target className="h-6 w-6 mr-3 text-indigo-600" />
                重要學術服務
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-indigo-400 pl-4">
                <Badge variant="outline" className="mb-2 border-indigo-300 text-indigo-700">2025~</Badge>
                <p className="text-sm font-medium text-gray-800">教育部「教學實踐研究計畫」副召集人</p>
                <p className="text-xs text-gray-600">商業及管理學門</p>
              </div>
              
              <div className="border-l-4 border-emerald-400 pl-4">
                <Badge variant="outline" className="mb-2 border-emerald-300 text-emerald-700">2023~</Badge>
                <p className="text-sm font-medium text-gray-800">上櫃審議委員會委員</p>
                <p className="text-xs text-gray-600">中華民國證劵櫃檯買賣中心</p>
              </div>
              
              <div className="border-l-4 border-pink-400 pl-4">
                <Badge variant="outline" className="mb-2 border-pink-300 text-pink-700">2021~</Badge>
                <p className="text-sm font-medium text-gray-800">SBIR、SBTR計畫審查委員</p>
                <p className="text-xs text-gray-600">經濟部，中小及新創企業署</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <Users className="h-6 w-6 mr-3 text-rose-600" />
                學生指導成果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-rose-500 text-white">2010</Badge>
                  <Users className="h-4 w-4 text-rose-600" />
                </div>
                <p className="text-sm font-medium text-gray-800">朱晴</p>
                <p className="text-xs text-gray-600">品牌經驗之跨文化研究</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-500 text-white">2010</Badge>
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-800">王煒樺</p>
                <p className="text-xs text-gray-600">精品之品牌經驗和零售經驗之研究</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500 text-white">2009</Badge>
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-800">余建輝</p>
                <p className="text-xs text-gray-600">人際溝通、銷售人員之專業知識研究</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 