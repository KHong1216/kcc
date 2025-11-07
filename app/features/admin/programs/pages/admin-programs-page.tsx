import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import client from "../../../../lib/supa-client";
import {
  getAllPrograms,
  updateProgram,
  toggleProgramActive,
} from "../queries";
import type { Route } from "../../program/pages/+types/admin-programs-page";

export const meta: MetaFunction = () => [
  { title: "프로젝트 관리 | 코이창작소" },
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

  // Promise.all로 병렬 처리
  const [profileResult, programsResult] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAllPrograms(),
  ]);

  // 에러 처리
  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }

  if (programsResult.error) {
    console.error("[loader] programs error:", programsResult.error);
    return { programs: [] };
  }

  return { programs: programsResult.data ?? [] };
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
    if (intent === "update") {
      const id = Number(form.get("id"));
      const result = await updateProgram({
        id,
        title: String(form.get("title") || ""),
        description: String(form.get("description") || ""),
        duration: String(form.get("duration") || ""),
        target_audience: String(form.get("target_audience") || ""),
        icon: String(form.get("icon") || ""),
        badge: String(form.get("badge") || ""),
      });

      if (result.error) {
        console.error("[action] update program error:", result.error);
        return { error: "프로그램 수정에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname }
      });
    }

    if (intent === "toggle-active") {
      const id = Number(form.get("id"));
      const is_active = String(form.get("is_active")) === "true";
      
      const result = await toggleProgramActive(id, is_active);

      if (result.error) {
        console.error("[action] toggle active error:", result.error);
        return { error: "상태 변경에 실패했습니다." };
      }

      return new Response(null, {
        status: 302,
        headers: { Location: new URL(request.url).pathname }
      });
    }

    return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

export default function AdminProgramsPage({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData as { programs: any[] };

    return (
      <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">프로젝트 관리</h1>
            <p className="text-gray-600">프로젝트 콘텐츠 및 공개 상태를 관리하세요.</p>
          </div>

          {programs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 text-lg">등록된 프로그램이 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {programs.map(p => (
                <Card key={p.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {p.icon && (
                          <div className="text-3xl">{p.icon}</div>
                        )}
                        <div>
                          <CardTitle className="text-xl">{p.title || "이름 없음"}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {p.badge && (
                              <Badge variant="outline" className="text-xs">{p.badge}</Badge>
                            )}
                            <Badge variant={p.is_active ? "default" : "secondary"} className="text-xs">
                              {p.is_active ? "활성화" : "비활성화"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <form method="post">
                        <input type="hidden" name="intent" value="toggle-active" />
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="is_active" value={String(p.is_active)} />
                        <Button 
                          type="submit" 
                          variant={p.is_active ? "destructive" : "default"}
                          size="sm"
                        >
                          {p.is_active ? "비활성화" : "활성화"}
                        </Button>
                      </form>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form method="post" className="space-y-6">
                      <input type="hidden" name="intent" value="update" />
                      <input type="hidden" name="id" value={p.id} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 왼쪽 컬럼 */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              제목
                            </label>
                            <Input 
                              name="title" 
                              defaultValue={p.title || ""} 
                              required 
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              설명
                            </label>
                            <Textarea 
                              name="description" 
                              rows={4} 
                              defaultValue={p.description || ""} 
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              소요 기간
                            </label>
                            <Input 
                              name="duration" 
                              defaultValue={p.duration || ""} 
                              placeholder="예: 약 1~2시간"
                              className="w-full"
                            />
                          </div>
                        </div>

                        {/* 오른쪽 컬럼 */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              대상
                            </label>
                            <Textarea 
                              name="target_audience" 
                              rows={4} 
                              defaultValue={p.target_audience || ""} 
                              placeholder="예: 글쓰기를 통해 성장하고 싶은 청년들"
                              className="w-full"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                아이콘
                              </label>
                              <Input 
                                name="icon" 
                                defaultValue={p.icon || ""} 
                                placeholder="예: ✨"
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                배지
                              </label>
                              <Input 
                                name="badge" 
                                defaultValue={p.badge || ""} 
                                placeholder="예: NEW"
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button type="submit" variant="default" className="w-full md:w-auto">
                          내용 저장
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}