"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { getCurrentUser, type AuthUser } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  isDemo: false,
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      setIsDemo(true)
      return
    }

    // 取得初始用戶狀態
    getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    })

    // 監聽認證狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setIsDemo(false)
  }

  return <AuthContext.Provider value={{ user, loading, signOut, isDemo }}>{children}</AuthContext.Provider>
}
