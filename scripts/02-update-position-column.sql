-- 用戶表已使用正確的 position 欄位名稱

-- 建立搜尋校友的函數
CREATE OR REPLACE FUNCTION search_alumni(
  search_term TEXT DEFAULT '',
  location_filter TEXT DEFAULT '',
  graduation_year_filter INTEGER DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  company VARCHAR,
  job_title VARCHAR,
  location VARCHAR,
  graduation_year INTEGER,
  skills TEXT[],
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.name,
    u.email,
    u.company,
    u.job_title,
    u.location,
    u.graduation_year,
    u.skills,
    u.avatar_url
  FROM users u
  WHERE 
    (search_term = '' OR 
     u.name ILIKE '%' || search_term || '%' OR
     u.company ILIKE '%' || search_term || '%' OR
     u.job_title ILIKE '%' || search_term || '%')
    AND (location_filter = '' OR u.location ILIKE '%' || location_filter || '%')
    AND (graduation_year_filter IS NULL OR u.graduation_year = graduation_year_filter)
  ORDER BY u.name;
END;
$$ LANGUAGE plpgsql;

-- 建立取得用戶統計的函數
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  papers_count BIGINT,
  events_attended BIGINT,
  forum_posts BIGINT,
  connections_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM papers WHERE created_by = user_uuid) as papers_count,
    (SELECT COUNT(*) FROM event_registrations WHERE user_id = user_uuid) as events_attended,
    (SELECT COUNT(*) FROM forum_posts WHERE author_id = user_uuid) as forum_posts,
    (SELECT COUNT(*) FROM connections WHERE (requester_id = user_uuid OR addressee_id = user_uuid) AND status = 'accepted') as connections_count;
END;
$$ LANGUAGE plpgsql;

-- 建立取得熱門論文的函數
CREATE OR REPLACE FUNCTION get_trending_papers(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  abstract TEXT,
  category VARCHAR,
  views INTEGER,
  likes INTEGER,
  downloads INTEGER,
  rating DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.abstract,
    p.category,
    p.views,
    p.likes,
    p.downloads,
    p.rating,
    p.created_at
  FROM papers p
  WHERE p.status = '已發表'
  ORDER BY (p.views * 0.3 + p.likes * 0.4 + p.downloads * 0.3) DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
