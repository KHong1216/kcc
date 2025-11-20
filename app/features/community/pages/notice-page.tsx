import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Calendar, User } from "lucide-react";
import type { Route } from "./+types/notice-page";
import { getNotices } from "../queries";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/community/notice";
  return [
    { title: "공지사항 - 코이창작소" },
    { name: "description", content: "코이창작소 공지사항 및 소식. 프로그램 일정, 이벤트, 중요 안내사항을 확인하세요." },
    { name: "keywords", content: "공지사항, 코이창작소소식, 프로그램일정, 이벤트" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "공지사항 - 코이창작소" },
    { property: "og:description", content: "코이창작소 공지사항 및 소식. 프로그램 일정, 이벤트, 중요 안내사항을 확인하세요." },
    { name: "twitter:card", content: "summary" },
    { rel: "canonical", href: url },
  ];
};

export async function loader() {
  const result = await getNotices();
  
  if (result.error) {
    console.error("[loader] notices error:", result.error);
    return { notices: [] };
  }

  return { notices: result.data ?? [] };
}

export default function NoticePage({ loaderData }: Route.ComponentProps) {
  const { notices } = loaderData;
  
  return (
        <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            {/* 헤더 섹션 */}
            <section className="pt-14 sm:pt-16 lg:pt-[4.5rem] pb-24 px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center" style={{ background: 'linear-gradient(180deg, #F5F0ED 0%, #FFF5F0 50%, #FDF9F7 70%, #FDF6F0 100%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        공지사항
                    </h1>
                    <p className="text-lg text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
                        코이창작소의 소식과 공지사항을 확인하세요
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-8">
                {notices.length === 0 ? (
                    <Card className="p-12 text-center bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
                        <div className="mb-4" style={{ color: '#A8C5F8' }}>
                            <Calendar className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>
                            아직 공지사항이 없습니다
                        </h3>
                        <p className="text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                            새로운 소식이 있으면 여기에 표시됩니다.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {notices.map((notice) => (
                            <Card key={notice.id} className="hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className={notice.is_important ? "bg-[#FB7185] text-white" : "bg-[#E8F4FB] text-[#2D6A9F]"}>
                                                    {notice.category}
                                                </Badge>
                                                {notice.is_important && (
                                                    <Badge className="bg-[#FB7185] text-white">중요</Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-xl text-[#3B2F2F] mb-2 font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>
                                                {notice.title}
                                            </CardTitle>
                                            <CardDescription className="text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                                                {notice.content}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between text-sm text-[#7A6666] opacity-80">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                                                <span>{new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                                                <span>{notice.author}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB]">
                                            자세히 보기
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