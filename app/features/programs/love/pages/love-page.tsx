import { useNavigate, type MetaFunction } from "react-router"
import { Card } from "../../../../common/components/ui/card";
import { Badge } from "../../../../common/components/ui/badge";
import { Button } from "../../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com/programs/love";
    return [
      { title: "Re-Frame 연애 캠프 - 내가 바뀌면 관계 전체가 달라진다 | 리 프레임(Re-Frame)" },
      { name: "description", content: "연애에서 가장 자주 벌어지는 갈등은 '소통 문제'에서 비롯됩니다. Re-Frame 연애 캠프는 나의 감정 패턴, 말하기 습관, 상처의 근원, 표현 방식을 객관적으로 이해할 수 있는 기회를 제공합니다." },
      { name: "keywords", content: "연애상담, 관계상담, 소통문제, 연애패턴, 연애캠프, 리 프레임, Re-Frame, 광주 연애상담, 광주 청년, 광주 상담" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: "Re-Frame 연애 캠프 - 내가 바뀌면 관계 전체가 달라진다" },
      { property: "og:description", content: "연애에서 가장 자주 벌어지는 갈등은 '소통 문제'에서 비롯됩니다. 나의 감정 패턴, 말하기 습관, 상처의 근원, 표현 방식을 객관적으로 이해할 수 있는 기회를 제공합니다." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-love.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Re-Frame 연애 캠프 - 내가 바뀌면 관계 전체가 달라진다" },
      { property: "og:locale", content: "ko_KR" },
      { property: "og:site_name", content: "리 프레임(Re-Frame)" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image:alt", content: "Re-Frame 연애 캠프 - 내가 바뀌면 관계 전체가 달라진다" },
      { rel: "canonical", href: url },
    ];
  };

export default function LovePage() {
    const navigate = useNavigate();
    const url = "https://www.koicreativelab.com/programs/love";
    
    // HowTo Schema (AEO/GEO 최적화)
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "리 프레임 Re-Frame 연애 캠프 참여 방법",
        "description": "리 프레임 Re-Frame 연애 캠프에 참여하는 방법을 안내합니다.",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "프로그램 선택",
                "text": "리 프레임 웹사이트에서 Re-Frame 연애 캠프 프로그램을 선택합니다.",
                "url": `${url}`
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "예약 신청",
                "text": "예약 페이지에서 이름, 나이, 직업, 연락처, 가능한 시간을 입력하여 신청합니다.",
                "url": "https://www.koicreativelab.com/reservation"
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "매니저 연락 대기",
                "text": "신청 완료 후 리 프레임 매니저가 연락하여 상세 일정을 안내합니다."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "프로그램 참여",
                "text": "안내받은 일정에 맞춰 Re-Frame 연애 캠프에 참여합니다."
            }
        ],
        "totalTime": "PT1H",
        "tool": [
            {
                "@type": "HowToTool",
                "name": "인터넷 연결"
            }
        ]
    };
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            {/* 헤더 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(180deg, #FFF6F5, #FFF0F0)' }}>
                <div className="max-w-5xl mx-auto text-center">
                    <Badge className="mb-6 text-base px-4 py-2 font-semibold" style={{ backgroundColor: '#FFD1BA', color: '#C2410C' }}>
                        Re-Frame 연애 캠프
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 text-[#3B2F2F] leading-tight" style={{ lineHeight: '1.6' }}>
                        "내가 바뀌면<br />관계 전체가 달라진다"
                    </h1>
                    <div className="space-y-8 text-lg md:text-xl text-[#3B2F2F]/85 leading-relaxed max-w-3xl mx-auto mb-12" style={{ lineHeight: '1.6' }}>
                        <p className="text-xl md:text-2xl font-medium">
                            연애에서 가장 자주 벌어지는 갈등은<br />
                            <span className="text-2xl md:text-3xl font-bold text-[#3B2F2F]">'소통 문제'에서 비롯됩니다.</span>
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#FADADD]/40 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="mb-4">
                                많은 사람들이 이 문제를 상대방의 태도, 말투, 이해 부족으로만 바라보곤 합니다.<br />
                                그러나 관계의 변화는 한 사람의 변화에서 시작됩니다.
                            </p>
                            <p className="text-xl md:text-2xl font-bold" style={{ color: '#FB7185' }}>
                                이것이 Re-Frame의 기본 철학입니다.
                            </p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="text-white text-lg px-8 py-4 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300 rounded-xl"
                        style={{ background: 'linear-gradient(90deg, #F8B7A0, #FFD1BA)' }}
                        onClick={() => navigate("/reservation")}
                    >
                        프로그램 참여하기
                    </Button>
                </div>
            </section>

            {/* Re-Frame 연애 캠프는 '나의 변화'에서 출발합니다 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF6F5]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFE5E5' }}>
                            <span className="text-2xl font-bold" style={{ color: '#FB7185' }}>01</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            Re-Frame 연애 캠프는<br />'나의 변화'에서 출발합니다
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                상대에게서 문제의 원인을 찾는 대신,<br />
                                나의 감정 패턴, 말하기 습관, 상처의 근원, 표현 방식을<br />
                                객관적으로 이해할 수 있는 기회를 제공합니다.
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#FFE5E5', borderColor: '#F8B7A0' }}>
                            <p className="text-lg font-bold text-[#3B2F2F] mb-6">이 과정을 통해 이해하게 되는 것들</p>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">나의 감정 패턴</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">말하기 습관</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">상처의 근원</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center">표현 방식</p>
                                </div>
                            </div>
                            <p className="text-lg text-[#3B2F2F]/90 text-center font-medium">
                                이러한 자기 이해를 통해 관계의 변화가 시작됩니다.
                            </p>
                        </div>

                        <div className="text-center py-6">
                            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.8' }}>
                                "상대가 바뀌어야 나도 괜찮아지는 것"이 아니라<br />
                                <span style={{ color: '#FB7185' }}>"내가 바뀌면 관계 전체가 달라진다"</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 나를 이해하는 만큼 관계는 더 부드럽고 건강해집니다 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E8F4FB' }}>
                            <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>02</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            나를 이해하는 만큼<br />관계는 더 부드럽고 건강해집니다
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                이 과정은 에세이를 쓰기 위해 나를 알아가는 것처럼,<br />
                                연애에서도 나를 이해하는 만큼 관계는 더 부드럽고 건강해질 수 있다는<br />
                                관점에서 설계되었습니다.
                            </p>
                        </div>
                        
                        <div className="p-8 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#FFE5E5', borderColor: '#F8B7A0' }}>
                            <p className="text-lg font-bold text-[#3B2F2F] mb-6">이러한 자기 이해를 통해</p>
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center text-sm">내가 어떤 사람인지</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center text-sm">어떤 상황에서 왜 상처를 받는지</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50">
                                    <p className="font-semibold text-[#3B2F2F] text-center text-sm">어떤 방식의 소통을 선호하는지</p>
                                </div>
                            </div>
                            <p className="text-lg text-[#3B2F2F]/90 text-center font-medium">
                                를 알게 되면서 연애는 자연스럽게 바뀌기 시작합니다.
                            </p>
                        </div>

                        <div className="p-10 rounded-2xl border-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#E8F4FB', borderColor: '#3B82F6' }}>
                            <p className="text-2xl font-bold text-[#3B2F2F] mb-6 text-center">
                                관계의 변화는 한 사람의 변화에서 시작됩니다
                            </p>
                            <p className="text-xl md:text-2xl text-center leading-relaxed" style={{ lineHeight: '1.8' }}>
                                나를 이해하는 만큼<br />
                                <span className="font-extrabold" style={{ color: '#3B82F6' }}>관계는 더 부드럽고 건강해집니다.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 프로그램의 특징 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF6F5]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD1BA' }}>
                            <span className="text-2xl font-bold" style={{ color: '#C2410C' }}>03</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            프로그램의 특징
                        </h2>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                Re-Frame 연애 캠프는 단순한 연애 상담이 아닙니다.<br />
                                대화를 통해 자신의 감정 패턴과 소통 방식을 이해하고,<br />
                                그 이해를 바탕으로 관계의 변화를 만들어가는 과정을 제공합니다.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#E8F4FB' }}>
                            <p className="text-lg font-bold text-[#3B2F2F] mb-4 text-center">프로그램의 핵심</p>
                            <p className="text-lg text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                                형식적인 조언이나 해결책 제시가 아니라,<br />
                                자신의 감정 패턴, 말하기 습관, 상처의 근원, 표현 방식을<br />
                                <span className="font-bold" style={{ color: '#3B82F6' }}>객관적으로 이해하는 자기 탐색 중심의 접근 방식을 따릅니다.</span>
                            </p>
                        </div>

                        <div className="text-center py-6">
                            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3B2F2F] leading-relaxed" style={{ lineHeight: '1.8' }}>
                                나를 이해하는 만큼<br />
                                <span style={{ color: '#FB7185' }}>관계는 더 부드럽고 건강해집니다.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 참여 대상 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFE5E5' }}>
                            <span className="text-2xl font-bold" style={{ color: '#FB7185' }}>04</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            참여 대상
                        </h2>
                        <p className="mt-4 text-lg text-[#3B2F2F]/80">
                            다음 조건에 해당하는 분들에게 특히 적합합니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-l-4" style={{ borderColor: '#F8B7A0' }}>
                            <h3 className="text-xl font-bold mb-4 text-[#3B2F2F] text-center">관계를 잘하고 싶은 사람</h3>
                            <p className="text-[#3B2F2F]/90 text-center">
                                건강한 관계를 만들고 유지하고 싶은 분
                            </p>
                        </Card>
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-l-4" style={{ borderColor: '#FB7185' }}>
                            <h3 className="text-xl font-bold mb-4 text-[#3B2F2F] text-center">연애 패턴을 바꾸고 싶은 사람</h3>
                            <p className="text-[#3B2F2F]/90 text-center">
                                반복되는 연애 패턴을 변화시키고 싶은 분
                            </p>
                        </Card>
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-l-4" style={{ borderColor: '#EC4899' }}>
                            <h3 className="text-xl font-bold mb-4 text-[#3B2F2F] text-center">건강한 소통을 배우고 싶은 사람</h3>
                            <p className="text-[#3B2F2F]/90 text-center">
                                효과적인 소통 방법을 배우고 실천하고 싶은 분
                            </p>
                        </Card>
                    </div>

                    <div className="text-center p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ backgroundColor: '#FFE5E5' }}>
                        <p className="text-lg font-semibold text-[#3B2F2F] mb-2">
                            Re-Frame 연애 캠프는 자신을 이해하고 성장할 수 있는
                        </p>
                        <p className="text-xl md:text-2xl font-bold" style={{ color: '#FB7185' }}>
                            깊이 있는 과정을 제공합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 어떻게 진행돼요? */}
            <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #FFE5E5, #E8F4FB)' }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-white/80">
                            <span className="text-2xl font-bold" style={{ color: '#FB7185' }}>05</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                            어떻게 진행돼요?
                        </h2>
                    </div>
                    
                    <div className="space-y-6">
                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#F8B7A0' }}>
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
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">리 프레임 매니저 연락</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        접수가 완료되면 리 프레임 매니저가 직접 연락드립니다.<br />
                                        대화 가능한 시간대를 조율하고, 어떤 주제로 이야기할지 간단히 안내해드립니다.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-white to-[#FFF7F5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FB7185' }}>
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">대화 진행</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        정해진 시간에 편하게 연애 이야기를 나눕니다.<br />
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
                                    <h3 className="text-2xl font-bold mb-4 text-[#3B2F2F]">연애경향성 리포트</h3>
                                    <p className="text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.8' }}>
                                        당신이 했던 말, 그리고 사람들이 당신에게 건넨 말들.<br />
                                        그 순간들이 모여 당신만의 연애경향성 리포트가 완성됩니다.<br />
                                        (원한다면 완성본은 본인에게만 전달해드립니다.)
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 프로그램 참여 안내 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 text-white" style={{ background: 'linear-gradient(90deg, #F8B7A0, #FFD1BA)' }}>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>
                        내가 바뀌면 관계 전체가 달라집니다
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            Re-Frame 연애 캠프는 단순한 연애 상담이 아닙니다.<br />
                            <span className="font-bold">대화를 기반으로 한 자기 탐색과 이해를 통해</span><br />
                            나의 감정 패턴, 말하기 습관, 상처의 근원, 표현 방식을 객관적으로 이해하고,<br />
                            건강한 관계로 변화시킬 수 있는 경험을 제공합니다.
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <p className="text-2xl md:text-3xl font-semibold leading-relaxed" style={{ lineHeight: '1.6' }}>
                                관계를 잘하고 싶은 사람,<br />
                                연애 패턴을 바꾸고 싶은 사람,<br />
                                건강한 소통을 배우고 싶은 사람에게<br />
                                자신을 이해하고 성장할 수 있는 깊이 있는 과정을 제공합니다.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="bg-white hover:bg-gray-100 text-lg px-8 py-4 font-bold rounded-xl transition-all duration-300"
                            style={{ color: '#FB7185' }}
                            onClick={() => navigate("/reservation")}
                        >
                            프로그램 참여하기
                        </Button>
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}
