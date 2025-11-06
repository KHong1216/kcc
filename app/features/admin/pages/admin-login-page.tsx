import { Form, useActionData, useNavigation } from "react-router";
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
    // 더 구체적인 에러 메시지
    if (error.message.includes("Invalid login credentials") || error.message.includes("Email not confirmed")) {
      return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    return { error: "로그인에 실패했습니다. 다시 시도해주세요." };
  }

  // 관리자 권한 확인 (profiles 테이블에서 role 체크)
  const { data: profile } = await client
    .from("profiles")
    .select("role")
    .eq("email", email)
    .single();

  if (profile?.role !== "admin") {
    return { error: "관리자 권한이 없습니다." };
  }

  // 성공 시 대시보드로 리다이렉트
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin" }
  });
}

export default function AdminLoginPage() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Form method="post" className="space-y-4 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">관리자 로그인</h1>
          
          {actionData?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {actionData.error}
            </div>
          )}

          <Input 
            name="email" 
            type="email" 
            placeholder="이메일" 
            required 
            disabled={isSubmitting}
            className="w-full"
          />
          <Input 
            name="password" 
            type="password" 
            placeholder="비밀번호" 
            required 
            disabled={isSubmitting}
            className="w-full"
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인중..." : "로그인"}
          </Button>
        </Form>
      </div>
    </div>
  );
}