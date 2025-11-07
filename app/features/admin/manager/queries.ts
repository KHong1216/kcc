import client from "../../../lib/supa-client";

// ==================== 타입 정의 ====================

export interface Manager {
  id: number;
  name: string;
  image: string | null;
  introduction: string;
  graduation?: string | null;
  qualifications: string[];
  career: string[];
  specialty?: string | null;
  description?: string | null;
  is_active: boolean;
  is_representative: boolean;
  created_at: string;
  updated_at: string;
}

export interface ManagerWithImageUrl extends Manager {
  imageUrl: string | null;
}

export interface CreateManagerInput {
  name: string;
  image?: string | null;
  introduction?: string;
  graduation?: string;
  qualifications?: string[];
  career?: string[];
  specialty?: string;
  description?: string;
  is_active?: boolean;
  is_representative?: boolean;
}

export interface UpdateManagerInput extends Partial<CreateManagerInput> {
  id: number;
}

// ==================== 매니저 관련 쿼리 ====================

/**
 * 전체 매니저 목록 조회 (관리자용)
 * @returns 매니저 배열 Promise
 */
export function getAllManagers() {
  return client
    .from<Manager>("managers")
    .select("*")
    .order("id", { ascending: true });
}

/**
 * 매니저 생성
 * @param payload - 매니저 생성 데이터
 * @returns 생성 결과 Promise
 */
export function createManager(payload: CreateManagerInput) {
  return client
    .from("managers")
    .insert([{
      name: payload.name,
      image: payload.image || null,
      introduction: payload.introduction || "",
      graduation: payload.graduation || null,
      qualifications: payload.qualifications || [],
      career: payload.career || [],
      specialty: payload.specialty || null,
      description: payload.description || null,
      is_active: payload.is_active ?? true,
      is_representative: payload.is_representative ?? false,
    }]);
}

/**
 * 매니저 수정
 * @param input - 매니저 수정 데이터
 * @returns 업데이트 결과 Promise
 */
export function updateManager(input: UpdateManagerInput) {
  const { id, ...updateData } = input;

  const payload: Partial<Manager> = {};
  if (updateData.name !== undefined) payload.name = updateData.name;
  if (updateData.image !== undefined) payload.image = updateData.image;
  if (updateData.introduction !== undefined) payload.introduction = updateData.introduction;
  if (updateData.graduation !== undefined) payload.graduation = updateData.graduation;
  if (updateData.qualifications !== undefined) payload.qualifications = updateData.qualifications;
  if (updateData.career !== undefined) payload.career = updateData.career;
  if (updateData.specialty !== undefined) payload.specialty = updateData.specialty;
  if (updateData.description !== undefined) payload.description = updateData.description;

  return client
    .from("managers")
    .update(payload)
    .eq("id", id);
}

/**
 * 매니저 삭제
 * @param id - 매니저 ID
 * @returns 삭제 결과 Promise
 */
export function deleteManager(id: number) {
  return client
    .from("managers")
    .delete()
    .eq("id", id);
}

/**
 * 매니저 이미지 경로 조회
 * @param id - 매니저 ID
 * @returns 이미지 경로 조회 결과 Promise
 */
export function getManagerImagePath(id: number) {
  return client
    .from<Manager>("managers")
    .select("image")
    .eq("id", id)
    .single();
}

/**
 * 매니저 활성화 상태 토글
 * @param id - 매니저 ID
 * @param currentStatus - 현재 활성화 상태
 * @returns 업데이트 결과 Promise
 */
export function toggleManagerActive(id: number, currentStatus: boolean) {
  return client
    .from("managers")
    .update({ is_active: !currentStatus })
    .eq("id", id);
}

/**
 * 매니저 대표 지정 토글
 * @param id - 매니저 ID
 * @param currentStatus - 현재 대표 지정 상태
 * @returns 업데이트 결과 Promise
 */
export function toggleManagerRepresentative(id: number, currentStatus: boolean) {
  return client
    .from("managers")
    .update({ is_representative: !currentStatus })
    .eq("id", id);
}

// ==================== Storage 관련 ====================

/**
 * 이미지 파일 업로드
 * @param file - 업로드할 파일
 * @param filePath - 파일 경로
 * @returns 업로드 결과 Promise
 */
export function uploadManagerImage(file: File, filePath: string) {
  return client.storage
    .from("manager-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
}

/**
 * 기존 이미지 삭제
 * @param imagePath - 삭제할 이미지 경로
 * @returns 삭제 결과 Promise
 */
export function deleteManagerImage(imagePath: string) {
  return client.storage
    .from("manager-images")
    .remove([imagePath]);
}

/**
 * 이미지 파일명 생성
 * @param originalFileName - 원본 파일명
 * @returns 생성된 파일명
 */
export function generateImageFileName(originalFileName: string): string {
  const fileExt = originalFileName.split(".").pop();
  return `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
}
