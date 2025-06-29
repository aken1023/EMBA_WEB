import { supabase, isSupabaseConfigured } from "./supabase"
import type { Event, ForumPost, Paper } from "./supabase"

// 檢查 Supabase 是否已配置
function checkSupabaseConfig() {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not configured.")
    return false
  }
  return true
}

// 用戶相關函數
export async function getUsers() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data: users, error: null }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { data: [], error }
  }
}

export async function createUser(userData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating user:", error)
    return { data: null, error }
  }
}

export async function updateUser(id: string, userData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating user:", error)
    return { data: null, error }
  }
}

export async function deleteUser(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { data: null, error }
  }
}

// 活動相關函數
export async function getEvents() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data: events, error } = await supabase
      .from("events")
      .select(`
        *,
        event_registrations(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    // 處理報名人數統計
    const eventsWithCount = events?.map(event => ({
      ...event,
      event_registrations: [{ count: event.event_registrations?.length || 0 }]
    })) || []

    return { data: eventsWithCount, error: null }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { data: [], error }
  }
}

export async function createEvent(eventData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .insert([eventData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating event:", error)
    return { data: null, error }
  }
}

export async function updateEvent(id: string, eventData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .update(eventData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating event:", error)
    return { data: null, error }
  }
}

export async function deleteEvent(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { data: null, error }
  }
}

// 論壇相關函數
export async function getForumPosts() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data: posts, error } = await supabase
      .from("forum_posts")
      .select(`
        *,
        users!forum_posts_author_id_fkey(id, name, avatar_url),
        forum_categories(id, name, color),
        forum_replies(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    // 處理回覆數統計
    const postsWithReplies = posts?.map(post => ({
      ...post,
      replies_count: post.forum_replies?.length || 0,
      forum_replies: undefined // 移除 count 陣列
    })) || []

    return { data: postsWithReplies, error: null }
  } catch (error) {
    console.error("Error fetching forum posts:", error)
    return { data: [], error }
  }
}

export async function getForumCategories() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data: categories, error } = await supabase
      .from("forum_categories")
      .select("*")
      .order("name", { ascending: true })

    if (error) throw error
    return { data: categories, error: null }
  } catch (error) {
    console.error("Error fetching forum categories:", error)
    return { data: [], error }
  }
}

export async function createForumPost(postData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("forum_posts")
      .insert([postData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating forum post:", error)
    return { data: null, error }
  }
}

export async function updateForumPost(id: string, postData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("forum_posts")
      .update(postData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating forum post:", error)
    return { data: null, error }
  }
}

export async function deleteForumPost(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("forum_posts")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting forum post:", error)
    return { data: null, error }
  }
}

// 論文相關函數
export async function getPapers() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data: papers, error } = await supabase
      .from("papers")
      .select(`
        *,
        paper_authors(
          users(id, name, email)
        )
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    // 處理作者資料
    const papersWithAuthors = papers?.map(paper => ({
      ...paper,
      authors: paper.paper_authors?.map((pa: any) => pa.users) || []
    })) || []

    return { data: papersWithAuthors, error: null }
  } catch (error) {
    console.error("Error fetching papers:", error)
    return { data: [], error }
  }
}

export async function createPaper(paperData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("papers")
      .insert([paperData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating paper:", error)
    return { data: null, error }
  }
}

export async function updatePaper(id: string, paperData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("papers")
      .update(paperData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating paper:", error)
    return { data: null, error }
  }
}

export async function deletePaper(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("papers")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting paper:", error)
    return { data: null, error }
  }
}

// 搜尋校友函數
export async function searchAlumni(query: string = '', filters: any = {}) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    let supabaseQuery = supabase
      .from("users")
      .select("*")

    // 加入搜尋條件
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,company.ilike.%${query}%,job_title.ilike.%${query}%`)
    }

    // 加入篩選條件
    if (filters.location) {
      supabaseQuery = supabaseQuery.eq("location", filters.location)
    }

    if (filters.graduation_year) {
      supabaseQuery = supabaseQuery.eq("graduation_year", filters.graduation_year)
    }

    if (filters.skills && filters.skills.length > 0) {
      supabaseQuery = supabaseQuery.overlaps("skills", filters.skills)
    }

    const { data, error } = await supabaseQuery
      .order("name", { ascending: true })
      .limit(50)

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error("Error searching alumni:", error)
    return { data: [], error }
  }
}

// 相簿相關函數
export async function getAlbums() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("albums")
      .select(`
        *,
        events(title, date, location),
        media(count)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: [], error }
  }
}

export async function createAlbum(albumData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("albums")
      .insert([albumData])
      .select(`
        *,
        events(title, date, location),
        media(count)
      `)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating album:", error)
    return { data: null, error }
  }
}

export async function updateAlbum(id: string, albumData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("albums")
      .update(albumData)
      .eq("id", id)
      .select(`
        *,
        events(title, date, location),
        media(count)
      `)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating album:", error)
    return { data: null, error }
  }
}

export async function deleteAlbum(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("albums")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting album:", error)
    return { data: null, error }
  }
}

export async function getAlbumById(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("albums")
      .select(`
        *,
        events(title, date, location),
        photos(id, url, caption, uploaded_by, created_at)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching album:", error)
    return { data: null, error }
  }
}

