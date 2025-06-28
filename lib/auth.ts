import { supabase, isSupabaseConfigured } from "./supabase"
import type { User } from "./supabase"

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar_url?: string
}

// 檢查 Supabase 是否已配置
function checkSupabaseConfig() {
  if (!isSupabaseConfigured) {
    console.warn(
      "Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )
    return false
  }
  return true
}

// 註冊新用戶
export async function signUp(email: string, password: string, userData: Partial<User>) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    // 1. 建立 Supabase Auth 用戶
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      // 2. 建立用戶資料
      const { error: userError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email,
          ...userData,
        },
      ])

      if (userError) throw userError
    }

    return { data: authData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 登入
export async function signIn(email: string, password: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 登出
export async function signOut() {
  if (!checkSupabaseConfig()) {
    return { error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

// 取得當前用戶
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!checkSupabaseConfig()) {
    return null
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // 取得用戶詳細資料
    const { data: userData, error } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (error) throw error

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      avatar_url: userData.avatar_url,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// 更新用戶資料
export async function updateUserProfile(userId: string, updates: Partial<User>) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Google OAuth 登入
export async function signInWithGoogle() {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 重設密碼
export async function resetPassword(email: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
