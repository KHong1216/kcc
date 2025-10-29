import { Form } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import client from "../../../lib/supa-client";
import type { Route } from "./+types/admin-login-page";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");

  // Supabase 로그인
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: "로그인 실패" };
  }

  // 관리자 권한 확인 (profiles 테이블에서 role 체크)
  const { data: profile } = await client
    .from("profiles")
    .select("role")
    .eq("email", email)
    .single();

  if (profile?.role !== "admin") {
    return { error: "관리자 권한이 없습니다" };
  }

  // 성공 시 대시보드로 리다이렉트
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin" }
  });
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form method="post" className="space-y-4 w-80">
        <Input name="email" type="email" placeholder="이메일" required />
        <Input name="password" type="password" placeholder="비밀번호" required />
        <Button type="submit" className="w-full">로그인</Button>
      </Form>
    </div>
  );
}