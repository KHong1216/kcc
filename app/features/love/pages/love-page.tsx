import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"
import { Button } from "../../../common/components/ui/button"
import { Badge } from "../../../common/components/ui/badge"
import { Heart, BookOpen, Calendar, Award, Users, PenTool } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
        { title: "연애 - KOI Creative Lab" },
        { name: "description", content: "코이 창작소 연애 관련 활동" }
    ];
}

export default function LovePage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        좋은 사람, 좋은 사랑 캠프
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        연애는 싸우는 게 아니라, 이해하고 성장하는 과정입니다.
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
                        <p className="text-gray-700 leading-relaxed">
                            우리는 종종 연애 속에서 상대가 바뀌길 바라며 다툽니다. 하지만 진짜 변화는 <span className="font-semibold text-pink-600">'나'</span>로부터 시작됩니다.<br/>
                            <span className="font-semibold text-pink-600">'좋은 사람, 좋은 사랑 캠프'</span>는 사랑을 통해 성장하고 싶은 사람들을 위한 한 달간의 마음 프로젝트입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 프로그램 소개 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">💌 프로그램 소개</h2>
                    </div>
                    
                    <Card className="mb-8">
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        연애에서 자주 부딪히는 감정들 — <span className="font-semibold text-pink-600">서운함, 불안, 거리감, 기대</span> —<br/>
                                        그 속에 숨은 진짜 마음을 들여다보는 시간을 마련했습니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        매일 제시되는 하나의 주제 단어를 바탕으로 짧은 글을 쓰며,<br/>
                                        <span className="font-semibold text-pink-600">'나는 어떤 연애를 하고 싶은 사람인가'</span>를 기록하게 됩니다.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-6">
                                    <div className="text-center">
                                        <PenTool className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">매일의 성장 기록</h3>
                                        <p className="text-gray-600 text-sm">
                                            단순히 글을 쓰는 프로그램이 아닙니다.<br/>
                                            당신이 연애를 통해 '좋은 사람'이 되어가는 여정이에요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
                                <p className="text-lg text-gray-800 font-medium">
                                    상대가 아닌 <span className="text-blue-600 font-bold">'나'</span>를 바꾸는 연애, 그 시작을 함께해요.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 참여 방식 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">📘 참여 방식</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">기간</h3>
                                <p className="text-sm text-gray-600">한 달간<br/>(총 30일)</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">구성</h3>
                                <p className="text-sm text-gray-600">매일 1개의 주제 단어<br/>+ 짧은 에세이 작성</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">장소</h3>
                                <p className="text-sm text-gray-600">온라인<br/>(개인 공간에서 자유롭게)</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <PenTool className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">결과물</h3>
                                <p className="text-sm text-gray-600">나의 연애 에세이북<br/>(디지털 책 형태)</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 에세이북 발간 및 시상 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">🎁 에세이북 발간 및 시상</h2>
                    </div>
                    
                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Award className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
                                <p className="text-lg text-gray-800 mb-6">
                                    프로젝트를 모두 완주하신 분 중 <span className="font-bold text-yellow-600">세 분</span>을 선정하여,
                                </p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 text-gray-900">에세이북 발간</h3>
                                        <p className="text-sm text-gray-600">전자책으로 정식 발간</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 text-gray-900">원고료 지급</h3>
                                        <p className="text-sm text-gray-600">10만원 지급</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 text-gray-900">아카이브 소개</h3>
                                        <p className="text-sm text-gray-600">홈페이지에 소개</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 추천 대상 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">💭 이런 분께 추천합니다</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-pink-600 text-sm">💔</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">자주 다투며 관계가 지치는 분</h3>
                                        <p className="text-sm text-gray-600">갈등의 원인을 찾고 해결 방법을 배워갑니다.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 text-sm">🤔</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">연애 중 '내가 왜 이렇게 되는지' 궁금한 분</h3>
                                        <p className="text-sm text-gray-600">자신의 연애 패턴을 이해하고 개선해갑니다.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-600 text-sm">🌱</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">더 성숙한 사랑을 하고 싶은 분</h3>
                                        <p className="text-sm text-gray-600">건강하고 성숙한 관계를 만들어갑니다.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-purple-600 text-sm">📝</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">연애 경험을 '성장 기록'으로 남기고 싶은 분</h3>
                                        <p className="text-sm text-gray-600">소중한 경험을 기록으로 남겨보세요.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 우리가 믿는 것 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">🌿 우리가 믿는 것</h2>
                    </div>
                    
                    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                        <CardContent className="p-8 text-center">
                            <Heart className="w-16 h-16 text-green-600 mx-auto mb-6" />
                            <div className="space-y-6">
                                <p className="text-xl text-gray-800 font-medium">
                                    좋은 사랑은 좋은 사람이 만들어갑니다.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    사랑이 어렵게 느껴질 때,<br/>
                                    그건 '상대가 틀렸기 때문'이 아니라<br/>
                                    <span className="font-semibold text-green-600">'내가 아직 더 배워가는 중이기 때문'</span>입니다.
                                </p>
                                <div className="bg-white/70 rounded-lg p-6 mt-8">
                                    <p className="text-lg text-gray-800 font-medium">
                                        이 캠프는 싸움의 이유를 찾기보다<br/>
                                        <span className="text-green-600 font-bold">사랑의 방향을 찾아가는 여정</span>입니다
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        함께 성장하는 사랑을 시작해보세요
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        한 달 후, 더 나은 나를 만나보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg">
                            캠프 신청하기
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
                            자세히 알아보기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}