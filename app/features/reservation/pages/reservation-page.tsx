import { useState } from "react";
import { useNavigate, type MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Clock, Users } from "lucide-react";
import { getPrograms } from "../queries";
import type { Route } from "./+types/reservation-page";

export const meta: MetaFunction = () => {
    return [
        { title: "예약하기 - 코이창작소" },
        { name: "description", content: "연애, 사진, 에세이 프로그램 예약하기" }
    ];
};

export const loader = async () => {
    const programs = await getPrograms();
    return { programs };
};

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

export default function ReservationPage({ loaderData }: Route.ComponentProps) {
    const { programs } = loaderData;
    const navigate = useNavigate();

    console.log("programs", programs);
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<{ [key: string]: string[] }>({});
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const getWeekDates = (date: Date) => {
        const weekDates = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(date);
            day.setDate(date.getDate() + i);
            weekDates.push(day);
        }

        return weekDates;
    };

    const weekDates = getWeekDates(new Date());

    const nextWeek = () => {
        const next = new Date(currentWeek);
        next.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(next);
    };

    const prevWeek = () => {
        const prev = new Date(currentWeek);
        prev.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(prev);
    };

    const handleTimeSlotToggle = (date: Date, time: string) => {
        const dateKey = date.toDateString();
        setSelectedTimeSlots(prev => {
            const currentSlots = prev[dateKey] || [];
            const newSlots = currentSlots.includes(time)
                ? currentSlots.filter(t => t !== time)
                : [...currentSlots, time];

            return {
                ...prev,
                [dateKey]: newSlots
            };
        });
    };

    const getSelectedDatesCount = () => {
        return Object.keys(selectedTimeSlots).filter(dateKey =>
            selectedTimeSlots[dateKey] && selectedTimeSlots[dateKey].length > 0
        ).length;
    };

    const getAllSelectedTimes = () => {
        const allTimes: { date: string, times: string[] }[] = [];
        Object.keys(selectedTimeSlots).forEach(dateKey => {
            if (selectedTimeSlots[dateKey] && selectedTimeSlots[dateKey].length > 0) {
                const date = new Date(dateKey);
                allTimes.push({
                    date: date.toLocaleDateString('ko-KR'),
                    times: selectedTimeSlots[dateKey]
                });
            }
        });
        return allTimes;
    };

    const handleReservation = () => {
        if (!selectedProgram || getSelectedDatesCount() === 0) {
            alert("프로그램과 가능한 날짜/시간을 선택해주세요.");
            return;
        }

        const program = programs.find(p => p.id === selectedProgram);
        const allTimes = getAllSelectedTimes();

        // 선택한 정보를 apply 페이지로 전달
        navigate("/reservation/apply", {
            state: {
                programId: selectedProgram,
                programTitle: program?.title,
                selectedTimeSlots, // 원본 데이터
                selectedTimesSummary: allTimes.map(item =>
                    `${item.date} ${item.times.join(", ")}`
                ).join("\n") // 사용자에게 보여줄 요약 텍스트
            }
        });
    };

    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
            {/* 헤더 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        지금, 당신의 시간을 창작하세요
                    </h1>
                    <div className="text-lg text-gray-600 mb-6 space-y-2">
                        <p>잠시 멈추어, 나의 일상 속 한 장면을 새롭게 써보세요.</p>
                        <p>코이창작소의 모든 프로그램은</p>
                        <p className="font-semibold text-gray-800">'무언가를 배우는 시간'이 아닌 '나를 발견하는 여정'으로 설계되어 있습니다.</p>
                        <p>당신의 이름으로 남길 새로운 순간,</p>
                        <p className="font-semibold text-blue-600">지금 이곳에서 예약할 수 있습니다.</p>
                    </div>
                </div>
            </section>

            <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-lg text-gray-600 mb-6 space-y-2">
                        <p>당신의 하루가 머무를 자리를 정하기 위해,</p>
                        <p>이번 주 가능한 시간을 모두 선택해주세요.</p>
                        <p className="text-sm text-gray-500">작은 선택이 모여, 당신만의 장면이 완성됩니다.</p>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 프로그램 선택 섹션 */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">프로그램 선택</h2>

                        <div className="space-y-4">
                            {programs.map((program) => (
                                <Card
                                    key={program.id}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedProgram === program.id
                                        ? 'ring-2 ring-blue-500 shadow-lg'
                                        : 'hover:shadow-md'
                                        }`}
                                    onClick={() => setSelectedProgram(program.id)}
                                >
                                    <CardHeader className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${program.color_gradient} flex items-center justify-center text-2xl`}>
                                                    {program.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl text-gray-900">{program.title}</CardTitle>
                                                    <CardDescription className="text-gray-600 mt-1">
                                                        {program.description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Badge className={`${program.badge_color} text-white`}>
                                                {program.badge}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-6">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <span className="text-gray-600">{program.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4 text-gray-500" />
                                                <span className="text-gray-600">{program.target_audience}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button
                                                size="sm"
                                                className={`bg-gradient-to-r ${program.color_gradient} hover:opacity-90 text-white`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProgram(program.id);
                                                }}
                                            >
                                                선택하기
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 예약 섹션 */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">날짜 및 시간 선택</h2>

                        {selectedProgram ? (
                            <div className="space-y-6">
                                {/* 주간 달력 */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">이번 주 일정</h3>
                                        <div className="text-sm text-gray-500">
                                            {new Date().toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' })} 기준
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 mb-4">
                                        {weekDates.map((date, index) => (
                                            <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                                                {date.toLocaleDateString('ko-KR', { weekday: 'short' })}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {weekDates.map((date, index) => {
                                            const dateKey = date.toDateString();
                                            const hasSelectedTimes = selectedTimeSlots[dateKey] && selectedTimeSlots[dateKey].length > 0;
                                            const isToday = date.toDateString() === new Date().toDateString();
                                            const isPast = date < new Date() && !isToday;

                                            return (
                                                <div key={index} className="space-y-2">
                                                    <Button
                                                        variant="outline"
                                                        className={`h-16 w-full flex flex-col items-center justify-center ${isToday
                                                            ? 'bg-green-50 border-green-300 text-green-800'
                                                            : hasSelectedTimes
                                                                ? 'bg-blue-50 border-blue-300'
                                                                : isPast
                                                                    ? 'bg-gray-100 border-gray-200 text-gray-400'
                                                                    : 'hover:bg-blue-50'
                                                            }`}
                                                        disabled={isPast}
                                                    >
                                                        <span className="text-sm font-medium">{date.getDate()}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {date.toLocaleDateString('ko-KR', { weekday: 'short' })}
                                                        </span>
                                                        {isToday && <span className="text-xs text-green-600 font-bold">오늘</span>}
                                                    </Button>

                                                    {/* 각 날짜별 시간 선택 */}
                                                    {!isPast && (
                                                        <div className="grid grid-cols-1 gap-1">
                                                            {timeSlots.map((time) => (
                                                                <Button
                                                                    key={time}
                                                                    size="sm"
                                                                    variant={selectedTimeSlots[dateKey]?.includes(time) ? "default" : "outline"}
                                                                    className={`text-xs py-1 h-6 ${selectedTimeSlots[dateKey]?.includes(time)
                                                                        ? 'bg-blue-600 text-white'
                                                                        : 'hover:bg-blue-50'
                                                                        }`}
                                                                    onClick={() => handleTimeSlotToggle(date, time)}
                                                                >
                                                                    {time}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600 text-center">
                                            오늘부터 7일간 가능한 날짜와 시간을 선택하세요. 과거 날짜만 선택할 수 없습니다.
                                        </p>
                                    </div>
                                </Card>

                                {/* 예약 정보 및 버튼 */}
                                {selectedProgram && getSelectedDatesCount() > 0 && (
                                    <Card className="p-6 bg-blue-50 border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">예약 정보</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">프로그램:</span>
                                                <span className="font-medium">{programs.find(p => p.id === selectedProgram)?.title}</span>
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-gray-600">선택한 날짜 및 시간:</span>
                                                {getAllSelectedTimes().map((item, index) => (
                                                    <div key={index} className="bg-white p-3 rounded-lg">
                                                        <div className="font-medium text-gray-800 mb-2">{item.date}</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {item.times.map((time) => (
                                                                <Badge key={time} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                                                    {time}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                                            onClick={handleReservation}
                                        >
                                            예약 신청하기
                                        </Button>
                                    </Card>
                                )}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                    프로그램을 먼저 선택해주세요
                                </h3>
                                <p className="text-gray-500">
                                    왼쪽에서 원하는 프로그램을 선택하면 날짜와 시간을 예약할 수 있습니다.
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}