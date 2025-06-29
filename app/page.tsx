"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, MessageSquare, FileText, Camera, GraduationCap, ArrowRight, Star, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 主標題 */}
          <div className="relative inline-block mb-8">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              中山大學EMBA 明門校友網
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20"></div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            🤝 連結校友，共創未來 ✨
          </h2>
          
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            中山大學明門校友專屬平台，促進校友間的交流與合作，分享經驗與資源，建立持久的商業網絡。
            💼 讓我們一起在這個充滿活力的社群中成長！ 🚀
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="h-16 px-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/register">
                <Star className="h-6 w-6 mr-3" />
                立即加入
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/network">
                <Users className="h-6 w-6 mr-3" />
                探索校友
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              平台功能
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              🌟 豐富的功能讓校友間的連結更加緊密
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {/* 校友網絡 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">校友網絡</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">建立和維護與同學、學長姐的聯繫，擴展你的專業人脈圈</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/network">
                    探索校友
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 活動管理 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">活動管理</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">參與校友聚會、講座和各種活動，豐富你的校友生活</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/events">
                    查看活動
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 論壇討論 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">論壇討論</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">參與各種話題討論，分享見解，激發思維碰撞</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/forum">
                    進入論壇
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 論文分享 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">論文分享</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">分享和瀏覽學術論文與研究成果，促進知識交流</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/papers">
                    瀏覽論文
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 照片分享 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">照片分享</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">分享活動照片，記錄美好時光，留下珍貴回憶</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/photos">
                    查看照片
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 班級頁面 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">班級頁面</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">各屆班級專屬頁面和資訊，重溫同窗情誼</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/classes">
                    查看班級
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 我們的頭目 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">我們的頭目</CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">認識我們的領導者，了解學術背景與專業成就</CardDescription>
              </CardHeader>
              <CardContent className="relative p-8 pt-0">
                <Button className="w-full h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/leader">
                    認識頭目
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-white mb-6">
              📊 平台數據
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              持續成長的校友社群，見證我們的影響力
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">2500+</div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
              <div className="text-xl text-white/90 font-semibold">串聯校友</div>
              <div className="text-white/70 mt-2">持續增長中</div>
            </div>
            
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">50+</div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse animation-delay-1000" />
              </div>
              <div className="text-xl text-white/90 font-semibold">活動舉辦</div>
              <div className="text-white/70 mt-2">精彩不斷</div>
            </div>
            
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">200+</div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse animation-delay-2000" />
              </div>
              <div className="text-xl text-white/90 font-semibold">論壇討論</div>
              <div className="text-white/70 mt-2">思維碰撞</div>
            </div>
            
            <div className="text-center group">
              <div className="relative inline-block">
                <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">100+</div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse animation-delay-3000" />
              </div>
              <div className="text-xl text-white/90 font-semibold">論文分享</div>
              <div className="text-white/70 mt-2">知識交流</div>
            </div>
          </div>
        </div>
      </section>

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
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  )
}
