// 공통 타입 정의
export type Emotion = 
  | "기쁨" 
  | "슬픔" 
  | "불안" 
  | "분노" 
  | "지침" 
  | "설렘" 
  | "허무" 
  | "안정" 
  | "혼란"

export type EmotionDetail = {
  [key in Emotion]: string[]
}

export type ReasonCategory = 
  | "사람/관계"
  | "일/학교/공부"
  | "미래/진로/돈"
  | "건강/컨디션"
  | "혼자만의 생각/과거"
  | "기타"

export type DayMood = "worst" | "normal" | "good" | "excellent"

export type NeedType = 
  | "comfort"
  | "motivation"
  | "talk"
  | "love"
  | "social"
  | "rest"
  | "none"

export type Step = 0 | 1 | 2 | 3 | 4 | 5

export interface FormData {
  emotion: Emotion | null
  emotionDetails: string[]
  reason: ReasonCategory | null
  name: string
  age: string
  job: string
  contact: string
  day_mood: DayMood | null
  need_type: NeedType | null
  privacyAgreed: boolean
}

export interface EmotionStats {
  emotion: Emotion
  count: number
  percentage: number
}

export interface StepProps {
  formData: FormData
  updateFormData: (newValues: Partial<FormData>) => void
  goNext: () => void
  goPrev?: () => void
}

// 상수들
export const emotionDetails: EmotionDetail = {
  "기쁨": [
    "기대감이 커서 설렘",
    "오랜만에 휴식해서 편안",
    "좋은 사람과 함께해서 즐거움",
    "목표를 이뤄서 뿌듯",
    "작은 일상이 좋아서 잔잔한 행복"
  ],
  "슬픔": [
    "무언가를 잃어서 아쉬움",
    "외로움을 느껴서 쓸쓸함",
    "이해받지 못해서 답답함",
    "과거가 그리워서 그리움",
    "현실이 힘들어서 지침"
  ],
  "불안": [
    "미래가 불확실해서 걱정",
    "다른 사람 평가가 두려움",
    "실패할까봐 불안함",
    "시간이 부족해서 초조함",
    "변화가 두려워서 불안함"
  ],
  "분노": [
    "불공평함을 느껴서 화남",
    "이해받지 못해서 답답함",
    "상대방 태도가 불쾌함",
    "자신이 무능하다고 느껴서 화남",
    "상황이 억울해서 분노"
  ],
  "지침": [
    "에너지가 고갈되어서 피곤함",
    "반복되는 일상에 지침",
    "목표가 없어서 허탈함",
    "무기력해서 아무것도 하기 싫음",
    "의미를 찾지 못해서 지침"
  ],
  "설렘": [
    "새로운 만남이 기대됨",
    "변화가 두근거림",
    "좋은 일이 생길 것 같아서 설렘",
    "목표를 향해 가는 게 설렘",
    "모르는 미래가 기대됨"
  ],
  "허무": [
    "의미를 찾지 못해서 공허함",
    "노력이 헛된 것 같아서 허탈함",
    "목표를 잃어서 방향감각 상실",
    "현실과 이상의 괴리가 커서 허무",
    "무엇을 해야 할지 모르겠음"
  ],
  "안정": [
    "현재 상태가 만족스러움",
    "주변 사람들과의 관계가 좋음",
    "일상이 편안하고 안정적임",
    "자신의 위치를 이해하고 있음",
    "평온한 마음으로 하루를 보냄"
  ],
  "혼란": [
    "무엇을 해야 할지 모르겠음",
    "감정이 복잡하게 얽혀있음",
    "선택지가 많아서 혼란스러움",
    "자신의 감정을 이해하지 못함",
    "상황이 복잡해서 정리가 안 됨"
  ]
}

export const reasonCategories: ReasonCategory[] = [
  "사람/관계",
  "일/학교/공부",
  "미래/진로/돈",
  "건강/컨디션",
  "혼자만의 생각/과거",
  "기타"
]

export const jobOptions = [
  "학생",
  "직장인",
  "프리랜서",
  "구직 중",
  "기타"
]

export const dayMoodLabels: Record<DayMood, string> = {
  worst: "최악이었다",
  normal: "그냥 그랬다",
  good: "괜찮았다",
  excellent: "매우 좋았다"
}

export const needTypeLabels: Record<NeedType, string> = {
  comfort: "위로",
  motivation: "동기부여",
  talk: "상담/이야기 나누기",
  love: "사랑/연애",
  social: "새로운 사람 만나기",
  rest: "쉬고 싶음",
  none: "아무것도 없음"
}

export const needOptions: NeedType[] = [
  "comfort",
  "motivation",
  "talk",
  "love",
  "social",
  "rest",
  "none"
]

export const dayMoodOptions: DayMood[] = [
  "worst",
  "normal",
  "good",
  "excellent"
]

export const emotionEmojis: Record<Emotion, string> = {
  "기쁨": "😊",
  "슬픔": "😢",
  "불안": "😰",
  "분노": "😠",
  "지침": "😮‍💨",
  "설렘": "🥰",
  "허무": "😐",
  "안정": "😌",
  "혼란": "😵"
}

export const CHART_COLORS = [
  "#FFB6C1", // 연한 핑크
  "#FFD4A3", // 피치
  "#FFE5B4", // 베이지
  "#E6E6FA", // 라벤더
  "#B0E0E6", // 파우더 블루
  "#DDA0DD", // 플럼
  "#F0E68C", // 카키
  "#98D8C8", // 민트 그린
  "#FFCCCB"  // 로즈
]

