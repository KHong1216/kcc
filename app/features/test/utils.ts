import type { DayMood, NeedType } from "./types"
import { dayMoodOptions, needOptions } from "./types"

// 타입 가드 함수: 확실한 검증
export function isValidDayMood(value: string | null | undefined): value is DayMood {
  return value !== null && value !== undefined && value !== "" && dayMoodOptions.includes(value as DayMood)
}

export function isValidNeedType(value: string | null | undefined): value is NeedType {
  return value !== null && value !== undefined && value !== "" && needOptions.includes(value as NeedType)
}

