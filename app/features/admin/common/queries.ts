import client from "../../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface AdminStats {
  managerCount: number;
  reservationCount: number;
  communityCount: number;
}

// ==================== 통계 관련 쿼리 ====================

/**
 * 활성 매니저 수 조회
 * @returns 카운트 결과 Promise
 */
export function getActiveManagerCount() {
  return client
    .from("managers")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);
}

/**
 * 전체 예약 수 조회
 * @returns 카운트 결과 Promise
 */
export function getReservationCount() {
  return client
    .from("reservations")
    .select("*", { count: "exact", head: true });
}

/**
 * 커뮤니티 게시글 수 조회
 * @returns 카운트 결과 Promise
 */
export function getCommunityPostCount() {
  return client
    .from("community_posts")
    .select("*", { count: "exact", head: true });
}

/**
 * 관리자 통계 조회 (모든 통계를 한번에)
 * @returns 통계 데이터 Promise
 */
export function getAdminStats() {
  return Promise.all([
    getActiveManagerCount(),
    getReservationCount(),
    getCommunityPostCount(),
  ]);
}
