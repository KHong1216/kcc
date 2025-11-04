import { Form, useLocation, useNavigate, type MetaFunction } from "react-router";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";
import { Input } from "../../../common/components/ui/input";
import { Label } from "../../../common/components/ui/label";
import { Textarea } from "../../../common/components/ui/textarea";
import { Calendar, Clock, User, Phone, Mail, Briefcase, MessageSquare } from "lucide-react";
import { createReservation } from "../queries";
import type { Route } from "./+types/reservation-apply-page";

export const meta: MetaFunction = () => {
    return [
        { title: "예약 신청 - 코이창작소" },
        { name: "description", content: "선택한 프로그램으로 예약 신청을 완료하세요" }
    ];
};

export async function loader({ request }: Route.LoaderArgs) {
    return {};
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();

    // action 함수에서 DB 저장
    const reservationData = {
        user_name: formData.get("user_name") as string,
        user_age: parseInt(formData.get("user_age") as string),
        user_job: formData.get("user_job") as string,
        user_phone: formData.get("user_phone") as string,
        user_email: formData.get("user_email") as string || undefined,
        program_id: formData.get("program_id") as 'love' | 'photo' | 'essay',
        selected_dates: JSON.parse(formData.get("selected_dates") as string),
        notes: formData.get("notes") as string || undefined,
        status: 'pending' as const
    };

    const result = await createReservation(reservationData);

    if (result) {
        return {
            success: true,
            reservationId: result.id,
            message: "예약 신청이 완료되었습니다. 상담사가 연락드려 최종 일정을 확인해드립니다."
        };
    } else {
        return {
            success: false,
            error: "예약 신청에 실패했습니다. 다시 시도해주세요."
        };
    }
}

export default function ReservationApplyPage({ actionData }: Route.ComponentProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location && (location as any).state) || {};

    const programId = state?.programId;
    const programTitle = state?.programTitle;
    const selectedTimeSlots = state?.selectedTimeSlots;
    const selectedTimesSummary = state?.selectedTimesSummary;

    // 성공 메시지 표시 (성공한 경우 선택 정보 체크 안 함)
    if (actionData?.success) {
        return (
            <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Card className="text-center shadow-xl">
                        <CardHeader>
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <CardTitle className="text-3xl text-green-600 mb-2">신청 완료!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {actionData.message}
                            </p>
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                <p className="text-sm text-gray-600">
                                    곧 연락드리겠습니다. 조금만 기다려주세요! 😊
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate("/")}
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                홈으로 가기
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // 선택 정보가 없으면 예약 페이지로 리다이렉트 (성공하지 않은 경우만 체크)
    if (!programId || !selectedTimeSlots) {
        navigate("/reservation");
        return null;
    }

    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
            {/* 헤더 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        예약 신청
                    </h1>
                    <p className="text-lg text-gray-600">
                        선택하신 프로그램으로 예약 신청을 완료해주세요
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* 선택한 프로그램 정보 */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    선택한 프로그램
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-2">{programTitle}</h3>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        {programId}
                                    </Badge>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        선택한 시간
                                    </h4>
                                    <div className="space-y-2">
                                        {Object.entries(selectedTimeSlots).map(([date, times]) => (
                                            <div key={date} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="font-medium text-gray-800 text-sm">
                                                    {new Date(date).toLocaleDateString('ko-KR', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        weekday: 'short'
                                                    })}
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {times.map((time) => (
                                                        <Badge key={time} variant="outline" className="text-xs">
                                                            {time}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 예약 신청 폼 */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    예약자 정보
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {actionData?.error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600">{actionData.error}</p>
                                    </div>
                                )}

                                <Form method="post" className="space-y-6">
                                    {/* 숨겨진 필드들 */}
                                    <input type="hidden" name="program_id" value={programId} />
                                    <input type="hidden" name="selected_dates" value={JSON.stringify(selectedTimeSlots)} />

                                    {/* 기본 정보 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="user_name" className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                이름 *
                                            </Label>
                                            <Input
                                                id="user_name"
                                                name="user_name"
                                                required
                                                placeholder="홍길동"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="user_age" className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                나이 *
                                            </Label>
                                            <Input
                                                id="user_age"
                                                type="number"
                                                name="user_age"
                                                required
                                                min="1"
                                                max="100"
                                                placeholder="25"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="user_job" className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            직업/학교 *
                                        </Label>
                                        <Input
                                            id="user_job"
                                            name="user_job"
                                            required
                                            placeholder="예: 대학생, 직장인, 프리랜서, 고등학생 등"
                                            className="w-full"
                                        />
                                    </div>

                                    {/* 연락처 정보 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="user_phone" className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                연락처 *
                                            </Label>
                                            <Input
                                                id="user_phone"
                                                type="tel"
                                                name="user_phone"
                                                required
                                                placeholder="010-1234-5678"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="user_email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                이메일
                                            </Label>
                                            <Input
                                                id="user_email"
                                                type="email"
                                                name="user_email"
                                                placeholder="example@email.com"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* 추가 요청사항 */}
                                    <div className="space-y-2">
                                        <Label htmlFor="notes" className="flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            추가 요청사항
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            rows={4}
                                            placeholder="특별한 요청사항이나 질문이 있으시면 적어주세요"
                                            className="w-full"
                                        />
                                    </div>

                                    {/* 제출 버튼 */}
                                    <div className="flex gap-4">
                                        <Button
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            예약 신청하기
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate("/reservation")}
                                            className="px-8"
                                        >
                                            이전으로
                                        </Button>
                                    </div>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}