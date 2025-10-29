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
    <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            무료 심리테스트
          </h1>
          <p className="text-lg text-gray-600">
            나를 더 깊이 알아보는 시간, 지금 시작해보세요
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {tests.map((test) => (
            <Card 
              key={test.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardHeader className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${test.color} flex items-center justify-center text-2xl`}>
                      {test.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900 mb-2">{test.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {test.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${test.badgeColor} text-white`}>
                      {test.badge}
                    </Badge>
                    {test.isFree && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        무료
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{test.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{test.questions}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    className={`bg-gradient-to-r ${test.color} hover:opacity-90 text-white`}
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
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              더 많은 프로그램이 궁금하신가요?
            </h3>
            <p className="text-gray-600 mb-4">
              코이창작소의 다양한 프로그램을 통해 나를 더 깊이 발견해보세요
            </p>
            <Button variant="outline" className="bg-white hover:bg-gray-50"
            onClick={() => navigate("/camps/essay")}>
              프로그램 보러가기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}