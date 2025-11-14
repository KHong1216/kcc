import client from "../../../lib/supa-client";
import type { Contact } from "../../../features/community/queries";
import type { Session } from "@supabase/supabase-js";

// ==================== 타입 정의 ====================

export interface UpdateContactInput {
  id: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes?: string | null;
}

// ==================== 문의 관련 쿼리 ====================

/**
 * 전체 문의 조회 (관리자용)
 * @param session - 관리자 세션 (RLS 정책을 위해 필요)
 * @returns 문의 배열 Promise
 */
export function getAllContacts(session?: Session | null) {
  const query = client
    .from<Contact>("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  // 세션이 있으면 명시적으로 설정 (RLS 정책을 위해)
  if (session) {
    return query;
  }

  return query;
}

/**
 * 문의 상태 업데이트
 * @param input - 문의 업데이트 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateContact(input: UpdateContactInput) {
  const { id, ...updateData } = input;
  return client
    .from("contacts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
}

/**
 * 문의 삭제
 * @param id - 문의 ID
 * @returns 삭제 결과 Promise
 */
export function deleteContact(id: string) {
  return client
    .from("contacts")
    .delete()
    .eq("id", id);
}

