-- 添加媒體類型支援的遷移腳本

-- 首先重新命名照片表為媒體表
ALTER TABLE photos RENAME TO media;

-- 添加媒體類型欄位
ALTER TABLE media ADD COLUMN IF NOT EXISTS media_type VARCHAR(20) DEFAULT 'image';

-- 添加檔案大小欄位（bytes）
ALTER TABLE media ADD COLUMN IF NOT EXISTS file_size BIGINT;

-- 添加持續時間欄位（對影片有用，秒為單位）
ALTER TABLE media ADD COLUMN IF NOT EXISTS duration INTEGER;

-- 添加縮圖URL欄位（對影片特別有用）
ALTER TABLE media ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- 添加MIME類型欄位
ALTER TABLE media ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100);

-- 創建媒體類型的檢查約束
ALTER TABLE media ADD CONSTRAINT check_media_type 
CHECK (media_type IN ('image', 'video', 'audio'));

-- 創建MIME類型的檢查約束（常見的圖片和影片格式）
ALTER TABLE media ADD CONSTRAINT check_mime_type 
CHECK (mime_type IN (
  -- 圖片格式
  'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  -- 影片格式
  'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv',
  -- 音訊格式
  'audio/mp3', 'audio/wav', 'audio/aac', 'audio/ogg'
) OR mime_type IS NULL);

-- 更新現有記錄，假設都是圖片
UPDATE media SET 
  media_type = 'image',
  mime_type = 'image/jpeg'
WHERE media_type IS NULL OR media_type = '';

-- 創建索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_media_type ON media(media_type);
CREATE INDEX IF NOT EXISTS idx_album_media ON media(album_id, media_type);

-- 更新相簿表以支援混合媒體統計
ALTER TABLE albums ADD COLUMN IF NOT EXISTS media_count INTEGER DEFAULT 0;
ALTER TABLE albums ADD COLUMN IF NOT EXISTS image_count INTEGER DEFAULT 0;
ALTER TABLE albums ADD COLUMN IF NOT EXISTS video_count INTEGER DEFAULT 0;

-- 創建觸發器函數來自動更新計數
CREATE OR REPLACE FUNCTION update_album_media_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- 更新相簿的媒體統計
  UPDATE albums SET 
    media_count = (
      SELECT COUNT(*) FROM media WHERE album_id = COALESCE(NEW.album_id, OLD.album_id)
    ),
    image_count = (
      SELECT COUNT(*) FROM media 
      WHERE album_id = COALESCE(NEW.album_id, OLD.album_id) AND media_type = 'image'
    ),
    video_count = (
      SELECT COUNT(*) FROM media 
      WHERE album_id = COALESCE(NEW.album_id, OLD.album_id) AND media_type = 'video'
    )
  WHERE id = COALESCE(NEW.album_id, OLD.album_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 創建觸發器
DROP TRIGGER IF EXISTS trigger_update_album_media_counts ON media;
CREATE TRIGGER trigger_update_album_media_counts
  AFTER INSERT OR UPDATE OR DELETE ON media
  FOR EACH ROW
  EXECUTE FUNCTION update_album_media_counts();

-- 初始化現有相簿的統計數據
UPDATE albums SET 
  media_count = (SELECT COUNT(*) FROM media WHERE album_id = albums.id),
  image_count = (SELECT COUNT(*) FROM media WHERE album_id = albums.id AND media_type = 'image'),
  video_count = (SELECT COUNT(*) FROM media WHERE album_id = albums.id AND media_type = 'video'); 