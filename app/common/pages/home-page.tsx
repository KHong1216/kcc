import type { MetaFunction } from "react-router"
import { HeroSection } from "../components/hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
    return [
        { title: "KOI" },
        { name: "description", content: "Koi Magazine" }
    ];
}

export default function HomePage() {
    return (
        <div className="min-h-screen w-full">
            <HeroSection/>
            
            {/* 대표 소개 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">대표 소개</h2>
                        <p className="text-gray-600">코이창작소의 방향성과 비전</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img src="/1.JPG" alt="대표 사진" className="w-full h-64 object-cover rounded-lg" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">코이창작소의 방향성</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    진정한 성장은 혼자서는 불가능합니다. 우리는 청년들이 서로를 이해하고, 
                                    소통하며, 함께 성장할 수 있는 공간을 만들어갑니다.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">비전</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    코이는 일본어로 '사랑'을 의미합니다. 우리는 청년들이 자신을 사랑하고, 
                                    타인을 사랑하며, 세상을 사랑할 수 있도록 돕고자 합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 코이 매니저 소개 섹션 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">코이 매니저 소개</h2>
                        <p className="text-gray-600">함께 성장하는 동반자들</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <img src="/2.JPG" alt="매니저 1" className="w-full h-48 object-cover" />
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">매니저 1</h3>
                                <p className="text-gray-600 text-sm">역할과 전문 분야</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <img src="/3.JPG" alt="매니저 2" className="w-full h-48 object-cover" />
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">매니저 2</h3>
                                <p className="text-gray-600 text-sm">역할과 전문 분야</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <img src="/4.jpg" alt="매니저 3" className="w-full h-48 object-cover" />
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">매니저 3</h3>
                                <p className="text-gray-600 text-sm">역할과 전문 분야</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}