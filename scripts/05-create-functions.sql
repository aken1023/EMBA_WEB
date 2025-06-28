-- 建立資料庫函數

-- 自動更新 updated_at 欄位的函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 為需要的表建立觸發器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_privacy_updated_at BEFORE UPDATE ON user_privacy FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_papers_updated_at BEFORE UPDATE ON papers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 建立用戶註冊後自動建立隱私設定的函數
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_privacy (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 建立觸發器
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 取得用戶統計資料的函數
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'papers_count', (SELECT COUNT(*) FROM papers WHERE created_by = user_uuid),
        'events_attended', (SELECT COUNT(*) FROM event_registrations WHERE user_id = user_uuid),
        'forum_posts', (SELECT COUNT(*) FROM forum_posts WHERE author_id = user_uuid),
        'connections_count', (SELECT COUNT(*) FROM connections WHERE (requester_id = user_uuid OR addressee_id = user_uuid) AND status = 'accepted'),
        'total_downloads', (SELECT COALESCE(SUM(downloads), 0) FROM papers WHERE created_by = user_uuid),
        'total_views', (SELECT COALESCE(SUM(views), 0) FROM papers WHERE created_by = user_uuid)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 搜尋校友的函數
CREATE OR REPLACE FUNCTION search_alumni(
    search_term TEXT DEFAULT '',
    location_filter TEXT DEFAULT '',
    graduation_year_filter INTEGER DEFAULT NULL,
    skills_filter TEXT[] DEFAULT ARRAY[]::TEXT[]
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    email VARCHAR,
    company VARCHAR,
    position VARCHAR,
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
        u.position,
        u.location,
        u.graduation_year,
        u.skills,
        u.avatar_url
    FROM users u
    WHERE 
        (search_term = '' OR 
         u.name ILIKE '%' || search_term || '%' OR 
         u.company ILIKE '%' || search_term || '%' OR
         EXISTS (SELECT 1 FROM unnest(u.skills) AS skill WHERE skill ILIKE '%' || search_term || '%'))
        AND (location_filter = '' OR u.location = location_filter)
        AND (graduation_year_filter IS NULL OR u.graduation_year = graduation_year_filter)
        AND (array_length(skills_filter, 1) IS NULL OR u.skills && skills_filter)
    ORDER BY u.name;
END;
$$ LANGUAGE plpgsql;

-- 取得熱門論文的函數
CREATE OR REPLACE FUNCTION get_trending_papers(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    abstract TEXT,
    category VARCHAR,
    downloads INTEGER,
    views INTEGER,
    likes INTEGER,
    rating DECIMAL,
    author_names TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.abstract,
        p.category,
        p.downloads,
        p.views,
        p.likes,
        p.rating,
        string_agg(pa.name, ', ' ORDER BY pa.order_index) as author_names
    FROM papers p
    LEFT JOIN paper_authors pa ON p.id = pa.paper_id
    WHERE p.status = '已發表'
    GROUP BY p.id, p.title, p.abstract, p.category, p.downloads, p.views, p.likes, p.rating
    ORDER BY (p.downloads * 0.3 + p.views * 0.2 + p.likes * 0.5) DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
