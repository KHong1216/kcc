import { Button } from "./ui/button";
import { useNavigate } from "react-router";

/**
 * Re-Frame 메인페이지 Hero 섹션
 * 감성적이고 따뜻한 톤앤매너로 브랜드 소개
 */
export function HomeHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#FDF6F0]">
      {/* 배경 이미지 (선택사항 - 이미지가 있으면 사용) */}
      <div className="absolute inset-0 w-full h-full">
        {/* 이미지가 있으면 사용, 없으면 그라데이션만 */}
        <img 
          src="/hero-koi.webp" 
          alt="Re-Frame Illustration" 
          className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-multiply"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            // 이미지가 없으면 숨김
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(253,246,240,0.6),rgba(255,240,245,0.8))]" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#3B2F2F] mb-6" style={{ lineHeight: '1.6' }}>
          작은 물결이 큰 도약이 되는 창작소
        </h1>
        <p className="mt-4 text-lg text-[#3B2F2F]/85 leading-relaxed" style={{ lineHeight: '1.6' }}>
          따뜻한 이야기가 모여, 함께 성장하는 공간이에요.
        </p>
        <Button 
          className="mt-8 bg-[linear-gradient(90deg,#A8C5F8,#F3C3E6,#FFE6C5)] text-[#3B2F2F] font-semibold px-8 py-3 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300"
          size="lg"
          onClick={() => navigate("/about/representative")}
          aria-label="대표 소개 페이지로 이동"
        >
          함께 이야기해요
        </Button>
      </div>
    </section>
  );
}

