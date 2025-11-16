import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"

interface Step0StartProps {
  participantCount: number
  onStart: () => void
}

export default function Step0Start({ participantCount, onStart }: Step0StartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
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
              onClick={onStart}
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

