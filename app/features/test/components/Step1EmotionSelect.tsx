import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { Progress } from "~/common/components/ui/progress"
import { cn } from "~/lib/utils"
import type { StepProps, Emotion, EmotionStats } from "../types"
import { emotionEmojis } from "../types"

interface Step1EmotionSelectProps extends StepProps {
  totalSteps: number
  progress: number
  emotionStats: EmotionStats[]
}

export default function Step1EmotionSelect({
  step,
  formData,
  updateFormData,
  goNext,
  totalSteps,
  progress,
  emotionStats
}: Step1EmotionSelectProps) {
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

  const currentEmotionStats = formData.emotion 
    ? emotionStats.find(s => s.emotion === formData.emotion)?.percentage || 0
    : null

  const handleEmotionSelect = (emotion: Emotion) => {
    updateFormData({ emotion, emotionDetails: [] })
    setTimeout(() => goNext(), 300)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-8 px-4 sm:pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-[#3A556A]">코이창작소 감정 실험</h2>
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
                <div key={`step1-${step}-${emotion}`} className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-24 w-full flex-col gap-2 text-base",
                      (step === 1 && formData.emotion === emotion)
                        ? "bg-[#4A90E2] text-white border-[#4A90E2] hover:bg-[#E3ECF9] hover:text-[#3A556A]" 
                        : "border-2 border-[#DCE7F5] text-[#3A556A] hover:bg-[#E3ECF9] hover:border-[#4A90E2]"
                    )}
                    onClick={() => handleEmotionSelect(emotion)}
                  >
                    <span className="text-2xl">{emotionEmojis[emotion]}</span>
                    <span>{emotion}</span>
                  </Button>
                  {(step === 1 && formData.emotion === emotion && currentEmotionStats !== null) && (
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
