import type { MetaFunction } from "react-router"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { GraduationCap, Award, Briefcase, Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";

export const meta: MetaFunction = () => {
    return [
        { title: "코이매니저 소개 | 코이창작소" },
        { name: "description", content: "코이창작소의 전문 매니저들을 소개합니다. 함께 성장하는 여정을 시작해보세요." }
    ];
}

// 여러 매니저 데이터
const managers = [
    {
        id: 1,
        name: "양시근",
        image: "/yang-sigeun.jpg",
        introduction: "청년들의 마음을 이해하고 함께 성장하는 매니저",
        graduation: "○○대학교 상담심리학과 졸업",
        qualifications: [
            "상담심리사 2급",
            "청소년상담사 3급"
        ],
        career: [
            "코이창작소 매니저 (2023~현재)",
            "○○청소년센터 상담사 (2021~2023)",
            "○○복지관 실습상담사 (2020~2021)"
        ],
        specialty: "개인상담, 그룹상담, 연애상담",
        description: "어려운 시기를 겪고 있는 청년들에게 따뜻한 마음으로 다가가 함께 해결책을 찾아가는 것을 좋아합니다."
    },
    {
        id: 2,
        name: "김코이",
        image: "/kim-koi.jpg",
        introduction: "창작과 심리를 연결하는 전문 매니저",
        graduation: "○○대학교 심리학과 졸업",
        qualifications: [
            "상담심리사 1급",
            "미술심리상담사 2급"
        ],
        career: [
            "코이창작소 창작 매니저 (2022~현재)",
            "○○문화센터 상담사 (2020~2022)",
            "○○대학교 상담센터 인턴 (2018~2020)"
        ],
        specialty: "창작상담, 미술치료, 자기표현",
        description: "창작을 통해 자신을 발견하고 표현하는 과정을 함께하는 것을 좋아합니다."
    },
    {
        id: 3,
        name: "이창작",
        image: "/lee-changjak.jpg",
        introduction: "글쓰기와 마음치료의 전문가",
        graduation: "○○대학교 문학과 졸업",
        qualifications: [
            "상담심리사 2급",
            "문학치료사 1급"
        ],
        career: [
            "코이창작소 글쓰기 매니저 (2021~현재)",
            "○○작가협회 상담사 (2019~2021)",
            "○○출판사 편집자 (2017~2019)"
        ],
        specialty: "글쓰기상담, 문학치료, 자기탐색",
        description: "글쓰기를 통해 마음의 이야기를 풀어내는 과정을 함께합니다."
    },
    {
        id: 4,
        name: "박소통",
        image: "/park-sotong.jpg",
        introduction: "관계와 소통의 전문 매니저",
        graduation: "○○대학교 사회학과 졸업",
        qualifications: [
            "상담심리사 2급",
            "가족상담사 2급"
        ],
        career: [
            "코이창작소 관계 매니저 (2023~현재)",
            "○○가족상담센터 상담사 (2021~2023)",
            "○○청소년센터 상담사 (2019~2021)"
        ],
        specialty: "관계상담, 가족상담, 소통기술",
        description: "건강한 관계를 만들어가는 과정을 함께하는 것을 좋아합니다."
    },
    {
        id: 5,
        name: "정마음",
        image: "/jung-maeum.jpg",
        introduction: "마음의 치유와 성장을 돕는 매니저",
        graduation: "○○대학교 임상심리학과 졸업",
        qualifications: [
            "임상심리사 2급",
            "트라우마치료사 1급"
        ],
        career: [
            "코이창작소 치유 매니저 (2022~현재)",
            "○○심리상담센터 상담사 (2020~2022)",
            "○○병원 정신건강의학과 인턴 (2018~2020)"
        ],
        specialty: "트라우마치료, 우울상담, 마음치유",
        description: "상처받은 마음을 치유하고 다시 성장할 수 있도록 돕습니다."
    },
    {
        id: 6,
        name: "최성장",
        image: "/choi-seongjang.jpg",
        introduction: "성장과 변화를 이끄는 전문 매니저",
        graduation: "○○대학교 교육학과 졸업",
        qualifications: [
            "상담심리사 2급",
            "청소년지도사 2급"
        ],
        career: [
            "코이창작소 성장 매니저 (2021~현재)",
            "○○청소년수련원 상담사 (2019~2021)",
            "○○교육청 학생상담사 (2017~2019)"
        ],
        specialty: "성장상담, 진로상담, 자기계발",
        description: "청년들의 성장과 변화를 함께하는 여정을 좋아합니다."
    }
];

export default function AboutCounselorsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const managersPerPage = 3; // 데스크톱에서 3명, 모바일에서 2명으로 조정 가능

    // 검색 필터링
    const filteredManagers = managers.filter(manager => 
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.introduction.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredManagers.length / managersPerPage);
    const startIndex = (currentPage - 1) * managersPerPage;
    const endIndex = startIndex + managersPerPage;
    const currentManagers = filteredManagers.slice(startIndex, endIndex);

    // 검색어가 변경되면 첫 페이지로 이동
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    // 페이지 변경
    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20">
            {/* 히어로 섹션 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        코이매니저 소개
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        함께 성장하는 여정을 시작해보세요
                    </p>
                    
                    {/* 검색 바 */}
                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="매니저 이름, 전문분야로 검색..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* 매니저 소개 섹션 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* 검색 결과 정보 */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            {searchTerm ? (
                                <>"{searchTerm}" 검색 결과: <span className="font-semibold text-blue-600">{filteredManagers.length}명</span>의 매니저</>
                            ) : (
                                <>총 <span className="font-semibold text-blue-600">{managers.length}명</span>의 매니저</>
                            )}
                        </p>
                    </div>

                    {/* 매니저 카드 그리드 */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {currentManagers.map((manager) => (
                            <Card key={manager.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                <div className="relative">
                                    <img 
                                        src={manager.image} 
                                        alt={manager.name} 
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform" 
                                    />
                                </div>
                                
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold mb-2 text-gray-900">{manager.name}</h2>
                                        <p className="text-blue-600 font-medium mb-3">{manager.introduction}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{manager.description}</p>
                                    </div>

                                    {/* 정보 그리드 */}
                                    <div className="space-y-4">
                                        {/* 졸업 */}
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <GraduationCap className="w-4 h-4 text-blue-600" />
                                                <h3 className="text-sm font-semibold text-gray-900">졸업</h3>
                                            </div>
                                            <p className="text-gray-600 text-xs">{manager.graduation}</p>
                                        </div>

                                        {/* 자격증 */}
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Award className="w-4 h-4 text-blue-600" />
                                                <h3 className="text-sm font-semibold text-gray-900">자격증</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {manager.qualifications.map((qual, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {qual}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 전문 분야 */}
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Heart className="w-4 h-4 text-blue-600" />
                                                <h3 className="text-sm font-semibold text-gray-900">전문 분야</h3>
                                            </div>
                                            <p className="text-gray-600 text-xs">{manager.specialty}</p>
                                        </div>

                                        {/* 주요 경력 */}
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Briefcase className="w-4 h-4 text-blue-600" />
                                                <h3 className="text-sm font-semibold text-gray-900">주요 경력</h3>
                                            </div>
                                            <ul className="space-y-1">
                                                {manager.career.slice(0, 2).map((item, idx) => (
                                                    <li key={idx} className="flex items-start text-xs text-gray-600">
                                                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                                {manager.career.length > 2 && (
                                                    <li className="text-xs text-gray-500">+{manager.career.length - 2}개 더</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center space-x-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>이전</span>
                            </Button>

                            {/* 페이지 번호들 */}
                            <div className="flex space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => goToPage(page)}
                                        className="w-10 h-10"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center space-x-1"
                            >
                                <span>다음</span>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    {/* 검색 결과가 없을 때 */}
                    {filteredManagers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                            <p className="text-gray-400 text-sm mt-2">다른 검색어를 시도해보세요.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        함께 이야기 나눠요
                    </h2>
                    <p className="text-gray-600 mb-6">
                        어려운 일이 있거나 누군가와 이야기하고 싶을 때 언제든 연락주세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                            상담 예약하기
                        </Button>
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3">
                            문의하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}