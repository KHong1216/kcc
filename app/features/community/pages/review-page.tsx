import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Star, Calendar, User, Heart } from "lucide-react";
import { getReviews } from "../queries";
import type { Route } from "./+types/review-page";

export const meta: MetaFunction = () => {
    return [
        { title: "리뷰 - 코이창작소" },
        { name: "description", content: "코이창작소 프로그램 참여자들의 생생한 후기" }
    ];
};

export const loader = async () => {
    const reviews = await getReviews();
    return { reviews };
}

export default function ReviewPage({ loaderData }: Route.ComponentProps) {
    const { reviews } = loaderData;
    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
            {/* 헤더 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        참여자 리뷰
                    </h1>
                    <p className="text-lg text-gray-600">
                        코이창작소 프로그램 참여자들의 생생한 후기를 확인하세요
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {reviews.length === 0 ? (
                    <Card className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <Star className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            아직 리뷰가 없습니다
                        </h3>
                        <p className="text-gray-500">
                            프로그램 참여 후 첫 번째 리뷰를 작성해보세요.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                                                {review.user_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">{review.user_name}</span>
                                                    {review.is_verified && (
                                                        <Badge variant="secondary" className="text-xs">인증</Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline">{review.program_id}</Badge>
                                    </div>
                                    <CardTitle className="text-lg text-gray-900 mb-2">
                                        {review.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 leading-relaxed">
                                        {review.content}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(review.created_at).toLocaleDateString('ko-KR')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                <span>{review.likes_count}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            도움됨
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}