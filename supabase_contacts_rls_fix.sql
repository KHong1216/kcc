-- ==================== contacts 테이블 RLS 정책 재설정 ====================
-- 관리자가 문의를 조회/수정/삭제할 수 있도록 설정

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Anyone can create contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can delete contacts" ON contacts;

-- RLS 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 1. 문의 생성: 모든 사용자 가능 (인증 없이도)
CREATE POLICY "Anyone can create contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- 2. 문의 조회: 관리자만 가능
-- auth.jwt() ->> 'email'을 사용하여 현재 로그인한 사용자의 이메일을 가져옴
CREATE POLICY "Admins can view all contacts"
  ON contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = (SELECT (auth.jwt() ->> 'email'))
      AND profiles.role = 'admin'
    )
  );

-- 3. 문의 수정: 관리자만 가능
CREATE POLICY "Admins can update contacts"
  ON contacts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = (SELECT (auth.jwt() ->> 'email'))
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = (SELECT (auth.jwt() ->> 'email'))
      AND profiles.role = 'admin'
    )
  );

-- 4. 문의 삭제: 관리자만 가능
CREATE POLICY "Admins can delete contacts"
  ON contacts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.email = (SELECT (auth.jwt() ->> 'email'))
      AND profiles.role = 'admin'
    )
  );

-- ==================== 테스트 쿼리 ====================
-- 관리자로 로그인한 후 다음 쿼리로 테스트:
-- SELECT * FROM contacts;

