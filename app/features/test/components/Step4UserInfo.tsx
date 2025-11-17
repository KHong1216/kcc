import { Form } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Input } from "~/common/components/ui/input"
import { Label } from "~/common/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select"
import { Progress } from "~/common/components/ui/progress"
import type { StepProps } from "../types"
import { jobOptions } from "../types"

interface Step4UserInfoProps extends StepProps {
  totalSteps: number
  progress: number
  isSubmitting: boolean
}

export default function Step4UserInfo({
  step,
  formData,
  updateFormData,
  totalSteps,
  progress,
  isSubmitting
}: Step4UserInfoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-8 px-4 sm:pt-24">
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
              <input type="hidden" name="emotion" value={formData.emotion || ""} />
              <input type="hidden" name="emotionDetails" value={JSON.stringify(formData.emotionDetails)} />
              <input type="hidden" name="reason" value={formData.reason || ""} />
              
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
                      updateFormData({ name: e.target.value })
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">나이 *</Label>
                  <Select
                    value={formData.age}
                    onValueChange={(value) => updateFormData({ age: value })}
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
                    onValueChange={(value) => updateFormData({ job: value })}
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
                      updateFormData({ contact: e.target.value })
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-4 border-t">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={(e) => updateFormData({ privacyAgreed: e.target.checked })}
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
