import { useState } from "react"
import { Form, Link, useActionData, type MetaFunction } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { cn } from "~/lib/utils"
import client from "~/lib/supa-client"
import type { Route } from "./+types/gift-page"
import { Check } from "lucide-react"

export const meta: MetaFunction = () => [
  { title: "경품 선택 - 코이창작소 감정 실험" },
  { name: "description", content: "코이창작소 감정 연구 실험 경품 혜택을 선택해주세요." }
]

export async function loader({ request }: Route.LoaderArgs) {
  return {}
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const gift = formData.get("gift")?.toString().trim() || ""

  if (!gift) {
    return { error: "경품 정보가 없습니다." }
  }

  // 가장 최근 제출한 사용자의 레코드를 찾아서 업데이트 (30분 이내)
  // RLS 정책과 일치하도록 30분 이내 조건을 직접 추가
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const { data: latestResponse, error: findError } = await client
    .from("emotion_test_responses")
    .select("id, contact, created_at")
    .gte("created_at", thirtyMinutesAgo)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (findError || !latestResponse) {
    console.error("[action] find latest response error:", findError)
    return { error: "사용자 정보를 찾을 수 없습니다. 다시 시도해주세요." }
  }

  // 30분 이내 제출한 레코드인지 확인
  const createdAt = new Date(latestResponse.created_at)
  const now = new Date()
  const minutesDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60)
  
  if (minutesDiff > 30) {
    return { error: "제출 후 30분 이내에만 경품 신청이 가능합니다." }
  }

  // 경품 정보 업데이트
  // RLS 정책과 일치하도록 30분 이내 조건 추가
  const updateData: Record<string, any> = {
    gift
  }

  const { error: updateError, data: updateResult } = await client
    .from("emotion_test_responses")
    .update(updateData)
    .eq("id", latestResponse.id)
    .gte("created_at", thirtyMinutesAgo)
    .select()

  if (updateError) {
    console.error("[action] update gift info error:", updateError)
    return { error: `신청 저장 중 오류가 발생했습니다: ${updateError.message || "알 수 없는 오류"}` }
  }

  if (!updateResult || updateResult.length === 0) {
    console.error("[action] update gift info: no rows updated")
    return { error: "업데이트된 레코드가 없습니다. RLS 정책을 확인해주세요." }
  }

  return {
    success: true,
    message: "신청이 완료되었습니다!\n담당 코이창작소 매니저가 곧 연락드릴게요 :)"
  }
}

const giftOptions = [
  {
    id: "essay",
    title: "에세이 체험권"
  },
  {
    id: "love-test",
    title: "연애 경향성 테스트"
  },
]

export default function GiftPage() {
  const actionData = useActionData<typeof action>()
  const [selectedGift, setSelectedGift] = useState<string>("")

  // 신청 완료 화면
  if (actionData && "success" in actionData && actionData.success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader className="text-center space-y-4">
              <div className="text-4xl mb-4">🎉</div>
              <CardTitle className="text-2xl font-bold">신청 완료!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base leading-relaxed text-center text-[#3A556A] whitespace-pre-line">
                {actionData && "message" in actionData ? actionData.message : "신청이 완료되었습니다!\n담당 코이창작소 매니저가 곧 연락드릴게요 :)"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Link to="/test">
                <Button variant="outline">
                  다시하기
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // 경품 선택 화면
  const handleSelectGift = (giftId: string) => {
    setSelectedGift(giftId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
      <div className="max-w-lg mx-auto flex flex-col space-y-6">
        <Card>
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold">🎁 코이창작소 감정 연구 실험 경품 혜택</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              아래에서 원하시는 체험을 선택해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-3">
              <input type="hidden" name="gift" value={selectedGift} />

              {actionData?.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{actionData.error}</p>
                </div>
              )}

              {giftOptions.map((gift) => (
                <button
                  key={gift.id}
                  type="button"
                  onClick={() => handleSelectGift(gift.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all",
                    "hover:border-[#4A90E2] hover:bg-[#E3ECF9]",
                    selectedGift === gift.id
                      ? "border-[#4A90E2] bg-[#E3ECF9] shadow-md"
                      : "border-[#DCE7F5] bg-white"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        selectedGift === gift.id
                          ? "border-[#4A90E2] bg-[#4A90E2]"
                          : "border-gray-300"
                      )}
                    >
                      {selectedGift === gift.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#3A556A]">{gift.title}</h3>
                    </div>
                  </div>
                </button>
              ))}

              <CardFooter className="px-0 pb-0 pt-4">
                <Button
                  type="submit"
                  disabled={!selectedGift}
                  className="w-full bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  신청하기
                </Button>
              </CardFooter>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
