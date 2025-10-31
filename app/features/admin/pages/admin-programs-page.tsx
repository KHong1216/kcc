// app/features/admin/pages/admin-programs-page.tsx
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import client from "../../../lib/supa-client";
import type { Route } from "./+types/admin-programs-page";

export const meta: MetaFunction = () => [
  { title: "프로젝트 관리 | 코이창작소" },
  { name: "description", content: "프로젝트 콘텐츠 및 공개 상태 관리" }
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: programs } = await client
    .from("programs")
    .select("*")
    .order("id", { ascending: true });

  return { programs: programs ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "update") {
    const id = String(form.get("id") || "");
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");
    const duration = String(form.get("duration") || "");
    const target_audience = String(form.get("target_audience") || "");
    const icon = String(form.get("icon") || "");
    const badge = String(form.get("badge") || "");
    
    await client.from("programs").update({
      title,
      description,
      duration,
      target_audience,
      icon,
      badge,
    }).eq("id", id);

    return new Response(null, {
      status: 302,
      headers: { Location: new URL(request.url).pathname }
    });
  }

  if (intent === "toggle-active") {
    const id = String(form.get("id") || "");
    const is_active = String(form.get("is_active")) === "true";
    await client.from("programs").update({ is_active: !is_active }).eq("id", id);

    return new Response(null, {
      status: 302,
      headers: { Location: new URL(request.url).pathname }
    });
  }

  return { ok: true };
}

export default function AdminProgramsPage({ loaderData }: Route.ComponentProps) {
    const { programs } = loaderData as { programs: any[] };

    return (
      <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-4">프로젝트 관리</h1>
          {programs.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                등록된 프로그램이 없습니다.
              </CardContent>
            </Card>
          ) : (
            programs.map(p => (
            <Card key={p.id}>
              <CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <form method="post" className="space-y-2">
                  <input type="hidden" name="intent" value="update" />
                  <input type="hidden" name="id" value={p.id} />
                  <div>
                    <label className="text-sm font-medium">제목</label>
                    <Input name="title" defaultValue={p.title || ""} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">설명</label>
                    <Textarea name="description" rows={3} defaultValue={p.description || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">소요 기간</label>
                    <Input name="duration" defaultValue={p.duration || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">대상</label>
                    <Textarea name="target_audience" rows={3} defaultValue={p.target_audience || ""} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">아이콘</label>
                      <Input name="icon" defaultValue={p.icon || ""} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">배지</label>
                      <Input name="badge" defaultValue={p.badge || ""} />
                    </div>
                  </div>
                  <Button type="submit" variant="outline">내용 저장</Button>
                </form>

                <form method="post">
                  <input type="hidden" name="intent" value="toggle-active" />
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="is_active" value={String(p.is_active)} />
                  <Button type="submit">{p.is_active ? "비활성화" : "활성화"}</Button>
                </form>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    );
}