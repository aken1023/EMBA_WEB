"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Lock, Building, Calendar, AlertCircle } from "lucide-react"
import { signUp, signInWithGoogle } from "@/lib/auth"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    graduationYear: "",
    company: "",
    position: "",
    agreeTerms: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isSupabaseConfigured) {
      setError("資料庫未配置，請聯繫管理員設定 Supabase")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("密碼不一致")
      return
    }

    setLoading(true)

    const { data, error: authError } = await signUp(formData.email, formData.password, {
      name: formData.name,
      company: formData.company,
      position: formData.position,
      graduation_year: Number.parseInt(formData.graduationYear),
    })

    if (authError) {
      setError("註冊失敗，請檢查您的資料或稍後再試")
      console.error("Registration error:", authError)
    } else {
      router.push("/login?message=registration_success")
    }

    setLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setError("")

    if (!isSupabaseConfigured) {
      setError("資料庫未配置，無法使用 Google 註冊")
      return
    }

    const { error: authError } = await signInWithGoogle()
    if (authError) {
      setError("Google 註冊失敗，請稍後再試")
      console.error("Google signup error:", authError)
    }
  }

  const handleDemoSignUp = () => {
    // 模擬註冊成功（僅在未配置 Supabase 時使用）
    setError("")
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.push("/login?message=demo_registration_success")
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">加入校友網</CardTitle>
          <CardDescription>建立您的 中山大學EMBA 校友帳戶，開始連結全球人脈</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Database Configuration Notice */}
          {!isSupabaseConfigured && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>目前使用展示模式。要啟用完整功能，請配置 Supabase 資料庫。</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名 *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="請輸入您的姓名"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">電子郵件 *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="請輸入電子郵件"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">密碼 *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="至少8個字元"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">確認密碼 *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="再次輸入密碼"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduationYear">畢業年份 *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select onValueChange={(value) => handleInputChange("graduationYear", value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="請選擇畢業年份" />
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">目前任職公司</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    placeholder="公司名稱"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">職位</Label>
                <Input
                  id="position"
                  placeholder="您的職位"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                我同意{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  使用條款
                </Link>{" "}
                和{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  隱私政策
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!formData.agreeTerms || loading || !isSupabaseConfigured}
            >
              {loading ? "建立中..." : "建立帳戶"}
            </Button>
          </form>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleSignUp}
              disabled={!isSupabaseConfigured}
            >
              使用 Google 註冊
              {!isSupabaseConfigured && <span className="ml-2 text-xs">(需要配置)</span>}
            </Button>
            <Button variant="outline" className="w-full bg-transparent" disabled={!isSupabaseConfigured}>
              使用 LINE 註冊
              {!isSupabaseConfigured && <span className="ml-2 text-xs">(需要配置)</span>}
            </Button>
          </div>

          {/* Demo Mode Button */}
          {!isSupabaseConfigured && (
            <>
              <Separator />
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleDemoSignUp}
                disabled={loading || !formData.agreeTerms}
              >
                {loading ? "載入中..." : "展示模式註冊"}
              </Button>
              <p className="text-xs text-center text-gray-500">展示模式僅供預覽，不會儲存真實資料</p>
            </>
          )}

          <div className="text-center text-sm">
            已經有帳戶了？{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              立即登入
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
