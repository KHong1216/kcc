import type { Emotion } from "../../../test/types";

export type Archetype =
  | "행복가"
  | "공감가"
  | "조심가"
  | "열정가"
  | "휴식가"
  | "기대가"
  | "성찰가"
  | "평온가"
  | "탐구가";

/**
 * Archetype을 허용된 emotion 값으로 매핑합니다.
 * DB의 CHECK constraint를 준수하기 위해 사용됩니다.
 */
export function archetypeToEmotion(archetype: Archetype): Emotion {
  const mapping: Record<Archetype, Emotion> = {
    행복가: "기쁨",
    공감가: "안정",
    조심가: "불안",
    열정가: "설렘",
    휴식가: "안정",
    기대가: "설렘",
    성찰가: "혼란",
    평온가: "안정",
    탐구가: "혼란",
  };

  return mapping[archetype];
}

