import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import { Trash2, Mail, Phone, MessageSquare, User, Calendar, CheckCircle2, XCircle, Sparkles, Clock, CheckCircle, Loader2 } from "lucide-react";
import type { Contact } from "../../../../features/community/queries";

interface ContactContentProps {
  contacts: Contact[];
  actionData?: { success?: boolean; error?: string; message?: string };
  loaderError?: string | null;
}

function getStatusBadge(status: Contact['status']) {
  const variants: { [key: string]: { className: string; label: string } } = {
    pending: { className: "bg-yellow-500 text-white", label: "대기중" },
    in_progress: { className: "bg-blue-500 text-white", label: "처리중" },
    completed: { className: "bg-green-500 text-white", label: "완료" },
    cancelled: { className: "bg-red-500 text-white", label: "취소" },
  };
  const config = variants[status || "pending"] || { className: "bg-gray-400 text-white", label: status || "대기중" };
  return <Badge className={config.className}>{config.label}</Badge>;
}

export function ContactContent({ contacts, actionData, loaderError }: ContactContentProps) {
  const pendingCount = contacts.filter(c => c.status === 'pending').length;
  const inProgressCount = contacts.filter(c => c.status === 'in_progress').length;
  const completedCount = contacts.filter(c => c.status === 'completed').length;

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
        {loaderError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200 flex items-start gap-2 sm:gap-3 shadow-md">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-yellow-800 font-medium text-sm sm:text-base">문의 조회 오류</p>
              <p className="text-yellow-700 text-xs sm:text-sm mt-1">{loaderError}</p>
              <p className="text-yellow-600 text-xs mt-2">RLS 정책을 확인해주세요. 관리자 권한이 올바르게 설정되어 있는지 확인하세요.</p>
            </div>
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>문의 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">고객 문의를 관리하세요</span>
                </p>
              </div>
            </div>
          </div>
        </header>

          {/* 통계 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#3B2F2F]/60 mb-1">대기중</p>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  </div>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#3B2F2F]/60 mb-1">처리중</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{inProgressCount}</p>
                  </div>
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#3B2F2F]/60 mb-1">완료</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{completedCount}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>

        {/* 문의 목록 */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate">문의 목록</CardTitle>
              </div>
              <Badge className="text-white px-2 py-1 sm:px-3 text-xs sm:text-sm flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                {contacts.length}개
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <div className="space-y-4 sm:space-y-6">
              {contacts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                    <Mail className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-[#3B2F2F]/60">등록된 문의가 없습니다.</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id} className="border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all">
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        {/* 헤더 */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B2F2F]/60 flex-shrink-0" />
                              <span className="font-semibold text-[#3B2F2F] text-sm sm:text-base">{contact.name}</span>
                              {getStatusBadge(contact.status)}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#3B2F2F]/70">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span>{contact.email}</span>
                              </div>
                              {contact.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(contact.created_at).toLocaleDateString('ko-KR')}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 제목 */}
                        {contact.subject && (
                          <div>
                            <p className="text-sm font-semibold text-[#3B2F2F]/60 mb-1">제목</p>
                            <p className="text-[#3B2F2F]">{contact.subject}</p>
                          </div>
                        )}

                        {/* 문의 내용 */}
                        <div>
                          <p className="text-sm font-semibold text-[#3B2F2F]/60 mb-1">문의 내용</p>
                          <p className="text-[#3B2F2F] whitespace-pre-wrap">{contact.message}</p>
                        </div>

                        {/* 관리자 메모 */}
                        <div>
                          <p className="text-sm font-semibold text-[#3B2F2F]/60 mb-2">관리자 메모</p>
                                <Form method="post" className="space-y-2">
                                  <input type="hidden" name="intent" value="contact-update-notes" />
                                  <input type="hidden" name="id" value={contact.id} />
                            <Textarea
                              name="admin_notes"
                              defaultValue={contact.admin_notes || ""}
                              placeholder="관리자 메모를 입력하세요"
                              rows={3}
                              className="w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all bg-white resize-none text-[#3B2F2F]"
                            />
                            <Button
                              type="submit"
                              size="sm"
                              className="text-white shadow-md hover:shadow-lg transition-all"
                              style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                            >
                              메모 저장
                            </Button>
                          </Form>
                        </div>

                        {/* 액션 버튼 */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 pt-3 sm:pt-4 border-t border-[#FADADD]/30">
                                <Form method="post" className="inline w-full sm:w-auto">
                                  <input type="hidden" name="intent" value="contact-update-status" />
                                  <input type="hidden" name="id" value={contact.id} />
                            <select
                              name="status"
                              defaultValue={contact.status}
                              onChange={(e) => {
                                const form = e.target.closest('form') as HTMLFormElement;
                                form?.requestSubmit();
                              }}
                              className="w-full sm:w-auto h-9 px-3 rounded-lg border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all bg-white text-[#3B2F2F] text-sm"
                            >
                              <option value="pending">대기중</option>
                              <option value="in_progress">처리중</option>
                              <option value="completed">완료</option>
                              <option value="cancelled">취소</option>
                            </select>
                          </Form>
                          <Form method="post" className="inline w-full sm:w-auto">
                            <input type="hidden" name="intent" value="delete-contact" />
                            <input type="hidden" name="id" value={contact.id} />
                            <Button
                              type="submit"
                              variant="destructive"
                              size="sm"
                              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              삭제
                            </Button>
                          </Form>
                        </div>
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
  );
}

