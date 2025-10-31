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
    client.from("notices").select("*").order("created_at", { ascending: false }),
    client.from("reviews").select("*").order("created_at", { ascending: false }),
  ]);

  return { notices: notices ?? [], reviews: reviews ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "create-notice") {
    const title = String(form.get("title") || "");
    const content = String(form.get("content") || "");
    const category = String(form.get("category") || "기타");
    const is_important = String(form.get("is_important")) === "true";
    const author = String(form.get("author") || "관리자");

    await client.from("notices").insert({
      title,
      content,
      category,
      is_important,
      is_published: true,
      author,
    });
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "update-notice") {
    const id = String(form.get("id") || "");
    const title = String(form.get("title") || "");
    const content = String(form.get("content") || "");
    const category = String(form.get("category") || "기타");
    const is_important = String(form.get("is_important")) === "true";
    await client.from("notices").update({ title, content, category, is_important }).eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "delete-notice") {
    const id = String(form.get("id") || "");
    await client.from("notices").delete().eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "delete-review") {
    const id = String(form.get("id") || "");
    await client.from("reviews").delete().eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
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
            <form method="post" className="space-y-3">
              <input type="hidden" name="intent" value="create-notice" />
              <Input name="title" placeholder="제목" required />
              <Textarea name="content" placeholder="내용" rows={5} required />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">카테고리</label>
                  <select name="category" required className="border rounded px-2 py-2 w-full">
                    <option value="일정">일정</option>
                    <option value="프로그램">프로그램</option>
                    <option value="이벤트">이벤트</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">중요 공지</label>
                  <select name="is_important" required className="border rounded px-2 py-2 w-full">
                    <option value="false">일반</option>
                    <option value="true">중요</option>
                  </select>
                </div>
              </div>
              <Input name="author" placeholder="작성자 (기본값: 관리자)" />
              <Button type="submit">공지 등록</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>공지사항</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {notices.length === 0 ? (
                <p className="text-gray-500 text-center py-4">공지사항이 없습니다.</p>
              ) : (
                notices.map(n => (
                  <div key={n.id} className="border rounded p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <strong>{n.title}</strong>
                        {n.is_important && <Badge variant="destructive">중요</Badge>}
                        <Badge variant="outline">{n.category}</Badge>
                      </div>
                      <Badge variant="secondary">{n.is_published ? "공개" : "비공개"}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{n.content}</p>
                    <div className="text-xs text-gray-500">
                      작성자: {n.author || "관리자"} | {n.created_at ? new Date(n.created_at).toLocaleString("ko-KR") : ""}
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      <form method="post" className="flex-1 space-y-2">
                        <input type="hidden" name="intent" value="update-notice" />
                        <input type="hidden" name="id" value={n.id} />
                        <Input name="title" defaultValue={n.title} className="h-8" />
                        <Textarea name="content" defaultValue={n.content} rows={3} className="text-sm" />
                        <div className="flex gap-2">
                          <select name="category" defaultValue={n.category} className="border rounded px-2 py-1 h-8 text-sm">
                            <option value="일정">일정</option>
                            <option value="프로그램">프로그램</option>
                            <option value="이벤트">이벤트</option>
                            <option value="기타">기타</option>
                          </select>
                          <select name="is_important" defaultValue={String(n.is_important)} className="border rounded px-2 py-1 h-8 text-sm">
                            <option value="false">일반</option>
                            <option value="true">중요</option>
                          </select>
                          <Button type="submit" variant="outline" size="sm">수정</Button>
                        </div>
                      </form>
                      <form method="post">
                        <input type="hidden" name="intent" value="delete-notice" />
                        <input type="hidden" name="id" value={n.id} />
                        <Button type="submit" variant="outline" size="sm">삭제</Button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>리뷰</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">리뷰가 없습니다.</p>
              ) : (
                reviews.map(r => (
                  <div key={r.id} className="border rounded p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <strong>{r.title}</strong>
                        <Badge variant="outline">{r.program_id || "리뷰"}</Badge>
                        {r.is_verified && <Badge variant="secondary">인증</Badge>}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < (r.rating || 0) ? "text-yellow-400" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>작성자: {r.user_name || "익명"}</span>
                      {r.created_at && <span>| {new Date(r.created_at).toLocaleString("ko-KR")}</span>}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{r.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                      <span>좋아요: {r.likes_count || 0}</span>
                      <form method="post">
                        <input type="hidden" name="intent" value="delete-review" />
                        <input type="hidden" name="id" value={r.id} />
                        <Button type="submit" variant="outline" size="sm">삭제</Button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}