import { supabase, isSupabaseConfigured } from "./supabase"
import type { Event, ForumPost, Paper } from "./supabase"

// 檢查 Supabase 是否已配置
function checkSupabaseConfig() {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not configured. Using mock data.")
    return false
  }
  return true
}

// 活動相關函數
export async function getEvents() {
  if (!checkSupabaseConfig()) {
    // 返回模擬資料
    return {
      data: [
        {
          id: "1",
          title: "2024年度校友聚會",
          description: "年度盛會即將舉行，歡迎所有校友踴躍參與",
          date: "2024-12-15",
          time: "18:00-22:00",
          location: "台北君悅酒店",
          max_attendees: 200,
          price: 1500,
          category: "聚會",
          status: "報名中",
          image_url: "/elegant-ballroom-event.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      error: null,
    }
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        event_registrations(count)
      `)
      .order("date", { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function createEvent(eventData: Omit<Event, "id" | "created_at" | "updated_at">) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.from("events").insert([eventData]).select().single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          user_id: userId,
          payment_status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 論壇相關函數
export async function getForumPosts() {
  if (!checkSupabaseConfig()) {
    // 返回模擬資料
    return {
      data: [
        {
          id: "1",
          title: "AI時代的商業轉型策略分享",
          content: "最近公司導入AI系統，想和大家分享一些實戰經驗...",
          category_id: "1",
          author_id: "1",
          tags: ["AI", "數位轉型"],
          is_hot: true,
          views: 234,
          likes: 45,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      error: null,
    }
  }

  try {
    const { data, error } = await supabase
      .from("forum_posts")
      .select(`
        *,
        users(name, avatar_url),
        forum_categories(name, color),
        forum_replies(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function createForumPost(
  postData: Omit<ForumPost, "id" | "views" | "likes" | "created_at" | "updated_at">,
) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.from("forum_posts").insert([postData]).select().single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 論文相關函數
export async function getPapers() {
  if (!checkSupabaseConfig()) {
    // 返回模擬資料
    return {
      data: [
        {
          id: "1",
          title: "數位轉型對中小企業營運效率之影響研究",
          abstract: "本研究探討數位轉型策略如何影響中小企業的營運效率...",
          category: "管理策略",
          keywords: ["數位轉型", "中小企業"],
          journal: "台灣管理學報",
          publish_date: "2024-10-15",
          pages: 45,
          is_open_access: true,
          allow_comments: true,
          status: "已發表",
          downloads: 234,
          views: 1567,
          likes: 89,
          rating: 4.8,
          created_by: "1",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      error: null,
    }
  }

  try {
    const { data, error } = await supabase
      .from("papers")
      .select(`
        *,
        paper_authors(name, affiliation, is_primary, order_index),
        users(name, avatar_url)
      `)
      .eq("status", "已發表")
      .order("created_at", { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function createPaper(
  paperData: Omit<Paper, "id" | "downloads" | "views" | "likes" | "rating" | "created_at" | "updated_at">,
) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase.from("papers").insert([paperData]).select().single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getUserPapers(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from("papers")
      .select(`
        *,
        paper_authors(name, affiliation, is_primary, order_index)
      `)
      .eq("created_by", userId)
      .order("created_at", { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 人脈相關函數
export async function searchAlumni(searchTerm = "", locationFilter = "", graduationYearFilter?: number) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase.rpc("search_alumni", {
      search_term: searchTerm,
      location_filter: locationFilter,
      graduation_year_filter: graduationYearFilter,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function createConnection(requesterId: string, addresseeId: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("connections")
      .insert([
        {
          requester_id: requesterId,
          addressee_id: addresseeId,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function updateConnectionStatus(connectionId: string, status: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("connections")
      .update({ status })
      .eq("id", connectionId)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getUserConnections(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from("connections")
      .select(`
        *,
        requester:users!connections_requester_id_fkey(id, name, avatar_url, company, position1),
        addressee:users!connections_addressee_id_fkey(id, name, avatar_url, company, position1)
      `)
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq("status", "accepted")

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 統計相關函數
export async function getUserStats(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: { papers_count: 0, events_attended: 0, forum_posts: 0, connections_count: 0 }, error: null }
  }

  try {
    const { data, error } = await supabase.rpc("get_user_stats", {
      user_uuid: userId,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getTrendingPapers(limit = 10) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase.rpc("get_trending_papers", {
      limit_count: limit,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// 通知相關函數
export async function getUserNotifications(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function markNotificationAsRead(notificationId: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
