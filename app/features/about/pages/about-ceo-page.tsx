import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardTitle } from "~/common/components/ui/card";

export const meta: MetaFunction = () => {
    return [
        { title: "대표 소개 - KOI Creative Lab" },
        { name: "description", content: "코이 창작소 대표 소개" }
    ];
}

export default function AboutCeoPage() {
    return (
        <div className="px-20 space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">대표 소개</h1>
                <p className="text-gray-600">
                    코이 창작소를 이끌어가는 대표를 소개합니다.
                </p>
            </div>


            <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden">
                    <div className="grid gap-4">
                        {/* 사진 영역 */}
                        <div className="relative h-80">
                            <img
                                src="/1.JPG"
                                alt="대표 사진"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 정보 영역 */}
                        <CardContent className="p-8 space-y-6">
                            <div>
                                <CardTitle className="text-2xl mb-2">김코이</CardTitle>
                                <CardDescription className="text-lg">코이 창작소 대표</CardDescription>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">인사말</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        청년들이 자신의 길을 찾고, 더 넓은 세상 속에서 가능성을 발견할 수 있도록 돕는 것이 저의 꿈입니다.
                                        코이 창작소를 통해 많은 청년들이 성장하고 꿈을 이뤄나가길 바랍니다.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">주요 경력</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• 2020년 - 코이 창작소 설립</li>
                                        <li>• 2018년 - 청년 창업 멘토링 활동 시작</li>
                                        <li>• 2015년 - 대학생 진로 상담 전문가 자격 취득</li>
                                        <li>• 2012년 - 서울대학교 심리학과 졸업</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">전문 분야</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">청년 진로 상담</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">창업 멘토링</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">심리 상담</span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">리더십 개발</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    )
}
