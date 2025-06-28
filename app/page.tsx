import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, MessageSquare, FileText, Camera, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">連結校友，共創未來</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            EMBA 校友專屬平台，促進校友間的交流與合作，分享經驗與資源，建立持久的商業網絡。
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/register">立即加入</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/network">探索校友</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">平台功能</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 校友網絡 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>校友網絡</CardTitle>
                <CardDescription>建立和維護與同學、學長姐的聯繫</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/network">探索校友</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 活動管理 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>活動管理</CardTitle>
                <CardDescription>參與校友聚會、講座和各種活動</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/events">查看活動</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 論壇討論 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>論壇討論</CardTitle>
                <CardDescription>參與各種話題討論，分享見解</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/forum">進入論壇</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 論文分享 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>論文分享</CardTitle>
                <CardDescription>分享和瀏覽學術論文與研究成果</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/papers">瀏覽論文</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 照片分享 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-10 w-10 text-pink-600 mb-2" />
                <CardTitle>照片分享</CardTitle>
                <CardDescription>分享活動照片，記錄美好時光</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/photos">查看照片</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 班級頁面 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-indigo-600 mb-2" />
                <CardTitle>班級頁面</CardTitle>
                <CardDescription>各屆班級專屬頁面和資訊</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/classes">查看班級</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">註冊校友</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">活動舉辦</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">論壇討論</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-gray-600">論文分享</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
