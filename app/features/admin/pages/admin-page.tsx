import { Link, useNavigate, type MetaFunction } from "react-router";
import type { Route } from "./+types/admin-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";
import {
  Users,
  Calendar,
  MessageSquare,
  FolderOpen,
  LogOut,
  Plus,
  Eye,
  Settings
} from "lucide-react";
import client from "../../../lib/supa-client";

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

  // 관리자 권한 확인 (profiles 테이블에서 role 체크)
  const { data: profile } = await client
    .from("profiles")  // "ㅔ" → "profiles"로 수정
    .select("role")
    .eq("email", session.user.email)
    .single();

  if (!profile || profile.role !== 'admin') {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  // 통계 데이터 조회
  const [
    { count: managerCount },
    { count: reservationCount },
    { count: communityCount }
  ] = await Promise.all([
    client.from("managers").select("*", { count: "exact", head: true }).eq("is_active", true),
    client.from("reservations").select("*", { count: "exact", head: true }),
    client.from("community_posts").select("*", { count: "exact", head: true })
  ]);

  return {
    admin: session.user,
    stats: {
      managerCount: managerCount || 0,
      reservationCount: reservationCount || 0,
      communityCount: communityCount || 0
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
  const { admin, stats } = loaderData;

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-sm text-gray-600">코이창작소 관리 시스템</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{admin.email}</Badge>
              <form method="post">
                <input type="hidden" name="intent" value="logout" />
                <Button variant="outline" size="sm" type="submit">
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">활성 매니저</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.managerCount}</div>
              <p className="text-xs text-muted-foreground">
                현재 활동 중인 매니저 수
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">예약 현황</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservationCount}</div>
              <p className="text-xs text-muted-foreground">
                전체 예약 건수
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">커뮤니티</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.communityCount}</div>
              <p className="text-xs text-muted-foreground">
                커뮤니티 게시글 수
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 관리 기능 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 매니저 관리 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                매니저 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                매니저 정보 추가, 수정, 삭제 및 상태 관리
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" onClick={() => navigate("/admin/managers")}>
                  <Plus className="w-4 h-4 mr-1" />
                  매니저 관리
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 프로젝트 관리 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="w-5 h-5 mr-2" />
                프로젝트 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                에세이 캠프, 포토 캠프 등 프로그램 관리
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" onClick={() => navigate("/admin/programs")}>
                  <Plus className="w-4 h-4 mr-1" />
                  프로젝트 관리
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 예약 조회 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                예약 조회
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                상담 예약 현황 조회 및 관리
              </p>
              <Button size="sm" className="w-full" onClick={() => navigate("/admin/reservations")}>
                <Eye className="w-4 h-4 mr-1" />
                예약 현황 보기
              </Button>
            </CardContent>
          </Card>

          {/* 커뮤니티 관리 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                커뮤니티 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                게시글, 댓글, 공지사항 관리
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" onClick={() => navigate("/admin/community")}>
                  <Eye className="w-4 h-4 mr-1" />
                  게시글 관리
                </Button>
                {/* <Button variant="outline" size="sm" className="flex-1">
                  <Plus className="w-4 h-4 mr-1" />
                  공지 작성
                </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* 시스템 설정 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                시스템 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                사이트 설정, 관리자 계정 관리
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="w-4 h-4 mr-1" />
                설정 열기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">새로운 예약이 등록되었습니다</p>
                  <p className="text-xs text-gray-500">2시간 전</p>
                </div>
                <Badge variant="outline">예약</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">매니저 정보가 업데이트되었습니다</p>
                  <p className="text-xs text-gray-500">1일 전</p>
                </div>
                <Badge variant="outline">매니저</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}