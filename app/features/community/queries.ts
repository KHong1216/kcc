import client from "../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  is_important: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author: string;
}

export interface Review {
  id: string;
  user_name: string;
  program_id: 'love' | 'photo' | 'essay';
  rating: number;
  title: string;
  content: string;
  is_verified: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewInput {
  user_name: string;
  program_id: 'love' | 'photo' | 'essay';
  rating: number;
  title: string;
  content: string;
  is_verified?: boolean;
}

// ==================== 공지사항 관련 쿼리 ====================

/**
 * 공지사항 조회 (발행된 것만)
 * @returns 공지사항 배열 Promise
 */
export function getNotices() {
  return client
    .from<Notice>("notices")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
}

/**
 * 공지사항 상세 조회
 * @param id - 공지사항 ID
 * @returns 공지사항 상세 정보 Promise
 */
export function getNoticeById(id: string) {
  return client
    .from<Notice>("notices")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();
}

// ==================== 리뷰 관련 쿼리 ====================

/**
 * 전체 리뷰 조회
 * @returns 리뷰 배열 Promise
 */
export function getReviews() {
  return client
    .from<Review>("reviews")
    .select("*")
    .order("created_at", { ascending: false });
}

/**
 * 프로그램별 리뷰 조회
 * @param programId - 프로그램 ID
 * @returns 리뷰 배열 Promise
 */
export function getReviewsByProgram(programId: string) {
  return client
    .from<Review>("reviews")
    .select("*")
    .eq("program_id", programId)
    .order("created_at", { ascending: false });
}

/**
 * 리뷰 생성
 * @param input - 리뷰 생성 데이터
 * @returns 생성 결과 Promise
 */
export function createReview(input: CreateReviewInput) {
  return client
    .from("reviews")
    .insert([{
      user_name: input.user_name,
      program_id: input.program_id,
      rating: input.rating,
      title: input.title,
      content: input.content,
      is_verified: input.is_verified ?? false,
      likes_count: 0,
    }])
    .select()
    .single();
}

/**
 * 리뷰 좋아요 업데이트
 * @param id - 리뷰 ID
 * @param likesCount - 좋아요 수
 * @returns 업데이트 결과 Promise
 */
export function updateReviewLikes(id: string, likesCount: number) {
  return client
    .from("reviews")
    .update({ likes_count: likesCount })
    .eq("id", id);
}
