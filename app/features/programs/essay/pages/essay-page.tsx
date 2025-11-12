import { useNavigate, type MetaFunction } from "react-router"
import { Card } from "../../../../common/components/ui/card";
import { Badge } from "../../../../common/components/ui/badge";
import { Button } from "../../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
      { title: "에세이 캠프 - 나의 한해를 기록하기 | 코이창작소" },
      { name: "description", content: "지나간 한 해를 기록해보자. 에세이 캠프는 그냥 글 쓰는 프로그램이 아니에요. 대화로 나눈 한 해의 이야기가 한 편의 에세이가 됩니다." },
      { name: "keywords", content: "에세이쓰기, 글쓰기캠프, 한해기록, 에세이집제작, 글쓰기상담, 코이창작소" },
      { property: "og:title", content: "에세이 캠프 - 나의 한해를 기록하기" },
      { property: "og:description", content: "지나간 한 해를 기록해보자. 대화로 나눈 한 해의 이야기가 한 편의 에세이가 됩니다." },
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
                        에세이 캠프 Essay Camp
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 text-[#3B2F2F] leading-tight" style={{ lineHeight: '1.6' }}>
                        "지나간 한 해를 기록해보자"
                    </h1>
                    <div className="space-y-8 text-lg md:text-xl text-[#3B2F2F]/85 leading-relaxed max-w-3xl mx-auto mb-12" style={{ lineHeight: '1.6' }}>
                        <p className="text-xl md:text-2xl font-medium">
                            에세이 캠프는<br />
                            <span className="text-2xl md:text-3xl font-bold text-[#3B2F2F]">그냥 글 쓰는 프로그램이 아니에요.</span>
                        </p>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#FADADD]/40 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <p className="mb-4">
                                우리가 편하게 얘기 나누고, 웃고, 털어놓은 그 대화들로<br />
                                지나간 한 해의 이야기가 한 편의 에세이가 만들어집니다.
                            </p>
                            <p className="text-xl md:text-2xl font-bold" style={{ color: '#A855F7' }}>
                                그리고 그 에세이의 주인공은 '당신'이에요.
                            </p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="text-white text-lg px-8 py-4 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300 rounded-xl"
                        style={{ background: 'linear-gradient(90deg, #E8D5FF, #FFD1BA)' }}
                        onClick={() => navigate("/reservation")}
                    >
                        에세이 주인공으로 참여하기
                    </Button>
                </div>
            </section>

            {/* 이건 뭐 하는 건데? */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        이건 뭐 하는 건데?
                    </h2>
                    
                    <div className="space-y-6 text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            보통의 에세이는 한 사람이 혼자 쓰죠.<br />
                            근데 우리는 혼자 안 시켜요.
                        </p>
                        
                        <div className="p-6 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="font-semibold text-[#3B2F2F] mb-4">에세이 캠프에서는</p>
                            <ul className="space-y-3 list-none">
                                <li className="flex items-start">
                                    <span className="mr-2" style={{ color: '#A855F7' }}>•</span>
                                    <span>지나간 한 해에 뭐가 제일 기억에 남는지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2" style={{ color: '#A855F7' }}>•</span>
                                    <span>한 해 동안 자주 했던 말, 자주 떠올렸던 생각이 뭔지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2" style={{ color: '#A855F7' }}>•</span>
                                    <span>한 해 동안 어떤 순간들을 살아왔는지</span>
                                </li>
                            </ul>
                            <p className="mt-4">이런 걸 아주 편하게 얘기해요.</p>
                        </div>

                        <p>
                            그 대화에 함께 있는 사람들이<br />
                            "나도 그런 적 있어"<br />
                            "나라면 이렇게 생각할 것 같아"<br />
                            하고 자기 얘기를 붙여요.
                        </p>

                        <p>
                            그러면 그게 한 편의 이야기(에세이)가 돼요.<br />
                            결국 완성본은 <span className="font-semibold">'나만의 한 해 이야기 + 사람들이 나에게 건넨 시선'</span>이 같이 들어가요.
                        </p>

                        <p className="text-xl font-extrabold tracking-tight text-[#3B2F2F] text-center py-4" style={{ lineHeight: '1.6' }}>
                            이런 에세이는 진짜 흔하지 않아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 한 해를 돌아보는 시간 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        한 해를 돌아보는 시간
                    </h2>
                    
                    <div className="space-y-6 text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            이번 시즌의 에세이 캠프는<br />
                            <span className="font-bold">'나의 한 해를 기록하기'</span>라는 주제로 진행됩니다.
                        </p>

                        <p>
                            지나간 한 해를 돌아보고,<br />
                            그 한 해에 있었던 이야기를 글로 풀어내는 시간입니다.
                        </p>

                        <div className="p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#E8F4FB' }}>
                            <p className="font-semibold text-[#3B2F2F] mb-4">
                                한 해를 돌아보는 건 단순히 추억을 되새기는 게 아니에요.
                            </p>
                            <p>
                                그 한 해에 있었던 순간들을 다시 보면서<br />
                                '나를 이해하고, 나답게 말할 수 있는 사람'이 되어가는 시간을 만듭니다.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border-l-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="font-semibold text-[#3B2F2F]">
                                본 프로그램은 <span className="text-lg font-bold" style={{ color: '#A855F7' }}>주 3회, 약 7개월 동안 함께 진행되며</span>,
                            </p>
                            <p className="mt-2">
                                꾸준히 참여할 수 있는 분들을 중심으로 운영됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 분위기는 어때요? */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        분위기는 어때요?
                    </h2>
                    
                    <div className="space-y-6 text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            상담이라고 생각하면 뭔가 부담스럽잖아요.<br />
                            울고 털어놓고 이런 느낌 상상할 수도 있고.<br />
                            근데 아니에요.
                        </p>

                        <div className="p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#E8F4FB' }}>
                            <p className="font-semibold text-[#3B2F2F] mb-4">분위기는 훨씬 가볍고 자연스러워요.</p>
                            <p>
                                그냥 편하게 앉아서 한 해 얘기하다 보면<br />
                                "어? 이거 그냥 말한 건데 기록되면 좀 멋있는데?"<br />
                                싶은 순간이 나와요.
                            </p>
                        </div>

                        <p className="text-xl font-extrabold tracking-tight text-center py-4" style={{ lineHeight: '1.6' }}>
                            우리가 하는 건 <span style={{ color: '#A855F7' }}>'고민을 고쳐주는 것'</span>이 아니라<br />
                            <span style={{ color: '#A855F7' }}>'네가 살아온 한 해를 네 말로 남겨주는 것'</span>에 가까워요.<br />
                            그 느낌 그대로.
                        </p>
                    </div>
                </div>
            </section>

            {/* 이런 사람한테 특히 추천 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF6F0]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        이런 사람한테 특히 추천
                    </h2>
                    
                    <div className="space-y-6 text-lg text-[#3B2F2F]/85 leading-relaxed mb-8" style={{ lineHeight: '1.6' }}>
                        <p>
                            이런 생각 한 번이라도 해본 사람이라면 잘 맞아요:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <ul className="space-y-4 list-none">
                                <li className="flex items-start">
                                    <span className="mr-3 font-bold" style={{ color: '#A855F7' }}>•</span>
                                    <span>"나 요즘 나한테 무슨 일이 있는지 말로 정리가 안 돼"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 font-bold" style={{ color: '#A855F7' }}>•</span>
                                    <span>"지나간 한 해를 돌아보고 싶어"</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <ul className="space-y-4 list-none">
                                <li className="flex items-start">
                                    <span className="mr-3 font-bold" style={{ color: '#A8C5F8' }}>•</span>
                                    <span>"한 해 동안의 나를 기록하고 싶어"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 font-bold" style={{ color: '#A8C5F8' }}>•</span>
                                    <span>"이 한 해를 언젠가 기억하고 싶다"</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    <div className="mt-8 text-center p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#F5EDFF' }}>
                        <p className="text-lg font-semibold text-[#3B2F2F]">
                            글 잘 쓰는 사람? 필요 없어요.
                        </p>
                        <p className="text-lg font-semibold text-[#3B2F2F] mt-2">
                            예쁜 말 골라서 말할 필요도 없어요.
                        </p>
                        <p className="text-xl font-bold mt-4" style={{ color: '#A855F7' }}>
                            그냥 평소 말투 그대로 오는 게 제일 좋아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 어떻게 진행돼요? */}
            <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #F5EDFF, #E8F4FB)' }}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        어떻게 진행돼요?
                    </h2>
                    
                    <div className="space-y-8">
                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#E8D5FF', color: '#6B46C1' }}>
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-[#3B2F2F]">예약 접수</h3>
                                    <p className="text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        간단한 예약 신청서를 작성하면 돼요. (이름과 연락처만으로 충분해요.)
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#A8C5F8' }}>
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-[#3B2F2F]">코이매니저 연락</h3>
                                    <p className="text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        접수가 완료되면 코이매니저가 직접 연락드려요.<br />
                                        대화 가능한 시간대를 조율하고, 어떤 주제로 이야기할지 간단히 안내해드릴 거예요.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#E8D5FF', color: '#6B46C1' }}>
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-[#3B2F2F]">대화 진행</h3>
                                    <p className="text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        정해진 시간에 편하게 한 해 이야기를 나눠요.<br />
                                        1:1로 할 수도 있고, 작은 그룹으로 진행될 수도 있어요.<br />
                                        <span className="font-semibold">"면접" 아니고 "수다"에 더 가까워요.</span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ backgroundColor: '#FFD1BA' }}>
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-[#3B2F2F]">에세이로 남기기</h3>
                                    <p className="text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        당신이 했던 말, 그리고 사람들이 당신에게 건넨 말들.<br />
                                        그 순간들이 모여 한 편의 에세이가 완성돼요.<br />
                                        (원한다면 완성본은 본인에게만 전달해드려요.)
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 왜 이걸 하냐면 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
                        왜 이걸 하냐면
                    </h2>
                    
                    <div className="space-y-6 text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            요즘 위로 말 진짜 많잖아요.<br />
                            "괜찮아질 거야" "너는 소중해" 이런 말들.
                        </p>
                        
                        <p className="text-xl font-extrabold tracking-tight text-[#3B2F2F] text-center py-4" style={{ lineHeight: '1.6' }}>
                            근데 솔직히 그런 문장, 나한테 한 말 같지 않을 때 많지 않아요?
                        </p>

                        <div className="p-8 rounded-2xl border-2 shadow-[0_4px_24px_rgba(0,0,0,0.05)]" style={{ backgroundColor: '#F5EDFF', borderColor: '#E8D5FF' }}>
                            <p className="text-xl font-bold text-[#3B2F2F] mb-4 text-center">
                                우리는 똑같은 위로 문장 찍어내는 프로젝트가 아니에요.
                            </p>
                            <p className="text-lg text-center">
                                우리가 하고 싶은 건<br />
                                <span className="text-xl font-bold" style={{ color: '#A855F7' }}>"지나간 한 해의 너를 그대로 기록해 놓는 것."</span>
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
                            나중에 돌아봤을 때<br />
                            "아 그 한 해에 내가 이런 생각 했었구나. 그 한 해에 내 옆에 이런 말을 해준 사람이 있었구나."<br />
                            그걸 그대로 볼 수 있게.
                        </p>
                    </div>
                </div>
            </section>

            {/* 마지막 한 줄 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 text-white" style={{ background: 'linear-gradient(90deg, #E8D5FF, #FFD1BA)' }}>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>
                        마지막 한 줄
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ lineHeight: '1.6' }}>
                        <p>
                            어쩌면 누군가에게는 이게 그냥 또 하나의 프로젝트일 수도 있어요.<br />
                            근데… <span className="font-bold">너한테는 조금 다를 수도 있어.</span>
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <p className="text-2xl md:text-3xl font-semibold leading-relaxed" style={{ lineHeight: '1.6' }}>
                                네 한 해 이야기를 제대로 들어주는 자리가<br />
                                마지막으로 언제였는지, 생각나?
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
                            에세이 주인공으로 참여하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
