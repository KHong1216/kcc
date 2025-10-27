import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"
import { Button } from "../../../common/components/ui/button"
import { Badge } from "../../../common/components/ui/badge"
import { Camera, Heart, BookOpen, Calendar, Award, Users, PenTool, Sparkles } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
        { title: "사진 캠프 | 코이창작소" },
        { name: "description", content: "외적으로만 꾸미는 것이 아닌, 내면까지 아름답게 표현하는 시간. 진짜 나를 담는 법을 배워보세요." }
    ];
}

export default function MagazinePage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6">
                        <Camera className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        사진 캠프
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        외적으로만 꾸미는 것이 아닌, 내면까지 아름답게 표현하는 시간
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
                        <p className="text-gray-700 leading-relaxed">
                            우리는 종종 <span className="font-semibold text-purple-600">'예쁘게 찍히는 법'</span>을 배워왔지만,<br/>
                            <span className="font-semibold text-purple-600">'진짜 나를 담는 법'</span>은 배워본 적이 없습니다.<br/>
                            사진 캠프는 단순한 촬영 프로그램이 아니라,<br/>
                            <span className="font-semibold text-purple-600">'내면의 나'</span>를 표현하고 발견하는 성장 프로젝트입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 프로그램 소개 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">💡 프로그램 소개</h2>
                    </div>
                    
                    <Card className="mb-8">
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        한 달 동안 <span className="font-semibold text-purple-600">'사진'</span>을 매개로 자신을 돌아보는 시간을 가집니다.<br/>
                                        매주 주제별 촬영 미션이 주어지고,<br/>
                                        그날의 사진과 함께 <span className="font-semibold text-purple-600">'나의 감정, 생각, 변화'</span>를 기록합니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        이 과정을 통해<br/>
                                        외적으로는 나만의 색깔과 이미지를 찾아가고,<br/>
                                        내적으로는 <span className="font-semibold text-purple-600">'나는 어떤 사람인가'</span>를 성찰하며 자존감을 회복하게 됩니다.
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
                                    <div className="text-center">
                                        <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">내면의 발견</h3>
                                        <p className="text-gray-600 text-sm">
                                            단순한 촬영이 아닌<br/>
                                            진짜 나를 찾아가는 여정
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 진행 방식 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">🌷 진행 방식</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">기간</h3>
                                <p className="text-sm text-gray-600">4주<br/>(주 1회 촬영 + 감정 기록 미션)</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">구성</h3>
                                <p className="text-sm text-gray-600">촬영 주제 제시<br/>+ 사진 1장 + 감정 기록</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <PenTool className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">미션 예시</h3>
                                <p className="text-sm text-gray-600">나의 평범한 하루<br/>나를 닮은 색</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <BookOpen className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">결과물</h3>
                                <p className="text-sm text-gray-600">나의 성장 기록집<br/>(디지털 북 또는 전시)</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 미션 예시 */}
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-6 text-center">📸 촬영 미션 예시</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-sm">나의 평범한 하루</h4>
                                    </div>
                                    <p className="text-xs text-gray-600">일상의 소중함을 담은 사진</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-sm">나를 닮은 색</h4>
                                    </div>
                                    <p className="text-xs text-gray-600">내 마음을 표현하는 색깔</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white rounded-lg p-4 mb-3">
                                        <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                        <h4 className="font-semibold text-sm">내가 사랑하는 나의 표정</h4>
                                    </div>
                                    <p className="text-xs text-gray-600">가장 자연스러운 나의 모습</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 결과물 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">📘 결과물</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">성장 기록집</h3>
                                <p className="text-sm text-gray-600">사진 + 내면 기록으로 구성된 개인 미니북</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">온라인 전시회</h3>
                                <p className="text-sm text-gray-600">캠프 참여자들의 작품 전시</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">우수 작품 발간</h3>
                                <p className="text-sm text-gray-600">디지털 아트북 발간 + 10만원 원고료</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 추천 대상 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">💭 이런 분께 추천합니다</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-purple-600 text-sm">💄</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">외적으로만 나를 꾸미는 게 허전하다고 느끼는 분</h3>
                                        <p className="text-sm text-gray-600">내면의 아름다움도 함께 발견해보세요.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 text-sm">🎨</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">내면의 이야기를 시각적으로 표현해보고 싶은 분</h3>
                                        <p className="text-sm text-gray-600">사진으로 마음을 담아보세요.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-600 text-sm">🔍</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">사진을 통해 진짜 나를 찾아가고 싶은 분</h3>
                                        <p className="text-sm text-gray-600">렌즈를 통해 자신을 발견해보세요.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-pink-600 text-sm">📝</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">기록을 좋아하지만, 혼자 하긴 어려웠던 분</h3>
                                        <p className="text-sm text-gray-600">함께 기록하며 성장해보세요.</p>
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
                    
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                        <CardContent className="p-8 text-center">
                            <Camera className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                            <div className="space-y-6">
                                <p className="text-xl text-gray-800 font-medium">
                                    '꾸밈'은 단지 겉모습이 아니라,<br/>
                                    <span className="text-purple-600 font-bold">내 마음을 다듬는 과정</span>이에요.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    이 프로젝트는 '예쁜 사진'을 남기는 게 아니라<br/>
                                    <span className="font-semibold text-purple-600">'진짜 나'</span>를 남기는 여정입니다.
                                </p>
                                <div className="bg-white/70 rounded-lg p-6 mt-8">
                                    <p className="text-lg text-gray-800 font-medium">
                                        렌즈 앞에서 미소 짓는 그 순간,<br/>
                                        <span className="text-purple-600 font-bold">가장 빛나는 당신의 내면</span>을 만나보세요. ✨
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
                        진짜 나를 담는 사진을 시작해보세요
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        한 달 후, 가장 아름다운 당신을 만나보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
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