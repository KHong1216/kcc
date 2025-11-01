import { useNavigate, type MetaFunction } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
      { title: "에세이 캠프 - 대화로 쓰는 에세이 | 코이창작소" },
      { name: "description", content: "너 얘기, 한 번 제대로 들어볼 사람 여기 있어. 에세이 캠프는 그냥 글 쓰는 프로그램이 아니에요. 대화로 나눈 이야기가 한 편의 에세이가 됩니다." },
      { name: "keywords", content: "에세이쓰기, 글쓰기캠프, 에세이집제작, 글쓰기상담, 코이창작소" },
      { property: "og:title", content: "에세이 캠프 - 대화로 쓰는 에세이" },
      { property: "og:description", content: "너 얘기, 한 번 제대로 들어볼 사람 여기 있어. 대화로 나눈 이야기가 한 편의 에세이가 됩니다." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-essay.jpg" },
    ];
  };

export default function EssayPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full">
            {/* 헤더 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 min-h-[70vh] flex items-center">
                <div className="max-w-5xl mx-auto text-center">
                    <Badge className="mb-6 bg-green-500 text-white text-base px-4 py-2 font-semibold">
                        에세이 캠프 Essay Camp
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-gray-900 leading-tight">
                        "너 얘기, 한 번 제대로<br className="hidden md:block" /> 들어볼 사람 여기 있어."
                    </h1>
                    <div className="space-y-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
                        <p className="text-xl md:text-2xl font-medium">
                            에세이 캠프는<br />
                            <span className="text-2xl md:text-3xl font-bold text-gray-900">그냥 글 쓰는 프로그램이 아니에요.</span>
                        </p>
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/80 shadow-lg">
                            <p className="mb-4">
                                우리가 편하게 얘기 나누고, 웃고, 털어놓은 그 대화들로<br />
                                한 편의 에세이가 만들어집니다.
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-green-700">
                                그리고 그 에세이의 주인공은 '당신'이에요.
                            </p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => navigate("/reservation")}
                    >
                        에세이 주인공으로 참여하기
                    </Button>
                </div>
            </section>

            {/* 이건 뭐 하는 건데? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        이건 뭐 하는 건데?
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            보통의 에세이는 한 사람이 혼자 쓰죠.<br />
                            근데 우리는 혼자 안 시켜요.
                        </p>
                        
                        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                            <p className="font-semibold text-gray-900 mb-4">에세이 캠프에서는</p>
                            <ul className="space-y-3 list-none">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    <span>요즘 뭐가 제일 답답한지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    <span>자주 하는 말, 자주 떠올리는 생각이 뭔지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    <span>지금 어떤 순간을 살고 있는지</span>
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
                            결국 완성본은 <span className="font-semibold">'나만의 얘기 + 사람들이 나에게 건넨 시선'</span>이 같이 들어가요.
                        </p>

                        <p className="text-xl font-semibold text-gray-900 text-center py-4">
                            이런 에세이는 진짜 흔하지 않아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 분위기는 어때요? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        분위기는 어때요?
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            상담이라고 생각하면 뭔가 부담스럽잖아요.<br />
                            울고 털어놓고 이런 느낌 상상할 수도 있고.<br />
                            근데 아니에요.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-4">분위기는 훨씬 가볍고 자연스러워요.</p>
                            <p>
                                그냥 편하게 앉아서 얘기하다 보면<br />
                                "어? 이거 그냥 말한 건데 기록되면 좀 멋있는데?"<br />
                                싶은 순간이 나와요.
                            </p>
                        </div>

                        <p className="text-xl font-semibold text-center py-4">
                            우리가 하는 건 <span className="text-blue-600">'고민을 고쳐주는 것'</span>이 아니라<br />
                            <span className="text-blue-600">'네가 어떤 사람인지 네 말로 남겨주는 것'</span>에 가까워요.<br />
                            그 느낌 그대로.
                        </p>
                    </div>
                </div>
            </section>

            {/* 이런 사람한테 특히 추천 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        이런 사람한테 특히 추천
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-8">
                        <p>
                            이런 생각 한 번이라도 해본 사람이라면 잘 맞아요:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <ul className="space-y-4 list-none">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-3 font-bold">•</span>
                                    <span>"나 요즘 나한테 무슨 일이 있는지 말로 정리가 안 돼"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-3 font-bold">•</span>
                                    <span>"누가 내 말 좀 제대로 들어줬으면"</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6">
                            <ul className="space-y-4 list-none">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 font-bold">•</span>
                                    <span>"나는 그냥 내가 어떤 사람인지 궁금하긴 해"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-3 font-bold">•</span>
                                    <span>"지금 이 시기를 언젠가 기억하고 싶다"</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    <div className="mt-8 text-center p-6 bg-purple-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">
                            글 잘 쓰는 사람? 필요 없어요.
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                            예쁜 말 골라서 말할 필요도 없어요.
                        </p>
                        <p className="text-xl font-bold text-purple-700 mt-4">
                            그냥 평소 말투 그대로 오는 게 제일 좋아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 어떻게 진행돼요? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-blue-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
                        어떻게 진행돼요?
                    </h2>
                    
                    <div className="space-y-8">
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">예약 접수</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        간단한 예약 신청서를 작성하면 돼요. (이름과 연락처만으로 충분해요.)
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">코이매니저 연락</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        접수가 완료되면 코이매니저가 직접 연락드려요.<br />
                                        대화 가능한 시간대를 조율하고, 어떤 주제로 이야기할지 간단히 안내해드릴 거예요.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">대화 진행</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        정해진 시간에 편하게 이야기를 나눠요.<br />
                                        1:1로 할 수도 있고, 작은 그룹으로 진행될 수도 있어요.<br />
                                        <span className="font-semibold">"면접" 아니고 "수다"에 더 가까워요.</span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">에세이로 남기기</h3>
                                    <p className="text-gray-700 leading-relaxed">
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
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        왜 이걸 하냐면
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            요즘 위로 말 진짜 많잖아요.<br />
                            "괜찮아질 거야" "너는 소중해" 이런 말들.
                        </p>
                        
                        <p className="text-xl font-semibold text-gray-900 text-center py-4">
                            근데 솔직히 그런 문장, 나한테 한 말 같지 않을 때 많지 않아요?
                        </p>

                        <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                            <p className="text-xl font-bold text-gray-900 mb-4 text-center">
                                우리는 똑같은 위로 문장 찍어내는 프로젝트가 아니에요.
                            </p>
                            <p className="text-lg text-center">
                                우리가 하고 싶은 건<br />
                                <span className="text-xl font-bold text-green-700">"지금의 너를 지금 그대로 기록해 놓는 것."</span>
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed">
                            나중에 돌아봤을 때<br />
                            "아 그때 내가 이런 생각 했었구나. 그때 내 옆에 이런 말을 해준 사람이 있었구나."<br />
                            그걸 그대로 볼 수 있게.
                        </p>
                    </div>
                </div>
            </section>

            {/* 마지막 한 줄 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        마지막 한 줄
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                        <p>
                            어쩌면 누군가에게는 이게 그냥 또 하나의 프로젝트일 수도 있어요.<br />
                            근데… <span className="font-bold">너한테는 조금 다를 수도 있어.</span>
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                            <p className="text-2xl md:text-3xl font-semibold leading-relaxed">
                                네 이야기를 제대로 들어주는 자리가<br />
                                마지막으로 언제였는지, 생각나?
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold"
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
