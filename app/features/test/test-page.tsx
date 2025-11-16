import { useState, useEffect } from "react"
import { useLoaderData, useActionData, useNavigation, type MetaFunction } from "react-router"
import client from "~/lib/supa-client"
import type { Route } from "./+types/test-page"
import type { FormData, Step, Emotion, ReasonCategory, DayMood, NeedType, EmotionStats } from "./types"
import { isValidDayMood, isValidNeedType } from "./utils"
import Step0Start from "./Step0Start"
import Step1EmotionSelect from "./Step1EmotionSelect"
import Step2EmotionDetail from "./Step2EmotionDetail"
import Step3ReasonSelect from "./Step3ReasonSelect"
import Step4UserInfo from "./Step4UserInfo"
import Step5Complete from "./Step5Complete"

export const meta: MetaFunction = () => [
  { title: "KOI 감정 실험 - 코이창작소" },
  { name: "description", content: "20대의 감정 반응 패턴을 이해하기 위한 연구 실험에 참여해주세요." }
]

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
      fill: ["#FFB6C1", "#FFD4A3", "#FFE5B4", "#E6E6FA", "#B0E0E6", "#DDA0DD", "#F0E68C", "#98D8C8", "#FFCCCB"][index % 9]
    }))

  return {
    participantCount: total,
    emotionStats: stats,
    chartData
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const name = formData.get("name")?.toString().trim() ?? ""
  const age = formData.get("age")?.toString().trim() ?? ""
  const job = formData.get("job")?.toString().trim() ?? ""
  const contact = formData.get("contact")?.toString().trim() ?? ""
  const emotion = formData.get("emotion")?.toString().trim() as Emotion | null
  const privacyAgreed = formData.get("privacyAgreed") === "on"

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
  
  const dayMoodRaw = formData.get("day_mood")
  const dayMoodStr = dayMoodRaw?.toString().trim()
  const day_mood: DayMood | null = isValidDayMood(dayMoodStr) ? (dayMoodStr as DayMood) : null
  
  const needTypeRaw = formData.get("need_type")
  const needTypeStr = needTypeRaw?.toString().trim()
  const need_type: NeedType | null = isValidNeedType(needTypeStr) ? (needTypeStr as NeedType) : null

  if (!name) return { error: "이름을 입력해주세요." }
  if (!age) return { error: "나이를 입력해주세요." }
  if (!job) return { error: "직업을 선택해주세요." }
  if (!contact) return { error: "연락처를 입력해주세요." }
  if (!emotion) return { error: "감정을 선택해주세요." }
  if (!privacyAgreed) return { error: "개인정보 동의에 체크해주세요." }

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

  const participantCount = loaderData?.participantCount || 0
  const emotionStats = loaderData?.emotionStats || []
  const chartData = loaderData?.chartData || []

  const totalSteps = 4
  const progress = step > 0 ? ((step / totalSteps) * 100) : 0

  useEffect(() => {
    if (actionData?.success) {
      goToStep(5)
    } else if (actionData?.error) {
      alert(actionData.error)
    }
  }, [actionData])

  const updateFormData = (newValues: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newValues }))
  }

  const goToStep = (nextStep: Step) => {
    setStep(nextStep)

    if (nextStep === 1) {
      setFormData(prev => ({ ...prev, emotion: null, emotionDetails: [], reason: null }))
    }

    if (nextStep === 2) {
      setFormData(prev => ({ ...prev, emotionDetails: [], reason: null }))
    }

    if (nextStep === 3) {
      setFormData(prev => ({ ...prev, reason: null }))
    }

    if (nextStep === 4) {
      setFormData(prev => ({ ...prev, day_mood: null, need_type: null }))
    }
  }

  return (
    <div key={step}>
      {step === 0 && <Step0Start participantCount={participantCount} onStart={() => goToStep(1)} />}
      
      {step === 1 && (
        <Step1EmotionSelect
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          goNext={() => goToStep(2)}
          totalSteps={totalSteps}
          progress={progress}
          emotionStats={emotionStats}
        />
      )}
      
      {step === 2 && (
        <Step2EmotionDetail
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          goNext={() => goToStep(3)}
          totalSteps={totalSteps}
          progress={progress}
        />
      )}
      
      {step === 3 && (
        <Step3ReasonSelect
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          goNext={() => goToStep(4)}
          totalSteps={totalSteps}
          progress={progress}
        />
      )}
      
      {step === 4 && (
        <Step4UserInfo
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          goNext={() => {}}
          totalSteps={totalSteps}
          progress={progress}
          isSubmitting={isSubmitting}
        />
      )}
      
      {step === 5 && <Step5Complete participantCount={participantCount} chartData={chartData} />}
    </div>
  )
}
