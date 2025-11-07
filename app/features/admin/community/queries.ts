import client from "../../../lib/supa-client";

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

export interface CreateNoticeInput {
  title: string;
  content: string;
  category: string;
  is_important: boolean;
  author: string;
}

export interface UpdateNoticeInput {
  id: string;
  title: string;
  content: string;
  category: string;
  is_important: boolean;
}

// ==================== 공지사항 관련 쿼리 ====================

/**
 * 전체 공지사항 조회 (관리자용)
 * @returns 공지사항 배열 Promise
 */
export function getAllNotices() {
  return client
    .from<Notice>("notices")
    .select("*")
    .order("created_at", { ascending: false });
}

/**
 * 공지사항 생성
 * @param input - 공지사항 생성 데이터
 * @returns 생성 결과 Promise
 */
export function createNotice(input: CreateNoticeInput) {
  return client
    .from("notices")
    .insert([{
      title: input.title,
      content: input.content,
      category: input.category,
      is_important: input.is_important,
      is_published: true,
      author: input.author,
    }]);
}

/**
 * 공지사항 수정
 * @param input - 공지사항 수정 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateNotice(input: UpdateNoticeInput) {
  const { id, ...updateData } = input;
  return client
    .from("notices")
    .update(updateData)
    .eq("id", id);
}

/**
 * 공지사항 삭제
 * @param id - 공지사항 ID
 * @returns 삭제 결과 Promise
 */
export function deleteNotice(id: string) {
  return client
    .from("notices")
    .delete()
    .eq("id", id);
}

// ==================== 리뷰 관련 쿼리 ====================

/**
 * 전체 리뷰 조회 (관리자용)
 * @returns 리뷰 배열 Promise
 */
export function getAllReviews() {
  return client
    .from<Review>("reviews")
    .select("*")
    .order("created_at", { ascending: false });
}

/**
 * 리뷰 삭제
 * @param id - 리뷰 ID
 * @returns 삭제 결과 Promise
 */
export function deleteReview(id: string) {
  return client
    .from("reviews")
    .delete()
    .eq("id", id);
}
