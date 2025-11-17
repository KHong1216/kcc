import type { MetaFunction } from "react-router";
import { Form, useActionData } from "react-router";
import type { Route } from "./+types/admin-test-page";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Badge } from "~/common/components/ui/badge";
import { Calendar, Sparkles, User, Phone, Mail, FileText, Heart, CheckCircle2 } from "lucide-react";
import client from "~/lib/supa-client";

export const meta: MetaFunction = () => [
  { title: "감정 실험 관리 | 코이창작소" },
  { name: "description", content: "감정 실험 응답 데이터 조회 및 관리" }
];

interface EmotionTestResponse {
  id: string;
  emotion: string | null;
  emotion_details: string[] | null;
  reason_category: string | null;
  name: string | null;
  age: string | null;
  job: string | null;
  contact: string | null;
  day_mood: string | null;
  need_type: string | null;
  privacy_agreed: boolean;
  status: string | null;
  gift: string | null;
  created_at: string;
}

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  const [profileResult, responsesResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    client.from("emotion_test_responses")
      .select("id, emotion, emotion_details, reason_category, name, age, job, contact, day_mood, need_type, privacy_agreed, status, gift, created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (responsesResult.error) {
    console.error("[loader] emotion_test_responses error:", responsesResult.error);
    return { responses: [] };
  }

  return { responses: (responsesResult.data ?? []) as EmotionTestResponse[] };
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
      const status = String(form.get("status") || "") as 'pending' | 'confirmed' | 'completed' | 'cancelled';

      if (!id || !status) {
        return { error: "ID와 상태가 필요합니다." };
      }

      const { error } = await client
        .from("emotion_test_responses")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("[action] update-status error:", error);
        return { error: error.message || "상태 변경에 실패했습니다." };
      }

      return { success: true, message: "상태가 변경되었습니다." };
    }


    return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

const getStatusBadge = (status: string | null) => {
  const variants: { [key: string]: { className: string; label: string } } = {
    pending: { className: "bg-yellow-500 text-white", label: "대기" },
    confirmed: { className: "bg-green-500 text-white", label: "확정" },
    completed: { className: "bg-blue-500 text-white", label: "완료" },
    cancelled: { className: "bg-red-500 text-white", label: "취소" },
  };
  const config = variants[status || "pending"] || { className: "bg-gray-400 text-white", label: status || "대기" };
  return <Badge className={config.className}>{config.label}</Badge>;
};

const emotionLabels: { [key: string]: string } = {
  "기쁨": "기쁨",
  "슬픔": "슬픔",
  "불안": "불안",
  "분노": "분노",
  "지침": "지침",
  "설렘": "설렘",
  "허무": "허무",
  "안정": "안정",
  "혼란": "혼란",
};

const dayMoodLabels: { [key: string]: string } = {
  worst: "최악",
  normal: "보통",
  good: "좋음",
  excellent: "최고",
};

const needTypeLabels: { [key: string]: string } = {
  comfort: "위로",
  motivation: "동기부여",
  talk: "대화",
  love: "사랑",
  social: "사회적 교류",
  rest: "휴식",
  none: "없음",
};

const giftLabels: { [key: string]: string } = {
  essay: "KOI 에세이 체험권",
  "love-test": "연애 경향성 테스트",
  photo: "KOI 컨셉 촬영 체험권",
};

