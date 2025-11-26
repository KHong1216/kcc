import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import { Plus, Edit2, Trash2, Star, Heart, Calendar, User, MessageSquare, Sparkles, Bell, CheckCircle2, XCircle } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  is_important: boolean;
  is_published: boolean;
  author: string | null;
  created_at: string;
}

interface Review {
  id: string;
  title: string;
  content: string;
  program_id: string | null;
  is_verified: boolean;
  rating: number;
  user_name: string | null;
  likes_count: number;
  created_at: string;
}

interface CommunityContentProps {
  notices: Notice[];
  reviews: Review[];
  actionData?: { success?: boolean; error?: string; message?: string };
}

export function CommunityContent({ notices, reviews, actionData }: CommunityContentProps) {
  return (
    <div className="h-full bg-transparent relative overflow-auto" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10 pt-4 md:pt-14 lg:pt-[4.5rem]">
        {/* 성공/에러 메시지 */}
        {actionData?.success && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-green-50 border-2 border-green-200 flex items-center gap-2 sm:gap-3 shadow-md">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium text-sm sm:text-base">{actionData.message}</p>
          </div>
        )}
        {actionData?.error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-red-50 border-2 border-red-200 flex items-center gap-2 sm:gap-3 shadow-md">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium text-sm sm:text-base">{actionData.error}</p>
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm flex-shrink-0">
                <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>커뮤니티 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">공지사항과 리뷰를 관리하세요</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 공지 작성 폼 */}
        <Card className="mb-4 sm:mb-6 border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F]">새 공지 작성</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <Form method="post" className="space-y-4 sm:space-y-5" replace>
              <input type="hidden" name="intent" value="create-notice" />
              <div>
                <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <Input 
                  name="title" 
                  placeholder="공지 제목을 입력하세요" 
                  required 
                  className="w-full h-10 sm:h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                  내용 <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  name="content" 
                  placeholder="공지 내용을 입력하세요" 
                  rows={4}
                  required 
                  className="w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white resize-none text-[#3B2F2F]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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
            </Form>
          </CardContent>
        </Card>

        {/* 공지사항 및 리뷰 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* 공지사항 */}
          <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate">공지사항</CardTitle>
                </div>
                <Badge className="text-white px-2 py-1 sm:px-3 text-xs sm:text-sm flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  {notices.length}개
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-5">
              <div className="space-y-4">
                {notices.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-[#3B2F2F] font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>공지사항이 없습니다.</p>
                    <p className="text-[#7A6666] text-sm mt-1 opacity-80" style={{ lineHeight: '1.6' }}>새 공지를 작성해보세요</p>
                  </div>
                ) : (
                  notices.map((n, idx) => (
                    <div key={n.id}>
                      {idx > 0 && <div className="border-t border-gray-100 my-4" />}
                      <div className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>{n.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              {n.is_important && (
                                <Badge className="bg-red-500 text-white text-xs border-0">중요</Badge>
                              )}
                              <Badge className="bg-gray-100 text-gray-700 text-xs border-0">
                                {n.category}
                              </Badge>
                              <Badge className={`text-xs border-0 ${n.is_published ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                                {n.is_published ? "공개" : "비공개"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-[#3B2F2F]/85 whitespace-pre-line line-clamp-3 leading-relaxed" style={{ lineHeight: '1.6' }}>{n.content}</p>
                        <div className="flex items-center gap-2 text-xs text-[#7A6666] opacity-80 pt-2 border-t border-gray-100">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{n.author || "관리자"}</span>
                          <span>•</span>
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{n.created_at ? new Date(n.created_at).toLocaleDateString("ko-KR") : ""}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                          <Form method="post" className="space-y-3" replace>
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
                          </Form>
                          <Form method="post" replace>
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
                          </Form>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 리뷰 */}
          <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate">리뷰</CardTitle>
                </div>
                <Badge className="text-white px-2 py-1 sm:px-3 text-xs sm:text-sm flex-shrink-0" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                  {reviews.length}개
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-5">
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-[#3B2F2F] font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>리뷰가 없습니다.</p>
                    <p className="text-[#7A6666] text-sm mt-1 opacity-80" style={{ lineHeight: '1.6' }}>사용자 리뷰가 등록되면 여기에 표시됩니다</p>
                  </div>
                ) : (
                  reviews.map((r, idx) => (
                    <div key={r.id}>
                      {idx > 0 && <div className="border-t border-gray-100 my-4" />}
                      <div className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>{r.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <Badge className="bg-gray-100 text-gray-700 text-xs border-0">
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
                                  className={`w-4 h-4 ${i < (r.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="text-xs text-[#7A6666] opacity-80 ml-1">({r.rating || 0}/5)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-[#3B2F2F]/85 whitespace-pre-line line-clamp-3 leading-relaxed" style={{ lineHeight: '1.6' }}>{r.content}</p>
                        <div className="flex items-center gap-2 text-xs text-[#7A6666] opacity-80 pt-2 border-t border-gray-100">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-extrabold tracking-tight">{r.user_name || "익명"}</span>
                          <span>•</span>
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{r.created_at ? new Date(r.created_at).toLocaleDateString("ko-KR") : ""}</span>
                          <span>•</span>
                          <Heart className="w-3.5 h-3.5 text-red-400" />
                          <span className="font-extrabold tracking-tight">{r.likes_count || 0}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                          <Form method="post" replace>
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
                          </Form>
                        </div>
                      </div>
                    </div>
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

