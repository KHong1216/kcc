import client from "../../lib/supa-client";

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string; // '일정' | '프로그램' | '이벤트' | '기타' 대신 string으로 변경
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

// 공지사항 조회
export async function getNotices(): Promise<Notice[]> {
  const { data, error } = await client
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notices:', error);
    return [];
  }

  return data || [];
}

// 공지사항 상세 조회
export async function getNoticeById(id: string): Promise<Notice | null> {
  const { data, error } = await client
    .from('notices')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching notice:', error);
    return null;
  }

  return data;
}

// 리뷰 조회
export async function getReviews(): Promise<Review[]> {
  const { data, error } = await client
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

// 프로그램별 리뷰 조회
export async function getReviewsByProgram(programId: string): Promise<Review[]> {
  const { data, error } = await client
    .from('reviews')
    .select('*')
    .eq('program_id', programId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews by program:', error);
    return [];
  }

  return data || [];
}

// 리뷰 생성
export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'likes_count'>): Promise<Review | null> {
  const { data, error } = await client
    .from('reviews')
    .insert([{ ...review, likes_count: 0 }])
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    return null;
  }

  return data;
}

// 리뷰 좋아요 업데이트
export async function updateReviewLikes(id: string, likesCount: number): Promise<boolean> {
  const { error } = await client
    .from('reviews')
    .update({ likes_count: likesCount })
    .eq('id', id);

  if (error) {
    console.error('Error updating review likes:', error);
    return false;
  }

  return true;
}