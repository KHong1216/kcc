import type { MetaFunction } from "react-router";
import { Form, useActionData } from "react-router";
import type { Route } from "./+types/admin-reservations-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Badge } from "../../../../common/components/ui/badge";
import { Calendar, Sparkles, User, Phone, Mail, Clock, Save, FileText, Briefcase, CheckCircle2 } from "lucide-react";
import client from "../../../../lib/supa-client";
import {
  getAllReservations,
  updateReservationStatus,
  updateReservationConfirm,
} from "../queries";

export const meta: MetaFunction = () => [
  { title: "예약 관리 | 리 프레임(Re-Frame)" },
  { name: "description", content: "예약 현황 및 상태 관리" }
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
  const [profileResult, reservationsResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAllReservations(),
  ]);

  // 에러 처리
  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (reservationsResult.error) {
    console.error("[loader] reservations error:", reservationsResult.error);
    return { reservations: [] };
  }

  return { reservations: reservationsResult.data ?? [] };
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
    if (intent === "update-status") {
      const id = String(form.get("id") || "");
      const status = String(form.get("status") || "") as 'pending' | 'confirmed' | 'completed' | 'cancelled';

      if (!id || !status) {
        return { ok: false, message: "invalid input" };
      }

      const result = await updateReservationStatus({ id, status });

      if (result.error) {
        console.error("[action] update-status error:", result.error);
        return { error: result.error.message || "상태 변경에 실패했습니다." };
      }

      return { success: true, message: "상태가 변경되었습니다." };
    }

    if (intent === "update-confirm") {
      const id = String(form.get("id") || "");
      const dateRaw = form.get("confirmed_date");
      const timeRaw = form.get("confirmed_time");

      if (!id) {
        return { ok: false, message: "invalid id" };
      }

      const confirmed_date = dateRaw && String(dateRaw).trim() ? String(dateRaw).trim() : null;
      const confirmed_time = timeRaw && String(timeRaw).trim() ? String(timeRaw).trim() : null;

      const result = await updateReservationConfirm({
        id,
        confirmed_date,
        confirmed_time,
      });

      if (result.error) {
        console.error("[action] update-confirm error:", result.error);
        return { error: result.error.message || "확정 일시 저장에 실패했습니다." };
      }

      return { success: true, message: "확정 일시가 저장되었습니다." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

function getTenMinuteTimes(): string[] {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 10) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      out.push(`${hh}:${mm}`);
    }
  }
  return out;
}

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: { className: string; label: string } } = {
    pending: { className: "bg-yellow-500 text-white", label: "대기" },
    confirmed: { className: "bg-green-500 text-white", label: "확정" },
    completed: { className: "bg-blue-500 text-white", label: "완료" },
    cancelled: { className: "bg-red-500 text-white", label: "취소" },
  };
  const config = variants[status] || { className: "bg-gray-400 text-white", label: status };
  return <Badge className={config.className}>{config.label}</Badge>;
};

