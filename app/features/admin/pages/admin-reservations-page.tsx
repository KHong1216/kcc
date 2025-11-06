// app/features/admin/pages/admin-reservations-page.tsx
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/admin-reservations-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Badge } from "../../../common/components/ui/badge";
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

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", label: string } } = {
    pending: { variant: "secondary", label: "대기" },
    confirmed: { variant: "default", label: "확정" },
    completed: { variant: "outline", label: "완료" },
    cancelled: { variant: "destructive", label: "취소" },
  };
  const config = variants[status] || { variant: "secondary" as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function AdminReservationsPage({ loaderData }: Route.ComponentProps) {
  const { reservations } = loaderData as { reservations: any[] };
  const timeOptions = getTenMinuteTimes();

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">예약 관리</h1>
          <p className="text-gray-600">예약 현황을 확인하고 상태를 관리하세요.</p>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">예약 데이터가 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map(r => (
              <Card key={r.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* 기본 정보 */}
                    <div className="lg:col-span-4 space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">이름</p>
                        <p className="font-semibold text-gray-900">{r.user_name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">나이</p>
                        <p className="text-sm text-gray-700">{typeof r.user_age === "number" && r.user_age > 0 ? r.user_age : "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">이메일</p>
                        <p className="text-sm text-gray-700">{r.user_email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">연락처</p>
                        <p className="text-sm text-gray-700">{r.user_phone || "-"}</p>
                      </div>
                    </div>

                    {/* 프로그램 및 신청일 */}
                    <div className="lg:col-span-3 space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">프로그램</p>
                        <Badge variant="outline" className="text-sm">{r.program_id || "-"}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">신청일</p>
                        <p className="text-sm text-gray-700">
                          {r.created_at ? new Date(r.created_at).toLocaleString('ko-KR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : "-"}
                        </p>
                      </div>
                    </div>

                    {/* 컨펌일시 */}
                    <div className="lg:col-span-3 space-y-2">
                      <p className="text-xs text-gray-500 mb-1">컨펌일시</p>
                      <form method="post" className="space-y-2">
                        <input type="hidden" name="intent" value="update-confirm" />
                        <input type="hidden" name="id" value={r.id} />
                        <div className="flex gap-2">
                          <Input 
                            type="date" 
                            name="confirmed_date" 
                            defaultValue={r.confirmed_date ? String(r.confirmed_date).slice(0, 10) : ""} 
                            className="h-9 text-sm flex-1"
                          />
                          <select
                            name="confirmed_time"
                            defaultValue={r.confirmed_time ? String(r.confirmed_time).slice(0, 5) : ""}
                            className="flex-1 h-9 text-sm border rounded-md px-2 bg-white"
                          >
                            <option value="">-- 시간 --</option>
                            {timeOptions.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <Button type="submit" variant="outline" size="sm" className="w-full">저장</Button>
                      </form>
                    </div>

                    {/* 상태 */}
                    <div className="lg:col-span-2 space-y-2">
                      <p className="text-xs text-gray-500 mb-1">상태</p>
                      <form method="post" className="space-y-2">
                        <input type="hidden" name="intent" value="update-status" />
                        <input type="hidden" name="id" value={r.id} />
                        <div className="flex items-center gap-2">
                          <select 
                            name="status" 
                            defaultValue={r.status} 
                            className="flex-1 h-9 text-sm border rounded-md px-2 bg-white"
                          >
                            <option value="pending">대기</option>
                            <option value="confirmed">확정</option>
                            <option value="completed">완료</option>
                            <option value="cancelled">취소</option>
                          </select>
                          <Button type="submit" size="sm" className="h-9">변경</Button>
                        </div>
                      </form>
                      <div className="mt-1">
                        {getStatusBadge(r.status || "pending")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}