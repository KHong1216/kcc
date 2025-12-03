import { Heart, BookOpen, Sparkles } from "lucide-react";

/**
 * Re-Frame 메인페이지 Value 섹션
 * Re-Frame이 지향하는 세 가지 핵심 가치를 카드로 표현
 */
export function HomeValueSection() {
  return (
    <section className="py-24 bg-[#FDF6F0]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#3B2F2F] mb-3" style={{ lineHeight: '1.6' }}>
          Re-Frame의 핵심 가치
        </h2>
        <p className="text-lg text-[#3B2F2F]/80" style={{ lineHeight: '1.6' }}>
          따뜻함 속에서 피어나는 세 가지 결
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {/* 마음 나누기 */}
        <div className="p-8 rounded-3xl bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
          <Heart className="w-10 h-10 text-[#F3C3E6] mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>마음 나누기</h3>
          <p className="text-[#3B2F2F]/80 leading-relaxed" style={{ lineHeight: '1.6' }}>
            고민을 함께 나누고, 진심이 오가는 대화를 통해 따뜻한 관계를 만듭니다.
          </p>
        </div>

        {/* 함께 배우기 */}
        <div className="p-8 rounded-3xl bg-[linear-gradient(180deg,#FFFFFF,#FDF6F0)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
          <BookOpen className="w-10 h-10 text-[#A8C5F8] mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>함께 배우기</h3>
          <p className="text-[#3B2F2F]/80 leading-relaxed" style={{ lineHeight: '1.6' }}>
            서로의 경험을 공유하며, 배우고 성장하는 과정을 만들어갑니다.
          </p>
        </div>

        {/* 꿈 찾기 */}
        <div className="p-8 rounded-3xl bg-[linear-gradient(180deg,#FFFFFF,#FFF0F5)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
          <Sparkles className="w-10 h-10 text-[#FFE6C5] mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-[#3B2F2F] mb-2" style={{ lineHeight: '1.6' }}>꿈 찾기</h3>
          <p className="text-[#3B2F2F]/80 leading-relaxed" style={{ lineHeight: '1.6' }}>
            자신의 내면을 이해하고, 미래의 방향을 함께 찾아갑니다.
          </p>
        </div>
      </div>
    </section>
  );
}

