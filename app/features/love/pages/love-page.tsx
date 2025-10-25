import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "연애 - KOI Creative Lab" },
        { name: "description", content: "코이 창작소 연애 관련 활동" }
    ];
}

export default function LovePage() {
    return (
        <div className="px-20 py-20 space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">연애</h1>
                <p className="text-gray-600">진정한 사랑을 찾아가는 여정을 함께합니다</p>
            </div>
            
            <div className="max-w-6xl mx-auto space-y-16">
                {/* 메인 소개 */}
                <Card className="p-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-4">연애에 대한 새로운 관점</CardTitle>
                        <CardDescription className="text-lg">
                            코이 창작소의 연애 프로그램은 단순한 만남을 넘어서, 진정한 관계의 의미를 탐구합니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            현대 사회에서 연애는 많은 청년들에게 복잡한 감정과 고민을 안겨줍니다. 
                            우리는 건강한 연애 관계를 위한 소통 방법, 경계 설정, 그리고 진정한 사랑의 의미에 대해 
                            함께 고민하고 배워갑니다.
                        </p>
                    </CardContent>
                </Card>

                {/* 활동 소개 */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">연애 상담 프로그램</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                전문 상담사와 함께하는 1:1 연애 상담을 통해 개인의 연애 패턴과 
                                관계 스타일을 분석하고 개선점을 찾아갑니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 개인별 연애 스타일 분석</li>
                                <li>• 건강한 관계 설정 방법</li>
                                <li>• 갈등 해결 및 소통 기술</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">연애 워크샵</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                다양한 연령대의 참가자들과 함께 연애에 대한 다양한 주제를 
                                토론하고 경험을 공유하는 워크샵입니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 연애 심리학 기초</li>
                                <li>• 데이트 문화 탐구</li>
                                <li>• 성별 고정관념 극복</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* 프로그램 특징 */}
                <div className="bg-blue-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">프로그램 특징</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💕</span>
                            </div>
                            <h3 className="font-semibold mb-2">건강한 관계</h3>
                            <p className="text-sm text-gray-600">서로를 존중하고 성장시키는 관계의 중요성을 배웁니다.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🗣️</span>
                            </div>
                            <h3 className="font-semibold mb-2">소통 기술</h3>
                            <p className="text-sm text-gray-600">진정한 소통을 통한 깊이 있는 관계를 만들어갑니다.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="font-semibold mb-2">개인 성장</h3>
                            <p className="text-sm text-gray-600">연애를 통해 자신을 더 잘 이해하고 성장합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}