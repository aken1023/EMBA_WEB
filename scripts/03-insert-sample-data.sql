-- 插入範例資料

-- 插入論壇分類
INSERT INTO forum_categories (name, description, color) VALUES
('商業策略', '企業策略規劃與執行相關討論', 'bg-blue-100 text-blue-800'),
('金融投資', '投資理財與金融市場分析', 'bg-green-100 text-green-800'),
('科技創新', '新興科技與數位轉型', 'bg-purple-100 text-purple-800'),
('人力資源', '人才管理與組織發展', 'bg-orange-100 text-orange-800'),
('行銷管理', '品牌行銷與市場策略', 'bg-pink-100 text-pink-800'),
('永續經營', 'ESG與企業社會責任', 'bg-emerald-100 text-emerald-800');

-- 插入班級資料
INSERT INTO classes (year, name, description) VALUES
(2024, 'EMBA 2024級', '2024年入學的EMBA學員'),
(2023, 'EMBA 2023級', '2023年入學的EMBA學員'),
(2022, 'EMBA 2022級', '2022年入學的EMBA學員'),
(2021, 'EMBA 2021級', '2021年入學的EMBA學員'),
(2020, 'EMBA 2020級', '2020年入學的EMBA學員');

-- 插入範例活動
INSERT INTO events (title, description, date, time, location, max_attendees, price, category, status, image_url) VALUES
('2024年度校友聚會', '年度盛會即將舉行，歡迎所有校友踴躍參與，分享一年來的成就與經驗', '2024-12-15', '18:00-22:00', '台北君悅酒店', 200, 1500, '聚會', '報名中', '/elegant-ballroom-event.png'),
('AI時代的商業轉型論壇', '探討人工智慧如何改變商業模式，邀請業界專家分享實戰經驗', '2024-11-28', '14:00-17:00', '台大管理學院', 120, 800, '講座', '報名中', '/modern-conference-ai.png'),
('高爾夫球友誼賽', '校友高爾夫球聯誼活動，增進友誼同時享受運動樂趣', '2024-11-20', '08:00-16:00', '台北高爾夫俱樂部', 40, 2500, '運動', '報名中', '/golf-course-green.png'),
('創業經驗分享會', '成功創業校友分享創業歷程，提供寶貴經驗與建議', '2024-11-10', '19:00-21:00', '信義區創業基地', 80, 0, '講座', '已結束', '/startup-presentation.png');
