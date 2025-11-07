import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Calendar, User } from "lucide-react";
import type { Route } from "./+types/notice-page";
import { getNotices } from "../queries";

export const meta: MetaFunction = () => {
  return [
    { title: "공지사항 - 코이창작소" },
    { name: "description", content: "코이창작소 공지사항 및 소식" }
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
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
            {/* 헤더 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        공지사항
                    </h1>
                    <p className="text-lg text-gray-600">
                        코이창작소의 소식과 공지사항을 확인하세요
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {notices.length === 0 ? (
                    <Card className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <Calendar className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            아직 공지사항이 없습니다
                        </h3>
                        <p className="text-gray-500">
                            새로운 소식이 있으면 여기에 표시됩니다.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {notices.map((notice) => (
                            <Card key={notice.id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant={notice.is_important ? "destructive" : "secondary"}>
                                                    {notice.category}
                                                </Badge>
                                                {notice.is_important && (
                                                    <Badge variant="destructive">중요</Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-xl text-gray-900 mb-2">
                                                {notice.title}
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                {notice.content}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{notice.author}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
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