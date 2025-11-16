-- emotion_test_responses 테이블 RLS 정책 설정

-- RLS 활성화
ALTER TABLE emotion_test_responses ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있는 경우)
DROP POLICY IF EXISTS "Anyone can insert emotion test responses" ON emotion_test_responses;
DROP POLICY IF EXISTS "Anyone can select emotion for stats" ON emotion_test_responses;
DROP POLICY IF EXISTS "Users can select recent response for gift" ON emotion_test_responses;
DROP POLICY IF EXISTS "Admins can view all emotion test responses" ON emotion_test_responses;
DROP POLICY IF EXISTS "Admins can update emotion test responses" ON emotion_test_responses;
DROP POLICY IF EXISTS "Users can update their own gift info" ON emotion_test_responses;

-- 1. INSERT 정책: 모든 사용자가 제출 가능
CREATE POLICY "Anyone can insert emotion test responses"
  ON emotion_test_responses
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- 2. SELECT 정책: 모든 사용자가 emotion 컬럼 조회 가능 (통계용)
CREATE POLICY "Anyone can select emotion for stats"
  ON emotion_test_responses
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- 2-1. SELECT 정책: 최근 제출한 레코드의 id, contact, created_at 조회 가능 (경품 신청용)
CREATE POLICY "Users can select recent response for gift"
  ON emotion_test_responses
  FOR SELECT
  TO authenticated, anon
  USING (
    created_at >= NOW() - INTERVAL '30 minutes'
  );

-- 3. SELECT 정책: 관리자는 모든 데이터 조회 가능
CREATE POLICY "Admins can view all emotion test responses"
  ON emotion_test_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = auth.email()
      AND profiles.role = 'admin'
    )
  );

-- 4. UPDATE 정책: 관리자는 모든 데이터 수정 가능
CREATE POLICY "Admins can update emotion test responses"
  ON emotion_test_responses
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = auth.email()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = auth.email()
      AND profiles.role = 'admin'
    )
  );

-- 5. UPDATE 정책: 최근 제출한 사용자는 경품 정보만 업데이트 가능
-- (created_at이 최근 30분 이내인 레코드만 업데이트 가능)
CREATE POLICY "Users can update their own gift info"
  ON emotion_test_responses
  FOR UPDATE
  TO authenticated, anon
  USING (
    created_at >= NOW() - INTERVAL '30 minutes'
  )
  WITH CHECK (
    created_at >= NOW() - INTERVAL '30 minutes'
  );

