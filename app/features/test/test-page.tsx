import { useState, useEffect } from "react"
import { useLoaderData, useActionData, useNavigation, Form, type MetaFunction } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Input } from "~/common/components/ui/input"
import { Label } from "~/common/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/common/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select"
import { Progress } from "~/common/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/common/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import { cn } from "~/lib/utils"
import client from "~/lib/supa-client"
import type { Route } from "./+types/test-page"

// 감정 타입 정의
type Emotion = 
  | "기쁨" 
  | "슬픔" 
  | "불안" 
  | "분노" 
  | "지침" 
  | "설렘" 
  | "허무" 
  | "안정" 
  | "혼란"

type EmotionDetail = {
  [key in Emotion]: string[]
}

type ReasonCategory = 
  | "사람/관계"
  | "일/학교/공부"
  | "미래/진로/돈"
  | "건강/컨디션"
  | "혼자만의 생각/과거"
  | "기타"

type DayMood = "worst" | "normal" | "good" | "excellent"

type NeedType = 
  | "comfort"
  | "motivation"
  | "talk"
  | "love"
  | "social"
  | "rest"
  | "none"

// 감정별 세부 키워드 매핑
const emotionDetails: EmotionDetail = {
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

// 공통 이유 카테고리
const reasonCategories: ReasonCategory[] = [
  "사람/관계",
  "일/학교/공부",
  "미래/진로/돈",
  "건강/컨디션",
  "혼자만의 생각/과거",
  "기타"
]

// 직업 옵션
const jobOptions = [
  "학생",
  "직장인",
  "프리랜서",
  "구직 중",
  "기타"
]

// DayMood 값 매핑 (영문 키 -> 한글 라벨)
const dayMoodLabels: Record<DayMood, string> = {
  worst: "최악이었다",
  normal: "그냥 그랬다",
  good: "괜찮았다",
  excellent: "매우 좋았다"
}

// NeedType 값 매핑 (영문 키 -> 한글 라벨)
const needTypeLabels: Record<NeedType, string> = {
  comfort: "위로",
  motivation: "동기부여",
  talk: "상담/이야기 나누기",
  love: "사랑/연애",
  social: "새로운 사람 만나기",
  rest: "쉬고 싶음",
  none: "아무것도 없음"
}

// 필요 타입 옵션
const needOptions: NeedType[] = [
  "comfort",
  "motivation",
  "talk",
  "love",
  "social",
  "rest",
  "none"
]

// DayMood 옵션
const dayMoodOptions: DayMood[] = [
  "worst",
  "normal",
  "good",
  "excellent"
]

// 감정 이모지 매핑
const emotionEmojis: Record<Emotion, string> = {
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

// Pie Chart 색상 팔레트 (따뜻하고 부드러운 톤)
const CHART_COLORS = [
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

type Step = 0 | 1 | 2 | 3 | 4 | 5

interface FormData {
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

interface EmotionStats {
  emotion: Emotion
  count: number
  percentage: number
}

export const meta: MetaFunction = () => [
  { title: "KOI 감정 실험 - 코이창작소" },
  { name: "description", content: "20대의 감정 반응 패턴을 이해하기 위한 연구 실험에 참여해주세요." }
]

// 타입 가드 함수: 확실한 검증
function isValidDayMood(value: string | null | undefined): value is DayMood {
  return value !== null && value !== undefined && value !== "" && dayMoodOptions.includes(value as DayMood)
}

function isValidNeedType(value: string | null | undefined): value is NeedType {
  return value !== null && value !== undefined && value !== "" && needOptions.includes(value as NeedType)
}

// Loader: 통계 데이터 로드
export async function loader({ request }: Route.LoaderArgs) {
  const { data, error } = await client
    .from("emotion_test_responses")
    .select("emotion")

  if (error || !data || data.length === 0) {
    return {
      participantCount: 0,
      emotionStats: [],
      chartData: []
    }
  }

  const total = data.length
  const emotionCounts: Record<Emotion, number> = {
    "기쁨": 0,
    "슬픔": 0,
    "불안": 0,
    "분노": 0,
    "지침": 0,
    "설렘": 0,
    "허무": 0,
    "안정": 0,
    "혼란": 0
  }

  data.forEach((item) => {
    if (item.emotion && item.emotion in emotionCounts) {
      emotionCounts[item.emotion as Emotion]++
    }
  })

  const stats: EmotionStats[] = (Object.keys(emotionCounts) as Emotion[]).map((emotion) => ({
    emotion,
    count: emotionCounts[emotion],
    percentage: Math.round((emotionCounts[emotion] / total) * 100)
  }))

  const chartData = stats
    .filter((stat) => stat.count > 0)
    .map((stat, index) => ({
      name: stat.emotion,
      value: stat.count,
      fill: CHART_COLORS[index % CHART_COLORS.length]
    }))

  return {
    participantCount: total,
    emotionStats: stats,
    chartData
  }
}

// Action: 폼 제출 처리
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  // 필수 필드 파싱
  const name = formData.get("name")?.toString().trim() ?? ""
  const age = formData.get("age")?.toString().trim() ?? ""
  const job = formData.get("job")?.toString().trim() ?? ""
  const contact = formData.get("contact")?.toString().trim() ?? ""
  const emotion = formData.get("emotion")?.toString().trim() as Emotion | null
  const privacyAgreed = formData.get("privacyAgreed") === "on"

  // 선택 필드 파싱
  const emotionDetailsStr = formData.get("emotionDetails")?.toString() ?? "[]"
  let emotionDetails: string[] = []
  if (emotionDetailsStr !== "[]") {
    try {
      emotionDetails = JSON.parse(emotionDetailsStr)
    } catch {
      emotionDetails = []
    }
  }
  const reason = formData.get("reason")?.toString().trim() as ReasonCategory | null
  
  // day_mood: 타입 가드로 확실하게 검증 (빈 문자열도 null로 처리)
  const dayMoodRaw = formData.get("day_mood")
  const dayMoodStr = dayMoodRaw?.toString().trim()
  const day_mood: DayMood | null = isValidDayMood(dayMoodStr) ? (dayMoodStr as DayMood) : null
  
  // need_type: 타입 가드로 확실하게 검증 (빈 문자열도 null로 처리)
  const needTypeRaw = formData.get("need_type")
  const needTypeStr = needTypeRaw?.toString().trim()
  const need_type: NeedType | null = isValidNeedType(needTypeStr) ? (needTypeStr as NeedType) : null

  // 필수 필드 검증
  if (!name) return { error: "이름을 입력해주세요." }
  if (!age) return { error: "나이를 입력해주세요." }
  if (!job) return { error: "직업을 선택해주세요." }
  if (!contact) return { error: "연락처를 입력해주세요." }
  if (!emotion) return { error: "감정을 선택해주세요." }
  if (!privacyAgreed) return { error: "개인정보 동의에 체크해주세요." }

  // Supabase에 전송할 데이터 준비 - 명시적으로 null 설정
  const insertData: Record<string, any> = {
    emotion,
    emotion_details: emotionDetails.length > 0 ? emotionDetails : null,
    reason_category: reason || null,
    name,
    age,
    job,
    contact,
    privacy_agreed: privacyAgreed,
  }

  // day_mood와 need_type은 명시적으로 null 또는 유효한 값만 설정
  insertData.day_mood = day_mood !== null && day_mood !== undefined ? day_mood : null
  insertData.need_type = need_type !== null && need_type !== undefined ? need_type : null

  const { error } = await client
    .from("emotion_test_responses")
    .insert(insertData)

  if (error) {
    return { error: "데이터 저장 중 오류가 발생했습니다. 다시 시도해주세요." }
  }

  return { success: true }
}

export default function TestPage() {
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  
  const isSubmitting = navigation.state === "submitting"
  const [step, setStep] = useState<Step>(0)
  const [formData, setFormData] = useState<FormData>({
    emotion: null,
    emotionDetails: [],
    reason: null,
    name: "",
    age: "",
    job: "",
    contact: "",
    day_mood: null,
    need_type: null,
    privacyAgreed: false
  })

  // loader에서 가져온 통계 데이터 사용
  const participantCount = loaderData?.participantCount || 0
  const emotionStats = loaderData?.emotionStats || []
  const chartData = loaderData?.chartData || []

  const totalSteps = 4
  const progress = step > 0 ? ((step / totalSteps) * 100) : 0

  // action 성공 시 완료 화면으로 이동
  useEffect(() => {
    if (actionData?.success) {
      setStep(5)
    } else if (actionData?.error) {
      alert(actionData.error)
    }
  }, [actionData])

  const handleStart = () => {
    setStep(1)
  }

  const handleEmotionSelect = (emotion: Emotion) => {
    setFormData(prev => ({ ...prev, emotion, emotionDetails: [] }))
    // 자동으로 다음 단계로 이동
    setTimeout(() => setStep(2), 300)
  }

  const handleEmotionDetailToggle = (detail: string) => {
    setFormData(prev => ({
      ...prev,
      emotionDetails: prev.emotionDetails.includes(detail)
        ? prev.emotionDetails.filter(d => d !== detail)
        : [...prev.emotionDetails, detail]
    }))
  }

  const handleSkipStep2 = () => {
    setStep(3)
  }

  const handleNextStep2 = () => {
    setStep(3)
  }

  const handleReasonSelect = (reason: ReasonCategory) => {
    setFormData(prev => ({ ...prev, reason }))
    setTimeout(() => setStep(4), 300)
  }

  // STEP 0: 시작 화면
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-12 px-4 sm:pt-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-sm font-medium text-[#3A556A] mb-2">KOI 감정 실험</h1>
            {participantCount > 0 && (
              <p className="text-xs text-[#3A556A] opacity-70">현재 {participantCount}명이 참여했습니다</p>
            )}
          </div>
          
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl">KOI 감정·행동 패턴 연구 실험 참여 안내</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                이 실험은 20대의 감정 반응 패턴을 이해하기 위한 연구 목적으로 진행됩니다.
                <br /><br />
                총 3단계이며 익명으로 감정 데이터만 기록됩니다.
                <br /><br />
                실험 후에는 연구 참여 보상(경품 응모) 단계가 제공됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button 
                type="button"
                className="w-full bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A] shadow-sm hover:shadow-md" 
                onClick={handleStart}
                size="lg"
              >
                시작하기
              </Button>
              <p className="text-xs text-[#3A556A] text-center opacity-70">
                답변은 익명 통계 및 서비스 연구 목적으로만 사용됩니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 1: 감정 선택
  if (step === 1) {
    const currentEmotionStats = formData.emotion 
      ? emotionStats.find(s => s.emotion === formData.emotion)?.percentage || 0
      : null

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-8 px-4 sm:pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-[#3A556A]">KOI 감정 실험</h2>
            <span className="text-sm text-[#3A556A]">STEP 1 / {totalSteps}</span>
          </div>
          
          <Progress value={progress} className="mb-8 bg-[#DCE7F5] [&>div]:bg-[#4A90E2]" />

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-xl">STEP 1. 현재의 감정을 선택해 주세요</CardTitle>
              <CardDescription>
                이 단계는 "감정 분류 실험"입니다.
                <br />
                아래의 9가지 감정 중 가장 가까운 것을 선택하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(emotionEmojis) as Emotion[]).map((emotion) => (
                  <div key={emotion} className="relative">
                    <Button
                      type="button"
                      variant={formData.emotion === emotion ? "default" : "outline"}
                      className={cn(
                        "h-24 w-full flex-col gap-2 text-base",
                        formData.emotion === emotion 
                          ? "bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
                          : "border-2 border-[#DCE7F5] text-[#3A556A] hover:bg-[#E3ECF9] hover:border-[#4A90E2]"
                      )}
                      onClick={() => handleEmotionSelect(emotion)}
                    >
                      <span className="text-2xl">{emotionEmojis[emotion]}</span>
                      <span>{emotion}</span>
                    </Button>
                    {formData.emotion === emotion && currentEmotionStats !== null && (
                      <p className="text-xs text-[#3A556A] mt-2 text-center opacity-70">
                        현재 이 감정을 선택한 참여자 {currentEmotionStats}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 2: 세부 키워드 선택
  if (step === 2) {
    const details = formData.emotion ? emotionDetails[formData.emotion] : []

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-8 px-4 sm:pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-[#3A556A]">KOI 감정 실험</h2>
            <span className="text-sm text-[#3A556A]">STEP 2 / {totalSteps}</span>
          </div>
          
          <Progress value={progress} className="mb-8 bg-[#DCE7F5] [&>div]:bg-[#4A90E2]" />

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-xl">STEP 2. 선택한 감정의 성향 분석</CardTitle>
              <CardDescription>
                아래의 5개 세부 키워드는 실제 감정 연구에서 사용하는 분류 방식입니다.
                <br />
                선택하거나 건너뛰어도 됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {details.map((detail, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={formData.emotionDetails.includes(detail) ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start h-auto py-3 px-4 text-left",
                    formData.emotionDetails.includes(detail) 
                      ? "bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
                      : "border-2 border-[#DCE7F5] text-[#3A556A] hover:bg-[#E3ECF9] hover:border-[#4A90E2]"
                  )}
                  onClick={() => handleEmotionDetailToggle(detail)}
                >
                  {detail}
                </Button>
              ))}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 hover:bg-[#E3ECF9] hover:text-[#3A556A]"
                onClick={handleSkipStep2}
              >
                건너뛰기
              </Button>
              <Button
                type="button"
                className="flex-1 bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A]"
                onClick={handleNextStep2}
              >
                다음
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 3: 공통 이유 선택
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-8 px-4 sm:pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-[#3A556A]">KOI 감정 실험</h2>
            <span className="text-sm text-[#3A556A]">STEP 3 / {totalSteps}</span>
          </div>
          
          <Progress value={progress} className="mb-8 bg-[#DCE7F5] [&>div]:bg-[#4A90E2]" />

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-xl">STEP 3. 감정의 주요 요인 선택</CardTitle>
              <CardDescription>
                아래 항목은 행동과 감정의 상관 관계를 분석하기 위한 실험 요소입니다.
                <br />
                지금 감정의 가장 큰 이유 하나를 골라주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {reasonCategories.map((reason) => (
                  <Button
                    key={reason}
                    type="button"
                    variant={formData.reason === reason ? "default" : "outline"}
                    className={cn(
                      "h-20 text-base",
                      formData.reason === reason 
                        ? "bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
                        : "border-2 border-[#DCE7F5] text-[#3A556A] hover:bg-[#E3ECF9] hover:border-[#4A90E2]"
                    )}
                    onClick={() => handleReasonSelect(reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 4: 개인정보 + 추가 질문
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-8 px-4 sm:pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-[#3A556A]">KOI 감정 실험</h2>
            <span className="text-sm text-[#3A556A]">STEP 4 / {totalSteps}</span>
          </div>
          
          <Progress value={progress} className="mb-8 bg-[#DCE7F5] [&>div]:bg-[#4A90E2]" />

          <Form method="post">
            <Card>
              <CardHeader className="text-center space-y-3">
                <CardTitle className="text-xl">실험 참여자 확인 및 보상 지급 안내</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  아래 정보는 실험 보상 전달을 위해 필요한 최소 정보입니다.
                  <br /><br />
                  제출하신 개인정보는 감정 연구 데이터와 분리 저장되며, 연구 목적 외의 용도로 사용되지 않습니다.
                  <br /><br />
                  또한, 나이와 직업군은 감정 반응의 차이를 검증하는 데 필요한 기초 연구 변수로만 활용됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hidden inputs for form data */}
                <input type="hidden" name="emotion" value={formData.emotion || ""} />
                <input type="hidden" name="emotionDetails" value={JSON.stringify(formData.emotionDetails)} />
                <input type="hidden" name="reason" value={formData.reason || ""} />
                {formData.day_mood && <input type="hidden" name="day_mood" value={formData.day_mood} />}
                {formData.need_type && <input type="hidden" name="need_type" value={formData.need_type} />}
                
                {/* 필수 입력 */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="이름을 입력해주세요"
                      value={formData.name}
                      onChange={(e) => {
                        e.stopPropagation()
                        setFormData(prev => ({ ...prev, name: e.target.value }))
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">나이 *</Label>
                    <Select
                      value={formData.age}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
                    >
                      <SelectTrigger id="age">
                        <SelectValue placeholder="나이를 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 11 }, (_, i) => i + 19).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}세
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="age" value={formData.age || ""} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job">직업 *</Label>
                    <Select
                      value={formData.job}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, job: value }))}
                    >
                      <SelectTrigger id="job">
                        <SelectValue placeholder="직업을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobOptions.map((job) => (
                          <SelectItem key={job} value={job}>
                            {job}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="job" value={formData.job || ""} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">연락처 *</Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      autoComplete="tel"
                      placeholder="전화번호를 입력해주세요"
                      value={formData.contact}
                      onChange={(e) => {
                        e.stopPropagation()
                        setFormData(prev => ({ ...prev, contact: e.target.value }))
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {/* 연구 변수 (선택 항목) */}
                <div className="space-y-4 pt-4 border-t">
                  <p className="text-xs text-[#3A556A] opacity-70 mb-4">
                    아래 문항은 감정 반응의 문맥을 이해하기 위한 기초 연구 변수입니다. (선택)
                  </p>
                  
                  <div className="space-y-3">
                    <Label>오늘 하루 전반적으로 어땠나요? (선택)</Label>
                    <RadioGroup
                      value={formData.day_mood || ""}
                      onValueChange={(value) => {
                        const validValue = dayMoodOptions.includes(value as DayMood) ? (value as DayMood) : null
                        setFormData(prev => ({ ...prev, day_mood: validValue }))
                      }}
                    >
                      {dayMoodOptions.map((mood) => (
                        <div key={mood} className="flex items-center space-x-2">
                          <RadioGroupItem value={mood} id={`mood-${mood}`} />
                          <Label htmlFor={`mood-${mood}`} className="cursor-pointer font-normal">
                            {dayMoodLabels[mood]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>지금 가장 필요한 것은 무엇인가요? (선택)</Label>
                    <Select
                      value={formData.need_type || ""}
                      onValueChange={(value) => {
                        const validValue = needOptions.includes(value as NeedType) ? (value as NeedType) : null
                        setFormData(prev => ({ ...prev, need_type: validValue }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {needOptions.map((need) => (
                          <SelectItem key={need} value={need}>
                            {needTypeLabels[need]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-start space-x-2 pt-4 border-t">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacyAgreed"
                    checked={formData.privacyAgreed}
                    onChange={(e) => 
                      setFormData(prev => ({ ...prev, privacyAgreed: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-[#DCE7F5] text-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2] cursor-pointer"
                  />
                  <Label 
                    htmlFor="privacy" 
                    className="text-sm leading-relaxed cursor-pointer font-normal"
                  >
                    위 정보는 경품 추첨 및 연구 통계 목적으로만 사용되며, 그 외 용도로 사용되지 않습니다. *
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A] shadow-sm hover:shadow-md disabled:opacity-50"
                  disabled={!formData.name || !formData.age || !formData.job || !formData.contact || !formData.privacyAgreed || isSubmitting}
                >
                  {isSubmitting ? "제출 중..." : "제출하기"}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </div>
      </div>
    )
  }

  // STEP 5: 완료 화면
  if (step === 5) {
    const chartConfig = chartData.reduce((acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: item.fill
      }
      return acc
    }, {} as Record<string, { label: string; color: string }>)

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-6 pb-12 px-4 sm:pt-20">
        <div className="max-w-3xl mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center space-y-4">
              <div className="text-4xl mb-4">🎉</div>
              <CardTitle className="text-2xl">참여해 주셔서 감사합니다!</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                이번 감정 연구는 총 {participantCount}명 참여 중입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 통계 차트 */}
              {chartData.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-center text-[#3A556A]">
                    현재까지의 감정 분포 통계
                  </h3>
                  <div className="flex items-center justify-center">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[300px]">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, value }) => {
                            const total = chartData.reduce((sum, item) => sum + item.value, 0)
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0
                            return `${name} ${percentage}%`
                          }}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
              )}

              <p className="text-sm text-[#3A556A] opacity-80 text-center">
                당첨되신 분께는 개별 연락을 드립니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}

