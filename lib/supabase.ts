import { createClient } from "@supabase/supabase-js"

// 提供預設值以避免建置時錯誤
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tqksgjsikuzhhqravdre.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxa3NnanNpa3V6aGhxcmF2ZHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjA5NjYsImV4cCI6MjA2NjY5Njk2Nn0.lRKi7qOEMqRxX51hRZzRjwAbFfOoCZeqXCasUsFzUIo"

// 檢查是否為有效的 Supabase 配置
const isValidConfig =
  supabaseUrl && 
  supabaseAnonKey &&
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey.length > 0

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 導出配置狀態供其他組件使用
export const isSupabaseConfigured = isValidConfig

// 資料庫類型定義
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  phone?: string
  company?: string
  job_title?: string // 職位欄位
  graduation_year?: number
  location?: string
  website?: string
  bio?: string
  skills?: string[]
  interests?: string[]
  created_at: string
  updated_at: string
}

export interface UserPrivacy {
  id: string
  user_id: string
  show_email: boolean
  show_phone: boolean
  show_company: boolean
  show_location: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  max_attendees?: number
  price?: number
  category?: string
  status: string
  image_url?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  registration_date: string
  payment_status: string
}

export interface ForumCategory {
  id: string
  name: string
  description?: string
  color?: string
  created_at: string
}

export interface ForumPost {
  id: string
  title: string
  content: string
  category_id?: string
  author_id: string
  tags?: string[]
  is_hot: boolean
  views: number
  likes: number
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface Paper {
  id: string
  title: string
  abstract: string
  category?: string
  keywords?: string[]
  journal?: string
  publish_date?: string
  pages?: number
  file_url?: string
  is_open_access: boolean
  allow_comments: boolean
  status: string
  downloads: number
  views: number
  likes: number
  rating: number
  created_by: string
  created_at: string
  updated_at: string
}

export interface PaperAuthor {
  id: string
  paper_id: string
  user_id?: string
  name: string
  email?: string
  affiliation?: string
  is_primary: boolean
  order_index: number
}

export interface Connection {
  id: string
  requester_id: string
  addressee_id: string
  status: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message?: string
  data?: any
  is_read: boolean
  created_at: string
}
