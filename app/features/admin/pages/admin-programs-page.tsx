// app/features/admin/pages/admin-projects-page.tsx
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import client from "../../../lib/supa-client";
import type { Route } from "./+types/admin-programs-page";
import { listPrograms, toggleProgramActive, updateProgram } from "../queries";

export const meta: MetaFunction = () => [
  { title: "프로젝트 관리 | 코이창작소" },
  { name: "description", content: "프로젝트 콘텐츠 및 공개 상태 관리" }
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: programs } = await listPrograms();
  return { programs: programs ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "update") {
    const id = Number(form.get("id"));
    await client.from("programs").update({
      name: String(form.get("name") || ""),
      description: String(form.get("description") || ""),
      content: String(form.get("content") || ""),
      slug: String(form.get("slug") || ""),
      type: String(form.get("type") || "essay"),
    }).eq("id", id);

    return new Response(null, {
      status: 302,
      headers: { Location: new URL(request.url).pathname }
    });
  }

  if (intent === "toggle-active") {
    const id = Number(form.get("id"));
    const is_active = String(form.get("is_active")) === "true";
    await client.from("programs").update({ is_active: !is_active }).eq("id", id);

    // 동일 페이지로 리다이렉트하여 로더 재실행
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
          {programs.map(p => (
            <Card key={p.id}>
              <CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <form method="post" className="space-y-2">
                  <input type="hidden" name="intent" value="update" />
                  <input type="hidden" name="id" value={p.id} />
                  <div>
                    <label className="text-sm font-medium">슬러그</label>
                    <Input name="slug" defaultValue={p.slug || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">제목</label>
                    <Input name="name" defaultValue={p.title || ""} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">설명</label>
                    <Textarea name="description" rows={3} defaultValue={p.description || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">본문(상세)</label>
                    <Textarea name="content" rows={6} defaultValue={p.content || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">타입</label>
                    <select name="type" defaultValue={p.type || "essay"} className="border rounded px-2 py-1">
                      <option value="essay">essay</option>
                      <option value="photo">photo</option>
                      <option value="love">love</option>
                    </select>
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
          ))}
        </div>
      </div>
    );
  }