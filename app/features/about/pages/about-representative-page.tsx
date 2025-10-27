import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Heart, Coffee, BookOpen, Users, MessageCircle, Star } from "lucide-react";

export const meta: MetaFunction = () => {
    return [
        { title: "안녕하세요, 김코이입니다 | 코이창작소" },
        { name: "description", content: "코이창작소를 시작하게 된 이야기와 함께 성장하고 싶은 마음을 나눕니다." }
    ];
}

export default function AboutRepresentativePage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        안녕하세요, 김코이입니다
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        코이창작소를 시작하게 된 이야기를 들려드릴게요
                    </p>
                </div>
            </section>

            {/* 대표자 프로필 섹션 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* 프로필 이미지 */}
                        <div className="relative">
                            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/1.JPG"
                                    alt="김코이"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* 플로팅 배지 */}
                            <div className="absolute -bottom-4 -right-4">
                                <Badge className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-lg">
                                    코이창작소 대표
                                </Badge>
                            </div>
                        </div>

                        {/* 프로필 정보 */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-gray-900">김코이</h2>
                                <p className="text-lg text-blue-600 font-medium mb-4">코이창작소 대표</p>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        "안녕하세요! 저는 김코이입니다. 코이창작소를 시작하게 된 이유는 간단해요. 
                                        제가 청년 시절 겪었던 고민들과 답답함을 다른 청년들도 똑같이 겪고 있다는 걸 알게 되었거든요. 
                                        혼자서는 어려운 길을 함께 걸어가면 어떨까 싶어서 시작했어요."
                                    </p>
                                </div>
                            </div>

                            {/* 간단한 소개 */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Coffee className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">커피를 좋아하고, 사람들과 이야기하는 걸 즐겨요</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">심리학을 전공했고, 상담을 통해 사람들을 돕고 있어요</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Heart className="w-5 h-5 text-pink-600" />
                                    <span className="text-gray-700">청년들이 자신만의 길을 찾는 걸 도와드리고 싶어요</span>
                                </div>
                            </div>

                            {/* 연락처 */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    이야기 나누기
                                </Button>
                                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                    상담 예약하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 시작하게 된 이야기 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">코이창작소를 시작하게 된 이야기</h2>
                    </div>
                    
                    <Card className="p-6">
                        <CardContent className="space-y-6">
                            <div className="bg-white rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">💭 왜 시작했을까요?</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    대학 시절, 저도 많은 고민을 했어요. "내가 뭘 하고 싶지?", "어떤 일이 나한테 맞을까?" 
                                    이런 고민들을 혼자서만 하다 보니 답답하고 외로웠거든요. 그때 누군가와 함께 이야기 나누고 
                                    고민을 풀어갈 수 있었다면 얼마나 좋았을까 하는 생각이 들었어요.
                                </p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">🌟 어떤 사람들을 만나고 싶나요?</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    저는 여러분이 '완벽한 사람'이 되기를 바라지 않아요. 대신 '진짜 나'를 찾아가는 과정을 
                                    함께하고 싶어요. 때로는 힘들고, 때로는 재미있고, 때로는 의미 있는 그런 여정을 
                                    함께 걸어가고 싶어요.
                                </p>
                            </div>
                            
                            <div className="bg-green-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900">🤝 함께 성장하고 싶어요</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    코이창작소는 제가 여러분을 가르치는 곳이 아니에요. 함께 고민하고, 함께 발견하고, 
                                    함께 성장하는 곳이에요. 여러분의 이야기를 들려주세요. 저도 제 이야기를 들려드릴게요.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 간단한 이력 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">간단한 이력</h2>
                        <p className="text-gray-600">자세한 건 만나서 이야기해요!</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg text-gray-800">학력 & 자격</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <div>
                                        <p className="font-medium">서울대학교 심리학과</p>
                                        <p className="text-sm text-gray-500">상담심리학 전공</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <div>
                                        <p className="font-medium">상담심리사 1급</p>
                                        <p className="text-sm text-gray-500">한국상담심리학회</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <div>
                                        <p className="font-medium">청소년상담사 2급</p>
                                        <p className="text-sm text-gray-500">여성가족부</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg text-gray-800">경험</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <div>
                                        <p className="font-medium">코이창작소 대표</p>
                                        <p className="text-sm text-gray-500">2020년 ~ 현재</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <div>
                                        <p className="font-medium">청년 창업 멘토</p>
                                        <p className="text-sm text-gray-500">2018년 ~ 2020년</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <div>
                                        <p className="font-medium">진로 상담 전문가</p>
                                        <p className="text-sm text-gray-500">2015년 ~ 현재</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 함께하고 싶은 것들 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">함께하고 싶은 것들</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">마음 나누기</h3>
                            <p className="text-gray-600 text-sm">
                                고민과 기쁨을 함께 나누고, 서로의 이야기를 들어주는 시간
                            </p>
                        </Card>
                        
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">함께 배우기</h3>
                            <p className="text-gray-600 text-sm">
                                새로운 것을 배우고, 함께 성장해가는 과정
                            </p>
                        </Card>
                        
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">꿈 찾기</h3>
                            <p className="text-gray-600 text-sm">
                                자신만의 길을 찾고, 꿈을 향해 나아가는 여정
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        함께 이야기해요
                    </h2>
                    <p className="text-lg mb-6 opacity-90">
                        혼자 고민하지 마세요. 함께 나누면 더 좋은 답을 찾을 수 있어요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            이야기 나누기
                        </Button>
                        <Button size="lg" variant="secondary" className="border-white text-black hover:bg-white hover:text-gray-900">
                            프로그램 둘러보기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}