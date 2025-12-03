import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Progress } from "~/common/components/ui/progress"
import { cn } from "~/lib/utils"
import type { StepProps, ReasonCategory } from "../types"
import { reasonCategories } from "../types"

interface Step3ReasonSelectProps extends StepProps {
  totalSteps: number
  progress: number
}

export default function Step3ReasonSelect({
  step,
  formData,
  updateFormData,
  goNext,
  totalSteps,
  progress
}: Step3ReasonSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button[type="button"]')
      buttons.forEach((button) => {
        const el = button as HTMLElement
        el.classList.remove('bg-[#4A90E2]', 'text-white', 'border-[#4A90E2]')
        el.classList.add('border-2', 'border-[#DCE7F5]', 'text-[#3A556A]')
      })
    }
  }, [])

  const handleReasonSelect = (reason: ReasonCategory) => {
    updateFormData({ reason })
    setTimeout(() => goNext(), 300)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-8 px-4 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-[#3A556A]">Re-Frame 감정 실험</h2>
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
                  key={`step3-${step}-${reason}`}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-20 text-base",
                    (step === 3 && formData.reason === reason)
                      ? "bg-[#4A90E2] text-white border-[#4A90E2] hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
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
