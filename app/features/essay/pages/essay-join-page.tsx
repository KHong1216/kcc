import { Form, type MetaFunction, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Label } from "../../../common/components/ui/label";
import { User, Phone, Check } from "lucide-react";
import { createReservation } from "../../reservation/queries";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
    return [
        { title: "굿즈신청 - 코이창작소" },
        { name: "description", content: "굿즈신청에 간단히 신청하세요" },
        { name: "robots", content: "noindex, nofollow" }
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    return {};
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const goodsType = formData.get("goods_type") as string;

    // 굿즈 신청 - 이름, 나이, 연락처, 굿즈 타입 수집
    const reservationData: any = {
        user_name: formData.get("user_name") as string,
        user_age: parseInt(formData.get("user_age") as string) || 0,
        user_job: "미입력",
        user_phone: formData.get("user_phone") as string,
        program_id: goodsType || 'essay' as const,
        selected_dates: {}, // 날짜 선택 제거
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

const goodsOptions = [
    {
        id: "love-test",
        title: "연애경향성 테스트",
        description: "나의 연애 스타일과 경향을 알아보는 시간으로, 더 나은 관계를 위한 나만의 인사이트를 발견해보세요"
    },
    {
        id: "snap-photo",
        title: "스냅사진촬영",
        description: "외적으로 꾸민 나의 모습을 스냅사진으로 담아내며, 동시에 내면의 나를 발견하고 표현하는 특별한 경험"
    },
    {
        id: "essay",
        title: "나의 한해 이야기를 에세이로 작성하기",
        description: "지나간 한 해를 돌아보며 나만의 이야기를 글로 풀어내는 시간. 소중한 순간들을 기록하고 나를 더 깊이 이해하는 여정"
    }
];

export default function EssayJoinPage({ actionData }: EssayJoinPageProps) {
    const [selectedGoods, setSelectedGoods] = useState<string>("");

    // 성공 메시지 표시
    if (actionData?.success) {
        return (
            <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gradien여기t-to-br from-green-50 via-teal-50 to-blue-50">
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
                        굿즈신청
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
                            {/* 굿즈 선택 */}
                            <div className="space-y-3">
                                <Label className="text-base font-semibold">
                                    굿즈 선택 *
                                </Label>
                                <div className="grid grid-cols-1 gap-3">
                                    {goodsOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setSelectedGoods(option.id)}
                                            className={cn(
                                                "relative p-4 rounded-lg border-2 text-left transition-all",
                                                "hover:border-green-500 hover:bg-green-50",
                                                selectedGoods === option.id
                                                    ? "border-green-600 bg-green-50 shadow-md"
                                                    : "border-gray-200 bg-white"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                                    selectedGoods === option.id
                                                        ? "border-green-600 bg-green-600"
                                                        : "border-gray-300"
                                                )}>
                                                    {selectedGoods === option.id && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        {option.title}
                                                    </h3>
                                                    {option.description && (
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {option.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <input type="hidden" name="goods_type" value={selectedGoods} required />
                            </div>

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
                                disabled={!selectedGoods}
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                굿즈신청하기
                            </Button>
                        </Form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

