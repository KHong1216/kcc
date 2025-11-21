import { z } from "zod";

// 연락처 검증 스키마: 010-xxxx-xxxx 형식
export const phoneSchema = z
  .string()
  .regex(/^010-\d{4}-\d{4}$/, {
    message: "연락처는 010-xxxx-xxxx 형식으로 입력해주세요.",
  })
  .refine(
    (phone) => {
      // 숫자만 추출하여 11자리인지 확인
      const digits = phone.replace(/-/g, "");
      return digits.length === 11 && digits.startsWith("010");
    },
    {
      message: "연락처는 010으로 시작하는 11자리 숫자여야 합니다.",
    }
  );

// 연락처 검증 함수 (다양한 형식 입력을 010-xxxx-xxxx로 정규화)
export function validateAndNormalizePhone(phone: string | null | undefined): {
  isValid: boolean;
  normalized: string | null;
  error: string | null;
} {
  if (!phone) {
    return {
      isValid: false,
      normalized: null,
      error: "연락처를 입력해주세요.",
    };
  }

  // 공백 제거
  const cleaned = phone.trim().replace(/\s/g, "");

  // 하이픈, 점, 공백 제거 후 숫자만 추출
  const digits = cleaned.replace(/[-.\s]/g, "");

  // 010으로 시작하는 11자리 숫자인지 확인
  if (!/^010\d{8}$/.test(digits)) {
    return {
      isValid: false,
      normalized: null,
      error: "연락처는 010-xxxx-xxxx 형식으로 입력해주세요. (예: 010-1234-5678)",
    };
  }

  // 010-xxxx-xxxx 형식으로 정규화
  const normalized = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;

  // zod 스키마로 최종 검증
  const result = phoneSchema.safeParse(normalized);

  if (!result.success) {
    return {
      isValid: false,
      normalized: null,
      error: result.error.issues[0]?.message || "연락처 형식이 올바르지 않습니다.",
    };
  }

  return {
    isValid: true,
    normalized,
    error: null,
  };
}

