// app/features/admin/pages/admin-community-page.tsx
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import client from "../../../lib/supa-client";
import { Badge } from "../../../common/components/ui/badge";
import type { Route } from "./+types/admin-community-page";

export const meta: MetaFunction = () => [
  { title: "커뮤니티 관리 | 코이창작소" },
  { name: "description", content: "공지/리뷰 관리" }
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const [{ data: notices }, { data: reviews }] = await Promise.all([
    client.from("community_posts").select("*").eq("type", "notice").order("created_at", { ascending: false }),
    client.from("community_posts").select("*").eq("type", "review").order("created_at", { ascending: false }),
  ]);

  return { notices: notices ?? [], reviews: reviews ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "create-notice") {
    const title = String(form.get("title") || "");
    const content = String(form.get("content") || "");
    const file = form.get("image") as File | null;

    let image_url: string | null = null;
    if (file && file.size > 0) {
      const fileName = `notice-${Date.now()}-${file.name}`;
      const { error: uploadErr } = await client.storage.from("community-images").upload(fileName, file);
      if (!uploadErr) image_url = `${client.supabaseUrl}/storage/v1/object/public/community-images/${fileName}`;
    }

    await client.from("community_posts").insert({ title, content, type: "notice", image_url, is_published: true });
    return { ok: true };
  }

  if (intent === "update-notice") {
    const id = Number(form.get("id"));
    const title = String(form.get("title") || "");
    const content = String(form.get("content") || "");
    await client.from("community_posts").update({ title, content }).eq("id", id);
    return { ok: true };
  }

  if (intent === "delete-notice") {
    const id = Number(form.get("id"));
    await client.from("community_posts").delete().eq("id", id);
    return { ok: true };
  }

  if (intent === "delete-review") {
    const id = Number(form.get("id"));
    await client.from("community_posts").delete().eq("id", id);
    return { ok: true };
  }

  return { ok: true };
}

export default function AdminCommunityPage({ loaderData }: Route.ComponentProps) {
  const { notices, reviews } = loaderData as { notices: any[]; reviews: any[] };

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card>
          <CardHeader><CardTitle>공지 작성</CardTitle></CardHeader>
          <CardContent>
            <form method="post" encType="multipart/form-data" className="space-y-3">
              <input type="hidden" name="intent" value="create-notice" />
              <Input name="title" placeholder="제목" required />
              <Textarea name="content" placeholder="내용" rows={5} required />
              <Input name="image" type="file" accept="image/*" />
              <Button type="submit">공지 등록</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>공지사항</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {notices.map(n => (
                <div key={n.id} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong>{n.title}</strong>
                    <Badge variant="outline">공지</Badge>
                  </div>
                  {n.image_url ? <img src={n.image_url} alt={n.title} className="w-full h-40 object-cover rounded" /> : null}
                  <p className="text-sm text-gray-700 whitespace-pre-line">{n.content}</p>
                  <div className="flex gap-2">
                    <form method="post" className="flex gap-2 w-full">
                      <input type="hidden" name="intent" value="update-notice" />
                      <input type="hidden" name="id" value={n.id} />
                      <Input name="title" defaultValue={n.title} />
                      <Input name="content" defaultValue={n.content} />
                      <Button type="submit" variant="outline">수정</Button>
                    </form>
                    <form method="post">
                      <input type="hidden" name="intent" value="delete-notice" />
                      <input type="hidden" name="id" value={n.id} />
                      <Button type="submit" variant="outline">삭제</Button>
                    </form>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>리뷰</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="border rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong>{r.title}</strong>
                    <Badge variant="outline">리뷰</Badge>
                  </div>
                  {r.image_url ? <img src={r.image_url} alt={r.title} className="w-full h-40 object-cover rounded" /> : null}
                  <p className="text-sm text-gray-700 whitespace-pre-line">{r.content}</p>
                  <form method="post">
                    <input type="hidden" name="intent" value="delete-review" />
                    <input type="hidden" name="id" value={r.id} />
                    <Button type="submit" variant="outline">삭제</Button>
                  </form>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}