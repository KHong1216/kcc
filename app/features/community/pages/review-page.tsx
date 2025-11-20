import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../common/components/ui/dialog";
import { Star, Calendar, Heart } from "lucide-react";
import { getReviews, createReview } from "../queries";
import type { Route } from "./+types/review-page";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com/community/review";
    return [
        { title: "리뷰 - 코이창작소" },
        { name: "description", content: "코이창작소 프로그램 참여자들의 생생한 후기. 에세이 캠프, 연애 캠프, 사진 프로젝트 참여자들의 솔직한 리뷰를 확인하세요." },
        { name: "keywords", content: "코이창작소리뷰, 프로그램후기, 참여자후기, 에세이캠프후기" },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: "리뷰 - 코이창작소" },
        { property: "og:description", content: "코이창작소 프로그램 참여자들의 생생한 후기" },
        { name: "twitter:card", content: "summary" },
        { rel: "canonical", href: url },
    ];
};

export async function loader() {
    const result = await getReviews();

    if (result.error) {
        console.error("[loader] reviews error:", result.error);
        return { reviews: [] };
    }

    return { reviews: result.data ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
    const form = await request.formData();
    const intent = String(form.get("intent") || "");

    if (intent === "create-review") {
        const user_name = String(form.get("user_name") || "").trim();
        const program_id = String(form.get("program_id") || "").trim();
        const rating = Number(form.get("rating") || 0);
        const title = String(form.get("title") || "").trim();
        const content = String(form.get("content") || "").trim();

        if (!user_name || !program_id || !rating || !title || !content)
            return { ok: false, message: "필수 항목을 입력하세요." };

        // 타입 검증
        if (!['love', 'photo', 'essay'].includes(program_id)) {
            return { ok: false, message: "올바른 프로그램을 선택하세요." };
        }

        const result = await createReview({
            user_name,
            program_id: program_id as 'love' | 'photo' | 'essay',
            rating,
            title,
            content,
            is_verified: false,
        });

        if (result.error) {
            console.error("[action] create review error:", result.error);
            return { ok: false, message: "리뷰 작성에 실패했습니다." };
        }

        return new Response(null, {
            status: 302,
            headers: { Location: new URL(request.url).pathname }
        });
    }
    return { ok: true };
}

export default function ReviewPage({ loaderData }: Route.ComponentProps) {
    const { reviews } = loaderData;
    
    const reviewSchemas = reviews.slice(0, 5).map((review) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": review.user_name
        },
        "itemReviewed": {
            "@type": "Service",
            "name": `코이창작소 ${review.program_id} 프로그램`
        },
        "reviewBody": review.content,
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": 5
        },
        "datePublished": review.created_at
    }));
    
    return (
        <>
            {reviewSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            {/* 헤더 섹션 */}
            <section className="pt-14 sm:pt-16 lg:pt-[4.5rem] pb-24 px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center" style={{ background: 'linear-gradient(180deg, #F5F0ED 0%, #FFF5F0 50%, #FDF9F7 70%, #FDF6F0 100%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        참여자 리뷰
                    </h1>
                    <p className="text-lg text-[#3B2F2F]/85 mb-6" style={{ lineHeight: '1.6' }}>
                        코이창작소 프로그램 참여자들의 생생한 후기를 확인하세요
                    </p>
                    <div className="mt-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-[linear-gradient(90deg,#A8C5F8,#F3C3E6)] text-white hover:opacity-90 shadow-lg">작성하기</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>간단 후기 작성</DialogTitle>
                                    <DialogDescription>아래 항목을 입력하고 등록을 눌러주세요.</DialogDescription>
                                </DialogHeader>
                                <form method="post" className="space-y-4">
                                    <input type="hidden" name="intent" value="create-review" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">이름</label>
                                            <Input name="user_name" placeholder="홍길동" required />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">프로그램</label>
                                            <select name="program_id" required className="border rounded px-2 py-2 w-full">
                                                <option value="">선택하세요</option>
                                                <option value="essay">에세이 캠프</option>
                                                <option value="photo">포토 캠프</option>
                                                <option value="love">연애 캠프</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">평점(1~5)</label>
                                            <select name="rating" required className="border rounded px-2 py-2 w-full" defaultValue="5">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">제목</label>
                                            <Input name="title" placeholder="좋은 경험이었어요" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">내용</label>
                                        <Textarea name="content" rows={4} placeholder="간단한 후기를 남겨주세요." required />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">등록</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-8">
                {reviews.length === 0 ? (
                    <Card className="p-12 text-center bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
                        <div className="mb-4" style={{ color: '#A8C5F8' }}>
                            <Star className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>
                            아직 리뷰가 없습니다
                        </h3>
                        <p className="text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                            프로그램 참여 후 첫 번째 리뷰를 작성해보세요.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <Card key={review.id} className="hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                                                {review.user_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-extrabold tracking-tight text-[#3B2F2F]">{review.user_name}</span>
                                                    {review.is_verified && (
                                                        <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs">인증</Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                                            style={{ color: i < review.rating ? '#FFD1BA' : '#E5E7EB' }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge className="bg-[#E8F4FB] text-[#2D6A9F] border-0">{review.program_id}</Badge>
                                    </div>
                                    <CardTitle className="text-lg text-[#3B2F2F] mb-2 font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>
                                        {review.title}
                                    </CardTitle>
                                    <CardDescription className="text-[#7A6666] opacity-80 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        {review.content}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between text-sm text-[#7A6666] opacity-80">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                                                <span>{new Date(review.created_at).toLocaleDateString('ko-KR')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" style={{ color: '#FB7185' }} />
                                                <span>{review.likes_count}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB]">
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