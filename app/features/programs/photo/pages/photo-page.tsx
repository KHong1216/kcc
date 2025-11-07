import type { MetaFunction } from "react-router"
import { Card, CardContent } from "../../../../common/components/ui/card"
import { Badge } from "../../../../common/components/ui/badge"
import { Camera, Clock, Construction } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
      { title: "포토 캠프 - 나만의 포트폴리오 만들기 | 코이창작소" },
      { name: "description", content: "전문 사진가와 함께하는 포토 캠프. 나만의 포트폴리오를 제작하고 사진 기술을 배워보세요." },
      { name: "keywords", content: "포토캠프, 사진촬영, 포트폴리오제작, 사진상담, 코이창작소" },
      { property: "og:title", content: "포토 캠프 - 나만의 포트폴리오 만들기" },
      { property: "og:description", content: "전문 사진가와 함께하는 포토 캠프. 나만의 포트폴리오를 제작하고 사진 기술을 배워보세요." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-photo.jpg" },
    ];
  };

export default function PhotoPage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <Construction className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    </div>
                    <Badge className="mb-4 bg-purple-500 text-white">준비중</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        사진 캠프
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        곧 만나보실 수 있는 특별한 프로그램입니다
                    </p>
                    
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                    준비중인 프로그램
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    사진을 통해 자신을 발견하고 표현하는 특별한 프로그램을 준비하고 있습니다.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                    <Clock className="w-5 h-5" />
                                    <span>곧 공개 예정</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}