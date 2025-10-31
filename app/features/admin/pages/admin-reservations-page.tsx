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

  const { data: reservations } = await client
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  return { reservations: reservations ?? [] };
}


export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "update-status") {
		const id = String(form.get("id") || "");
		const status = String(form.get("status") || "");

		if (!id || !status) return { ok: false, message: "invalid input" };

		const { error } = await client.from("reservations").update({ status }).eq("id", id);
		if (error) {
			console.error("update-status error", error);
			return { ok: false, message: error.message };
		}
		return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
	}

  if (intent === "update-confirm") {
		const id = String(form.get("id") || "");
		const dateRaw = form.get("confirmed_date");
		const timeRaw = form.get("confirmed_time");
		if (!id) return { ok: false, message: "invalid id" };

    const confirmed_date = dateRaw ? String(dateRaw) : null; // 빈 값은 null
		const confirmed_time = timeRaw ? String(timeRaw) : null; // 빈 값은 null

		const { error } = await client.from("reservations").update({ confirmed_date, confirmed_time }).eq("id", id);
		if (error) {
			console.error("update-confirmed_date, confirmed_time error", error);
			return { ok: false, message: error.message };
		}
		return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
	}

  return { ok: true };
}

function getTenMinuteTimes(): string[] {
	const out: string[] = [];
	for (let h = 0; h < 24; h++)
		for (let m = 0; m < 60; m += 10) {
			const hh = String(h).padStart(2, "0");
			const mm = String(m).padStart(2, "0");
			out.push(`${hh}:${mm}`);
		}
	return out;
}

export default function AdminReservationsPage({ loaderData }: Route.ComponentProps) {
  const { reservations } = loaderData as { reservations: any[] };
  const timeOptions = getTenMinuteTimes();

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
                  <td className="p-3">{r.user_phone || "-"}</td>
                  <td className="p-3">{r.program_id || "-"}</td>
                  <td className="p-3">{r.created_at ? new Date(r.created_at).toLocaleString() : "-"}</td>
                  <td className="p-3">
                    <form method="post" className="flex items-center gap-2">
                      <input type="hidden" name="intent" value="update-confirm" />
                      <input type="hidden" name="id" value={r.id} />
                      <Input type="date" name="confirmed_date" defaultValue={r.confirmed_date ? String(r.confirmed_date).slice(0, 10) : ""} className="h-8" />
                      <select
                        name="confirmed_time"
                        defaultValue={r.confirmed_time ? String(r.confirmed_time).slice(0, 5) : ""}
                        className="border rounded px-2 py-1 h-8"
                      >
                        <option value="">-- 선택 --</option>
                        {timeOptions.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
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