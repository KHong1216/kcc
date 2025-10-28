import type { NumberUnitLength } from "luxon";
import client from "../../lib/supa-client";

export interface Program {
  id: 'love' | 'photo' | 'essay';
  title: string;
  description: string;
  duration: string;
  target_audience?: string;
  icon?: string;
  color_gradient?: string;
  badge?: string;
  badge_color?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

// 프로그램 조회
export async function getPrograms(): Promise<Program[]> {
  const { data, error } = await client
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching programs:', error);
    return [];
  }

  return data || [];
}

// 예약 생성
export async function createReservation(reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>): Promise<Reservation | null> {
  const { data, error } = await client
    .from('reservations')
    .insert([reservation])
    .select()
    .single();

  if (error) {
    console.error('Error creating reservation:', error);
    return null;
  }

  return data;
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