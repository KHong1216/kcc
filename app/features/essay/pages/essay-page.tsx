import { useNavigate, type MetaFunction } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
      { title: "에세이 캠프 - 대화로 쓰는 에세이 | 코이창작소" },
      { name: "description", content: "글 대신 대화로 쓰는 에세이. 당신의 이야기를 상담사와 나누고, 하나의 감성 에세이로 완성해보세요." },
      { name: "keywords", content: "에세이쓰기, 글쓰기캠프, 에세이집제작, 글쓰기상담, 코이창작소" },
      { property: "og:title", content: "에세이 캠프 - 대화로 쓰는 에세이" },
      { property: "og:description", content: "글 대신 대화로 쓰는 에세이. 당신의 이야기를 상담사와 나누고, 하나의 감성 에세이로 완성해보세요." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-essay.jpg" },
    ];
  };

export default function EssayPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full">
            {/* 헤더 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-6 bg-green-500 text-white text-lg px-4 py-2">에세이 캠프 Essay Camp</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                        "글 대신, 대화로 쓰는 에세이"
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        청년의 마음을 담은 이야기들이<br />
                        한 편의 기록이 되어 세상에 전해집니다.
                    </p>
                    <Button 
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
                        onClick={() => navigate("/reservation")}
                    >
                        이야기 예약하기
                    </Button>
                </div>
            </section>

            {/* 섹션 1 - "우리는 글을 쓰지 않습니다" */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6">"우리는 글을 쓰지 않습니다"</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                대부분의 에세이는 '글을 잘 써야 한다'는 부담에서 시작되죠.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                하지만 이곳에서는 그럴 필요가 없습니다.<br />
                                당신은 그저 대화로 이야기만 들려주세요.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                그 대화를 상담사가 정리하고,<br />
                                하나의 '당신의 에세이'로 만들어드립니다.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-50 p-8 rounded-2xl">
                                <p className="text-2xl font-semibold text-green-700 mb-4">
                                    ✦ "기록은 어렵지 않아요. 마음을 나누면 됩니다." ✦
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 섹션 2 - "이렇게 진행돼요" */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">"이렇게 진행돼요"</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    1️⃣
                                </div>
                                <CardTitle className="text-xl">예약하기</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    원하시는 시간대에 상담사와 대화 예약을 합니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    2️⃣
                                </div>
                                <CardTitle className="text-xl">이야기 나누기</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    1:1로 대화하며, 당신의 생각·감정·경험을 편하게 나눕니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    3️⃣
                                </div>
                                <CardTitle className="text-xl">에세이 제작</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    상담사가 대화 내용을 정리해, 하나의 감성 에세이로 완성합니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                    4️⃣
                                </div>
                                <CardTitle className="text-xl">공유 / 보관</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    완성된 글은 당신에게 전달되며, (동의 시) 프로젝트 아카이브에도 실립니다.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 섹션 3 - "이런 분에게 추천해요" */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">"이런 분에게 추천해요"</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                                <p className="text-lg text-gray-700">글을 쓰는 건 어렵지만, 나의 이야기는 남기고 싶은 분</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                                <p className="text-lg text-gray-700">최근 고민이나 감정을 정리하고 싶은 분</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                                <p className="text-lg text-gray-700">나의 이야기가 누군가에게 힘이 되길 바라는 분</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex-shrink-0 mt-1"></div>
                                <p className="text-lg text-gray-700">대화를 통해 스스로를 돌아보고 싶은 분</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 섹션 4 - "상담사와의 대화는 이렇게 진행됩니다" */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">"상담사와의 대화는 이렇게 진행됩니다"</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⏰</span>
                                </div>
                                <CardTitle className="text-xl">20~30분 대화</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    대화는 약 20~30분 정도 진행됩니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <CardTitle className="text-xl">전문 상담사</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    전문 상담 교육을 받은 코이매니저가 함께하며, 편안한 분위기에서 이야기를 이끌어 갑니다.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <CardTitle className="text-xl">비공개 보호</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    모든 대화는 비공개로 안전하게 보호됩니다. (원고 제작을 위한 내용만 활용됩니다.)
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 섹션 5 - "당신의 한마디가 한 편의 이야기로" */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        "당신의 한마디가 한 편의 이야기로"
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        "누군가의 하루를 위로할 당신의 이야기,<br />
                        지금 들려주세요."
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-8">
                        <span className="text-2xl">🌿</span>
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
                            onClick={() => navigate("/reservation")}
                        >
                            상담 예약하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}