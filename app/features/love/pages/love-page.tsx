import { useNavigate, type MetaFunction } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
      { title: "연애경향성 테스트 - 나의 연애를 알아보는 시간 | 코이창작소" },
      { name: "description", content: "나의 연애를 알아보자. 연애경향성 테스트는 그냥 질문지가 아니에요. 당신이 어떤 사람을 좋아하는지, 어떻게 사랑하는지, 그리고 왜 그렇게 사랑하는지 알아보는 시간입니다." },
      { name: "keywords", content: "연애경향성테스트, 연애상담, 관계상담, 코이창작소" },
      { property: "og:title", content: "연애경향성 테스트 - 나의 연애를 알아보는 시간" },
      { property: "og:description", content: "나의 연애를 알아보자. 연애경향성 테스트는 그냥 질문지가 아니에요." },
      { property: "og:image", content: "https://www.koicreativelab.com/og-love.jpg" },
    ];
  };

export default function LovePage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full">
            {/* 헤더 섹션 */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 min-h-[70vh] flex items-center">
                <div className="max-w-5xl mx-auto text-center">
                    <Badge className="mb-6 bg-pink-500 text-white text-base px-4 py-2 font-semibold">
                        연애경향성 테스트
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-gray-900 leading-tight">
                        "나의 연애를 알아보자"
                    </h1>
                    <div className="space-y-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
                        <p className="text-xl md:text-2xl font-medium">
                            연애경향성 테스트는<br />
                            <span className="text-2xl md:text-3xl font-bold text-gray-900">그냥 질문지가 아니에요.</span>
                        </p>
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/80 shadow-lg">
                            <p className="mb-4">
                                당신이 어떤 사람을 좋아하는지, 어떻게 사랑하는지,<br />
                                그리고 왜 그렇게 사랑하는지 알아보는 시간입니다.
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-pink-700">
                                그리고 그건 결국 '나'에 대해 알아가는 거예요.
                            </p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => navigate("/reservation")}
                    >
                        연애경향성 테스트 예약하기
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
                            보통의 테스트는 질문지에 체크만 하면 끝나죠.<br />
                            근데 우리는 질문지가 아니라 <span className="font-semibold">이야기</span>로 진행해요.
                        </p>
                        
                        <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
                            <p className="font-semibold text-gray-900 mb-4">연애경향성 테스트에서는</p>
                            <ul className="space-y-3 list-none">
                                <li className="flex items-start">
                                    <span className="text-pink-600 mr-2">•</span>
                                    <span>어떤 사람을 좋아하는지, 왜 그런 사람을 좋아하는지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-pink-600 mr-2">•</span>
                                    <span>연애에서 자주 반복되는 패턴이 뭔지</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-pink-600 mr-2">•</span>
                                    <span>사랑을 표현하고 받는 방식이 어떤지</span>
                                </li>
                            </ul>
                            <p className="mt-4">이런 걸 아주 편하게 얘기해요.</p>
                        </div>

                        <p>
                            그 대화를 통해<br />
                            "아, 내가 이렇게 사랑하는구나"<br />
                            "내가 왜 이 사람을 선택했는지 이제 알겠어"<br />
                            하는 깨달음이 생겨요.
                        </p>

                        <p>
                            그리고 그 패턴을 알아가는 건<br />
                            결국 <span className="font-semibold">'나 자신'을 알아가는 거예요.</span>
                        </p>

                        <p className="text-xl font-semibold text-gray-900 text-center py-4">
                            연애에서 드러나는 나의 모습은<br />
                            일상에서의 나와 다르지 않아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 왜 이걸 해야 하냐면 */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        왜 이걸 해야 하냐면
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            요즘 연애 조언 진짜 많잖아요.<br />
                            "괜찮은 사람 만나면 돼" "너만의 매력이 있어" 이런 말들.
                        </p>
                        
                        <p className="text-xl font-semibold text-gray-900 text-center py-4">
                            근데 솔직히 그런 조언, 나한테 맞는 말 같지 않을 때 많지 않아요?
                        </p>

                        <div className="bg-pink-50 p-8 rounded-lg border-2 border-pink-200">
                            <p className="text-xl font-bold text-gray-900 mb-4 text-center">
                                우리는 똑같은 연애 조언 찍어내는 프로젝트가 아니에요.
                            </p>
                            <p className="text-lg text-center">
                                우리가 하고 싶은 건<br />
                                <span className="text-xl font-bold text-pink-700">"당신만의 연애 패턴을 발견하는 것."</span>
                            </p>
                        </div>

                        <p className="text-lg leading-relaxed">
                            과거 관계에서 반복되는 패턴을 발견하는 시간.<br />
                            그 패턴이 어디서 왔는지,<br />
                            그 패턴이 나의 다른 삶에도 영향을 미치는지.<br />
                            <span className="font-semibold">연애를 알아가는 건 나를 알아가는 거예요.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* 분위기는 어때요? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
                        분위기는 어때요?
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>
                            상담이라고 생각하면 뭔가 부담스럽잖아요.<br />
                            연애 고민 털어놓고 조언 받는 느낌 상상할 수도 있고.<br />
                            근데 아니에요.
                        </p>

                        <div className="bg-purple-50 p-6 rounded-lg">
                            <p className="font-semibold text-gray-900 mb-4">분위기는 훨씬 가볍고 자연스러워요.</p>
                            <p>
                                그냥 편하게 앉아서 연애 얘기하다 보면<br />
                                "어? 내가 이렇게 생각했구나"<br />
                                "이게 내 연애 패턴이구나"<br />
                                싶은 순간이 나와요.
                            </p>
                        </div>

                        <p className="text-xl font-semibold text-center py-4">
                            우리가 하는 건 <span className="text-pink-600">'연애를 고쳐주는 것'</span>이 아니라<br />
                            <span className="text-pink-600">'네가 어떻게 사랑하는지 네 말로 남겨주는 것'</span>에 가까워요.<br />
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
                                    <span className="text-pink-600 mr-3 font-bold">•</span>
                                    <span>"왜 자꾸 비슷한 사람을 만나는지 모르겠어"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-pink-600 mr-3 font-bold">•</span>
                                    <span>"내가 연애를 제대로 하고 있는 건지 궁금해"</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6">
                            <ul className="space-y-4 list-none">
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3 font-bold">•</span>
                                    <span>"나 자신을 더 잘 알고 싶어"</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3 font-bold">•</span>
                                    <span>"연애를 통해 나를 발견하고 싶어"</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    <div className="mt-8 text-center p-6 bg-pink-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">
                            연애 고수? 필요 없어요.
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                            완벽한 연애 스토리? 필요 없어요.
                        </p>
                        <p className="text-xl font-bold text-pink-700 mt-4">
                            그냥 평소 연애 얘기 그대로 오는 게 제일 좋아요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 어떻게 진행돼요? */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
                        어떻게 진행돼요?
                    </h2>
                    
                    <div className="space-y-8">
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
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
                                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
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
                                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">대화 진행</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        정해진 시간에 편하게 연애 이야기를 나눠요.<br />
                                        1:1로 할 수도 있고, 작은 그룹으로 진행될 수도 있어요.<br />
                                        <span className="font-semibold">"면접" 아니고 "수다"에 더 가까워요.</span>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                    4
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">연애경향성 리포트</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        당신이 했던 말, 그리고 사람들이 당신에게 건넨 말들.<br />
                                        그 순간들이 모여 당신만의 연애경향성 리포트가 완성돼요.<br />
                                        (원한다면 완성본은 본인에게만 전달해드려요.)
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 마지막 한 줄 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        마지막 한 줄
                    </h2>
                    
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                        <p>
                            어쩌면 누군가에게는 이게 그냥 또 하나의 테스트일 수도 있어요.<br />
                            근데… <span className="font-bold">너한테는 조금 다를 수도 있어.</span>
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                            <p className="text-2xl md:text-3xl font-semibold leading-relaxed">
                                네 연애를 제대로 들어본 사람이<br />
                                마지막으로 언제였는지, 생각나?
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button 
                            size="lg" 
                            variant="secondary" 
                            className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold"
                            onClick={() => navigate("/reservation")}
                        >
                            연애경향성 테스트 예약하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}