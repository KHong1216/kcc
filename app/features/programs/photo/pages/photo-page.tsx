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
        <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            {/* 히어로 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(180deg, #F0F9FF, #E8F4FB)' }}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <Construction className="w-16 h-16 mx-auto mb-4" style={{ color: '#A8C5F8' }} />
                    </div>
                    <Badge className="mb-6 text-base px-4 py-2 font-semibold" style={{ backgroundColor: '#A8C5F8', color: '#1E3A8A' }}>
                        준비중
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#3B2F2F] leading-tight" style={{ lineHeight: '1.6' }}>
                        사진 캠프
                    </h1>
                    <p className="text-xl text-[#3B2F2F]/85 mb-8 leading-relaxed" style={{ lineHeight: '1.6' }}>
                        곧 만나보실 수 있는 특별한 프로그램입니다
                    </p>
                    
                    <Card className="max-w-2xl mx-auto bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Camera className="w-12 h-12 mx-auto mb-4" style={{ color: '#A8C5F8' }} />
                                <h2 className="text-2xl font-extrabold tracking-tight mb-4 text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                                    준비중인 프로그램
                                </h2>
                                <p className="text-[#3B2F2F]/85 mb-6 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                    사진을 통해 자신을 발견하고 표현하는 특별한 프로그램을 준비하고 있습니다.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-[#7A6666] opacity-80">
                                    <Clock className="w-5 h-5" style={{ color: '#A8C5F8' }} />
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
