import type { MetaFunction } from "react-router";
import type { Route } from "./+types/managers-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import { Badge } from "../../../common/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Upload
} from "lucide-react";
import client from "../../../lib/supa-client";

export const meta: MetaFunction = () => [{ title: "매니저 설정 | 코이창작소" }];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: managers } = await client.from("managers").select("*").order("id", { ascending: true });
  return { managers: managers ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "add") {
    const payload = {
      name: String(form.get("name") || ""),
      image: String(form.get("image") || ""),
      introduction: String(form.get("introduction") || ""),
      graduation: String(form.get("graduation") || ""),
      qualifications: String(form.get("qualifications") || "").split(",").map(s => s.trim()).filter(Boolean),
      career: String(form.get("career") || "").split(",").map(s => s.trim()).filter(Boolean),
      specialty: String(form.get("specialty") || ""),
      description: String(form.get("description") || ""),
      is_active: true,
      is_representative: false
    };
    await client.from("managers").insert(payload);
    return { ok: true };
  }

  if (intent === "toggle-active") {
    const id = Number(form.get("id"));
    const is_active = String(form.get("is_active")) === "true";
    await client.from("managers").update({ is_active: !is_active }).eq("id", id);
    return { ok: true };
  }

  if (intent === "toggle-rep") {
    const id = Number(form.get("id"));
    const is_representative = String(form.get("is_representative")) === "true";
    await client.from("managers").update({ is_representative: !is_representative }).eq("id", id);
    return { ok: true };
  }

  if (intent === "delete") {
    const id = Number(form.get("id"));
    await client.from("managers").delete().eq("id", id);
    return { ok: true };
  }

  return { ok: true };
}

export default function ManagersPage({ loaderData }: Route.ComponentProps) {
  const { managers } = loaderData as { managers: any[] };

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">매니저 설정</h1>
          <p className="text-sm text-gray-600 mt-1">추가/토글/삭제를 한 화면에서 관리합니다.</p>
        </div>

        <Card>
          <CardHeader><CardTitle>매니저 추가</CardTitle></CardHeader>
          <CardContent>
            <form method="post" className="grid md:grid-cols-2 gap-4">
              <input type="hidden" name="intent" value="add" />
              <Input name="name" placeholder="이름" required />
              <Input name="image" placeholder="이미지 파일명 (예: s2.jpg)" required />
              <Input name="introduction" placeholder="소개 한 줄" />
              <Input name="graduation" placeholder="졸업" />
              <Input name="qualifications" placeholder="자격증 (쉼표 구분)" />
              <Input name="career" placeholder="경력 (쉼표 구분)" />
              <Input name="specialty" placeholder="전문 분야" />
              <Textarea name="description" placeholder="상세 설명" rows={3} />
              <div className="md:col-span-2">
                <Button type="submit">추가</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managers.map(m => (
            <Card key={m.id}>
              <CardHeader><CardTitle className="text-lg">{m.name}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{m.introduction}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={m.is_active ? "default" : "secondary"}>{m.is_active ? "활성" : "비활성"}</Badge>
                  {m.is_representative ? <Badge variant="outline">대표</Badge> : null}
                </div>
                <div className="flex gap-2">
                  <form method="post">
                    <input type="hidden" name="intent" value="toggle-active" />
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="is_active" value={String(m.is_active)} />
                    <Button variant="outline" size="sm">{m.is_active ? "비활성화" : "활성화"}</Button>
                  </form>
                  <form method="post">
                    <input type="hidden" name="intent" value="toggle-rep" />
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="is_representative" value={String(m.is_representative)} />
                    <Button variant="outline" size="sm">{m.is_representative ? "대표 해제" : "대표 지정"}</Button>
                  </form>
                  <form method="post">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={m.id} />
                    <Button variant="outline" size="sm">삭제</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}