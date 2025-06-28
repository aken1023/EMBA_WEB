-- 07-fix-rls-policies.sql
-- 修復開發環境中的 RLS 政策問題

-- 暫時禁用 events 表的 RLS（僅用於開發環境）
-- 在生產環境中請謹慎使用此設定

-- 刪除現有的活動政策
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;
DROP POLICY IF EXISTS "Event creators can update their events" ON events;

-- 重新建立更寬鬆的活動政策（開發環境用）
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Anyone can create events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update events" ON events FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete events" ON events FOR DELETE USING (true);

-- 或者完全禁用 events 表的 RLS（更簡單的解決方案）
-- ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- 同樣修復其他可能有問題的表格
DROP POLICY IF EXISTS "Authenticated users can create posts" ON forum_posts;
CREATE POLICY "Anyone can create posts" ON forum_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can create papers" ON papers;
CREATE POLICY "Anyone can create papers" ON papers FOR INSERT WITH CHECK (true);

-- 注意：在生產環境中，請使用更嚴格的安全政策
-- 建議設定正確的用戶認證後再啟用嚴格的 RLS 政策 