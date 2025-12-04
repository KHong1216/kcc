import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Progress } from "~/common/components/ui/progress"
import { cn } from "~/lib/utils"
import type { StepProps } from "../types"
import { emotionDetails } from "../types"

interface Step2EmotionDetailProps extends StepProps {
  totalSteps: number
  progress: number
}

export default function Step2EmotionDetail({
  step,
  formData,
  updateFormData,
  goNext,
  totalSteps,
  progress
}: Step2EmotionDetailProps) {
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

  const details = formData.emotion ? emotionDetails[formData.emotion] : []

  const handleEmotionDetailToggle = (detail: string) => {
    const newDetails = formData.emotionDetails.includes(detail)
      ? formData.emotionDetails.filter(d => d !== detail)
      : [...formData.emotionDetails, detail]
    
    updateFormData({ emotionDetails: newDetails })
    
    setTimeout(() => {
      goNext()
    }, 300)
  }

  const handleSkip = () => {
    goNext()
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-8 px-4 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-[#3A556A]">코이창작소 감정 실험</h2>
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
                key={`step2-${step}-${index}-${detail}`}
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start h-auto py-3 px-4 text-left",
                  (step === 2 && formData.emotionDetails.includes(detail))
                    ? "bg-[#4A90E2] text-white border-[#4A90E2] hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
                    : "border-2 border-[#DCE7F5] text-[#3A556A] hover:bg-[#E3ECF9] hover:border-[#4A90E2]"
                )}
                onClick={() => handleEmotionDetailToggle(detail)}
              >
                {detail}
              </Button>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="ghost"
              className="w-full hover:bg-[#E3ECF9] hover:text-[#3A556A]"
              onClick={handleSkip}
            >
              건너뛰기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
