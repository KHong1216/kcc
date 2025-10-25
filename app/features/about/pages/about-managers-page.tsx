import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "코이 매니저 소개 - KOI Creative Lab" },
        { name: "description", content: "코이 창작소 매니저 소개" }
    ];
}

const managers = [
    {
        name: "김매니저",
        position: "프로그래밍 매니저",
        image: "/1.JPG",
        career: [
            "• 2021년 - 코이 창작소 프로그래밍 매니저",
            "• 2019년 - 스타트업 개발팀 리드",
            "• 2017년 - 컴퓨터공학과 졸업",
            "• 2015년 - 해커톤 우승 경험"
        ],
        specialties: ["프론트엔드", "백엔드", "멘토링"]
    },
    {
        name: "이매니저",
        position: "디자인 매니저",
        image: "/2.JPG",
        career: [
            "• 2020년 - 코이 창작소 디자인 매니저",
            "• 2018년 - 디자인 에이전시 근무",
            "• 2016년 - 시각디자인학과 졸업",
            "• 2014년 - 디자인 공모전 수상"
        ],
        specialties: ["UI/UX", "브랜딩", "그래픽디자인"]
    },
    {
        name: "박매니저",
        position: "콘텐츠 매니저",
        image: "/3.JPG",
        career: [
            "• 2022년 - 코이 창작소 콘텐츠 매니저",
            "• 2020년 - 콘텐츠 에이전시 근무",
            "• 2018년 - 문학과 졸업",
            "• 2016년 - 에세이 공모전 수상"
        ],
        specialties: ["콘텐츠 기획", "에세이", "편집"]
    }
]

export default function AboutManagersPage() {
    return (
        <div className="px-20 py-20 space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">코이 매니저 소개</h1>
                <p className="text-gray-600">코이 창작소를 함께 이끌어가는 매니저들을 소개합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {managers.map((manager, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-64">
                            <img 
                                src={manager.image} 
                                alt={`${manager.name} 사진`} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl">{manager.name}</CardTitle>
                            <CardDescription className="text-base">{manager.position}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-sm mb-2 text-gray-700">주요 경력</h3>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    {manager.career.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-sm mb-2 text-gray-700">전문 분야</h3>
                                <div className="flex flex-wrap gap-1">
                                    {manager.specialties.map((specialty, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}