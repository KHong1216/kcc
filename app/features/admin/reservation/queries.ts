import client from "../../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface Reservation {
  id: string;
  user_name: string;
  user_age: number | null;
  user_email: string;
  user_phone: string;
  user_job?: string;
  program_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  admin_notes?: string;
  confirmed_date: string | null;
  confirmed_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateReservationStatusInput {
  id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface UpdateReservationConfirmInput {
  id: string;
  confirmed_date: string | null;
  confirmed_time: string | null;
}

// ==================== 예약 관련 쿼리 ====================

/**
 * 전체 예약 목록 조회 (관리자용)
 * @returns 예약 배열 Promise
 */
export function getAllReservations() {
  return client
    .from("reservations")
    .select("id,user_name,user_age,user_email,user_phone,user_job,program_id,status,notes,admin_notes,confirmed_date,confirmed_time,created_at,updated_at")
    .order("created_at", { ascending: false });
}

/**
 * 예약 상태 업데이트
 * @param input - 예약 상태 업데이트 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateReservationStatus(input: UpdateReservationStatusInput) {
  return client
    .from("reservations")
    .update({ status: input.status })
    .eq("id", input.id);
}

/**
 * 예약 확정 일시 업데이트
 * @param input - 예약 확정 일시 업데이트 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateReservationConfirm(input: UpdateReservationConfirmInput) {
  return client
    .from("reservations")
    .update({
      confirmed_date: input.confirmed_date,
      confirmed_time: input.confirmed_time,
    })
    .eq("id", input.id);
}
