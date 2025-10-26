import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
        { title: "에세이 캠프 - 나만의 에세이집 만들기 | 코이창작소" },
        { name: "description", content: "한 달 동안 매일 글을 쓰며 나만의 에세이집을 만드는 에세이 캠프. 당신의 생각과 감정을 한 권의 책으로 기록해보세요." }
    ];
}

export default function BookstayPage() {
    return (
        <div className="min-h-screen w-full">
            {/* 히어로 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-4 bg-green-500 text-white">에세이 캠프</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                        당신의 에세이를 한권의 책으로 기록합니다
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        한 달 동안 매일 글을 쓰며 나만의 에세이집을 만드는 특별한 여정
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            에세이 캠프 신청하기
                        </Button>
                        <Button size="lg" variant="outline">
                            자세히 알아보기
                        </Button>
                    </div>
                </div>
            </section>

            {/* 에세이란? 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">에세이란?</h2>
                        <p className="text-gray-600">당신만의 이야기를 자유롭게 표현하는 글의 형태</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img src="/2.JPG" alt="에세이 개념" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-green-600">에세이의 정의</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    일정한 형식을 따르지 않고 인생이나 자연 또는 일상생활에서의 느낌이나 체험을 
                                    생각나는 대로 쓴 산문 형식의 글입니다. 작가의 개성이나 인간성이 두드러지게 나타나며 
                                    유머, 위트, 기지가 들어 있습니다.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-teal-600">에세이의 종류</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• 경수필: 가벼운 주제로 쓴 에세이</li>
                                    <li>• 중수필: 깊이 있는 사고를 담은 에세이</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 에세이 캠프 소개 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">에세이 캠프란?</h2>
                        <p className="text-gray-600">'새로운 나'를 찾기 위한 특별한 프로젝트</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-blue-600">캠프의 의미</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    우리는 '새로운 나'를 찾기 위한 프로젝트를 '캠프'라고 표현합니다. 
                                    에세이 캠프는 한 달 동안 매일 주어지는 하나의 단어로 짧은 글을 쓰고, 
                                    나만의 에세이 책을 제작하는 프로젝트입니다.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-purple-600">프로젝트 과정</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• 매일 하나의 단어로 글쓰기</li>
                                    <li>• 일상의 생각과 감정 기록</li>
                                    <li>• 나만의 에세이집 제작</li>
                                    <li>• 새로운 나의 모습 발견</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <img src="/2.JPG" alt="에세이 캠프" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 캠프 혜택 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">에세이 캠프 혜택</h2>
                        <p className="text-gray-600">참여하시는 모든 분께 드리는 특별한 혜택들</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <CardTitle className="text-xl">나만의 에세이집</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    한 달 동안 쓴 글들을 모아 당신만의 에세이집으로 제작해드립니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💡</span>
                                </div>
                                <CardTitle className="text-xl">매일 글쓰기 습관</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    매일 주어지는 단어로 글을 쓰며 꾸준한 글쓰기 습관을 만들어갑니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🌟</span>
                                </div>
                                <CardTitle className="text-xl">새로운 나 발견</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    글을 통해 자신의 생각과 감정을 정리하며 새로운 모습을 발견합니다.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 특별 혜택 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        특별 혜택
                    </h2>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                        <h3 className="text-2xl font-bold mb-4">나만의 에세이집 수령</h3>
                        <p className="text-lg mb-6 opacity-90">
                            프로젝트를 모두 참여하신 분들에 한해서 세분의 글을 선정하여 
                            에세이집 1권을 전자책으로 발간할 예정이며 원고료 10만원 지급 예정입니다.
                        </p>
                        <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                            원고료 10만원 지급
                        </Badge>
                    </div>
                </div>
            </section>

            {/* 참여 방법 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">참여 방법</h2>
                        <p className="text-gray-600">에세이 캠프에 참여하는 간단한 방법</p>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="font-semibold mb-2">신청하기</h3>
                            <p className="text-sm text-gray-600">에세이 캠프 신청서를 작성해주세요</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="font-semibold mb-2">단어 받기</h3>
                            <p className="text-sm text-gray-600">매일 하나의 단어를 받아보세요</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="font-semibold mb-2">글쓰기</h3>
                            <p className="text-sm text-gray-600">받은 단어로 자유롭게 글을 써보세요</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="font-semibold mb-2">책 제작</h3>
                            <p className="text-sm text-gray-600">한 달 후 나만의 에세이집을 받아보세요</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        지금 시작하세요
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        글을 쓰고 싶은 마음은 있는데 혼자 꾸준히 쓰는 게 어려웠다면, 
                        에세이 캠프와 함께해보는 건 어떨까요?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                            에세이 캠프 신청하기
                        </Button>
                        <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                            문의하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}