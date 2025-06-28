-- 06-add-job-title-column.sql
-- 安全地新增 job_title 欄位並處理現有資料

-- 檢查是否存在 position 或 position1 欄位，並新增 job_title 欄位
DO $$
BEGIN
    -- 新增 job_title 欄位（如果不存在）
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'job_title'
    ) THEN
        ALTER TABLE users ADD COLUMN job_title VARCHAR(100);
        
        -- 如果存在 position1 欄位，複製資料到 job_title
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'position1'
        ) THEN
            UPDATE users SET job_title = position1 WHERE position1 IS NOT NULL;
            -- 可選：刪除舊欄位（取消註釋下行如需要）
            -- ALTER TABLE users DROP COLUMN position1;
        END IF;
        
        -- 如果存在 position 欄位，複製資料到 job_title
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'position'
        ) THEN
            UPDATE users SET job_title = position WHERE position IS NOT NULL;
            -- 可選：刪除舊欄位（取消註釋下行如需要）
            -- ALTER TABLE users DROP COLUMN position;
        END IF;
        
        RAISE NOTICE 'job_title 欄位已新增到 users 表格';
    ELSE
        RAISE NOTICE 'job_title 欄位已存在於 users 表格';
    END IF;
END
$$; 