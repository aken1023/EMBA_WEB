"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Auth callback error:", error)
        router.push("/login?error=auth_callback_error")
        return
      }

      if (data.session) {
        // 檢查用戶是否已存在於 users 表中
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("id", data.session.user.id)
          .single()

        if (userError && userError.code === "PGRST116") {
          // 用戶不存在，建立新用戶記錄
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: data.session.user.id,
              email: data.session.user.email!,
              name: data.session.user.user_metadata.full_name || data.session.user.email!.split("@")[0],
              avatar_url: data.session.user.user_metadata.avatar_url,
            },
          ])

          if (insertError) {
            console.error("Error creating user:", insertError)
          }
        }

        router.push("/")
      } else {
        router.push("/login")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>正在處理登入...</p>
      </div>
    </div>
  )
}
