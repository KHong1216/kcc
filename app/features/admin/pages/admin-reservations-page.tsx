// app/features/admin/pages/admin-reservations-page.tsx
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/admin-reservations-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import client from "../../../lib/supa-client";

export const meta: MetaFunction = () => [
  { title: "예약 관리 | 코이창작소" },
  { name: "description", content: "예약 현황 및 상태 관리" }
];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: reservations } = await client.from("reservations").select("*").order("created_at", { ascending: false });
  return { reservations: reservations ?? [] };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "update-status") {
    const id = Number(form.get("id"));
    const status = String(form.get("status"));
    await client.from("reservations").update({ status }).eq("id", id);
    return { ok: true };
  }

  if (intent === "update-confirm") {
    const id = Number(form.get("id"));
    const confirm_date = String(form.get("confirm_date") || null);
    const confirm_time = String(form.get("confirm_time") || null);
    await client.from("reservations").update({ confirm_date, confirm_time }).eq("id", id);
    return { ok: true };
  }

  return { ok: true };
}

export default function AdminReservationsPage({ loaderData }: Route.ComponentProps) {
  const { reservations } = loaderData as { reservations: any[] };

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">예약 관리</h1>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3">이름</th>
                <th className="p-3">이메일</th>
                <th className="p-3">연락처</th>
                <th className="p-3">프로그램</th>
                <th className="p-3">신청일</th>
                <th className="p-3">컨펌일시</th>
                <th className="p-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.user_name || "-"}</td>
                  <td className="p-3">{r.user_email || "-"}</td>
                  <td className="p-3">{r.phone || "-"}</td>
                  <td className="p-3">{r.program_type || r.program_id || "-"}</td>
                  <td className="p-3">{r.created_at ? new Date(r.created_at).toLocaleString() : "-"}</td>
                  <td className="p-3">
                    <form method="post" className="flex items-center gap-2">
                      <input type="hidden" name="intent" value="update-confirm" />
                      <input type="hidden" name="id" value={r.id} />
                      <Input type="date" name="confirm_date" defaultValue={r.confirm_date ?? ""} className="h-8" />
                      <Input type="time" name="confirm_time" defaultValue={r.confirm_time ?? ""} className="h-8" />
                      <Button type="submit" variant="outline" className="h-8 px-3">저장</Button>
                    </form>
                  </td>
                  <td className="p-3">
                    <form method="post" className="flex items-center gap-2">
                      <input type="hidden" name="intent" value="update-status" />
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} className="border rounded px-2 py-1 h-8">
                        <option value="pending">대기</option>
                        <option value="confirmed">확정</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </select>
                      <Button type="submit" className="h-8 px-3">변경</Button>
                    </form>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr><td className="p-6 text-center text-gray-500" colSpan={7}>예약 데이터가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}