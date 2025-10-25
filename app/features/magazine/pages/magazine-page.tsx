import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "무색무취 매거진 - KOI Creative Lab" },
        { name: "description", content: "무색무취 매거진 - 청년들의 이야기" }
    ];
}

export default function MagazinePage() {
    return (
        <div className="px-20 py-20 space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">무색무취 매거진</h1>
                <p className="text-gray-600">청년들의 진솔한 이야기를 담은 매거진</p>
            </div>
            
            <div className="max-w-6xl mx-auto space-y-16">
                {/* 메인 소개 */}
                <Card className="p-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-4">무색무취의 의미</CardTitle>
                        <CardDescription className="text-lg">
                            색깔도 냄새도 없는, 가장 순수한 청년들의 목소리
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            무색무취 매거진은 청년들이 자신의 이야기를 편견 없이, 
                            가식 없이 솔직하게 나눌 수 있는 공간입니다. 
                            우리는 각자의 색깔과 향기를 가진 청년들의 이야기를 
                            가장 순수한 형태로 담아냅니다.
                        </p>
                    </CardContent>
                </Card>

                {/* 매거진 특징 */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">에세이 섹션</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                청년들이 직접 쓴 에세이를 통해 그들의 일상, 고민, 
                                꿈과 현실 사이의 갈등을 생생하게 전달합니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 개인 성장 스토리</li>
                                <li>• 사회적 이슈에 대한 관점</li>
                                <li>• 일상 속 깨달음과 통찰</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">인터뷰 섹션</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                다양한 분야에서 활동하는 청년들을 인터뷰하여 
                                그들의 경험과 조언을 공유합니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 창업가들의 이야기</li>
                                <li>• 예술가들의 창작 과정</li>
                                <li>• 사회 활동가들의 경험</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* 발행 정보 */}
                <div className="bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">발행 정보</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="font-semibold mb-2">발행 주기</h3>
                            <p className="text-sm text-gray-600">분기별 발행 (3개월마다)</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📖</span>
                            </div>
                            <h3 className="font-semibold mb-2">발행 형태</h3>
                            <p className="text-sm text-gray-600">온라인 매거진 + 인쇄본</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✍️</span>
                            </div>
                            <h3 className="font-semibold mb-2">기고 방식</h3>
                            <p className="text-sm text-gray-600">공개 모집 + 직접 섭외</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}