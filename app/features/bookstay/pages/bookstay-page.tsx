import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "북스테이 - 에세이캠프 - KOI Creative Lab" },
        { name: "description", content: "북스테이 에세이캠프 - 글쓰기를 통한 성장" }
    ];
}

export default function BookstayPage() {
    return (
        <div className="px-20 py-20 space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">북스테이 - 에세이캠프</h1>
                <p className="text-gray-600">글쓰기를 통한 자기 발견과 성장의 여정</p>
            </div>
            
            <div className="max-w-6xl mx-auto space-y-16">
                {/* 메인 소개 */}
                <Card className="p-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-4">북스테이의 의미</CardTitle>
                        <CardDescription className="text-lg">
                            책과 함께 머물며, 글쓰기를 통해 자신을 발견하는 시간
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            북스테이 에세이캠프는 청년들이 책을 읽고, 글을 쓰며, 
                            자신의 내면을 탐구하는 집중적인 프로그램입니다. 
                            좋은 책들과 함께하며 에세이 쓰기 기법을 배우고, 
                            자신만의 이야기를 세상에 전하는 방법을 찾아갑니다.
                        </p>
                    </CardContent>
                </Card>

                {/* 프로그램 구성 */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">독서 워크샵</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                선별된 도서들을 함께 읽고 토론하며, 
                                작가의 관점과 자신의 경험을 연결해봅니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 매주 1권씩 선정 도서 읽기</li>
                                <li>• 독서 토론 및 감상 나누기</li>
                                <li>• 작가의 글쓰기 기법 분석</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-xl">에세이 쓰기</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                개인의 경험과 생각을 바탕으로 
                                진정성 있는 에세이를 써나가는 과정입니다.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• 개인 에세이 기초 기법</li>
                                <li>• 주제 발굴 및 구성 방법</li>
                                <li>• 피드백 및 수정 과정</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* 캠프 특징 */}
                <div className="bg-green-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">캠프 특징</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="font-semibold mb-2">집중 독서</h3>
                            <p className="text-sm text-gray-600">3일간의 집중적인 독서와 글쓰기 환경</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✍️</span>
                            </div>
                            <h3 className="font-semibold mb-2">개인별 지도</h3>
                            <p className="text-sm text-gray-600">전문 작가와의 1:1 멘토링</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📖</span>
                            </div>
                            <h3 className="font-semibold mb-2">작품 완성</h3>
                            <p className="text-sm text-gray-600">완성된 에세이를 매거진에 게재</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}