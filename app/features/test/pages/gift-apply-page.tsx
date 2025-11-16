import { Form, Link, type MetaFunction } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Label } from "~/common/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/common/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select"
import client from "~/lib/supa-client"
import type { Route } from "./+types/gift-apply-page"

export const meta: MetaFunction = () => [
  { title: "경품 신청 - KOI 감정 실험" },
  { name: "description", content: "경품 신청서를 작성해주세요." }
]

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const gift = url.searchParams.get("gift") || ""

  const giftNames: Record<string, string> = {
    essay: "KOI 에세이 체험권",
    "love-test": "연애 경향성 테스트",
    photo: "KOI 컨셉 촬영 체험권"
  }

  return {
    gift,
    giftName: giftNames[gift] || gift
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const preferredDay = formData.get("preferredDay")?.toString().trim() || null
  const preferredTime = formData.get("preferredTime")?.toString().trim() || null
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
    gift,
    preferred_day: preferredDay || null,
    preferred_time: preferredTime || null
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
    message: "신청이 완료되었습니다!\n담당 KOI 매니저가 곧 연락드릴게요 :)"
  }
}

export default function GiftApplyPage({ loaderData, actionData }: Route.ComponentProps) {
  const giftData = (loaderData as { gift: string; giftName: string }) || { gift: "", giftName: "" }
  const { gift, giftName } = giftData

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
                {actionData && "message" in actionData ? actionData.message : "신청이 완료되었습니다!\n담당 KOI 매니저가 곧 연락드릴게요 :)"}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
      <div className="max-w-lg mx-auto flex flex-col space-y-6">
        <Card>
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold">🎉 경품 신청서</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              선택하신 체험 혜택을 안내드리기 위해 간단한 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <input type="hidden" name="gift" value={gift} />

              {gift && (
                <div className="p-4 bg-[#E3ECF9] rounded-lg border border-[#4A90E2]">
                  <p className="text-sm text-[#3A556A] font-medium">선택한 경품</p>
                  <p className="text-base text-[#3A556A] font-semibold mt-1">{giftName}</p>
                </div>
              )}

              {actionData?.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{actionData.error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>가능한 요일 (선택)</Label>
                  <RadioGroup name="preferredDay" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekday" id="day-weekday" />
                      <Label htmlFor="day-weekday" className="cursor-pointer font-normal">
                        평일
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekend" id="day-weekend" />
                      <Label htmlFor="day-weekend" className="cursor-pointer font-normal">
                        주말
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="day-any" />
                      <Label htmlFor="day-any" className="cursor-pointer font-normal">
                        상관없음
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">가능한 시간 (선택)</Label>
                  <Select name="preferredTime">
                    <SelectTrigger id="preferredTime">
                      <SelectValue placeholder="시간을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">오전</SelectItem>
                      <SelectItem value="afternoon">오후</SelectItem>
                      <SelectItem value="evening">저녁</SelectItem>
                      <SelectItem value="any">상관없음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <CardFooter className="px-0 pb-0">
                <Button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A]"
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

