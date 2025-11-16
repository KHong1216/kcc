-- emotion_test_responses 테이블에 경품 관련 컬럼 추가

-- 1. gift 컬럼 추가 (경품 종류)
ALTER TABLE emotion_test_responses 
ADD COLUMN IF NOT EXISTS gift TEXT CHECK (gift IN ('essay', 'love-test', 'photo'));

-- 2. preferred_day 컬럼 추가 (가능한 요일)
ALTER TABLE emotion_test_responses 
ADD COLUMN IF NOT EXISTS preferred_day TEXT CHECK (preferred_day IN ('weekday', 'weekend', 'any'));

-- 3. preferred_time 컬럼 추가 (가능한 시간)
ALTER TABLE emotion_test_responses 
ADD COLUMN IF NOT EXISTS preferred_time TEXT CHECK (preferred_time IN ('morning', 'afternoon', 'evening', 'any'));

