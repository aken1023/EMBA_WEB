"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { signIn, signInWithGoogle } from "@/lib/auth"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!isSupabaseConfigured) {
      setError("資料庫未配置，請聯繫管理員設定 Supabase")
      setLoading(false)
      return
    }

    const { data, error: authError } = await signIn(email, password)

    if (authError) {
      setError("登入失敗，請檢查您的電子郵件和密碼")
      console.error("Login error:", authError)
    } else {
      router.push("/")
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setError("")

    if (!isSupabaseConfigured) {
      setError("資料庫未配置，無法使用 Google 登入")
      return
    }

    const { error: authError } = await signInWithGoogle()
    if (authError) {
      setError("Google 登入失敗，請稍後再試")
      console.error("Google login error:", authError)
    }
  }

  const handleDemoLogin = () => {
    // 模擬登入成功（僅在未配置 Supabase 時使用）
    setError("")
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">歡迎回來</CardTitle>
          <CardDescription>登入您的 中山大學EMBA 校友帳戶</CardDescription>
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
            <div className="space-y-2">
              <Label htmlFor="email">電子郵件</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入您的密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                忘記密碼？
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || (!isSupabaseConfigured && (!email || !password))}
            >
              {loading ? "登入中..." : "登入"}
            </Button>
          </form>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleLogin}
              disabled={!isSupabaseConfigured}
            >
              使用 Google 登入
              {!isSupabaseConfigured && <span className="ml-2 text-xs">(需要配置)</span>}
            </Button>
            <Button variant="outline" className="w-full bg-transparent" disabled={!isSupabaseConfigured}>
              使用 LINE 登入
              {!isSupabaseConfigured && <span className="ml-2 text-xs">(需要配置)</span>}
            </Button>
          </div>

          {/* Demo Mode Button */}
          {!isSupabaseConfigured && (
            <>
              <Separator />
              <Button variant="secondary" className="w-full" onClick={handleDemoLogin} disabled={loading}>
                {loading ? "載入中..." : "展示模式登入"}
              </Button>
              <p className="text-xs text-center text-gray-500">展示模式僅供預覽，不會儲存真實資料</p>
            </>
          )}

          <div className="text-center text-sm">
            還沒有帳戶？{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              立即註冊
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
