import type { MetaFunction } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card"
import { Button } from "../../../common/components/ui/button"
import { Badge } from "../../../common/components/ui/badge"
import { Heart, Clock, Construction } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
        { title: "연애 캠프 준비중 | 코이창작소" },
        { name: "description", content: "연애 캠프 프로그램이 준비중입니다. 곧 만나보실 수 있습니다." }
    ];
}

export default function LovePage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-red-50 to-purple-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <Construction className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                    </div>
                    <Badge className="mb-4 bg-pink-500 text-white">준비중</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        연애 캠프
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        곧 만나보실 수 있는 특별한 프로그램입니다
                    </p>
                    
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                                    준비중인 프로그램
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    건강한 연애와 관계에 대해 배우고 성장하는 특별한 프로그램을 준비하고 있습니다.
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