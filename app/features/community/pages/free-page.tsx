import { useNavigate, type MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Button } from "../../../common/components/ui/button";
import { Brain, Clock, ArrowRight } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "무료 심리테스트 - 코이창작소" },
    { name: "description", content: "MBTI 무료 심리테스트로 나를 더 깊이 알아보세요" }
  ];
};

const tests = [
  {
    id: "mbti",
    title: "MBTI 성격 유형 검사",
    description: "16가지 성격 유형을 통해 나의 성격을 파악하고, 나와 잘 맞는 사람과 환경을 알아보세요.",
    duration: "약 10-15분",
    questions: "93문항",
    icon: "🧠",
    color: "from-blue-400 to-purple-400",
    badge: "인기",
    badgeColor: "bg-blue-500",
    isFree: true
  }
];

export default function FreePage() {
  const navigate = useNavigate();

  const handleStartTest = (testId: string) => {
    if (testId === "mbti") {
      // MBTI 검사 페이지로 이동
      window.open("https://www.16personalities.com/ko", "_blank");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
      {/* 헤더 섹션 */}
      <section className="pt-14 sm:pt-16 lg:pt-[4.5rem] pb-24 px-4 sm:px-6 lg:px-8 min-h-[300px] flex items-center" style={{ background: 'linear-gradient(180deg, #F5F0ED 0%, #FFF5F0 50%, #FDF9F7 70%, #FDF6F0 100%)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
            무료 심리테스트
          </h1>
          <p className="text-lg text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>
            나를 더 깊이 알아보는 시간, 지금 시작해보세요
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-8">
        <div className="space-y-6">
          {tests.map((test) => (
            <Card 
              key={test.id}
              className="hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30"
            >
              <CardHeader className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                      {test.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-[#3B2F2F] mb-2 font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>{test.title}</CardTitle>
                      <CardDescription className="text-[#7A6666] opacity-80" style={{ lineHeight: '1.6' }}>
                        {test.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-[#A8C5F8] text-white">
                      {test.badge}
                    </Badge>
                    {test.isFree && (
                      <Badge className="bg-[#E8F4FB] text-[#2D6A9F]">
                        무료
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                    <span className="text-[#7A6666] opacity-80">{test.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" style={{ color: '#A8C5F8' }} />
                    <span className="text-[#7A6666] opacity-80">{test.questions}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="text-white hover:opacity-90 shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                    onClick={() => handleStartTest(test.id)}
                  >
                    테스트 시작하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 추가 안내 */}
        <Card className="mt-8 p-6 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#FADADD]/30">
          <div className="text-center">
            <h3 className="text-lg font-extrabold tracking-tight text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>
              더 많은 프로그램이 궁금하신가요?
            </h3>
            <p className="text-[#7A6666] opacity-80 mb-4" style={{ lineHeight: '1.6' }}>
              코이창작소의 다양한 프로그램을 통해 나를 더 깊이 발견해보세요
            </p>
            <Button variant="outline" className="border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] bg-white"
            onClick={() => navigate("/camps/essay")}>
              프로그램 보러가기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}