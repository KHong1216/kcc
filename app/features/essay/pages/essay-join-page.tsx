import { Form, type MetaFunction, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Label } from "../../../common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../common/components/ui/select";
import { User, Phone, Calendar, Clock } from "lucide-react";
import { createReservation } from "../../reservation/queries";
import { useState } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "에세이 캠프 신청 - 코이창작소" },
        { name: "description", content: "에세이 캠프에 간단히 신청하세요" },
        { name: "robots", content: "noindex, nofollow" }
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    return {};
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const selectedDate = formData.get("selected_date") as string;
    const selectedTime = formData.get("selected_time") as string;

    // 날짜와 시간을 selected_dates 형식으로 변환
    const selected_dates: Record<string, string[]> = {};
    if (selectedDate && selectedTime) {
        selected_dates[selectedDate] = [selectedTime];
    }

    // QR 코드용 간단 신청 - 이름, 나이, 연락처만 수집
    // undefined 필드는 제외하고 필수 필드만 포함
    const reservationData: any = {
        user_name: formData.get("user_name") as string,
        user_age: parseInt(formData.get("user_age") as string) || 0,
        user_job: "미입력", // QR 코드 신청은 직업 정보 없음
        user_phone: formData.get("user_phone") as string,
        program_id: 'essay' as const,
        selected_dates: selected_dates, // 빈 객체여도 허용
        status: 'pending' as const
    };

    // 디버깅: 전송할 데이터 확인
    console.log('Reservation data to insert:', JSON.stringify(reservationData, null, 2));

    const result = await createReservation(reservationData);

    if (result) {
        return {
            success: true,
            reservationId: result.id,
            message: "신청이 완료되었습니다! 코이매니저가 곧 연락드려 상세 일정을 안내해드립니다."
        };
    } else {
        return {
            success: false,
            error: "신청에 실패했습니다. 다시 시도해주세요."
        };
    }
}

interface EssayJoinPageProps {
    actionData?: {
        success?: boolean;
        error?: string;
        message?: string;
        reservationId?: string;
    };
}

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

// 다음 7일간의 날짜 목록 생성
function getWeekDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
            value: date.toDateString(),
            label: date.toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
                weekday: 'short'
            })
        });
    }
    
    return dates;
}

export default function EssayJoinPage({ actionData }: EssayJoinPageProps) {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const weekDates = getWeekDates();

    // 성공 메시지 표시
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            {/* 헤더 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        에세이 캠프 신청
                    </h1>
                    <p className="text-lg text-gray-700 mb-2">
                        간단한 정보만 입력해주시면 됩니다
                    </p>
                    <p className="text-sm text-gray-500">
                        코이매니저가 연락드려 상세 일정을 안내해드립니다
                    </p>
                </div>
            </section>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <User className="w-5 h-5 text-green-600" />
                            신청자 정보
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {actionData?.error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600">{actionData.error}</p>
                            </div>
                        )}

                        <Form method="post" className="space-y-6">
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

                            {/* 연락처 정보 */}
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

                            {/* 날짜 및 시간 선택 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        가능한 날짜 *
                                    </Label>
                                    <Select
                                        value={selectedDate}
                                        onValueChange={setSelectedDate}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="날짜를 선택하세요" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {weekDates.map((date) => (
                                                <SelectItem key={date.value} value={date.value}>
                                                    {date.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="selected_date" value={selectedDate} required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        가능한 시간 *
                                    </Label>
                                    <Select
                                        value={selectedTime}
                                        onValueChange={setSelectedTime}
                                        required
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="시간을 선택하세요" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="selected_time" value={selectedTime} required />
                                </div>
                            </div>

                            {/* 안내 문구 */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    📞 신청 후 코이매니저가 연락드려<br />
                                    상세 일정과 프로그램 안내를 도와드립니다.
                                </p>
                            </div>

                            {/* 제출 버튼 */}
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                에세이 캠프 신청하기
                            </Button>
                        </Form>
                    </CardContent>
                </Card>

                {/* 간단한 프로그램 소개 */}
                <Card className="mt-6 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">에세이 캠프란?</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            "읽는 사람만이 제대로 말할 수 있다"<br />
                            읽기 → 생각 → 쓰기로 이어지는 여정을 통해<br />
                            나를 이해하고, 나답게 말할 수 있는 사람이 되어가는 시간입니다.<br />
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

