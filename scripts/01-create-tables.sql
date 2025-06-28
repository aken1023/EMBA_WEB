-- 建立用戶資料表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  company VARCHAR(200),
  job_title VARCHAR(100), -- 職位欄位
  graduation_year INTEGER,
  location VARCHAR(100),
  website TEXT,
  bio TEXT,
  skills TEXT[], -- 技能陣列
  interests TEXT[], -- 興趣陣列
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立隱私設定表
CREATE TABLE IF NOT EXISTS user_privacy (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  show_email BOOLEAN DEFAULT true,
  show_phone BOOLEAN DEFAULT false,
  show_company BOOLEAN DEFAULT true,
  show_location BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立活動資料表
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time VARCHAR(20),
  location VARCHAR(200),
  max_attendees INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT '報名中',
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立活動報名表
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_status VARCHAR(20) DEFAULT 'pending',
  UNIQUE(event_id, user_id)
);

-- 建立論壇分類表
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立論壇主題表
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category_id UUID REFERENCES forum_categories(id),
  author_id UUID REFERENCES users(id),
  tags TEXT[],
  is_hot BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立論壇回覆表
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  parent_id UUID REFERENCES forum_replies(id), -- 支援巢狀回覆
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立論文表
CREATE TABLE IF NOT EXISTS papers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  abstract TEXT NOT NULL,
  category VARCHAR(100),
  keywords TEXT[],
  journal VARCHAR(200),
  publish_date DATE,
  pages INTEGER,
  file_url TEXT,
  is_open_access BOOLEAN DEFAULT true,
  allow_comments BOOLEAN DEFAULT true,
  status VARCHAR(20) DEFAULT '草稿',
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立論文作者表（多對多關係）
CREATE TABLE IF NOT EXISTS paper_authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  affiliation VARCHAR(200),
  is_primary BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

-- 建立人脈連結表
CREATE TABLE IF NOT EXISTS connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  addressee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id)
);

-- 建立班級表
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  name VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立班級成員表
CREATE TABLE IF NOT EXISTS class_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member', -- member, admin
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, user_id)
);

-- 建立相簿表
CREATE TABLE IF NOT EXISTS albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_id UUID REFERENCES events(id),
  class_id UUID REFERENCES classes(id),
  created_by UUID REFERENCES users(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立照片表
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立通知表
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
