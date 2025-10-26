import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
        { title: "대표자 소개 - 코이창작소" },
        { name: "description", content: "작은 물결이 큰 도약이 되는 창작소, 코이창작소의 대표자를 소개합니다." }
    ];
}

export default function AboutRepresentativePage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                        대표자 소개
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        작은 물결이 큰 도약이 되는 창작소를 이끌어가는 대표를 소개합니다
                    </p>
                </div>
            </section>

            {/* 대표자 프로필 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* 프로필 이미지 */}
                        <div className="relative">
                            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/1.JPG"
                                    alt="대표자 김코이"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            {/* 플로팅 배지 */}
                            <div className="absolute -bottom-6 -right-6">
                                <Badge className="bg-blue-600 text-white text-lg px-6 py-3 rounded-full shadow-lg">
                                    코이창작소 대표
                                </Badge>
                            </div>
                        </div>

                        {/* 프로필 정보 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-4 text-gray-900">김코이</h2>
                                <p className="text-xl text-blue-600 font-semibold mb-6">코이창작소 대표</p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    "청년들이 자신의 길을 찾고, 더 넓은 세상 속에서 가능성을 발견할 수 있도록 돕는 것이 저의 꿈입니다. 
                                    코이창작소를 통해 많은 청년들이 성장하고 꿈을 이뤄나가길 바랍니다."
                                </p>
                            </div>

                            {/* 전문 분야 */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">전문 분야</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-100 text-blue-800">
                                        청년 진로 상담
                                    </Badge>
                                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-green-100 text-green-800">
                                        창업 멘토링
                                    </Badge>
                                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-purple-100 text-purple-800">
                                        심리 상담
                                    </Badge>
                                    <Badge variant="secondary" className="text-sm px-4 py-2 bg-orange-100 text-orange-800">
                                        리더십 개발
                                    </Badge>
                                </div>
                            </div>

                            {/* 연락처 */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    상담 예약하기
                                </Button>
                                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                    문의하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 경력 및 학력 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* 주요 경력 */}
                        <Card className="p-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-800">주요 경력</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">코이창작소 대표</h4>
                                        <p className="text-gray-600">2020년 ~ 현재</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            청년들을 위한 상담 및 창업 지원 플랫폼 설립 및 운영
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">청년 창업 멘토</h4>
                                        <p className="text-gray-600">2018년 ~ 2020년</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            다양한 기관에서 청년 창업가들을 위한 멘토링 활동
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">진로 상담 전문가</h4>
                                        <p className="text-gray-600">2015년 ~ 현재</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            대학생 및 청년들을 위한 진로 상담 및 심리 상담 제공
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 학력 및 자격증 */}
                        <Card className="p-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-800">학력 및 자격증</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">서울대학교 심리학과</h4>
                                        <p className="text-gray-600">2012년 졸업</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            상담심리학 전공, 학점 4.2/4.5
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">청소년상담사 2급</h4>
                                        <p className="text-gray-600">2015년 취득</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            여성가족부 발행 국가공인자격증
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-3 h-3 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">상담심리사 1급</h4>
                                        <p className="text-gray-600">2017년 취득</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            한국상담심리학회 발행 전문자격증
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 비전 및 철학 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">대표의 비전과 철학</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">창의적 사고</h3>
                            <p className="text-gray-600">
                                청년들이 기존의 틀에 얽매이지 않고 자신만의 독창적인 아이디어를 
                                발굴할 수 있도록 돕습니다.
                            </p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">지속적 성장</h3>
                            <p className="text-gray-600">
                                한 번의 성공이 아닌 지속적인 성장과 발전을 통해 
                                진정한 자신의 가치를 발견하도록 이끕니다.
                            </p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">공동체 의식</h3>
                            <p className="text-gray-600">
                                혼자만의 성장이 아닌 함께 성장하는 공동체를 만들어 
                                더 큰 변화를 이끌어냅니다.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        함께 성장해요
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        코이창작소와 함께 새로운 도전을 시작하고, 
                        당신만의 가능성을 발견해보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                            상담 예약하기
                        </Button>
                        <Button size="lg" variant="secondary" className="border-white text-blue-600 hover:bg-gray-100">
                            프로그램 둘러보기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}