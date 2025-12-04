import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { Calendar, Sparkles, User, Phone, Heart, CheckCircle2 } from "lucide-react";

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
  character_name: string | null;
  day: string | null;
  time: string | null;
  created_at: string;
}

interface TestContentProps {
  responses: EmotionTestResponse[];
  actionData?: { success?: boolean; error?: string; message?: string };
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

const getTestType = (response: EmotionTestResponse): "koi-character" | "emotion-research" => {
  return response.character_name ? "koi-character" : "emotion-research";
};

const getTestTypeBadge = (testType: "koi-character" | "emotion-research") => {
  const variants = {
    "koi-character": { className: "bg-[#8B5CF6] text-white", label: "캐릭터 테스트" },
    "emotion-research": { className: "bg-[#4A90E2] text-white", label: "감정 연구 실험" },
  };
  const config = variants[testType];
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
  essay: "에세이 체험권",
  "love-test": "연애 경향성 테스트",
  photo: "컨셉 촬영 체험권",
};

export function TestContent({ responses, actionData }: TestContentProps) {
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
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium text-sm sm:text-base">{actionData.error}</p>
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm flex-shrink-0">
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>감정 실험 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">감정 실험 응답 데이터를 확인하고 관리하세요</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {responses.length === 0 ? (
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardContent className="p-8 sm:p-16 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-[#3B2F2F] text-base sm:text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>응답 데이터가 없습니다.</p>
              <p className="text-[#7A6666] text-xs sm:text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>새로운 응답이 등록되면 여기에 표시됩니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {responses.map((r) => {
              const testType = getTestType(r);
              return (
              <Card key={r.id} className="overflow-hidden border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-gray-100 pb-3 sm:pb-4 bg-gray-50 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate" style={{ lineHeight: '1.6' }}>
                          {r.name || "이름 없음"}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {getTestTypeBadge(testType)}
                          {r.emotion && (
                            <Badge className="bg-gray-100 text-gray-700 text-xs border-0">
                              {emotionLabels[r.emotion] || r.emotion}
                            </Badge>
                          )}
                          {getStatusBadge(r.status)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#7A6666] opacity-80 flex-shrink-0">
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
                <CardContent className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* 왼쪽: 사용자 정보 + 경품 정보 */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* 기본 정보 */}
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col h-full bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">기본 정보</p>
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
                              <Phone className="w-3.5 h-3.5 text-gray-400" />
                              연락처
                            </p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F] break-all">{r.contact || "-"}</p>
                          </div>
                        </div>
                      </div>

                      {/* 경품 정보 (감정 연구 실험만) */}
                      {testType === "emotion-research" && (
                        <div className="p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col h-full bg-white">
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">경품 정보</p>
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
                      )}

                      {/* 세션 예약 정보 (캐릭터 테스트만) */}
                      {testType === "koi-character" && (
                        <div className="p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col h-full bg-white">
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">세션 예약 정보</p>
                          </div>
                          <div className="space-y-3 flex-1 flex flex-col justify-center">
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">캐릭터</p>
                              <p className="text-base font-extrabold tracking-tight text-[#8B5CF6]">
                                {r.character_name || "-"}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">요일</p>
                                <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">
                                  {r.day || "-"}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">시간대</p>
                                <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">
                                  {r.time || "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 오른쪽: 감정 정보 + 상태 관리 */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {/* 감정 정보 */}
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col h-full bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">감정 정보</p>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div>
                            <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">선택한 감정</p>
                            <p className="text-base font-extrabold tracking-tight text-[#3B2F2F]">
                              {r.emotion ? (emotionLabels[r.emotion] || r.emotion) : "-"}
                            </p>
                          </div>
                          {/* 캐릭터 테스트의 경우 캐릭터 이름 표시 */}
                          {testType === "koi-character" && r.character_name && (
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-1.5">캐릭터</p>
                              <p className="text-base font-extrabold tracking-tight text-[#8B5CF6]">
                                {r.character_name}
                              </p>
                            </div>
                          )}
                          {/* 감정 연구 실험의 경우 세부 키워드 표시 */}
                          {testType === "emotion-research" && r.emotion_details && r.emotion_details.length > 0 && (
                            <div>
                              <p className="text-xs text-[#7A6666] opacity-80 mb-2">세부 키워드</p>
                              <div className="flex flex-wrap gap-2">
                                {r.emotion_details.map((detail, idx) => (
                                  <Badge key={idx} className="bg-gray-100 text-gray-700 text-xs border-0 px-2.5 py-1">
                                    {detail}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* 감정 연구 실험의 경우 추가 정보 표시 */}
                          {testType === "emotion-research" && (
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
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
                          )}
                        </div>
                      </div>

                      {/* 상태 관리 */}
                      <div className="p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col h-full bg-white">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-[#3B2F2F] uppercase">상태 관리</p>
                        </div>
                        <Form method="post" className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
                          <input type="hidden" name="intent" value="test-update-status" />
                          <input type="hidden" name="id" value={r.id} />
                          <div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
                              <select 
                                name="status" 
                                defaultValue={r.status || "pending"} 
                                className="flex-1 h-10 sm:h-11 text-sm border-2 border-[#FADADD]/50 rounded-xl px-3 sm:px-4 bg-white focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all text-[#3B2F2F] font-medium"
                              >
                                <option value="pending">대기</option>
                                <option value="confirmed">확정</option>
                                <option value="completed">완료</option>
                                <option value="cancelled">취소</option>
                              </select>
                              <Button 
                                type="submit" 
                                size="sm" 
                                className="h-10 sm:h-11 text-white shadow-md hover:shadow-lg transition-all px-4 sm:px-5 hover:opacity-90 w-full sm:w-auto"
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