export default function AdminReservationsPage({ loaderData }: Route.ComponentProps) {
  const { reservations } = loaderData as { reservations: any[] };
  const actionData = useActionData<{ success?: boolean; error?: string; message?: string }>();
  const timeOptions = getTenMinuteTimes();

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
            <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{actionData.error}</p>
          </div>
        )}

        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>예약 관리</h1>
              <p className="text-[#3B2F2F]/80 flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                예약 현황을 확인하고 상태를 관리하세요
              </p>
            </div>
          </div>
        </div>

        {reservations.length === 0 ? (
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F4FB, #FFF0F5)' }}>
                <Calendar className="w-10 h-10" style={{ color: '#A8C5F8' }} />
              </div>
              <p className="text-[#3B2F2F] text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>예약 데이터가 없습니다.</p>
              <p className="text-[#7A6666] text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>새로운 예약이 등록되면 여기에 표시됩니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {reservations.map(r => (
              <Card key={r.id} className="overflow-hidden border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                <CardHeader className="border-b border-[#FADADD]/30 pb-4" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>{r.user_name || "이름 없음"}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0">
                            {r.program_id || "-"}
                          </Badge>
                          {getStatusBadge(r.status || "pending")}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#7A6666] opacity-80">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      }) : "-"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* 기본 정보 */}
                    <div className="lg:col-span-3 space-y-4">
                      <div className="p-4 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">기본 정보</p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1">이름</p>
                            <p className="font-extrabold tracking-tight text-[#3B2F2F]">{r.user_name || "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1">나이</p>
                            <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">{typeof r.user_age === "number" && r.user_age > 0 ? `${r.user_age}세` : "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1 flex items-center gap-1">
                              <Phone className="w-3 h-3" style={{ color: '#A8C5F8' }} />
                              연락처
                            </p>
                            <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">{r.user_phone || "-"}</p>
                          </div>
                          {r.user_email && (
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-1 flex items-center gap-1">
                                <Mail className="w-3 h-3" style={{ color: '#A8C5F8' }} />
                                이메일
                              </p>
                              <p className="text-sm text-[#3B2F2F]/85 break-all" style={{ lineHeight: '1.6' }}>{r.user_email}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 고객 제공 정보 (notes) - 가장 중요 */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 rounded-xl border-2 border-[#FADADD]/50" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)', boxShadow: '0 4px 12px rgba(243, 195, 230, 0.15)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4" style={{ color: '#F3C3E6' }} />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">고객 제공 정보</p>
                        </div>
                        {r.notes ? (
                          <div className="space-y-2">
                            {r.notes.split('\n').map((line: string, idx: number) => {
                              if (!line.trim()) return null;
                              const isTimeInfo = line.includes('가능한 시간') || line.includes('시간');
                              return (
                                <div 
                                  key={idx} 
                                  className={`p-3 rounded-lg ${
                                    isTimeInfo 
                                      ? 'bg-[#E8F4FB] border border-[#A8C5F8]/30' 
                                      : 'bg-white/50 border border-[#FADADD]/30'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {isTimeInfo ? (
                                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#A8C5F8' }} />
                                    ) : (
                                      <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F3C3E6' }} />
                                    )}
                                    <p className={`text-sm flex-1 ${isTimeInfo ? 'font-extrabold text-[#2D6A9F]' : 'text-[#3B2F2F]/85'}`} style={{ lineHeight: '1.6' }}>
                                      {line}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-white/50 border border-[#FADADD]/30">
                            <p className="text-sm text-[#7A6666] opacity-60" style={{ lineHeight: '1.6' }}>고객이 제공한 정보가 없습니다</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 상태 및 확정 일시 */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* 상태 관리 */}
                      <div className="p-4 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">상태 관리</p>
                        </div>
                        <Form method="post" className="space-y-3">
                          <input type="hidden" name="intent" value="update-status" />
                          <input type="hidden" name="id" value={r.id} />
                          <div className="flex items-center gap-2">
                            <select 
                              name="status" 
                              defaultValue={r.status} 
                              className="flex-1 h-10 text-sm border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                            >
                              <option value="pending">대기</option>
                              <option value="confirmed">확정</option>
                              <option value="completed">완료</option>
                              <option value="cancelled">취소</option>
                            </select>
                            <Button 
                              type="submit" 
                              size="sm" 
                              className="h-10 text-white shadow-md hover:shadow-lg transition-all px-4 hover:opacity-90"
                              style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                            >
                              변경
                            </Button>
                          </div>
                          <div className="pt-2">
                            {getStatusBadge(r.status || "pending")}
                          </div>
                        </Form>
                      </div>

                      {/* 최종 확정 일시 */}
                      <div className="p-4 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4" style={{ color: '#F3C3E6' }} />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">최종 확정 일시</p>
                        </div>
                        <Form method="post" className="space-y-3">
                          <input type="hidden" name="intent" value="update-confirm" />
                          <input type="hidden" name="id" value={r.id} />
                          <div className="space-y-2">
                            <Input 
                              type="date" 
                              name="confirmed_date" 
                              defaultValue={r.confirmed_date ? String(r.confirmed_date).slice(0, 10) : ""} 
                              className="h-10 text-sm w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                            />
                            <select
                              name="confirmed_time"
                              defaultValue={r.confirmed_time ? String(r.confirmed_time).slice(0, 5) : ""}
                              className="w-full h-10 text-sm border-2 border-[#FADADD]/50 rounded-xl px-3 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F]"
                            >
                              <option value="">-- 시간 --</option>
                              {timeOptions.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <Button 
                            type="submit" 
                            size="sm" 
                            className="w-full text-white shadow-md hover:shadow-lg transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}
                          >
                            <Save className="w-3.5 h-3.5 mr-1" />
                            저장
                          </Button>
                        </Form>
                      </div>
                    </div>
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