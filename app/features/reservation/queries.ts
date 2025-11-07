import client from "../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface Program {
  id: number;
  title: string;
  description: string | null;
  duration: string | null;
  target_audience: string | null;
  icon: string | null;
  color_gradient: string | null;
  badge: string | null;
  badge_color: string | null;
  is_active: boolean;
}

export interface Reservation {
  id: string;
  user_name: string;
  user_age: number;
  user_job: string;
  user_phone: string;
  user_email?: string;
  program_id: 'love' | 'photo' | 'essay';
  selected_dates: Record<string, string[]>;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  admin_notes?: string;
  confirmed_date?: string;
  confirmed_time?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReservationInput {
  user_name: string;
  user_age: number;
  user_job: string;
  user_phone: string;
  user_email?: string;
  program_id: 'love' | 'photo' | 'essay';
  selected_dates: Record<string, string[]>;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

// ==================== 프로그램 관련 쿼리 ====================

/**
 * 활성화된 프로그램 목록 조회
 * @returns 프로그램 배열 Promise
 */
export function getPrograms() {
  return client
    .from<Program>("programs")
    .select("id,title,description,duration,target_audience,icon,color_gradient,badge,badge_color,is_active")
    .eq("is_active", true)
    .order("id", { ascending: true });
}

// ==================== 예약 관련 쿼리 ====================

/**
 * 예약 생성
 * @param input - 예약 생성 데이터
 * @returns 생성 결과 Promise
 */
export function createReservation(input: CreateReservationInput) {
  return client
    .from("reservations")
    .insert([{
      user_name: input.user_name,
      user_age: input.user_age,
      user_job: input.user_job,
      user_phone: input.user_phone,
      user_email: input.user_email || null,
      program_id: input.program_id,
      selected_dates: input.selected_dates,
      notes: input.notes || null,
      status: input.status || 'pending',
    }])
    .select()
    .single();
}

// 예약 조회 (관리자용)
export async function getReservations(): Promise<Reservation[]> {
  const { data, error } = await client
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data || [];
}

// 예약 상태 업데이트
export async function updateReservationStatus(id: string, status: string, adminNotes?: string): Promise<boolean> {
  const { error } = await client
    .from('reservations')
    .update({ 
      status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating reservation status:', error);
    return false;
  }

  return true;
}