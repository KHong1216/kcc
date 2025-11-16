import { useState } from "react"
import { type MetaFunction } from "react-router"
import { useNavigate } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/common/components/ui/card"
import { Button } from "~/common/components/ui/button"
import { cn } from "~/lib/utils"
import type { Route } from "./+types/gift-page"
import { Check } from "lucide-react"

export const meta: MetaFunction = () => [
  { title: "경품 선택 - KOI 감정 실험" },
  { name: "description", content: "KOI 감정 연구 실험 경품 혜택을 선택해주세요." }
]

export async function loader({ request }: Route.LoaderArgs) {
  return {}
}

const giftOptions = [
  {
    id: "essay",
    title: "KOI 에세이 체험권",
    description: "나의 한해 이야기를 에세이로 작성하는 특별한 경험"
  },
  {
    id: "love-test",
    title: "연애 경향성 테스트",
    description: "나의 연애 스타일과 경향을 알아보는 시간"
  },
  {
    id: "photo",
    title: "KOI 컨셉 촬영 체험권",
    description: "외적으로 꾸민 나의 모습을 스냅사진으로 담아내는 경험"
  }
]

export default function GiftPage() {
  const navigate = useNavigate()
  const [selectedGift, setSelectedGift] = useState<string>("")

  const handleSelectGift = (giftId: string) => {
    setSelectedGift(giftId)
  }

  const handleNext = () => {
    if (selectedGift) {
      navigate(`/test/gift/apply?gift=${selectedGift}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white pt-20 pb-12 px-4 sm:pt-24">
      <div className="max-w-lg mx-auto flex flex-col space-y-6">
        <Card>
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold">🎁 KOI 감정 연구 실험 경품 혜택</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              아래에서 원하시는 체험을 선택해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
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
                    <h3 className="font-semibold text-[#3A556A] mb-1">{gift.title}</h3>
                    <p className="text-sm text-[#3A556A] opacity-70 leading-relaxed">
                      {gift.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Button
          onClick={handleNext}
          disabled={!selectedGift}
          className="w-full bg-[#4A90E2] text-white hover:bg-[#E3ECF9] hover:text-[#3A556A] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          선택하고 다음 단계로 이동
        </Button>
      </div>
    </div>
  )
}

