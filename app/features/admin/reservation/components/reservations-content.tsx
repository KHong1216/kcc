import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Badge } from "../../../../common/components/ui/badge";
import { Calendar, Sparkles, User, Phone, Mail, Clock, Save, FileText, Briefcase, CheckCircle2, XCircle } from "lucide-react";

interface Reservation {
  id: string;
  user_name: string | null;
  user_age: number | null;
  user_phone: string | null;
  user_email?: string | null;
  program_id: string | null;
  status: string | null;
  notes: string | null;
  confirmed_date: string | null;
  confirmed_time: string | null;
  created_at: string;
}

interface ReservationsContentProps {
  reservations: Reservation[];
  actionData?: { success?: boolean; error?: string; message?: string };
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

export function ReservationsContent({ reservations, actionData }: ReservationsContentProps) {
  const timeOptions = getTenMinuteTimes();

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
                <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>예약 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">예약 현황을 확인하고 상태를 관리하세요</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {reservations.length === 0 ? (
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardContent className="p-8 sm:p-16 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-[#3B2F2F] text-base sm:text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>예약 데이터가 없습니다.</p>
              <p className="text-[#7A6666] text-xs sm:text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>새로운 예약이 등록되면 여기에 표시됩니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {reservations.map(r => (
              <Card key={r.id} className="overflow-hidden border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-gray-100 pb-3 sm:pb-4 bg-gray-50 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate" style={{ lineHeight: '1.6' }}>{r.user_name || "이름 없음"}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge className="bg-gray-100 text-gray-700 text-xs border-0">
                            {r.program_id || "-"}
                          </Badge>
                          {getStatusBadge(r.status || "pending")}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#7A6666] opacity-80 flex-shrink-0">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      }) : "-"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                    {/* 기본 정보 */}
                    <div className="lg:col-span-3">
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                              <Phone className="w-3 h-3 text-gray-400" />
                              연락처
                            </p>
                            <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">{r.user_phone || "-"}</p>
                          </div>
                          {r.user_email && (
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-1 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-gray-400" />
                                이메일
                              </p>
                              <p className="text-sm text-[#3B2F2F]/85 break-all" style={{ lineHeight: '1.6' }}>{r.user_email}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 고객 제공 정보 (notes) */}
                    <div className="lg:col-span-5">
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                                      ? 'bg-blue-50 border border-blue-200' 
                                      : 'bg-gray-50 border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {isTimeInfo ? (
                                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                                    ) : (
                                      <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                                    )}
                                    <p className={`text-sm flex-1 ${isTimeInfo ? 'font-extrabold text-blue-700' : 'text-[#3B2F2F]/85'}`} style={{ lineHeight: '1.6' }}>
                                      {line}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-sm text-[#7A6666] opacity-60" style={{ lineHeight: '1.6' }}>고객이 제공한 정보가 없습니다</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 상태 및 확정 일시 */}
                    <div className="lg:col-span-4 space-y-3 sm:space-y-4">
                      {/* 상태 관리 */}
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">상태 관리</p>
                        </div>
                        <Form method="post" className="space-y-3">
                          <input type="hidden" name="intent" value="reservation-update-status" />
                          <input type="hidden" name="id" value={r.id} />
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
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
                              className="h-10 text-white shadow-md hover:shadow-lg transition-all px-4 hover:opacity-90 w-full sm:w-auto"
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
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <p className="text-xs font-extrabold tracking-tight text-[#3B2F2F] uppercase">최종 확정 일시</p>
                        </div>
                              <Form method="post" className="space-y-3">
                                <input type="hidden" name="intent" value="reservation-update-confirm" />
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

