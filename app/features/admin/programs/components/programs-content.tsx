import { Form, useNavigation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import { Label } from "../../../../common/components/ui/label";
import { FolderOpen, Sparkles, Save, CheckCircle2, XCircle } from "lucide-react";

interface Program {
  id: string;
  title: string | null;
  description: string | null;
  duration: string | null;
  target_audience: string | null;
  icon: string | null;
  badge: string | null;
  is_active: boolean;
}

interface ProgramsContentProps {
  programs: Program[];
  actionData?: { success?: boolean; error?: string; message?: string };
}

export function ProgramsContent({ programs, actionData }: ProgramsContentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="h-full bg-transparent relative overflow-auto" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-14 sm:pt-16 lg:pt-[4.5rem]">
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

        {/* 헤더 */}
        <header className="mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm">
                <FolderOpen className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>프로젝트 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-4 h-4" />
                  프로젝트 콘텐츠 및 공개 상태를 관리하세요
                </p>
              </div>
            </div>
          </div>
        </header>

        {programs.length === 0 ? (
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                <FolderOpen className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-[#3B2F2F] text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>등록된 프로그램이 없습니다.</p>
              <p className="text-[#7A6666] text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>프로그램을 추가해보세요</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {programs.map((p) => {
              if (!p.id) {
                return null;
              }

              return (
                <Card key={p.id} className="overflow-hidden border border-gray-200 shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                  <CardHeader className="border-b border-gray-100 pb-4 relative overflow-hidden bg-gray-50">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(243,195,230,0.1), rgba(255,230,197,0.1))' }}></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        {p.icon && (
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                            {p.icon}
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-2xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>{p.title || "이름 없음"}</CardTitle>
                          <div className="flex items-center gap-2">
                            {p.badge && (
                              <Badge className="bg-[#E8F4FB] text-[#2D6A9F] text-xs border-0 shadow-md">
                                {p.badge}
                              </Badge>
                            )}
                            <Badge className={`text-xs border-0 ${p.is_active ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                              {p.is_active ? "활성화" : "비활성화"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Form method="post">
                        <input type="hidden" name="intent" value="toggle-active" />
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="is_active" value={String(p.is_active)} />
                        <Button 
                          type="submit" 
                          size="sm"
                          className={`shadow-md hover:shadow-lg transition-all text-white ${
                            p.is_active 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {p.is_active ? "비활성화" : "활성화"}
                        </Button>
                      </Form>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Form method="post" className="space-y-6">
                      <input type="hidden" name="intent" value="update" />
                      <input type="hidden" name="id" value={p.id} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-5">
                          <div>
                            <Label htmlFor={`title-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                              제목
                            </Label>
                            <Input 
                              id={`title-${p.id}`}
                              name="title" 
                              defaultValue={p.title || ""} 
                              required 
                              className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`description-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                              설명
                            </Label>
                            <Textarea 
                              id={`description-${p.id}`}
                              name="description" 
                              rows={4} 
                              defaultValue={p.description || ""} 
                              className="w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white resize-none text-[#3B2F2F]"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`duration-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                              소요 기간
                            </Label>
                            <Input 
                              id={`duration-${p.id}`}
                              name="duration" 
                              defaultValue={p.duration || ""} 
                              placeholder="예: 약 1~2시간"
                              className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                            />
                          </div>
                        </div>
                        <div className="space-y-5">
                          <div>
                            <Label htmlFor={`target_audience-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                              대상
                            </Label>
                            <Textarea 
                              id={`target_audience-${p.id}`}
                              name="target_audience" 
                              rows={4} 
                              defaultValue={p.target_audience || ""} 
                              placeholder="예: 글쓰기를 통해 성장하고 싶은 청년들"
                              className="w-full rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white resize-none text-[#3B2F2F]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`icon-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                                아이콘
                              </Label>
                              <Input 
                                id={`icon-${p.id}`}
                                name="icon" 
                                defaultValue={p.icon || ""} 
                                placeholder="예: ✨"
                                className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`badge-${p.id}`} className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                                배지
                              </Label>
                              <Input 
                                id={`badge-${p.id}`}
                                name="badge" 
                                defaultValue={p.badge || ""} 
                                placeholder="예: NEW"
                                className="w-full h-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#FADADD]/30">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full md:w-auto text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                          style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isSubmitting ? "저장 중..." : "내용 저장"}
                        </Button>
                      </div>
                    </Form>
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

