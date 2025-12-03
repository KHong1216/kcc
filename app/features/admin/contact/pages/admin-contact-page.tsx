// app/features/admin/contact/pages/admin-contact-page.tsx
import type { MetaFunction } from "react-router";
import { Form, useActionData, useRevalidator } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Textarea } from "../../../../common/components/ui/textarea";
import client from "../../../../lib/supa-client";
import { Badge } from "../../../../common/components/ui/badge";
import { Trash2, Mail, Phone, MessageSquare, User, Calendar, CheckCircle2, XCircle, Sparkles, Clock, CheckCircle, X, Loader2 } from "lucide-react";
import {
  getAllContacts,
  updateContact,
  deleteContact,
} from "../queries";
import type { Route } from "./+types/admin-contact-page";
import { useEffect } from "react";
import type { Contact } from "../../../../features/community/queries";

export const meta: MetaFunction = () => [
  { title: "문의 관리 | 리 프레임(Re-Frame)" },
  { name: "description", content: "문의 관리" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  const [profileResult, contactsResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAllContacts(session),
  ]);

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (contactsResult.error) {
    console.error("[loader] contacts error:", contactsResult.error);
    console.error("[loader] contacts error details:", JSON.stringify(contactsResult.error, null, 2));
    console.error("[loader] session user email:", session.user.email);
    
    // RLS 오류인 경우 상세 정보 출력
    if (contactsResult.error.code === '42501' || contactsResult.error.message?.includes('permission')) {
      console.error("[loader] RLS policy error - 관리자 권한이 확인되지 않았습니다.");
    }
  }

  return {
    contacts: contactsResult.data ?? [],
    error: contactsResult.error ? contactsResult.error.message : null,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return { error: "로그인이 필요합니다." };
  }

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
    if (intent === "update-status") {
      const id = String(form.get("id") || "");
      const status = String(form.get("status") || "") as 'pending' | 'in_progress' | 'completed' | 'cancelled';
      
      const result = await updateContact({
        id,
        status,
      });

      if (result.error) {
        console.error("[action] update contact error:", result.error);
        return { error: "문의 상태 변경에 실패했습니다." };
      }

      return { success: true, message: "문의 상태가 변경되었습니다." };
    }

    if (intent === "update-notes") {
      const id = String(form.get("id") || "");
      const admin_notes = String(form.get("admin_notes") || "");

      const result = await updateContact({
        id,
        admin_notes: admin_notes || null,
      });

      if (result.error) {
        console.error("[action] update contact notes error:", result.error);
        return { error: "관리자 메모 저장에 실패했습니다." };
      }

      return { success: true, message: "관리자 메모가 저장되었습니다." };
    }

    if (intent === "delete-contact") {
      const result = await deleteContact(String(form.get("id") || ""));

      if (result.error) {
        console.error("[action] delete contact error:", result.error);
        return { error: "문의 삭제에 실패했습니다." };
      }

      return { success: true, message: "문의가 삭제되었습니다." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

function getStatusBadge(status: Contact['status']) {
  const statusConfig = {
    pending: { label: "대기중", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
    in_progress: { label: "처리중", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Loader2 },
    completed: { label: "완료", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
    cancelled: { label: "취소", color: "bg-red-100 text-red-800 border-red-200", icon: X },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} border flex items-center gap-1 px-2 py-1`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

export default function AdminContactPage({ loaderData }: Route.ComponentProps) {
  const { contacts, error: loaderError } = loaderData as { contacts: Contact[]; error?: string | null };
  const actionData = useActionData<{ success?: boolean; error?: string; message?: string }>();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (actionData?.success) {
      revalidator.revalidate();
    }
  }, [actionData?.success, revalidator]);

  const pendingCount = contacts.filter(c => c.status === 'pending').length;
  const inProgressCount = contacts.filter(c => c.status === 'in_progress').length;
  const completedCount = contacts.filter(c => c.status === 'completed').length;

  return (
    <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-14 sm:pt-16 lg:pt-[4.5rem]">
        {/* 성공/에러 메시지 */}
        {actionData?.success && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border-2 border-green-200 flex items-center gap-3 shadow-md">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">{actionData.message}</p>
          </div>
        )}
        {actionData?.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-200 flex items-center gap-3 shadow-md">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{actionData.error}</p>
          </div>
        )}
        {loaderError && (
          <div className="mb-6 p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200 flex items-center gap-3 shadow-md">
            <XCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-yellow-800 font-medium">문의 조회 오류</p>
              <p className="text-yellow-700 text-sm mt-1">{loaderError}</p>
              <p className="text-yellow-600 text-xs mt-2">RLS 정책을 확인해주세요. 관리자 권한이 올바르게 설정되어 있는지 확인하세요.</p>
            </div>
          </div>
        )}

        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>문의 관리</h1>
              <p className="text-[#3B2F2F]/80 flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                고객 문의를 관리하세요
              </p>
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#3B2F2F]/60 mb-1">대기중</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#3B2F2F]/60 mb-1">처리중</p>
                    <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
                  </div>
                  <Loader2 className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#FADADD]/30 shadow-md bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#3B2F2F]/60 mb-1">완료</p>
                    <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 문의 목록 */}
        <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
          <CardHeader className="border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">문의 목록</CardTitle>
              </div>
              <Badge className="text-white px-3 py-1" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                {contacts.length}개
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {contacts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F4FB, #FFF0F5)' }}>
                    <Mail className="w-8 h-8" style={{ color: '#A8C5F8' }} />
                  </div>
                  <p className="text-[#3B2F2F]/60">등록된 문의가 없습니다.</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id} className="border border-[#FADADD]/30 shadow-sm bg-white hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* 헤더 */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <User className="w-5 h-5 text-[#3B2F2F]/60" />
                              <span className="font-semibold text-[#3B2F2F]">{contact.name}</span>
                              {getStatusBadge(contact.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#3B2F2F]/70">
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
                            <input type="hidden" name="intent" value="update-notes" />
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
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#FADADD]/30">
                          <Form method="post" className="inline">
                            <input type="hidden" name="intent" value="update-status" />
                            <input type="hidden" name="id" value={contact.id} />
                            <select
                              name="status"
                              defaultValue={contact.status}
                              onChange={(e) => {
                                const form = e.target.closest('form') as HTMLFormElement;
                                form?.requestSubmit();
                              }}
                              className="h-9 px-3 rounded-lg border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all bg-white text-[#3B2F2F] text-sm"
                            >
                              <option value="pending">대기중</option>
                              <option value="in_progress">처리중</option>
                              <option value="completed">완료</option>
                              <option value="cancelled">취소</option>
                            </select>
                          </Form>
                          <Form method="post" className="inline">
                            <input type="hidden" name="intent" value="delete-contact" />
                            <input type="hidden" name="id" value={contact.id} />
                            <Button
                              type="submit"
                              variant="destructive"
                              size="sm"
                              className="shadow-md hover:shadow-lg transition-all"
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