export default function AdminTestPage({ loaderData }: Route.ComponentProps) {
  const { responses } = loaderData as { responses: EmotionTestResponse[] };
  const actionData = useActionData<{ success?: boolean; error?: string; message?: string }>();

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
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>감정 실험 관리</h1>
              <p className="text-[#3B2F2F]/80 flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                감정 실험 응답 데이터를 확인하고 관리하세요
              </p>
            </div>
          </div>
        </div>

        {responses.length === 0 ? (
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8F4FB, #FFF0F5)' }}>
                <Heart className="w-10 h-10" style={{ color: '#A8C5F8' }} />
              </div>
              <p className="text-[#3B2F2F] text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>응답 데이터가 없습니다.</p>
              <p className="text-[#7A6666] text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>새로운 응답이 등록되면 여기에 표시됩니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {responses.map((r) => (
              <Card key={r.id} className="overflow-hidden border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                <CardHeader className="border-b border-[#FADADD]/30 pb-4" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                          {r.name || "이름 없음"}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {r.emotion && (
                            <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0">
                              {emotionLabels[r.emotion] || r.emotion}
                            </Badge>
                          )}
                          {getStatusBadge(r.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#7A6666] opacity-80">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : "-"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 왼쪽: 사용자 정보 + 경품 정보 */}
                    <div className="flex flex-col gap-4">
                      {/* 기본 정보 */}
                      <div className="p-5 rounded-xl border border-[#FADADD]/30 flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-5 h-5" style={{ color: '#A8C5F8' }} />
                          <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">기본 정보</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">이름</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">{r.name || "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">나이</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">{r.age ? `${r.age}세` : "-"}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">직업</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">{r.job || "-"}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5 flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                              연락처
                            </p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F] break-all">{r.contact || "-"}</p>
                          </div>
                        </div>
                      </div>

                      {/* 경품 정보 */}
                      <div className="p-5 rounded-xl border-2 border-[#F3C3E6]/50 flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)', boxShadow: '0 4px 12px rgba(243, 195, 230, 0.2)' }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5" style={{ color: '#F3C3E6' }} />
                          <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">경품 정보</p>
                        </div>
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">선택한 경품</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">
                              {r.gift ? (giftLabels[r.gift] || r.gift) : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽: 감정 정보 + 상태 관리 */}
                    <div className="flex flex-col gap-4">
                      {/* 감정 정보 */}
                      <div className="p-5 rounded-xl border-2 border-[#FADADD]/50 flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)', boxShadow: '0 4px 12px rgba(243, 195, 230, 0.15)' }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Heart className="w-5 h-5" style={{ color: '#F3C3E6' }} />
                          <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">감정 정보</p>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">선택한 감정</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">
                              {r.emotion ? (emotionLabels[r.emotion] || r.emotion) : "-"}
                            </p>
                          </div>
                          {r.emotion_details && r.emotion_details.length > 0 && (
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-2">세부 키워드</p>
                              <div className="flex flex-wrap gap-2">
                                {r.emotion_details.map((detail, idx) => (
                                  <Badge key={idx} className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0 px-2.5 py-1">
                                    {detail}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#FADADD]/30">
                            {r.reason_category && (
                              <div>
                                <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">주요 요인</p>
                                <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">{r.reason_category}</p>
                              </div>
                            )}
                            {r.day_mood && (
                              <div>
                                <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">하루 기분</p>
                                <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">
                                  {dayMoodLabels[r.day_mood] || r.day_mood}
                                </p>
                              </div>
                            )}
                            {r.need_type && (
                              <div className={r.reason_category && r.day_mood ? "col-span-2" : ""}>
                                <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">가장 필요한 것</p>
                                <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">
                                  {needTypeLabels[r.need_type] || r.need_type}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 상태 관리 */}
                      <div className="p-5 rounded-xl border border-[#FADADD]/30 flex flex-col h-full" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="w-5 h-5" style={{ color: '#A8C5F8' }} />
                          <p className="text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">상태 관리</p>
                        </div>
                        <Form method="post" className="space-y-4 flex-1 flex flex-col justify-center">
                          <input type="hidden" name="intent" value="update-status" />
                          <input type="hidden" name="id" value={r.id} />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <select 
                                name="status" 
                                defaultValue={r.status || "pending"} 
                                className="flex-1 h-11 text-sm border-2 border-[#FADADD]/50 rounded-xl px-4 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F] font-medium"
                              >
                                <option value="pending">대기</option>
                                <option value="confirmed">확정</option>
                                <option value="completed">완료</option>
                                <option value="cancelled">취소</option>
                              </select>
                              <Button 
                                type="submit" 
                                size="sm" 
                                className="h-11 text-white shadow-md hover:shadow-lg transition-all px-5 hover:opacity-90"
                                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                              >
                                변경
                              </Button>
                            </div>
                            <div className="flex justify-center">
                              {getStatusBadge(r.status)}
                            </div>
                          </div>
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

