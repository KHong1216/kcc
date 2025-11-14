import { useNavigate, type MetaFunction } from "react-router"
import { Card } from "../../../../common/components/ui/card";
import { Badge } from "../../../../common/components/ui/badge";
import { Button } from "../../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
      { title: "KOI 에세이 캠프 - 자기 이해를 통한 나의 이야기 발견 | 코이창작소" },
      { name: "description", content: "에세이는 '쓰기'보다 '자기 이해'가 먼저입니다. KOI 에세이 캠프는 대화를 기반으로 나의 패턴·취향·성향을 이해하고 삶의 경험을 언어로 정리하는 과정을 안내합니다." },
      { name: "keywords", content: "에세이쓰기, 자기이해, 글쓰기캠프, 자기탐색, 에세이집제작, 글쓰기상담, 코이창작소" },
      { property: "og:title", content: "KOI 에세이 캠프 - 자기 이해를 통한 나의 이야기 발견" },
      { property: "og:description", content: "에세이는 '쓰기'보다 '자기 이해'가 먼저입니다. 대화를 기반으로 나의 패턴·취향·성향을 이해하고 삶의 경험을 언어로 정리하는 과정을 안내합니다." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-essay.jpg" },
    ];
  };

export default function EssayPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            {/* 헤더 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(180deg, #FFFBF8, #FFF5EC)' }}>
                <div className="max-w-5xl mx-auto text-center">
                    <Badge className="mb-6 text-base px-4 py-2 font-semibold" style={{ backgroundColor: '#E8D5FF', color: '#6B46C1' }}>
                        KOI 에세이 캠프 Essay Camp
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 text-[#3B2F2F] leading-tight" style={{ lineHeight: '1.6' }}>
                        에세이는 '쓰기'보다<br />'자기 이해'가 먼저입니다
                    </h1>
                    <div className="space-y-8 text-lg md:text-xl text-[#3B2F2F]/85 leading-relaxed max-w-3xl mx-auto mb-12" style={{ lineHeight: '1.6' }}>
                        <p className="text-xl md:text-2xl font-medium">
                            최근의 에세이는 단순한 글쓰기 활동이 아니라,<br />
                            <span className="text-2xl md:text-3xl font-bold text-[#3B2F2F]">자신의 내면을 듣고 해석하는 과정에 더 가까워지고 있습니다.</span>
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#FADADD]/40 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="mb-4">
                                글을 잘 쓰기 위해서는 먼저<br />
                                나의 생각, 감정, 경험을 객관적으로 바라보는 과정이 필요합니다.
                            </p>
                            <p className="text-xl md:text-2xl font-bold" style={{ color: '#A855F7' }}>
                                KOI 에세이 캠프는 '나의 이야기'를 발견하도록 돕습니다.
                            </p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="text-white text-lg px-8 py-4 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300 rounded-xl"
                        style={{ background: 'linear-gradient(90deg, #E8D5FF, #FFD1BA)' }}
                        onClick={() => navigate("/reservation")}
                    >
                        프로그램 참여하기
                    </Button>
                </div>
            </section>

            {/* KOI 에세이 캠프는 '나의 이야기'를 발견하도록 돕습니다 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E8D5FF' }}>
                            <span className="text-2xl font-bold" style={{ color: '#6B46C1' }}>01</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            KOI 에세이 캠프는<br />'나의 이야기'를 발견하도록 돕습니다
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                이 프로그램은 단순히 글을 만들어내는 형식적인 활동이 아니라,<br />
                                대화를 기반으로 나의 패턴·취향·성향을 이해하고<br />
                                삶의 경험을 언어로 정리하는 과정을 안내합니다.
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="text-lg font-bold text-[#3B2F2F] mb-6">이러한 자기 탐색을 통해</p>
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">내가 어떤 사람인지</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">무엇을 중요하게 생각하는지</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">어떤 방식으로 세상과 관계 맺는지</p>
                                </div>
                            </div>
                            <p className="text-lg text-[#3B2F2F]/90 text-center font-medium">
                                를 명확히 알게 되고, 그 결과 자연스럽게 자신의 에세이로 연결되는 흐름을 경험하게 됩니다.
                            </p>
                        </div>

                        <div className="text-center py-6">
                            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                                단순한 글쓰기가 아닌,<br />
                                <span style={{ color: '#A855F7' }}>자기 이해를 통한 진정한 나의 이야기 발견</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 프로그램 개요 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E8F4FB' }}>
                            <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>02</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            프로그램 개요
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="text-center">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>
                                KOI 에세이 캠프는 단기간의 워크숍 형태가 아닙니다.<br />
                                지속적인 성장과 깊이 있는 기록을 위해 설계된 장기 프로그램입니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/80">
                                <div className="text-3xl font-bold mb-2" style={{ color: '#3B82F6' }}>7개월</div>
                                <div className="text-sm font-semibold text-[#3B2F2F]/70">기간</div>
                            </Card>
                            <Card className="p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/80">
                                <div className="text-3xl font-bold mb-2" style={{ color: '#A855F7' }}>주 3회</div>
                                <div className="text-sm font-semibold text-[#3B2F2F]/70">빈도</div>
                            </Card>
                            <Card className="p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/80">
                                <div className="text-lg font-bold mb-2" style={{ color: '#E8D5FF' }}>상담 기반</div>
                                <div className="text-sm font-semibold text-[#3B2F2F]/70">방식</div>
                            </Card>
                            <Card className="p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white/80">
                                <div className="text-lg font-bold mb-2" style={{ color: '#FFD1BA' }}>꾸준한 참여</div>
                                <div className="text-sm font-semibold text-[#3B2F2F]/70">대상</div>
                            </Card>
                        </div>

                        <div className="p-8 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="text-lg md:text-xl font-semibold text-[#3B2F2F] text-center leading-relaxed" style={{ lineHeight: '1.8' }}>
                                꾸준히 참여할수록 자신의 이야기가 명확해지고,<br />
                                결국 한 권의 에세이로 완성되는 경험을 하게 됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 프로그램의 특징 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD1BA' }}>
                            <span className="text-2xl font-bold" style={{ color: '#EA580C' }}>03</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            프로그램의 특징
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                KOI 에세이 캠프는 단순한 글쓰기 수업이 아닙니다.<br />
                                대화를 통해 자신을 이해하고, 그 이해를 바탕으로 자연스럽게 에세이로 연결되는 과정을 제공합니다.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#E8F4FB' }}>
                            <p className="text-lg font-bold text-[#3B2F2F] mb-4 text-center">프로그램의 핵심</p>
                            <p className="text-lg text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                형식적인 글쓰기 지도가 아니라,<br />
                                자신의 내면을 탐색하고 삶의 경험을 언어로 정리하는<br />
                                <span className="font-bold" style={{ color: '#3B82F6' }}>자기 이해 중심의 접근 방식을 따릅니다.</span>
                            </p>
                        </div>

                        <div className="text-center py-6">
                            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3B2F2F] leading-relaxed" style={{ lineHeight: '1.8' }}>
                                꾸준한 참여를 통해 자신의 이야기가 명확해지고,<br />
                                <span style={{ color: '#A855F7' }}>결국 한 권의 에세이로 완성되는 경험</span>을 하게 됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 참여 대상 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#F5EDFF' }}>
                            <span className="text-2xl font-bold" style={{ color: '#A855F7' }}>04</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            참여 대상
                        </h2>
                        <p className="mt-4 text-lg text-[#3B2F2F]/80">
                            다음 조건에 해당하는 분들에게 특히 적합합니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-l-4" style={{ borderColor: '#E8D5FF' }}>
                            <h3 className="text-xl font-bold mb-4 text-[#3B2F2F]">참여 조건</h3>
                            <ul className="space-y-3 list-none">
                                <li className="flex items-start">
                                    <span className="mr-3 text-xl font-bold" style={{ color: '#A855F7' }}>✓</span>
                                    <span className="text-[#3B2F2F]/90">꾸준한 참여가 가능한 분</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-xl font-bold" style={{ color: '#A855F7' }}>✓</span>
                                    <span className="text-[#3B2F2F]/90">자기 이해와 기록에 관심 있는 분</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-l-4" style={{ borderColor: '#A8C5F8' }}>
                            <h3 className="text-xl font-bold mb-4 text-[#3B2F2F]">프로그램 관심사</h3>
                            <ul className="space-y-3 list-none">
                                <li className="flex items-start">
                                    <span className="mr-3 text-xl font-bold" style={{ color: '#3B82F6' }}>✓</span>
                                    <span className="text-[#3B2F2F]/90">나의 패턴·취향·성향을 이해하고 싶은 분</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-xl font-bold" style={{ color: '#3B82F6' }}>✓</span>
                                    <span className="text-[#3B2F2F]/90">삶의 경험을 언어로 정리하고 싶은 분</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    <div className="text-center p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#F5EDFF' }}>
                        <p className="text-lg font-semibold text-[#3B2F2F] mb-2">
                            글쓰기 실력이나 경험은 중요하지 않습니다.
                        </p>
                        <p className="text-lg font-semibold text-[#3B2F2F] mb-4">
                            자기 이해와 기록에 대한 관심과 꾸준한 참여 의지가 핵심입니다.
                        </p>
                        <p className="text-xl md:text-2xl font-bold" style={{ color: '#A855F7' }}>
                            대화를 통해 자연스럽게 자신의 이야기를 발견해 나갑니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 어떻게 진행돼요? */}
            <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #F5EDFF, #E8F4FB)' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-white/80">
                            <span className="text-2xl font-bold" style={{ color: '#A855F7' }}>05</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            어떻게 진행돼요?
                        </h2>
                    </div>
                    
                    <div className="space-y-6">
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#E8D5FF', color: '#6B46C1' }}>
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">예약 접수</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        간단한 예약 신청서를 작성하면 됩니다. (이름과 연락처만으로 충분합니다.)
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#A8C5F8' }}>
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">코이매니저 연락</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        접수가 완료되면 코이매니저가 직접 연락드립니다.<br />
                                        대화 가능한 시간대를 조율하고, 어떤 주제로 이야기할지 간단히 안내해드립니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#E8D5FF', color: '#6B46C1' }}>
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">대화 진행</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        정해진 시간에 편하게 한 해 이야기를 나눕니다.<br />
                                        1:1로 할 수도 있고, 작은 그룹으로 진행될 수도 있습니다.<br />
                                        <span className="font-semibold">"면접"이 아니라 "수다"에 더 가깝습니다.</span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FFD1BA' }}>
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">에세이로 남기기</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        당신이 했던 말, 그리고 사람들이 당신에게 건넨 말들.<br />
                                        그 순간들이 모여 한 편의 에세이가 완성됩니다.<br />
                                        (원한다면 완성본은 본인에게만 전달해드립니다.)
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 프로그램의 목적 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E8F4FB' }}>
                            <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>06</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            프로그램의 목적
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                KOI 에세이 캠프는 단순히 글을 만들어내는 형식적인 활동이 아닙니다.<br />
                                대화를 기반으로 자신의 내면을 탐색하고,<br />
                                삶의 경험을 언어로 정리하는 과정을 통해 진정한 자기 이해를 도모합니다.
                            </p>
                        </div>
                        
                        <div className="p-10 rounded-2xl border-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="text-2xl font-bold text-[#3B2F2F] mb-6 text-center">
                                프로그램의 핵심 가치
                            </p>
                            <p className="text-xl md:text-2xl text-center leading-relaxed" style={{ lineHeight: '1.8' }}>
                                자신의 패턴·취향·성향을 이해하고,<br />
                                <span className="font-extrabold" style={{ color: '#A855F7' }}>"나의 이야기"를 발견하여 한 권의 에세이로 완성하는 것.</span>
                            </p>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl leading-relaxed text-center text-[#3B2F2F]/90" style={{ lineHeight: '1.8' }}>
                                꾸준한 참여를 통해 자신의 이야기가 명확해지고,<br />
                                내가 어떤 사람인지, 무엇을 중요하게 생각하는지,<br />
                                어떤 방식으로 세상과 관계 맺는지를 명확히 알게 됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 프로그램 참여 안내 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 text-white" style={{ background: 'linear-gradient(90deg, #E8D5FF, #FFD1BA)' }}>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>
                        자기 이해를 통한 나의 이야기 발견
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            KOI 에세이 캠프는 단순한 글쓰기 프로그램이 아닙니다.<br />
                            <span className="font-bold">대화를 기반으로 한 자기 탐색과 이해를 통해</span><br />
                            진정한 나의 이야기를 발견하고, 한 권의 에세이로 완성하는 경험을 제공합니다.
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <p className="text-2xl md:text-3xl font-semibold leading-relaxed" style={{ lineHeight: '1.6' }}>
                                약 7개월간, 주 3회의 꾸준한 참여를 통해<br />
                                자신의 이야기를 발견하고 완성해보세요.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="bg-white hover:bg-gray-100 text-lg px-8 py-4 font-bold rounded-xl transition-all duration-300"
                            style={{ color: '#A855F7' }}
                            onClick={() => navigate("/reservation")}
                        >
                            프로그램 참여하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
