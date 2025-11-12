import { Form, useActionData, useNavigation } from "react-router";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Lock, Mail, Shield, Loader2, AlertCircle } from "lucide-react";
import client from "../../../../lib/supa-client";
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6F0] relative overflow-hidden" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        <Card className="shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#FADADD]/30 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              관리자 로그인
            </CardTitle>
            <p className="text-center text-[#7A6666] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>
              코이창작소 관리 시스템에 접속하세요
            </p>
          </CardHeader>

          <CardContent>
            <Form method="post" className="space-y-5">
              {actionData?.error && (
                <div className="bg-[#FFE5E5] border-2 border-[#FB7185] text-[#C2410C] px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{actionData.error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#3B2F2F] flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                  이메일
                </label>
                <div className="relative">
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    required 
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#A8C5F8' }} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#3B2F2F] flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                  비밀번호
                </label>
                <div className="relative">
                  <Input 
                    id="password"
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    disabled={isSubmitting}
                    className="w-full h-12 pl-11 rounded-xl border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] transition-all duration-200 bg-white text-[#3B2F2F]"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#A8C5F8' }} />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    로그인
                  </>
                )}
              </Button>

              <div className="pt-4 border-t border-[#FADADD]/30">
                <p className="text-xs text-center text-[#7A6666] opacity-80">
                  관리자 계정으로만 접속 가능합니다
                </p>
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* 하단 브랜딩 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#7A6666] opacity-80">
            <span className="font-extrabold tracking-tight" style={{ color: '#A8C5F8' }}>코이창작소</span> 관리 시스템
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}