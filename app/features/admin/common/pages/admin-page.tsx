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
  Mail,
  Heart
} from "lucide-react";
import client from "../../../../lib/supa-client";
import { getAdminStats } from "../queries";
import type { Route } from "./+types/admin-page";
import { useState } from "react";
import { AdminLayout } from "../components/admin-layout";
import { StatsCards } from "../components/stats-cards";
import { getAllManagers, type ManagerWithImageUrl, createManager, updateManager, deleteManager, toggleManagerActive, toggleManagerRepresentative, uploadManagerImage, deleteManagerImage, getManagerImagePath, generateImageFileName } from "../../manager/queries";
import { getAllReservations, updateReservationStatus, updateReservationConfirm } from "../../reservation/queries";
import { getAllNotices, getAllReviews, createNotice, updateNotice, deleteNotice, deleteReview } from "../../community/queries";
import { getAllContacts, updateContact, deleteContact } from "../../contact/queries";
import { getAllPrograms, updateProgram, toggleProgramActive } from "../../programs/queries";
import { ManagersContent } from "../../manager/components/managers-content";
import { ReservationsContent } from "../../reservation/components/reservations-content";
import { CommunityContent } from "../../community/components/community-content";
import { ContactContent } from "../../contact/components/contact-content";
import { ProgramsContent } from "../../programs/components/programs-content";
import { TestContent } from "../test/components/test-content";
import { useActionData } from "react-router";

export const meta: MetaFunction = () => [
  { title: "관리자 대시보드 | 리 프레임(Re-Frame)" },
  { name: "description", content: "리 프레임 관리자 대시보드" }
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

  // 관리자 권한 확인
  const profileResult = await client.from("profiles").select("role").eq("email", session.user.email).single();

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  // 모든 데이터를 병렬로 로드
  const [
    statsResults,
    managersResult,
    reservationsResult,
    noticesResult,
    reviewsResult,
    contactsResult,
    programsResult,
    testResponsesResult,
  ] = await Promise.all([
    getAdminStats(),
    getAllManagers(),
    getAllReservations(),
    getAllNotices(),
    getAllReviews(),
    getAllContacts(session),
    getAllPrograms(),
    client.from("emotion_test_responses")
      .select("id, emotion, emotion_details, reason_category, name, age, job, contact, day_mood, need_type, privacy_agreed, status, gift, character_name, day, time, created_at")
      .order("created_at", { ascending: false }),
  ]);

  // 통계 데이터 처리
  const [activeManagerCountResult, inactiveManagerCountResult, reservationCountResult, communityCountResult, contactCountResult, testCountResult] = statsResults;

  // 매니저 이미지 URL 변환
  const managersWithImageUrl: ManagerWithImageUrl[] = (managersResult.data ?? []).map(manager => ({
    ...manager,
    qualifications: Array.isArray(manager.qualifications) ? manager.qualifications : [],
    career: Array.isArray(manager.career) ? manager.career : [],
    imageUrl: manager.image 
      ? client.storage.from("manager-images").getPublicUrl(manager.image).data.publicUrl
      : null
  }));

  // 최근 데이터 가져오기 (최대 5개)
  const recentReservations = (reservationsResult.data ?? []).slice(0, 5);
  const recentContacts = (contactsResult.data ?? []).slice(0, 5);

  return {
    admin: session.user,
    stats: {
      activeManagerCount: activeManagerCountResult.count || 0,
      inactiveManagerCount: inactiveManagerCountResult.count || 0,
      reservationCount: reservationCountResult.count || 0,
      communityCount: communityCountResult.count || 0,
      contactCount: contactCountResult.count || 0,
      testCount: testCountResult.count || 0
    },
    recentReservations,
    recentContacts,
    // 각 페이지 데이터
    managers: managersWithImageUrl,
    reservations: reservationsResult.data ?? [],
    notices: noticesResult.data ?? [],
    reviews: reviewsResult.data ?? [],
    contacts: contactsResult.data ?? [],
    programs: programsResult.data ?? [],
    testResponses: testResponsesResult.data ?? [],
  };
}

