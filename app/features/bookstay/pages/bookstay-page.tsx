import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "북스테이._ 머뭄 - KOI Creative Lab" },
        { name: "description", content: "느슨하고 유쾌한 독서 소모임 - 책을 좋아하지만 습관이 안 잡힌 사람들을 위한 공간" }
    ];
}

export default function BookstayPage() {
    // 추천 도서 데이터
    const recommendedBooks = [
        {
            title: "책 제목 1",
            author: "작가명",
            cover: "/5.jpg", // 로고 이미지 사용
            description: "이 책의 간단한 소개"
        },
        {
            title: "책 제목 2", 
            author: "작가명",
            cover: "/5.jpg",
            description: "이 책의 간단한 소개"
        },
        {
            title: "책 제목 3",
            author: "작가명", 
            cover: "/5.jpg",
            description: "이 책의 간단한 소개"
        },
        {
            title: "책 제목 4",
            author: "작가명",
            cover: "/5.jpg", 
            description: "이 책의 간단한 소개"
        }
    ];

    return (
        <div className="min-h-screen w-full">
            <div className="container mx-auto px-4 py-8 pt-24 space-y-12">
                {/* 로고 섹션 */}
                <div className="text-center">
                    <img src="/5.jpg" alt="북스테이 로고" className="w-40 h-40 mx-auto mb-6 rounded-lg object-contain" />
                    <h1 className="text-4xl font-bold mb-4">북스테이._ 머뭄</h1>
                    <p className="text-gray-600 text-lg">느슨하고 유쾌한 독서 소모임</p>
                </div>
                
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* 메인 소개 */}
                    <Card className="p-6 md:p-8">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl mb-4">이런 당신을 위해 준비했어요 🙌</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="space-y-4 text-lg">
                                <p className="text-gray-700">📍책, 혼자 읽기 어려운 사람?</p>
                                <p className="text-gray-700">📍책장 넘기는 게 늘 작심삼일인 사람?</p>
                                <p className="text-gray-700">📍즐겁게, 함께, 가볍지만 제대로 읽고 싶은 사람?</p>
                            </div>
                            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                <p className="text-gray-600 leading-relaxed">
                                    <span className="font-semibold">'북스테이._ 머뭄'</span>은<br/>
                                    📚 책을 좋아하지만 습관이 안 잡힌 사람,<br/>
                                    ☕ 책을 핑계로 이야기 나누고 싶은 사람,<br/>
                                    🫶 그리고 책을 조금 더 잘 읽고 싶은 사람들의<br/>
                                    <span className="font-bold text-blue-600">느슨하고 유쾌한 독서 소모임</span>입니다!
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 추천 도서 그리드 */}
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-8">이번 달 추천 도서</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {recommendedBooks.map((book, index) => (
                                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-[3/4] relative">
                                        <img 
                                            src={book.cover} 
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-3 md:p-4">
                                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                                        <p className="text-xs text-gray-600 line-clamp-2">{book.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 소모임 특징 */}
                    <div className="bg-green-50 p-6 md:p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center">북스테이._ 머뭄의 특징</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <h3 className="font-semibold mb-2">느슨한 독서</h3>
                                <p className="text-sm text-gray-600">부담 없이 함께 읽는 즐거운 독서</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">☕</span>
                                </div>
                                <h3 className="font-semibold mb-2">유쾌한 소통</h3>
                                <p className="text-sm text-gray-600">책을 핑계로 나누는 따뜻한 이야기</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🫶</span>
                                </div>
                                <h3 className="font-semibold mb-2">함께 성장</h3>
                                <p className="text-sm text-gray-600">서로를 응원하며 함께 성장하는 공간</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}