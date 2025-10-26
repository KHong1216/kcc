import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "무색무취 매거진 - KOI Creative Lab" },
        { name: "description", content: "패션 매거진 - 겉으로만 꾸미는 사람들에게 내적으로도 꾸밀 수 있는 기회" }
    ];
}

export default function MagazinePage() {
    // 매거진 사진 데이터
    const magazinePhotos = [
        {
            id: 1,
            title: "스타일링 1",
            image: "/4.jpg",
            description: "자연스러운 일상 스타일"
        },
        {
            id: 2,
            title: "스타일링 2", 
            image: "/4.jpg",
            description: "모던한 오피스 룩"
        },
        {
            id: 3,
            title: "스타일링 3",
            image: "/4.jpg", 
            description: "캐주얼한 주말 스타일"
        },
        {
            id: 4,
            title: "스타일링 4",
            image: "/4.jpg",
            description: "세련된 이브닝 룩"
        },
        {
            id: 5,
            title: "스타일링 5",
            image: "/4.jpg",
            description: "트렌디한 스트리트 패션"
        },
        {
            id: 6,
            title: "스타일링 6",
            image: "/4.jpg",
            description: "미니멀한 베이직 룩"
        }
    ];

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto px-4 py-8 pt-24 space-y-12">
                {/* 로고 섹션 */}
                <div className="text-center">
                    <img src="/4.jpg" alt="무색무취 매거진 로고" className="w-40 h-40 mx-auto mb-6 rounded-lg object-contain" />
                    <h1 className="text-4xl font-bold mb-4">무색무취 매거진</h1>
                    <p className="text-gray-600 text-lg">패션 매거진 - 내적으로도 꾸밀 수 있는 기회</p>
                </div>
                
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* 메인 소개 */}
                    <Card className="p-6 md:p-8">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl mb-4">겉으로만 꾸미는 사람들을 위해</CardTitle>
                            <CardDescription className="text-lg">
                                내적으로도 꾸밀 수 있는 기회를 제공하는 패션 매거진
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                                무색무취 매거진은 단순히 옷을 입는 것을 넘어서, 
                                자신의 내면을 발견하고 표현하는 방법을 제시합니다. 
                                겉모습만이 아닌 진정한 아름다움을 찾아가는 
                                패션과 마음의 여정을 함께합니다.
                            </p>
                        </CardContent>
                    </Card>

                    {/* 매거진 사진 그리드 */}
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-8">매거진 스타일링</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {magazinePhotos.map((photo) => (
                                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-[4/5] relative">
                                        <img 
                                            src={photo.image} 
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                                                <h3 className="font-semibold mb-2">{photo.title}</h3>
                                                <p className="text-sm">{photo.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 매거진 특징 */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <CardHeader>
                                <CardTitle className="text-xl">패션 스타일링</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    개인의 성격과 상황에 맞는 스타일링을 통해 
                                    자신만의 매력을 발견하고 표현합니다.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• 개인별 맞춤 스타일링</li>
                                    <li>• 상황별 의상 코디네이션</li>
                                    <li>• 트렌드와 개성의 조화</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="p-6">
                            <CardHeader>
                                <CardTitle className="text-xl">내면의 아름다움</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    외적인 스타일링과 함께 내면의 성장과 
                                    자기 표현에 대한 이야기를 나눕니다.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• 자신감과 자아 표현</li>
                                    <li>• 개성과 정체성 찾기</li>
                                    <li>• 아름다움에 대한 새로운 관점</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 매거진 철학 */}
                    <div className="bg-pink-50 p-6 md:p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center">무색무취의 철학</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👗</span>
                                </div>
                                <h3 className="font-semibold mb-2">스타일링</h3>
                                <p className="text-sm text-gray-600">개인에게 맞는 스타일 발견</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💭</span>
                                </div>
                                <h3 className="font-semibold mb-2">내면 탐구</h3>
                                <p className="text-sm text-gray-600">진정한 아름다움 찾기</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h3 className="font-semibold mb-2">자기 표현</h3>
                                <p className="text-sm text-gray-600">개성 있는 표현 방법</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}