// 媒體相關函數（照片、影片等）
export async function getMedia(albumId?: string, mediaType?: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    let query = supabase
      .from("media")
      .select(`
        *,
        albums(title),
        users!media_uploaded_by_fkey(name, avatar_url)
      `)
      .order("created_at", { ascending: false })

    if (albumId) {
      query = query.eq("album_id", albumId)
    }

    if (mediaType) {
      query = query.eq("media_type", mediaType)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching media:", error)
    return { data: [], error }
  }
}

// 為了向後兼容，保留getPhotos函數
export async function getPhotos(albumId?: string) {
  return getMedia(albumId, 'image')
}

// 新增getVideos函數
export async function getVideos(albumId?: string) {
  return getMedia(albumId, 'video')
}

export async function createMedia(mediaData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    // 確保有預設的媒體類型
    if (!mediaData.media_type) {
      mediaData.media_type = 'image'
    }

    const { data, error } = await supabase
      .from("media")
      .insert([mediaData])
      .select(`
        *,
        albums(title),
        users!media_uploaded_by_fkey(name, avatar_url)
      `)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating media:", error)
    return { data: null, error }
  }
}

// 為了向後兼容，保留createPhoto函數
export async function createPhoto(photoData: any) {
  return createMedia({ ...photoData, media_type: 'image' })
}

// 新增createVideo函數
export async function createVideo(videoData: any) {
  return createMedia({ ...videoData, media_type: 'video' })
}

export async function updateMedia(id: string, mediaData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("media")
      .update(mediaData)
      .eq("id", id)
      .select(`
        *,
        albums(title),
        users!media_uploaded_by_fkey(name, avatar_url)
      `)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating media:", error)
    return { data: null, error }
  }
}

// 為了向後兼容，保留updatePhoto函數
export async function updatePhoto(id: string, photoData: any) {
  return updateMedia(id, photoData)
}

export async function deleteMedia(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("media")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting media:", error)
    return { data: null, error }
  }
}

// 為了向後兼容，保留deletePhoto函數
export async function deletePhoto(id: string) {
  return deleteMedia(id)
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

export async function getUserPapers(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
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
    return { data: [], error }
  }
}

// 人脈相關函數
export async function getConnections(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("connections")
      .select(`
        *,
        requester:users!requester_id(id, name, avatar_url, company, job_title),
        addressee:users!addressee_id(id, name, avatar_url, company, job_title)
      `)
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq("status", "accepted")

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: [], error }
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
      .update({ status, updated_at: new Date().toISOString() })
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
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("connections")
      .select(`
        *,
        requester:users!requester_id(id, name, avatar_url, company, job_title),
        addressee:users!addressee_id(id, name, avatar_url, company, job_title)
      `)
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: [], error }
  }
}

export async function getUserStats(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const [papersResult, connectionsResult, eventsResult, postsResult] = await Promise.all([
      supabase.from("papers").select("id", { count: "exact" }).eq("created_by", userId),
      supabase
        .from("connections")
        .select("id", { count: "exact" })
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq("status", "accepted"),
      supabase.from("event_registrations").select("id", { count: "exact" }).eq("user_id", userId),
      supabase.from("forum_posts").select("id", { count: "exact" }).eq("author_id", userId),
    ])

    return {
      data: {
        papers_count: papersResult.count || 0,
        connections_count: connectionsResult.count || 0,
        events_attended: eventsResult.count || 0,
        forum_posts: postsResult.count || 0,
      },
      error: null,
    }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getTrendingPapers(limit = 10) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("papers")
      .select(`
        *,
        paper_authors(name, affiliation, is_primary),
        users(name, avatar_url)
      `)
      .eq("status", "已發表")
      .order("views", { ascending: false })
      .limit(limit)

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: [], error }
  }
}

export async function getUserNotifications(userId: string) {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
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
    return { data: [], error }
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

// 校友管理 CRUD 函數
export async function getAllAlumni() {
  if (!checkSupabaseConfig()) {
    return { data: [], error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("name", { ascending: true })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error("Error fetching alumni:", error)
    return { data: [], error }
  }
}

export async function getAlumniById(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching alumni:", error)
    return { data: null, error }
  }
}

export async function createAlumni(alumniData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{
        ...alumniData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating alumni:", error)
    return { data: null, error }
  }
}

export async function updateAlumni(id: string, alumniData: any) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...alumniData,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating alumni:", error)
    return { data: null, error }
  }
}

export async function deleteAlumni(id: string) {
  if (!checkSupabaseConfig()) {
    return { data: null, error: new Error("Supabase not configured") }
  }

  try {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) throw error
    return { data: null, error: null }
  } catch (error) {
    console.error("Error deleting alumni:", error)
    return { data: null, error }
  }
}
