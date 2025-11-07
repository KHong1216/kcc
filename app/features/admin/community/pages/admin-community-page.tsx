// app/features/admin/pages/admin-community-page.tsx
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import client from "../../../../lib/supa-client";
import { Badge } from "../../../../common/components/ui/badge";
import { Plus, Edit2, Trash2, Star, Heart, Calendar, User } from "lucide-react";
import {
  getAllNotices,
  getAllReviews,
  createNotice,
  updateNotice,
  deleteNotice,
  deleteReview,
} from "../queries";
import type { Route } from "./+types/admin-community-page";

export const meta: MetaFunction = () => [
  { title: "커뮤니티 관리 | 코이창작소" },
  { name: "description", content: "공지/리뷰 관리" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  // Promise.all로 병렬 처리
  const [profileResult, noticesResult, reviewsResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAllNotices(),
    getAllReviews(),
  ]);

  // 에러 처리
  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (noticesResult.error) {
    console.error("[loader] notices error:", noticesResult.error);
  }

  if (reviewsResult.error) {
    console.error("[loader] reviews error:", reviewsResult.error);
  }

  return {
    notices: noticesResult.data ?? [],
    reviews: reviewsResult.data ?? [],
  };
}

export async function action({ request }: Route.ActionArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return { error: "로그인이 필요합니다." };
  }

  // 관리자 권한 확인
  const profileResult = await client
    .from("profiles")
    .select("role")
    .eq("email", session.user.email)
    .single();

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return { error: "관리자 권한이 없습니다." };
  }

  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  try {
    if (intent === "create-notice") {
      const result = await createNotice({
        title: String(form.get("title") || ""),
        content: String(form.get("content") || ""),
        category: String(form.get("category") || "기타"),
        is_important: String(form.get("is_important")) === "true",
        author: String(form.get("author") || "관리자"),
      });

      if (result.error) {
        console.error("[action] create notice error:", result.error);
        return { error: "공지사항 작성에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname },
      });
    }

    if (intent === "update-notice") {
      const result = await updateNotice({
        id: String(form.get("id") || ""),
        title: String(form.get("title") || ""),
        content: String(form.get("content") || ""),
        category: String(form.get("category") || "기타"),
        is_important: String(form.get("is_important")) === "true",
      });

      if (result.error) {
        console.error("[action] update notice error:", result.error);
        return { error: "공지사항 수정에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname },
      });
    }

    if (intent === "delete-notice") {
      const result = await deleteNotice(String(form.get("id") || ""));

      if (result.error) {
        console.error("[action] delete notice error:", result.error);
        return { error: "공지사항 삭제에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname },
      });
    }

    if (intent === "delete-review") {
      const result = await deleteReview(String(form.get("id") || ""));

      if (result.error) {
        console.error("[action] delete review error:", result.error);
        return { error: "리뷰 삭제에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname },
      });
    }

    return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

export default function AdminCommunityPage({ loaderData }: Route.ComponentProps) {
  const { notices, reviews } = loaderData as { notices: any[]; reviews: any[] };

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티 관리</h1>
          <p className="text-gray-600">공지사항과 리뷰를 관리하세요.</p>
        </div>

        {/* 공지 작성 폼 */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <CardTitle>새 공지 작성</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="create-notice" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 <span className="text-red-500">*</span></label>
                <Input name="title" placeholder="공지 제목을 입력하세요" required className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용 <span className="text-red-500">*</span></label>
                <Textarea name="content" placeholder="공지 내용을 입력하세요" rows={5} required className="w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select name="category" required className="w-full h-10 border rounded-md px-3 bg-white">
                    <option value="일정">일정</option>
                    <option value="프로그램">프로그램</option>
                    <option value="이벤트">이벤트</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">중요도</label>
                  <select name="is_important" required className="w-full h-10 border rounded-md px-3 bg-white">
                    <option value="false">일반</option>
                    <option value="true">중요</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                  <Input name="author" placeholder="관리자" className="w-full" />
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  공지 등록
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 공지사항 및 리뷰 목록 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 공지사항 */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex items-center justify-between">
                <CardTitle>공지사항</CardTitle>
                <Badge variant="outline">{notices.length}개</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notices.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">공지사항이 없습니다.</p>
                  </div>
                ) : (
                  notices.map(n => (
                    <Card key={n.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-2">{n.title}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              {n.is_important && (
                                <Badge variant="destructive" className="text-xs">중요</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">{n.category}</Badge>
                              <Badge variant="secondary" className="text-xs">
                                {n.is_published ? "공개" : "비공개"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">{n.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{n.author || "관리자"}</span>
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>{n.created_at ? new Date(n.created_at).toLocaleDateString("ko-KR") : ""}</span>
                        </div>
                        <div className="pt-3 border-t space-y-2">
                          <form method="post" className="space-y-2">
                            <input type="hidden" name="intent" value="update-notice" />
                            <input type="hidden" name="id" value={n.id} />
                            <Input name="title" defaultValue={n.title} className="h-9 text-sm" />
                            <Textarea name="content" defaultValue={n.content} rows={3} className="text-sm" />
                            <div className="flex gap-2">
                              <select 
                                name="category" 
                                defaultValue={n.category} 
                                className="flex-1 h-9 text-sm border rounded-md px-2 bg-white"
                              >
                                <option value="일정">일정</option>
                                <option value="프로그램">프로그램</option>
                                <option value="이벤트">이벤트</option>
                                <option value="기타">기타</option>
                              </select>
                              <select 
                                name="is_important" 
                                defaultValue={String(n.is_important)} 
                                className="flex-1 h-9 text-sm border rounded-md px-2 bg-white"
                              >
                                <option value="false">일반</option>
                                <option value="true">중요</option>
                              </select>
                              <Button type="submit" variant="outline" size="sm" className="h-9">
                                <Edit2 className="w-3 h-3 mr-1" />
                                수정
                              </Button>
                            </div>
                          </form>
                          <form method="post">
                            <input type="hidden" name="intent" value="delete-notice" />
                            <input type="hidden" name="id" value={n.id} />
                            <Button type="submit" variant="destructive" size="sm" className="w-full">
                              <Trash2 className="w-3 h-3 mr-1" />
                              삭제
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 리뷰 */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex items-center justify-between">
                <CardTitle>리뷰</CardTitle>
                <Badge variant="outline">{reviews.length}개</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">리뷰가 없습니다.</p>
                  </div>
                ) : (
                  reviews.map(r => (
                    <Card key={r.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base mb-2">{r.title}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">{r.program_id || "리뷰"}</Badge>
                              {r.is_verified && (
                                <Badge variant="secondary" className="text-xs">인증</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < (r.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">{r.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          <span>{r.user_name || "익명"}</span>
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>{r.created_at ? new Date(r.created_at).toLocaleDateString("ko-KR") : ""}</span>
                          <span>•</span>
                          <Heart className="w-3 h-3" />
                          <span>{r.likes_count || 0}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <form method="post">
                            <input type="hidden" name="intent" value="delete-review" />
                            <input type="hidden" name="id" value={r.id} />
                            <Button type="submit" variant="destructive" size="sm" className="w-full">
                              <Trash2 className="w-3 h-3 mr-1" />
                              삭제
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}