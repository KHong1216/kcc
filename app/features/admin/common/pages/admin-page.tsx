import { useNavigate, type MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Badge } from "../../../../common/components/ui/badge";
import {
  Users,
  Calendar,
  MessageSquare,
  FolderOpen,
  LogOut,
  Plus,
  Eye,
  Settings,
  Loader2,
  Sparkles,
  TrendingUp,
  Activity,
  Mail
} from "lucide-react";
import client from "../../../../lib/supa-client";
import { getAdminStats } from "../queries";
import type { Route } from "./+types/admin-page";
import { useState } from "react";

export const meta: MetaFunction = () => [
  { title: "관리자 대시보드 | 코이창작소" },
  { name: "description", content: "코이창작소 관리자 대시보드" }
];

export async function loader({ request }: Route.LoaderArgs) {
  // Supabase 세션 확인
  const { data: { session }, error } = await client.auth.getSession();

  if (error || !session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  // Promise.all로 병렬 처리
  const [profileResult, statsResults] = await Promise.all([
    client.from("profiles").select("role").eq("email", session.user.email).single(),
    getAdminStats(),
  ]);

  // 관리자 권한 확인
  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  // 통계 데이터 처리
  const [managerCountResult, reservationCountResult, communityCountResult, contactCountResult] = statsResults;

  return {
    admin: session.user,
    stats: {
      managerCount: managerCountResult.count || 0,
      reservationCount: reservationCountResult.count || 0,
      communityCount: communityCountResult.count || 0,
      contactCount: contactCountResult.count || 0
    }
  };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  if (form.get("intent") === "logout") {
    await client.auth.signOut();
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  return { ok: true };
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { admin, stats } = loaderData as { admin: any; stats: { managerCount: number; reservationCount: number; communityCount: number; contactCount: number } };
  const [report, setReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 리포트 생성 함수
  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/admin/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setReport(data);
      }
    } catch (error) {
      console.error("Report generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF6F0] relative overflow-hidden" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ backgroundColor: '#A8C5F8' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#F3C3E6' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#FFE6C5' }}></div>
      </div>

      {/* 헤더 */}
      <header className="pt-14 sm:pt-16 lg:pt-[4.5rem] shadow-lg relative z-10 border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#3B2F2F] drop-shadow-sm">관리자 대시보드</h1>
                <p className="text-sm text-[#3B2F2F]/90 mt-1 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2D6A9F' }}></span>
                  코이창작소 관리 시스템
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-white/30 text-[#3B2F2F] border-white/40 backdrop-blur-sm px-3 py-1.5">
                {admin.email}
              </Badge>
              <form method="post">
                <input type="hidden" name="intent" value="logout" />
                <Button 
                  variant="secondary" 
                  size="sm" 
                  type="submit"
                  className="bg-white/30 hover:bg-white/40 text-[#3B2F2F] border-white/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(168,197,248,0.1), rgba(243,195,230,0.1))' }}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">활성 매니저</CardTitle>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Users className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-extrabold tracking-tight mb-2" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stats.managerCount}
              </div>
              <p className="text-xs text-[#7A6666] opacity-80 flex items-center gap-2 font-medium" style={{ lineHeight: '1.6' }}>
                <Activity className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                현재 활동 중인 매니저 수
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(243,195,230,0.1), rgba(255,230,197,0.1))' }}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">예약 현황</CardTitle>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                <Calendar className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-extrabold tracking-tight mb-2" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stats.reservationCount}
              </div>
              <p className="text-xs text-[#7A6666] opacity-80 flex items-center gap-2 font-medium" style={{ lineHeight: '1.6' }}>
                <TrendingUp className="w-3.5 h-3.5" style={{ color: '#F3C3E6' }} />
                전체 예약 건수
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(255,230,197,0.1), rgba(251,113,133,0.1))' }}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">커뮤니티</CardTitle>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #FFE6C5, #FB7185)' }}>
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-extrabold tracking-tight mb-2" style={{ background: 'linear-gradient(90deg, #FFE6C5, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stats.communityCount}
              </div>
              <p className="text-xs text-[#7A6666] opacity-80 flex items-center gap-2 font-medium" style={{ lineHeight: '1.6' }}>
                <MessageSquare className="w-3.5 h-3.5" style={{ color: '#FB7185' }} />
                커뮤니티 게시글 수
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(168,197,248,0.1), rgba(251,113,133,0.1))' }}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-extrabold tracking-tight text-[#3B2F2F]">문의</CardTitle>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #A8C5F8, #FB7185)' }}>
                <Mail className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-extrabold tracking-tight mb-2" style={{ background: 'linear-gradient(90deg, #A8C5F8, #FB7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stats.contactCount}
              </div>
              <p className="text-xs text-[#7A6666] opacity-80 flex items-center gap-2 font-medium" style={{ lineHeight: '1.6' }}>
                <Mail className="w-3.5 h-3.5" style={{ color: '#A8C5F8' }} />
                전체 문의 건수
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
          <CardHeader className="border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                오늘의 AI 리포트
              </CardTitle>
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="text-white shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    리포트 생성
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {report ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                {/* 요약 */}
                <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
                  <h3 className="font-extrabold tracking-tight mb-3 text-[#3B2F2F] flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                    <TrendingUp className="w-5 h-5" style={{ color: '#A8C5F8' }} />
                    요약
                  </h3>
                  <p className="text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>{report.report.summary}</p>
                </div>

                {/* 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                    <p className="text-sm text-[#7A6666] opacity-80 mb-2" style={{ lineHeight: '1.6' }}>전체 예약</p>
                    <p className="text-3xl font-extrabold tracking-tight text-[#3B2F2F]">{report.statistics.total}</p>
                  </div>
                  <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)' }}>
                    <p className="text-sm text-[#7A6666] opacity-80 mb-2" style={{ lineHeight: '1.6' }}>오늘 신청</p>
                    <p className="text-3xl font-extrabold tracking-tight text-[#3B2F2F]">{report.statistics.today}</p>
                  </div>
                  <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #F5EDFF, #FFFFFF)' }}>
                    <p className="text-sm text-[#7A6666] opacity-80 mb-2" style={{ lineHeight: '1.6' }}>프로그램 종류</p>
                    <p className="text-3xl font-extrabold tracking-tight text-[#3B2F2F]">
                      {Object.keys(report.statistics.byProgram || {}).length}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #FFE5E5, #FFFFFF)' }}>
                    <p className="text-sm text-[#7A6666] opacity-80 mb-2" style={{ lineHeight: '1.6' }}>대기 중</p>
                    <p className="text-3xl font-extrabold tracking-tight text-[#3B2F2F]">
                      {report.statistics.byStatus?.pending || 0}
                    </p>
                  </div>
                </div>

                {/* 인사이트 */}
                <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
                  <h3 className="font-extrabold tracking-tight mb-4 text-[#3B2F2F] flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                    <Sparkles className="w-5 h-5" style={{ color: '#F3C3E6' }} />
                    AI 인사이트
                  </h3>
                  <ul className="space-y-3">
                    {report.report.insights.map((insight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#FADADD]/30">
                        <span className="font-extrabold text-lg" style={{ color: '#A8C5F8' }}>•</span>
                        <span className="text-[#3B2F2F]/85 flex-1" style={{ lineHeight: '1.6' }}>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 추천사항 */}
                <div className="p-5 rounded-xl border border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
                  <h3 className="font-extrabold tracking-tight mb-4 text-[#3B2F2F] flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                    <Activity className="w-5 h-5" style={{ color: '#FFE6C5' }} />
                    추천사항
                  </h3>
                  <ul className="space-y-3">
                    {report.report.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#FADADD]/30">
                        <span className="font-extrabold text-lg" style={{ color: '#FFE6C5' }}>✓</span>
                        <span className="text-[#3B2F2F]/85 flex-1" style={{ lineHeight: '1.6' }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>AI 리포트를 생성해보세요</h3>
                <p className="text-[#7A6666] opacity-80 text-sm mb-1" style={{ lineHeight: '1.6' }}>AI가 오늘의 예약 현황을 분석하고</p>
                <p className="text-[#7A6666] opacity-80 text-sm" style={{ lineHeight: '1.6' }}>인사이트와 추천사항을 제공합니다</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 관리 기능 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* 매니저 관리 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  <Users className="w-5 h-5 text-white" />
                </div>
                매니저 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                매니저 정보 추가, 수정, 삭제 및 상태 관리
              </p>
              <Button 
                size="sm" 
                className="w-full text-white shadow-md hover:shadow-lg transition-all" 
                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                onClick={() => navigate("/admin/managers")}
              >
                <Plus className="w-4 h-4 mr-1" />
                매니저 관리
              </Button>
            </CardContent>
          </Card>

          {/* 프로젝트 관리 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #FFF0F5, #FFE5E5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                프로젝트 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                에세이 캠프, 포토 캠프 등 프로그램 관리
              </p>
              <Button 
                size="sm" 
                className="w-full text-white shadow-md hover:shadow-lg transition-all" 
                style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}
                onClick={() => navigate("/admin/programs")}
              >
                <Plus className="w-4 h-4 mr-1" />
                프로젝트 관리
              </Button>
            </CardContent>
          </Card>

          {/* 예약 조회 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                예약 조회
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                상담 예약 현황 조회 및 관리
              </p>
              <Button 
                size="sm" 
                className="w-full text-white shadow-md hover:shadow-lg transition-all" 
                style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                onClick={() => navigate("/admin/reservations")}
              >
                <Eye className="w-4 h-4 mr-1" />
                예약 현황 보기
              </Button>
            </CardContent>
          </Card>

          {/* 커뮤니티 관리 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #FFE5E5, #FFF0F5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(90deg, #FFE6C5, #FB7185)' }}>
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                커뮤니티 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                게시글, 댓글, 공지사항 관리
              </p>
              <Button 
                size="sm" 
                className="w-full text-white shadow-md hover:shadow-lg transition-all" 
                style={{ background: 'linear-gradient(90deg, #FFE6C5, #FB7185)' }}
                onClick={() => navigate("/admin/community")}
              >
                <Eye className="w-4 h-4 mr-1" />
                게시글 관리
              </Button>
            </CardContent>
          </Card>

          {/* 문의 관리 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(90deg, #A8C5F8, #FB7185)' }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                문의 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                고객 문의 조회 및 답변 관리
              </p>
              <Button 
                size="sm" 
                className="w-full text-white shadow-md hover:shadow-lg transition-all" 
                style={{ background: 'linear-gradient(90deg, #A8C5F8, #FB7185)' }}
                onClick={() => navigate("/admin/contact")}
              >
                <Eye className="w-4 h-4 mr-1" />
                문의 관리
              </Button>
            </CardContent>
          </Card>

          {/* 시스템 설정 */}
          <Card className="border border-[#FADADD]/30 shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group">
            <CardHeader style={{ background: 'linear-gradient(90deg, #FDF6F0, #FFF7F5)' }}>
              <CardTitle className="flex items-center text-[#3B2F2F] font-extrabold tracking-tight">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
                  <Settings className="w-5 h-5 text-white" />
                </div>
                시스템 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                사이트 설정, 관리자 계정 관리
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] transition-all"
              >
                <Settings className="w-4 h-4 mr-1" />
                설정 열기
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

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