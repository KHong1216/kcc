import type { MetaFunction } from "react-router";
import { useActionData, useNavigation, Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import { Label } from "../../../../common/components/ui/label";
import { FolderOpen, Sparkles, Save, CheckCircle2, XCircle } from "lucide-react";
import client from "../../../../lib/supa-client";
import {
  getAllPrograms,
  updateProgram,
  toggleProgramActive,
} from "../queries";
import type { Route } from "../../programs/pages/+types/admin-programs-page";

export const meta: MetaFunction = () => [
  { title: "프로젝트 관리 | 리 프레임(Re-Frame)" },
  { name: "description", content: "프로젝트 콘텐츠 및 공개 상태 관리" }
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  const [profileResult, programsResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAllPrograms(),
  ]);

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (programsResult.error) {
    return { programs: [] };
  }

  return { programs: programsResult.data ?? [] };
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
  const intent = form.get("intent");

  if (intent === "update") {
    const id = form.get("id");
    const title = form.get("title");

    if (!id || typeof id !== "string") {
      return { error: "프로그램 ID가 필요합니다." };
    }

    if (!title || typeof title !== "string" || !title.trim()) {
      return { error: "제목은 필수입니다." };
    }

    const result = await updateProgram({
      id,
      title: title.trim(),
      description: String(form.get("description") || ""),
      duration: String(form.get("duration") || ""),
      target_audience: String(form.get("target_audience") || ""),
      icon: String(form.get("icon") || ""),
      badge: String(form.get("badge") || ""),
    });

    if (result.error) {
      return { error: "프로그램 수정에 실패했습니다." };
    }

    return { success: true, message: "프로그램이 성공적으로 수정되었습니다." };
  }

  if (intent === "toggle-active") {
    const id = form.get("id");
    const isActiveValue = form.get("is_active");

    if (!id || typeof id !== "string") {
      return { error: "프로그램 ID가 필요합니다." };
    }

    const isActive = String(isActiveValue) === "true";
    const result = await toggleProgramActive(id, isActive);

    if (result.error) {
      return { error: "상태 변경에 실패했습니다." };
    }

    return { success: true, message: "상태가 변경되었습니다." };
  }

  return { error: "알 수 없는 작업입니다." };
}

export default function AdminProgramsPage({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData as { programs: any[] };
  const actionData = useActionData<{ success?: boolean; error?: string; message?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

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

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
              <FolderOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>프로젝트 관리</h1>
              <p className="text-[#3B2F2F]/80 flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#F3C3E6' }} />
                프로젝트 콘텐츠 및 공개 상태를 관리하세요
              </p>
            </div>
          </div>
        </div>

        {programs.length === 0 ? (
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF0F5, #FFE5E5)' }}>
                <FolderOpen className="w-10 h-10" style={{ color: '#F3C3E6' }} />
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
                <Card key={p.id} className="overflow-hidden border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
                  <CardHeader className="border-b border-[#FADADD]/30 pb-4 relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
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

