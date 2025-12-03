import { useState } from "react";
import { useNavigate, type MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Clock, Users } from "lucide-react";
import { getPrograms } from "../queries";
import type { Route } from "../+types/reservation-page";
import { cn } from "../../../lib/utils";

export const meta: MetaFunction = () => {
    return [
        { title: "예약하기 - 리 프레임(Re-Frame)" },
        { name: "description", content: "연애, 사진, 에세이 프로그램 예약하기" }
    ];
};

export const loader = async () => {
    const result = await getPrograms();
    
    if (result.error) {
        console.error("[loader] programs error:", result.error);
        return { programs: [] };
    }

    return { programs: result.data ?? [] };
};

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

export default function ReservationPage({ loaderData }: Route.ComponentProps) {
    const { programs } = loaderData;
    const navigate = useNavigate();

    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<{ [key: string]: string[] }>({});
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const program = programs.find((p: { id: number }) => p.id === selectedProgram);

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

    const allTimes = getAllSelectedTimes();


    return (
        <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
            {/* 헤더 섹션 */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                        지금, 당신의 시간을 맡겨 주세요.
                    </h1>
                    <div className="text-lg md:text-xl text-gray-700 mb-8 space-y-3 max-w-3xl mx-auto">
                        <p>잠깐 멈춰서, 요즘의 나를 위한 시간을 하나 정해볼까요?</p>
                        <p>당신의 이야기가 한 장면으로 남을 순간,</p>
                        <p className="font-semibold text-gray-900">지금 이곳에서 시작할 수 있어요.</p>
                    </div>
                </div>
            </section>

            {/* 안내 섹션 */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-t border-white/50">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-base md:text-lg text-gray-700 space-y-3 max-w-3xl mx-auto">
                        <p>당신이 편한 시간에 우리가 맞춰가려고 해요.</p>
                        <p>이번 주 안에서 가능한 날짜와 시간대를 전부 선택해 주세요.</p>
                        <p className="text-gray-600">예약서를 보내주시면 리 프레임 매니저가 가장 편한 일정으로 연락드립니다.</p>
                        <p className="text-sm md:text-base text-gray-500 italic pt-2">
                            (약 30분~1시간 정도, 부담 없는 작은 만남이에요.)
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 프로그램 선택 섹션 */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">프로그램 선택</h2>

                        <div className="space-y-6">
                            {programs.map((program) => (
                                <Card
                                    key={program.id}
                                    className={`cursor-pointer transition-all duration-300 overflow-hidden group bg-white h-full flex flex-col ${selectedProgram === program.id
                                        ? 'ring-2 ring-blue-500 shadow-xl scale-[1.02]'
                                        : 'hover:shadow-xl hover:scale-[1.01]'
                                        }`}
                                    onClick={() => setSelectedProgram(program.id)}
                                >
                                    <div className={`h-2 bg-gradient-to-r ${program.color_gradient || 'from-blue-500 to-purple-500'}`} />
                                    <CardHeader className="p-6 pb-4 flex-shrink-0">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0">
                                                <Badge className={`${program.badge_color || 'bg-blue-500'} text-white px-3 py-1 text-sm font-semibold shadow-md`}>
                                                    {program.badge || 'NEW'}
                                                </Badge>
                                            </div>
                                            <div className="flex items-start space-x-4 pr-20">
                                                <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${program.color_gradient || 'from-blue-500 to-purple-500'} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                                    {program.icon || '✨'}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1">
                                                    <CardTitle className="text-xl text-gray-900 mb-2">{program.title}</CardTitle>
                                                    <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                                        {program.description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                                        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg flex-shrink-0">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <Clock className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-gray-500">소요 시간</p>
                                                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">{program.duration || '상담 후 결정'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                    <Users className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs text-gray-500">대상</p>
                                                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">{program.target_audience || '청년 누구나'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-auto">
                                            <button
                                                type="button"
                                                className={cn(
                                                    "px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white hover:opacity-90 border-2 border-white/20 backdrop-blur-sm flex-shrink-0",
                                                    "bg-gradient-to-r",
                                                    program.color_gradient && program.color_gradient.trim()
                                                        ? program.color_gradient.trim()
                                                        : "from-blue-500 to-purple-500"
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProgram(program.id);
                                                }}
                                            >
                                                {selectedProgram === program.id ? '✓ 선택됨' : '선택하기'}
                                            </button>
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
                                                    <div
                                                        className={`relative h-16 w-full flex flex-col items-center justify-center rounded-lg border-2 transition-all ${
                                                            isToday
                                                                ? 'bg-green-50 border-green-400 text-green-900'
                                                                : hasSelectedTimes
                                                                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                                                                    : isPast
                                                                        ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                                                        : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-lg font-bold">{date.getDate()}</span>
                                                            <span className="text-xs text-gray-500">
                                                                {date.toLocaleDateString('ko-KR', { weekday: 'short' })}
                                                            </span>
                                                        </div>
                                                        {isToday && (
                                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                                                오늘
                                                            </span>
                                                        )}
                                                    </div>

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
                                                <span className="font-medium">{programs.find((p: { id: number }) => p.id === selectedProgram)?.title}</span>
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