-- 建立行級安全性政策 (Row Level Security)

-- 啟用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_privacy ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE paper_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 用戶表政策
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- 隱私設定政策
CREATE POLICY "Users can view own privacy settings" ON user_privacy FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own privacy settings" ON user_privacy FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own privacy settings" ON user_privacy FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 活動政策
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Event creators can update their events" ON events FOR UPDATE USING (auth.uid() = created_by);

-- 活動報名政策
CREATE POLICY "Users can view their registrations" ON event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for events" ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel their registrations" ON event_registrations FOR DELETE USING (auth.uid() = user_id);

-- 論壇政策
CREATE POLICY "Anyone can view forum posts" ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON forum_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their posts" ON forum_posts FOR UPDATE USING (auth.uid() = author_id);

-- 論壇回覆政策
CREATE POLICY "Anyone can view replies" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can reply" ON forum_replies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their replies" ON forum_replies FOR UPDATE USING (auth.uid() = author_id);

-- 論文政策
CREATE POLICY "Anyone can view published papers" ON papers FOR SELECT USING (status = '已發表' OR auth.uid() = created_by);
CREATE POLICY "Authenticated users can create papers" ON papers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their papers" ON papers FOR UPDATE USING (auth.uid() = created_by);

-- 人脈連結政策
CREATE POLICY "Users can view their connections" ON connections FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Users can create connection requests" ON connections FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update connection status" ON connections FOR UPDATE USING (auth.uid() = addressee_id OR auth.uid() = requester_id);

-- 通知政策
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
