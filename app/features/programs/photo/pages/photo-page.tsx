import { useNavigate, type MetaFunction } from "react-router";
import { Card, CardContent } from "../../../../common/components/ui/card";
import { Badge } from "../../../../common/components/ui/badge";
import { Button } from "../../../../common/components/ui/button";
import { Camera, Sparkles } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "KOI 사진 프로젝트 - 외적·내적 균형을 갖춘 아름다움 | 코이창작소" },
    { name: "description", content: "외적으로 꾸민 나의 모습을 사진으로 담아내며, 동시에 내면의 나를 발견하고 표현하는 특별한 경험. KOI 사진 프로젝트는 외적 변화와 내적 성장을 함께 가져가는 진짜 아름다움을 만들어갑니다." },
    { name: "keywords", content: "사진촬영, 포트폴리오, 자기발견, 사진상담, 프로필사진, 코이창작소" },
    { property: "og:title", content: "KOI 사진 프로젝트 - 외적·내적 균형을 갖춘 아름다움" },
    { property: "og:description", content: "외적으로 꾸민 나의 모습을 사진으로 담아내며, 동시에 내면의 나를 발견하고 표현하는 특별한 경험" },
    { property: "og:image", content: "https://www.koicreativelab.com/og-photo.jpg" },
  ];
};

export default function PhotoPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
      {/* 헤더 섹션 */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(180deg, #F0F9FF, #E8F4FB)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 text-base px-4 py-2 font-semibold" style={{ backgroundColor: '#A8C5F8', color: '#1E3A8A' }}>
            KOI 사진 프로젝트 Photo Project
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 text-[#3B2F2F] leading-tight" style={{ lineHeight: '1.6' }}>
            외적으로 꾸며지면<br />확실히 더 예쁘고 멋있어 보일 수 있습니다
          </h1>
          <div className="space-y-8 text-lg md:text-xl text-[#3B2F2F]/85 leading-relaxed max-w-3xl mx-auto mb-12" style={{ lineHeight: '1.6' }}>
            <p className="text-xl md:text-2xl font-medium">
              그러나 외적인 변화만으로<br />
              <span className="text-2xl md:text-3xl font-bold text-[#3B2F2F]">내면까지 자연스럽게 아름다워지는 것은 아닙니다.</span>
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#FADADD]/40 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <p className="mb-4 text-lg">
                겉모습은 잠시 바꿀 수 있지만,<br />
                나의 생각과 감정, 삶의 방향은<br />
                <span className="text-xl md:text-2xl font-bold" style={{ color: '#2563EB' }}>내면을 들여다보는 시간이 있을 때 비로소 달라집니다.</span>
              </p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="text-white text-lg px-8 py-4 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300 rounded-xl"
            style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
            onClick={() => navigate("/reservation")}
          >
            프로그램 참여하기
          </Button>
        </div>
      </section>

      {/* KOI 사진 프로젝트는 외적과 내적을 함께 제공합니다 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#A8C5F8' }}>
              <span className="text-2xl font-bold text-white">01</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              KOI 사진 프로젝트는<br />외적과 내적을 함께 제공합니다
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#F0F9FF)] border border-[#E8F4FB]">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-8 h-8" style={{ color: '#A8C5F8' }} />
                  <h3 className="text-xl font-extrabold text-[#3B2F2F]">외적인 '이미지' 기록</h3>
                </div>
                <p className="text-lg text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  화장을 하고, 머리를 손질하고, 멋진 옷을 입어<br />
                  가장 예쁘고 멋진 모습을 사진으로 담습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF0F5)] border border-[#FADADD]">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8" style={{ color: '#F3C3E6' }} />
                  <h3 className="text-xl font-extrabold text-[#3B2F2F]">내적인 '나' 돌아보기</h3>
                </div>
                <p className="text-lg text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  그동안 놓치고 있던 나의 감정·욕구·강점·진짜 모습을<br />
                  살피는 시간을 갖게 됩니다.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] text-center">
            <p className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              두 가지를 <span style={{ color: '#2563EB' }}>동시에</span> 경험하는<br />
              특별한 프로젝트입니다
            </p>
          </div>
        </div>
      </section>

      {/* 프로젝트의 핵심 철학 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF5EC]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#F3C3E6' }}>
              <span className="text-2xl font-bold text-white">02</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              프로젝트의 핵심 철학
            </h2>
          </div>
          
          <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] border-2" style={{ borderColor: '#FADADD' }}>
            <CardContent className="p-0">
              <p className="text-xl md:text-2xl font-extrabold text-[#3B2F2F] mb-6 text-center" style={{ lineHeight: '1.6' }}>
                겉모습을 꾸미는 것이 나쁜 것이 아니라,
              </p>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl mb-6">
                <p className="text-lg md:text-xl text-[#3B2F2F]/90 leading-relaxed text-center" style={{ lineHeight: '1.8' }}>
                  외적 변화와 내적 성장을<br />
                  <span className="text-2xl md:text-3xl font-bold" style={{ color: '#2563EB' }}>'같이'</span> 가져가야<br />
                  진짜 아름다움이 만들어진다는 철학입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* KOI는 단순히 사진을 찍어주는 곳이 아닙니다 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#A8C5F8' }}>
              <span className="text-2xl font-bold text-white">03</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>
              KOI는 단순히 사진을 찍어주는 곳이 아닙니다
            </h2>
          </div>
          
          <div className="space-y-6">
            <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#E8F4FB,#FFFFFF)] border border-[#A8C5F8]/30">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A8C5F8' }}>
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#3B2F2F] mb-3">사진을 통해 나를 바라보고</h3>
                    <p className="text-lg text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                      외적으로 꾸민 나의 모습을 객관적으로 바라보며,<br />
                      내가 원하는 이미지와 실제 모습을 비교해봅니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFF0F5,#FFFFFF)] border border-[#F3C3E6]/30">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F3C3E6' }}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#3B2F2F] mb-3">대화를 통해 나를 이해하며</h3>
                    <p className="text-lg text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                      촬영 전후 대화를 통해 나의 감정, 욕구, 강점을 발견하고,<br />
                      내면의 나를 더 깊이 이해하게 됩니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,#FFE5E5,#FFFFFF)] border border-[#FFD1BA]/30">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFD1BA' }}>
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#3B2F2F] mb-3">외적·내적 균형을 갖춘 더 건강한 나를 만들어가는 여정</h3>
                    <p className="text-lg text-[#3B2F2F]/90 leading-relaxed" style={{ lineHeight: '1.8' }}>
                      단순한 사진 촬영이 아닌,<br />
                      외적 아름다움과 내적 성장을 함께 가져가는<br />
                      진정한 자기 발견의 여정을 제공합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(180deg, #F0F9FF, #E8F4FB)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-8" style={{ lineHeight: '1.6' }}>
            외적·내적 균형을 갖춘<br />
            진짜 아름다움을 만들어가세요
          </h2>
          <p className="text-xl text-[#3B2F2F]/85 mb-10 leading-relaxed" style={{ lineHeight: '1.6' }}>
            KOI 사진 프로젝트와 함께<br />
            더 건강하고 아름다운 나를 발견하는 여정을 시작하세요
          </p>
          <Button 
            size="lg" 
            className="text-white text-lg px-8 py-4 font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300 rounded-xl"
            style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
            onClick={() => navigate("/reservation")}
          >
            프로그램 참여하기
          </Button>
        </div>
      </section>
    </div>
  );
}
