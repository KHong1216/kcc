-- emotion_test_responses 테이블에 status와 confirmed_date 컬럼 추가

-- 1. status 컬럼 추가 (기본값: 'pending')
ALTER TABLE emotion_test_responses 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 2. status 컬럼에 CHECK 제약조건 추가
ALTER TABLE emotion_test_responses 
DROP CONSTRAINT IF EXISTS emotion_test_responses_status_check;

ALTER TABLE emotion_test_responses 
ADD CONSTRAINT emotion_test_responses_status_check 
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));

-- 3. confirmed_date 컬럼 추가 (DATE 타입, NULL 허용)
ALTER TABLE emotion_test_responses 
ADD COLUMN IF NOT EXISTS confirmed_date DATE;

-- 4. 기존 데이터의 status를 'pending'으로 설정 (이미 DEFAULT가 있지만 명시적으로)
UPDATE emotion_test_responses 
SET status = 'pending' 
WHERE status IS NULL;

