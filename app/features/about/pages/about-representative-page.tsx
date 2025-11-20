import type { MetaFunction } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Heart, BookOpen, Users, Star } from "lucide-react";
import type { Route } from "./+types/about-representative-page";
import { getRepresentativeFromManagers } from "../queries";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com/about/representative";
    return [
      { title: "대표 소개 | 코이창작소" },
      { name: "description", content: "코이창작소 대표 소개. 청년들의 성장을 돕는 상담사와 함께 나만의 이야기를 찾아보세요." },
      { name: "keywords", content: "코이창작소대표, 청년상담사, 대표소개, 코이창작소" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: "대표 소개 | 코이창작소" },
      { property: "og:description", content: "코이창작소 대표 소개. 청년들의 성장을 돕는 상담사와 함께 나만의 이야기를 찾아보세요." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-representative.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "대표 소개 | 코이창작소" },
      { name: "twitter:description", content: "코이창작소 대표 소개. 청년들의 성장을 돕는 상담사와 함께 나만의 이야기를 찾아보세요." },
      { rel: "canonical", href: url },
    ];
  };

export async function loader({ request }: Route.LoaderArgs) {
    const representative = await getRepresentativeFromManagers();
    return { representative };
}


export default function AboutRepresentativePage({ loaderData }: Route.ComponentProps) {
    const { representative } = loaderData;

    if (!representative) {
        return (
            <div className="min-h-screen w-full pt-16 sm:pt-20 flex items-center justify-center">
                <p className="text-gray-600">대표 정보가 준비중입니다.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full">
            {/* 히어로 섹션 */}
            <section className="pt-14 sm:pt-16 lg:pt-[4.5rem] px-4 sm:px-6 lg:px-8 bg-koi-hero min-h-[300px] flex items-center">
                <div className="max-w-4xl mx-auto text-center w-full">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[#3B2F2F]">
                        안녕하세요, 코이창작소입니다
                    </h1>
                    <p className="text-lg text-[#3B2F2F] opacity-80 mb-6">
                        코이창작소를 시작하게 된 이야기를 들려드릴게요
                    </p>
                </div>
            </section>

            {/* 대표자 프로필 섹션 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* 프로필 이미지 */}
                        <div className="relative">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src={representative.image}
                                    alt={representative.name}
                                    className="w-full h-full object-cover object-center"
                                    width={400}
                                    height={500}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            {/* 플로팅 배지 */}
                            <div className="absolute -bottom-4 -right-4">
                                <Badge className="bg-koi-gradient text-white text-sm px-4 py-2 rounded-full shadow-lg">
                                    코이창작소 대표
                                </Badge>
                            </div>
                        </div>

                        {/* 프로필 정보 */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-[#3B2F2F]">{representative.name}</h2>
                                <p className="text-lg text-koi-blue font-medium mb-4">코이창작소 대표</p>
                                <div className="bg-koi-soft rounded-lg p-4">
                                    <p className="text-[#3B2F2F] leading-relaxed">
                                        "{representative.description}"
                                    </p>
                                </div>
                            </div>

                            {/* 간단한 소개 */}
                            <div className="space-y-3">
                                {representative.graduation && (
                                    <div className="flex items-center space-x-2">
                                        <BookOpen className="w-5 h-5 text-koi-blue" />
                                        <span className="text-[#7A6666] opacity-80">{representative.graduation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 간단한 이력 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-[#3B2F2F]">간단한 이력</h2>
                        <p className="text-[#7A6666] opacity-80">자세한 건 만나서 이야기해요!</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg text-[#3B2F2F]">학력 & 자격</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(representative.qualifications || []).map((q, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <Star className="w-4 h-4 text-koi-peach" />
                                        <div><p className="font-medium text-[#3B2F2F]">{q}</p></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="p-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg text-[#3B2F2F]">경험</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(representative.career || []).map((c, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <Users className="w-4 h-4 text-koi-blue" />
                                        <div><p className="font-medium text-[#3B2F2F]">{c}</p></div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 함께하고 싶은 것들 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-koi-soft">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-[#3B2F2F]">함께하고 싶은 것들</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-koi-soft rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6 text-koi-lavender" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-[#3B2F2F]">마음 나누기</h3>
                            <p className="text-[#7A6666] text-sm opacity-80">
                                고민과 기쁨을 함께 나누고, 서로의 이야기를 들어주는 시간
                            </p>
                        </Card>

                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-koi-soft rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-6 h-6 text-koi-blue" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-[#3B2F2F]">함께 배우기</h3>
                            <p className="text-[#7A6666] text-sm opacity-80">
                                새로운 것을 배우고, 함께 성장해가는 과정
                            </p>
                        </Card>

                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-koi-soft rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-koi-peach" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-[#3B2F2F]">꿈 찾기</h3>
                            <p className="text-[#7A6666] text-sm opacity-80">
                                자신만의 길을 찾고, 꿈을 향해 나아가는 여정
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-koi-gradient text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                        함께 이야기해요
                    </h2>
                    <p className="text-lg mb-6 opacity-80">
                        혼자 고민하지 마세요. 함께 나누면 더 좋은 답을 찾을 수 있어요
                    </p>

                </div>
            </section>
        </div >
    )
}