export async function action({ request }: Route.ActionArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return { error: "로그인이 필요합니다." };
  }

  // 관리자 권한 확인
  const profileResult = await client
    .from("profiles")
    .select("role")
    .eq("email", session.user.email)
    .single();

  if (profileResult.error || profileResult.data?.role !== "admin") {
    return { error: "관리자 권한이 없습니다." };
  }

  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  // 로그아웃 처리
  if (intent === "logout") {
    await client.auth.signOut();
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin/login" }
    });
  }

  try {
    // ==================== 매니저 관리 ====================
    if (intent === "add") {
      let imagePath = "";
      const imageFile = form.get("image") as File | null;
      if (imageFile && imageFile.size > 0) {
        const filePath = generateImageFileName(imageFile.name);
        const uploadResult = await uploadManagerImage(imageFile, filePath);
        if (uploadResult.error) {
          return { error: "이미지 업로드에 실패했습니다." };
        }
        imagePath = filePath;
      }
      const createResult = await createManager({
        name: String(form.get("name") || ""),
        image: imagePath || null,
        introduction: String(form.get("introduction") || ""),
        graduation: String(form.get("graduation") || ""),
        qualifications: String(form.get("qualifications") || "").split(",").map((s) => s.trim()).filter(Boolean),
        career: String(form.get("career") || "").split(",").map((s) => s.trim()).filter(Boolean),
        specialty: String(form.get("specialty") || ""),
        description: String(form.get("description") || ""),
        is_active: true,
        is_representative: false,
      });
      if (createResult.error) {
        return { error: "매니저 추가에 실패했습니다." };
      }
      return { success: true, message: "매니저가 성공적으로 추가되었습니다." };
    }

    if (intent === "update") {
      const id = Number(form.get("id"));
      const existingImageResult = await getManagerImagePath(id);
      let imagePath = existingImageResult.data?.image || "";
      const imageFile = form.get("image") as File | null;
      if (imageFile && imageFile.size > 0) {
        if (existingImageResult.data?.image) {
          await deleteManagerImage(existingImageResult.data.image);
        }
        const filePath = generateImageFileName(imageFile.name);
        const uploadResult = await uploadManagerImage(imageFile, filePath);
        if (uploadResult.error) {
          return { error: "이미지 업로드에 실패했습니다." };
        }
        imagePath = filePath;
      }
      const updateResult = await updateManager({
        id,
        name: String(form.get("name") || ""),
        image: imagePath || null,
        introduction: String(form.get("introduction") || ""),
        graduation: String(form.get("graduation") || ""),
        qualifications: String(form.get("qualifications") || "").split(",").map((s) => s.trim()).filter(Boolean),
        career: String(form.get("career") || "").split(",").map((s) => s.trim()).filter(Boolean),
        specialty: String(form.get("specialty") || ""),
        description: String(form.get("description") || ""),
      });
      if (updateResult.error) {
        return { error: "매니저 수정에 실패했습니다." };
      }
      return { success: true, message: "매니저가 성공적으로 수정되었습니다." };
    }

    if (intent === "delete") {
      const id = Number(form.get("id"));
      const imageResult = await getManagerImagePath(id);
      const deleteResult = await deleteManager(id);
      if (deleteResult.error) {
        return { error: "매니저 삭제에 실패했습니다." };
      }
      if (imageResult.data?.image) {
        await deleteManagerImage(imageResult.data.image);
      }
      return { success: true, message: "매니저가 성공적으로 삭제되었습니다." };
    }

    if (intent === "toggle-active") {
      const id = Number(form.get("id"));
      const is_active = String(form.get("is_active")) === "true";
      const result = await toggleManagerActive(id, is_active);
      if (result.error) {
        return { error: "상태 변경에 실패했습니다." };
      }
      return { success: true, message: "상태가 변경되었습니다." };
    }

    if (intent === "toggle-rep") {
      const id = Number(form.get("id"));
      const is_representative = String(form.get("is_representative")) === "true";
      const result = await toggleManagerRepresentative(id, is_representative);
      if (result.error) {
        return { error: "대표 지정 변경에 실패했습니다." };
      }
      return { success: true, message: "대표 지정이 변경되었습니다." };
    }

    // ==================== 예약 관리 ====================
    if (intent === "reservation-update-status") {
      const id = String(form.get("id") || "");
      const status = String(form.get("status") || "") as 'pending' | 'confirmed' | 'completed' | 'cancelled';
      if (!id || !status) {
        return { error: "ID와 상태가 필요합니다." };
      }
      const result = await updateReservationStatus({ id, status });
      if (result.error) {
        return { error: result.error.message || "상태 변경에 실패했습니다." };
      }
      return { success: true, message: "상태가 변경되었습니다." };
    }

    if (intent === "reservation-update-confirm") {
      const id = String(form.get("id") || "");
      const dateRaw = form.get("confirmed_date");
      const timeRaw = form.get("confirmed_time");
      if (!id) {
        return { error: "ID가 필요합니다." };
      }
      const confirmed_date = dateRaw && String(dateRaw).trim() ? String(dateRaw).trim() : null;
      const confirmed_time = timeRaw && String(timeRaw).trim() ? String(timeRaw).trim() : null;
      const result = await updateReservationConfirm({ id, confirmed_date, confirmed_time });
      if (result.error) {
        return { error: result.error.message || "확정 일시 저장에 실패했습니다." };
      }
      return { success: true, message: "확정 일시가 저장되었습니다." };
    }

    // ==================== 커뮤니티 관리 ====================
    if (intent === "create-notice") {
      const result = await createNotice({
        title: String(form.get("title") || ""),
        content: String(form.get("content") || ""),
        category: String(form.get("category") || "기타"),
        is_important: String(form.get("is_important")) === "true",
        author: String(form.get("author") || "관리자"),
      });
      if (result.error) {
        return { error: "공지사항 작성에 실패했습니다." };
      }
      return { success: true, message: "공지사항이 성공적으로 작성되었습니다." };
    }

    if (intent === "update-notice") {
      const result = await updateNotice({
        id: String(form.get("id") || ""),
        title: String(form.get("title") || ""),
        content: String(form.get("content") || ""),
        category: String(form.get("category") || "기타"),
        is_important: String(form.get("is_important")) === "true",
      });
      if (result.error) {
        return { error: "공지사항 수정에 실패했습니다." };
      }
      return { success: true, message: "공지사항이 성공적으로 수정되었습니다." };
    }

    if (intent === "delete-notice") {
      const result = await deleteNotice(String(form.get("id") || ""));
      if (result.error) {
        return { error: "공지사항 삭제에 실패했습니다." };
      }
      return { success: true, message: "공지사항이 성공적으로 삭제되었습니다." };
    }

    if (intent === "delete-review") {
      const result = await deleteReview(String(form.get("id") || ""));
      if (result.error) {
        return { error: "리뷰 삭제에 실패했습니다." };
      }
      return { success: true, message: "리뷰가 성공적으로 삭제되었습니다." };
    }

    // ==================== 문의 관리 ====================
    if (intent === "contact-update-status") {
      const id = String(form.get("id") || "");
      const status = String(form.get("status") || "") as 'pending' | 'in_progress' | 'completed' | 'cancelled';
      const result = await updateContact({ id, status });
      if (result.error) {
        return { error: "문의 상태 변경에 실패했습니다." };
      }
      return { success: true, message: "문의 상태가 변경되었습니다." };
    }

    if (intent === "contact-update-notes") {
      const id = String(form.get("id") || "");
      const admin_notes = String(form.get("admin_notes") || "");
      const result = await updateContact({ id, admin_notes: admin_notes || null });
      if (result.error) {
        return { error: "관리자 메모 저장에 실패했습니다." };
      }
      return { success: true, message: "관리자 메모가 저장되었습니다." };
    }

    if (intent === "delete-contact") {
      const result = await deleteContact(String(form.get("id") || ""));
      if (result.error) {
        return { error: "문의 삭제에 실패했습니다." };
      }
      return { success: true, message: "문의가 삭제되었습니다." };
    }

    // ==================== 프로젝트 관리 ====================
    if (intent === "update" && form.get("id") && !String(form.get("id")).includes("-")) {
      const id = String(form.get("id") || "");
      const title = String(form.get("title") || "");
      if (!title.trim()) {
        return { error: "제목은 필수입니다." };
      }
      const result = await updateProgram({
        id,
        title: title.trim(),
        description: String(form.get("description") || ""),
        duration: String(form.get("duration") || ""),
        target_audience: String(form.get("target_audience") || ""),
        icon: String(form.get("icon") || ""),
        badge: String(form.get("badge") || ""),
      });
      if (result.error) {
        return { error: "프로그램 수정에 실패했습니다." };
      }
      return { success: true, message: "프로그램이 성공적으로 수정되었습니다." };
    }

    if (intent === "toggle-active" && form.get("id") && !String(form.get("id")).includes("-")) {
      const id = String(form.get("id") || "");
      const isActive = String(form.get("is_active")) === "true";
      const result = await toggleProgramActive(id, isActive);
      if (result.error) {
        return { error: "상태 변경에 실패했습니다." };
      }
      return { success: true, message: "상태가 변경되었습니다." };
    }

    // ==================== 테스트 관리 ====================
    if (intent === "test-update-status") {
      const id = String(form.get("id") || "");
      const status = String(form.get("status") || "") as 'pending' | 'confirmed' | 'completed' | 'cancelled';
      if (!id || !status) {
        return { error: "ID와 상태가 필요합니다." };
      }
      const { error } = await client
        .from("emotion_test_responses")
        .update({ status })
        .eq("id", id);
      if (error) {
        return { error: error.message || "상태 변경에 실패했습니다." };
      }
      return { success: true, message: "상태가 변경되었습니다." };
  }

  return { ok: true };
  } catch (error) {
    console.error("[action] error:", error);
    return { error: "작업 중 오류가 발생했습니다." };
  }
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { admin, stats, managers, reservations, notices, reviews, contacts, programs, testResponses, recentReservations, recentContacts } = loaderData as {
    admin: any;
    stats: { activeManagerCount: number; inactiveManagerCount: number; reservationCount: number; communityCount: number; contactCount: number; testCount: number };
    managers: ManagerWithImageUrl[];
    reservations: any[];
    notices: any[];
    reviews: any[];
    contacts: any[];
    programs: any[];
    testResponses: any[];
    recentReservations: any[];
    recentContacts: any[];
  };
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

  const actionData = useActionData<{ success?: boolean; error?: string; message?: string }>();

  return (
    <AdminLayout stats={stats}>
      {(currentPage) => {
        // 매니저 관리 페이지
        if (currentPage === "managers") {
          return <ManagersContent managers={managers} actionData={actionData} />;
        }

        // 예약 관리 페이지
        if (currentPage === "reservations") {
          return <ReservationsContent reservations={reservations} actionData={actionData} />;
        }

        // 커뮤니티 관리 페이지
        if (currentPage === "community") {
          return <CommunityContent notices={notices} reviews={reviews} actionData={actionData} />;
        }

        // 문의 관리 페이지
        if (currentPage === "contact") {
          return <ContactContent contacts={contacts} actionData={actionData} />;
        }

        // 프로젝트 관리 페이지
        if (currentPage === "programs") {
          return <ProgramsContent programs={programs} actionData={actionData} />;
        }

        // 테스트 관리 페이지
        if (currentPage === "test") {
          return <TestContent responses={testResponses} actionData={actionData} />;
        }

        // 대시보드 페이지
        if (currentPage === "dashboard") {
          return (
      <div className="h-full bg-transparent relative overflow-auto" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10 pt-4 md:pt-14 lg:pt-[4.5rem]">
        {/* 헤더 */}
        <header className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm flex-shrink-0">
                <Activity className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>대시보드</h1>
                <p className="text-white/90 flex items-center gap-2 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">리 프레임 관리 시스템</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <div className="space-y-4 sm:space-y-6">
          {/* 통계 카드 */}
          <StatsCards stats={stats} />

          {/* 최근 활동 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 최근 예약 */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate">최근 예약</CardTitle>
                  </div>
                  <Badge className="text-white px-2 py-1 sm:px-3 text-xs sm:text-sm flex-shrink-0" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                    {recentReservations.length}개
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5">
                {recentReservations.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-[#7A6666] text-sm opacity-80">최근 예약이 없습니다</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {recentReservations.map((reservation) => (
                      <div key={reservation.id} className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between gap-2 sm:gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-extrabold tracking-tight text-[#3B2F2F] mb-1 truncate">
                              {reservation.user_name || "이름 없음"}
                            </p>
                            <p className="text-sm text-[#7A6666] opacity-80 truncate">
                              {reservation.program_id || "-"}
                            </p>
                            <p className="text-xs text-[#7A6666] opacity-60 mt-2">
                              {reservation.created_at ? new Date(reservation.created_at).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : "-"}
                            </p>
                          </div>
                          <Badge className={`flex-shrink-0 ${
                            reservation.status === 'pending' ? 'bg-yellow-500 text-white' :
                            reservation.status === 'confirmed' ? 'bg-green-500 text-white' :
                            reservation.status === 'completed' ? 'bg-blue-500 text-white' :
                            reservation.status === 'cancelled' ? 'bg-red-500 text-white' :
                            'bg-gray-400 text-white'
                          }`}>
                            {reservation.status === 'pending' ? '대기' :
                             reservation.status === 'confirmed' ? '확정' :
                             reservation.status === 'completed' ? '완료' :
                             reservation.status === 'cancelled' ? '취소' :
                             reservation.status || '대기'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 최근 문의 */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-[#3B2F2F] truncate">최근 문의</CardTitle>
                  </div>
                  <Badge className="text-white px-2 py-1 sm:px-3 text-xs sm:text-sm flex-shrink-0" style={{ background: 'linear-gradient(90deg, #F3C3E6, #FFE6C5)' }}>
                    {recentContacts.length}개
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-5">
                {recentContacts.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-[#7A6666] text-sm opacity-80">최근 문의가 없습니다</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {recentContacts.map((contact) => (
                      <div key={contact.id} className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between gap-2 sm:gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-extrabold tracking-tight text-[#3B2F2F] mb-1 truncate">
                              {contact.name || "이름 없음"}
                            </p>
                            {contact.subject && (
                              <p className="text-sm text-[#7A6666] opacity-80 truncate mb-1">
                                {contact.subject}
                              </p>
                            )}
                            <p className="text-xs text-[#7A6666] opacity-60 mt-2">
                              {contact.created_at ? new Date(contact.created_at).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : "-"}
                            </p>
                          </div>
                          <Badge className={`flex-shrink-0 ${
                            contact.status === 'pending' ? 'bg-yellow-500 text-white' :
                            contact.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            contact.status === 'completed' ? 'bg-green-500 text-white' :
                            contact.status === 'cancelled' ? 'bg-red-500 text-white' :
                            'bg-gray-400 text-white'
                          }`}>
                            {contact.status === 'pending' ? '대기중' :
                             contact.status === 'in_progress' ? '처리중' :
                             contact.status === 'completed' ? '완료' :
                             contact.status === 'cancelled' ? '취소' :
                             contact.status || '대기중'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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

        // 기타 페이지들은 아직 구현 중
        return (
          <div className="h-full bg-[#FDF6F0] flex items-center justify-center" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-[#3B2F2F] mb-2">{currentPage} 페이지</h2>
              <p className="text-[#7A6666] opacity-80">이 페이지는 아직 구현 중입니다.</p>
            </div>
          </div>
        );
      }}
    </AdminLayout>
  );
}