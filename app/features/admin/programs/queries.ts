import client from "../../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface Program {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  target_audience: string | null;
  icon: string | null;
  badge: string | null;
  is_active: boolean;
}

export interface UpdateProgramInput {
  id: string;
  title: string;
  description: string;
  duration: string;
  target_audience: string;
  icon: string;
  badge: string;
}

// ==================== 프로그램 관련 쿼리 ====================

/**
 * 전체 프로그램 목록 조회 (관리자용)
 * @returns 프로그램 배열 Promise
 */
export function getAllPrograms() {
  return client
    .from("programs")
    .select("*")
    .order("id", { ascending: true });
}

/**
 * 프로그램 수정
 * @param input - 프로그램 수정 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateProgram(input: UpdateProgramInput) {
  const { id, ...updateData } = input;
  
  const cleanedData: any = {
    title: updateData.title.trim(),
    description: updateData.description?.trim() || null,
    duration: updateData.duration?.trim() || null,
    target_audience: updateData.target_audience?.trim() || null,
    icon: updateData.icon?.trim() || null,
    badge: updateData.badge?.trim() || null,
  };
  
  return client
    .from("programs")
    .update(cleanedData)
    .eq("id", id)
    .select()
    .single();
}

/**
 * 프로그램 활성화 상태 토글
 * @param id - 프로그램 ID
 * @param currentStatus - 현재 활성화 상태
 * @returns 업데이트 결과 Promise
 */
export function toggleProgramActive(id: string, currentStatus: boolean) {
  return client
    .from("programs")
    .update({ is_active: !currentStatus })
    .eq("id", id)
    .select()
    .single();
}
