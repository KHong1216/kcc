// app/features/admin/pages/admin-community-page.tsx
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import client from "../../../../lib/supa-client";
import { Badge } from "../../../../common/components/ui/badge";
import { Plus, Edit2, Trash2, Star, Heart, Calendar, User, MessageSquare, Sparkles, Bell } from "lucide-react";
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
    <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-14 sm:pt-16 lg:pt-[4.5rem]">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>커뮤니티 관리</h1>
              <p className="text-[#3B2F2F]/80 flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                공지사항과 리뷰를 관리하세요
              </p>
            </div>
          </div>
        </div>

        {/* 공지 작성 폼 */}
        <Card className="mb-8 border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
          <CardHeader className="border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">새 공지 작성</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form method="post" className="space-y-5">
              <input type="hidden" name="intent" value="create-notice" />
              <div>
                <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="title" 
                  placeholder="공지 제목을 입력하세요" 
                  required 
                  className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                  내용 <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  name="content" 
                  placeholder="공지 내용을 입력하세요" 
                  rows={5} 
                  required 
                  className="w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white resize-none text-[#3B2F2F]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">카테고리</label>
                  <select 
                    name="category" 
                    required 
                    className="w-full h-11 border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                  >
                    <option value="일정">일정</option>
                    <option value="프로그램">프로그램</option>
                    <option value="이벤트">이벤트</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">중요도</label>
                  <select 
                    name="is_important" 
                    required 
                    className="w-full h-11 border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                  >
                    <option value="false">일반</option>
                    <option value="true">중요</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">작성자</label>
                  <Input 
                    name="author" 
                    placeholder="관리자" 
                    className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-[#FADADD]/30">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                >
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
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
            <CardHeader className="border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">공지사항</CardTitle>
                </div>
                <Badge className="text-white px-3 py-1" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  {notices.length}개
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notices.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F4FB, #FFF0F5)' }}>
                      <Bell className="w-8 h-8" style={{ color: '#A8C5F8' }} />
                    </div>
                    <p className="text-[#3B2F2F] font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>공지사항이 없습니다.</p>
                    <p className="text-[#7A6666] text-sm mt-1 opacity-80" style={{ lineHeight: '1.6' }}>새 공지를 작성해보세요</p>
                  </div>
                ) : (
                  notices.map(n => (
                    <Card key={n.id} className="overflow-hidden border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                      <CardHeader className="border-b border-[#FADADD]/30 pb-3" style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>{n.title}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              {n.is_important && (
                                <Badge className="bg-[#FB7185] text-white text-xs border-0">중요</Badge>
                              )}
                              <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0">
                                {n.category}
                              </Badge>
                              <Badge className={`text-xs border-0 ${n.is_published ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                                {n.is_published ? "공개" : "비공개"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 space-y-4">
                        <p className="text-sm text-[#3B2F2F]/85 whitespace-pre-line line-clamp-3 leading-relaxed" style={{ lineHeight: '1.6' }}>{n.content}</p>
                        <div className="flex items-center gap-2 text-xs text-[#7A6666] opacity-80 pt-2 border-t border-[#FADADD]/30">
                          <User className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                          <span>{n.author || "관리자"}</span>
                          <span>•</span>
                          <Calendar className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                          <span>{n.created_at ? new Date(n.created_at).toLocaleDateString("ko-KR") : ""}</span>
                        </div>
                        <div className="pt-4 border-t space-y-3">
                          <form method="post" className="space-y-3">
                            <input type="hidden" name="intent" value="update-notice" />
                            <input type="hidden" name="id" value={n.id} />
                            <Input 
                              name="title" 
                              defaultValue={n.title} 
                              className="h-10 text-sm rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                            />
                            <Textarea 
                              name="content" 
                              defaultValue={n.content} 
                              rows={3} 
                              className="text-sm rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all resize-none text-[#3B2F2F]"
                            />
                            <div className="flex gap-2">
                              <select 
                                name="category" 
                                defaultValue={n.category} 
                                className="flex-1 h-10 text-sm border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                              >
                                <option value="일정">일정</option>
                                <option value="프로그램">프로그램</option>
                                <option value="이벤트">이벤트</option>
                                <option value="기타">기타</option>
                              </select>
                              <select 
                                name="is_important" 
                                defaultValue={String(n.is_important)} 
                                className="flex-1 h-10 text-sm border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                              >
                                <option value="false">일반</option>
                                <option value="true">중요</option>
                              </select>
                              <Button 
                                type="submit" 
                                size="sm" 
                                className="h-10 text-white shadow-md hover:shadow-lg transition-all px-4 hover:opacity-90"
                                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                              >
                                <Edit2 className="w-3.5 h-3.5 mr-1" />
                                수정
                              </Button>
                            </div>
                          </form>
                          <form method="post">
                            <input type="hidden" name="intent" value="delete-notice" />
                            <input type="hidden" name="id" value={n.id} />
                            <Button 
                              type="submit" 
                              variant="destructive" 
                              size="sm" 
                              className="w-full bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
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
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
            <CardHeader className="border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">리뷰</CardTitle>
                </div>
                <Badge className="text-white px-3 py-1" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                  {reviews.length}개
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF0F5, #FFE5E5)' }}>
                      <Star className="w-8 h-8" style={{ color: '#F3C3E6' }} />
                    </div>
                    <p className="text-[#3B2F2F] font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>리뷰가 없습니다.</p>
                    <p className="text-[#7A6666] text-sm mt-1 opacity-80" style={{ lineHeight: '1.6' }}>사용자 리뷰가 등록되면 여기에 표시됩니다</p>
                  </div>
                ) : (
                  reviews.map(r => (
                    <Card key={r.id} className="overflow-hidden border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                      <CardHeader className="border-b border-[#FADADD]/30 pb-3" style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>{r.title}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0">
                                {r.program_id || "리뷰"}
                              </Badge>
                              {r.is_verified && (
                                <Badge className="bg-green-500 text-white text-xs border-0">✓ 인증</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < (r.rating || 0) ? "fill-[#FFD1BA] text-[#FFD1BA]" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="text-xs text-[#7A6666] opacity-80 ml-1">({r.rating || 0}/5)</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 space-y-4">
                        <p className="text-sm text-[#3B2F2F]/85 whitespace-pre-line line-clamp-3 leading-relaxed" style={{ lineHeight: '1.6' }}>{r.content}</p>
                        <div className="flex items-center gap-2 text-xs text-[#7A6666] opacity-80 pt-2 border-t border-[#FADADD]/30">
                          <User className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                          <span className="font-extrabold tracking-tight">{r.user_name || "익명"}</span>
                          <span>•</span>
                          <Calendar className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                          <span>{r.created_at ? new Date(r.created_at).toLocaleDateString("ko-KR") : ""}</span>
                          <span>•</span>
                          <Heart className="w-3.5 h-3.5" style={{ color: '#FB7185' }} />
                          <span className="font-extrabold tracking-tight">{r.likes_count || 0}</span>
                        </div>
                        <div className="pt-3 border-t border-[#FADADD]/30">
                          <form method="post">
                            <input type="hidden" name="intent" value="delete-review" />
                            <input type="hidden" name="id" value={r.id} />
                            <Button 
                              type="submit" 
                              variant="destructive" 
                              size="sm" 
                              className="w-full bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
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