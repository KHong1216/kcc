import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";

export const meta: MetaFunction = () => {
    return [
        { title: "코이 상담사 소개 | 코이창작소" },
        { name: "description", content: "청년들의 성장을 돕는 코이창작소의 전문 상담사들을 소개합니다." }
    ];
}

const managers = [
    {
        name: "김코이",
        role: "대표 매니저",
        image: "/2.JPG",
        qualifications: [
            "상담심리사 1급",
            "청소년상담사 2급",
            "상담심리학 석사"
        ],
        career: [
            "코이창작소 대표 (2020~현재)",
            "○○상담센터 전문상담사 (2018~2020)",
            "○○대학교 상담센터 인턴상담사 (2016~2018)"
        ],
        specialty: "개인상담, 그룹상담",
        description: "청년들의 마음을 깊이 이해하고 함께 성장하는 길을 제시합니다."
    },
    {
        name: "이창작",
        role: "프로젝트 매니저",
        image: "/2.JPG",
        qualifications: [
            "상담심리사 2급",
            "미술심리상담사 1급",
            "상담심리학 석사"
        ],
        career: [
            "코이창작소 프로젝트 매니저 (2021~현재)",
            "○○청소년센터 상담사 (2019~2021)",
            "○○복지관 실습상담사 (2017~2019)"
        ],
        specialty: "그룹 프로그램, 심리검사",
        description: "공동체적 상담을 통해 청년들의 소통과 성장을 돕습니다."
    },
    {
        name: "박소통",
        role: "상담 매니저",
        image: "/3.JPG",
        qualifications: [
            "임상심리사 2급",
            "청소년상담사 3급",
            "심리학 석사"
        ],
        career: [
            "코이창작소 상담 매니저 (2022~현재)",
            "○○심리상담센터 상담사 (2020~2022)",
            "○○대학교 학생상담센터 인턴 (2018~2020)"
        ],
        specialty: "심리검사, 개인상담",
        description: "객관적인 심리검사를 통해 청년들의 자기 이해를 돕습니다."
    }
];

export default function AboutCounselorsPage() {
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        코이 매니저 소개
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        청년들의 성장을 돕는 전문 매니저들을 소개합니다
                    </p>
                </div>
            </section>

            {/* 매니저 소개 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {managers.map((manager, index) => (
                            <Card key={manager.name} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                <div className="relative">
                                    <img 
                                        src={manager.image} 
                                        alt={manager.name} 
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform" 
                                    />
                                    <Badge className="absolute top-4 left-4 bg-blue-500 text-white">
                                        {manager.role}
                                    </Badge>
                                </div>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl mb-2">{manager.name}</CardTitle>
                                    <CardDescription className="mb-4 text-sm">
                                        {manager.description}
                                    </CardDescription>
                                    
                                    {/* 자격증 */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold mb-2 text-gray-700">자격증</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {manager.qualifications.map((qual, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {qual}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 전문 분야 */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold mb-2 text-gray-700">전문 분야</h4>
                                        <p className="text-sm text-gray-600">{manager.specialty}</p>
                                    </div>

                                    {/* 주요 경력 */}
                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 text-gray-700">주요 경력</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {manager.career.map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                        전문 매니저와 함께하세요
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        경험 많은 매니저들이 여러분의 성장을 돕겠습니다
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            상담 예약하기
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                            문의하기
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}