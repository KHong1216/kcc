import type { MetaFunction } from "react-router";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/photo-page";
import { Input } from "../../../../common/components/ui/input";
import { Label } from "../../../../common/components/ui/label";
import { Button } from "../../../../common/components/ui/button";
import { createClickMoodReservation } from "../../../event/quries";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/programs/photo";
  return [
    { title: "클릭무드 - 오늘, 당신의 무드를 기록해보세요 | 리 프레임(Re-Frame)" },
    {
      name: "description",
      content: "클릭무드로 오늘의 감정과 무드를 기록하고, 사진으로 마음을 표현해보세요.",
    },
    { name: "keywords", content: "클릭무드, 무드 기록, 감정 일기, 사진 일기, 리 프레임, Re-Frame, 광주 포토캠프, 광주 청년, 광주 상담" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "클릭무드 - 오늘, 당신의 무드를 기록해보세요" },
    {
      property: "og:description",
      content: "클릭무드로 오늘의 감정과 무드를 기록하고, 사진으로 마음을 표현해보세요.",
    },
    { property: "og:image", content: "https://www.koicreativelab.com/og-click-mood.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: url },
  ];
};

function ClickMoodHeader() {
  return (
    <header
      className="relative w-full overflow-hidden pt-14 sm:pt-16 lg:pt-[72px]"
      style={{
        minHeight: "calc(15vh - 56px)", // 네비게이션 높이 제외
        background: "#2C2C2C",
      }}
    >
      {/* Subtle paper grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      
      {/* Utility icon - Top Right (Vintage Camera Shutter) */}
      <div className="absolute top-4 right-4 z-10">
        <button
          className="p-2 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#C9A961]/50 rounded"
          aria-label="설정"
        >
          <Camera className="w-5 h-5 text-[#C9A961]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Center-aligned branding - 네비게이션과 separator 사이 정중앙 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4" style={{ minHeight: "calc(15vh - 56px)" }}>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1E8] tracking-[0.15em] mb-3"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          CLICK MOOD
        </h1>
        <p
          className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/90 font-light tracking-wide"
          style={{
            fontFamily: "Pretendard, 'Helvetica Neue', sans-serif",
            fontWeight: 300,
          }}
        >
          오늘, 당신의 무드를 기록해보세요.
        </p>
      </div>

      {/* Optional separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F5F1E8]/10" />
    </header>
  );
}

interface MoodImage {
  id: string;
  src: string;
  alt: string;
  emotion: string; // 한글 감정명 (CTA 버튼 텍스트용)
}

const moodImages: MoodImage[] = [
  { id: "joy", src: "/mood/joy.jpg", alt: "기쁨", emotion: "기쁨" },
  { id: "trust", src: "/mood/trust.jpg", alt: "신뢰", emotion: "신뢰" },
  { id: "surprise", src: "/mood/surprise.jpg", alt: "놀람", emotion: "놀람" },
  { id: "fear", src: "/mood/fear.jpg", alt: "두려움", emotion: "두려움" },
  { id: "anger", src: "/mood/anger.jpg", alt: "분노", emotion: "분노" },
  { id: "sadness", src: "/mood/sadness.jpg", alt: "슬픔", emotion: "슬픔" },
  { id: "confusion", src: "/mood/confusion.jpg", alt: "혼란", emotion: "혼란" },
  { id: "expectation", src: "/mood/expectation.jpg", alt: "기대", emotion: "기대" },
];

interface ClickMoodCollageProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function ClickMoodCollage({ selectedId, onSelect }: ClickMoodCollageProps) {
  // selectedId가 null이거나 찾을 수 없을 때를 대비한 안전한 처리
  const currentIndex = selectedId 
    ? moodImages.findIndex((img) => img.id === selectedId)
    : 0;
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  
  // 이전/다음 이미지 인덱스 계산
  const prevIndex = safeIndex > 0 ? safeIndex - 1 : moodImages.length - 1;
  const nextIndex = safeIndex < moodImages.length - 1 ? safeIndex + 1 : 0;

  const handlePrevious = () => {
    onSelect(moodImages[prevIndex].id);
  };

  const handleNext = () => {
    onSelect(moodImages[nextIndex].id);
  };

  // 원형 배치를 위한 각도 계산 (360도 / 총 이미지 수)
  const angleStep = 360 / moodImages.length;

  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden py-2 sm:py-4" style={{ backgroundColor: "#2C2C2C" }}>
      {/* Paper grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      
      <div className="relative w-full h-full mx-auto flex items-center justify-center" style={{ minHeight: "70vh", maxWidth: "100%" }}>
        {/* 원형 배치 컨테이너 - 회전 효과, 정중앙 배치 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "clamp(600px, 95vw, 800px)",
            height: "clamp(600px, 95vw, 800px)",
            transform: `translate(-50%, -50%) rotate(${-safeIndex * angleStep}deg)`,
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            "--radius": "clamp(180px, 35vw, 250px)",
          } as React.CSSProperties}
        >
          {/* 렌즈를 제외한 7개 이미지 - 원형 균일 배치 */}
          {moodImages.map((image, index) => {
            // 중앙 렌즈는 별도로 렌더링하므로 제외
            if (index === safeIndex) return null;
            
            // 각도 계산 (현재 인덱스 기준)
            const angle = (index - safeIndex) * angleStep;
            const radian = (angle * Math.PI) / 180;
            
            // 원형 위치 계산 (단위 벡터)
            const x = Math.sin(radian);
            const y = -Math.cos(radian);
            
            return (
              <div
                key={image.id}
                className="absolute transition-all duration-300 ease-in-out"
                style={{
                  width: "clamp(110px, 22vw, 150px)",
                  height: "clamp(110px, 22vw, 150px)",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(calc(${x} * var(--radius)), calc(${y} * var(--radius))) rotate(${safeIndex * angleStep}deg)`,
                  opacity: 0.5,
                  filter: "blur(2px)",
                  zIndex: 10,
                }}
              >
                {/* 작은 원형 링 (Dusty Gold, 얇고 약한) */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: "1px solid rgba(184, 134, 11, 0.4)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  }}
                />
                
                {/* 이미지 */}
                <div className="relative rounded-full overflow-hidden w-full h-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}

          {/* 중앙 메인 이미지 (렌즈) - 큰 원 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
            style={{
              width: "clamp(280px, 70vw, 420px)",
              height: "clamp(280px, 70vw, 420px)",
              transform: `translate(-50%, -50%) rotate(${safeIndex * angleStep}deg)`,
              zIndex: 20,
            }}
          >
            {/* 거대한 원형 렌즈 링 (Dusty Gold, 얇고 완벽한 원) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
              style={{
                border: "2px solid #B8860B",
                boxShadow: `
                  0 0 40px rgba(184, 134, 11, 0.8),
                  0 0 80px rgba(184, 134, 11, 0.6),
                  inset 0 0 60px rgba(184, 134, 11, 0.4),
                  inset 0 0 120px rgba(184, 134, 11, 0.3)
                `,
              }}
            />

            {/* 렌즈 내부 이미지 - 선명하게 */}
            <div
              key={moodImages[safeIndex].id}
              className="relative rounded-full overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                width: "calc(100% - 8px)",
                height: "calc(100% - 8px)",
                margin: "4px",
                boxShadow: "inset 0 0 60px rgba(184, 134, 11, 0.5)",
              }}
            >
              <img
                src={moodImages[safeIndex].src}
                alt={moodImages[safeIndex].alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  filter: "none", // 선명하게
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  if (target.parentElement) {
                    target.parentElement.style.backgroundColor = "#3C3C3C";
                  }
                }}
              />
              
              {/* 렌즈 내부 빛 효과 (집중된 Dusty Gold 글로우) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(184, 134, 11, 0.2) 50%, rgba(184, 134, 11, 0.35) 80%, rgba(184, 134, 11, 0.4) 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 좌측 네비게이션 화살표 - Y축 중앙 정렬 */}
        <button
          onClick={handlePrevious}
          className="absolute z-30 p-3 transition-all duration-200 hover:opacity-80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 rounded-full touch-manipulation"
          aria-label="이전 이미지"
          style={{
            left: "clamp(16px, 4vw, 32px)",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(44, 44, 44, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" strokeWidth={2} />
        </button>

        {/* 우측 네비게이션 화살표 - Y축 중앙 정렬 */}
        <button
          onClick={handleNext}
          className="absolute z-30 p-3 transition-all duration-200 hover:opacity-80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 rounded-full touch-manipulation"
          aria-label="다음 이미지"
          style={{
            right: "clamp(16px, 4vw, 32px)",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(44, 44, 44, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#B8860B]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export async function loader({}: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const visitorName = String(formData.get("visitorName") ?? "").trim();
  const visitorAgeInput = String(formData.get("visitorAge") ?? "").trim();
  const visitorJob = String(formData.get("visitorJob") ?? "").trim();
  const visitorContact = String(formData.get("visitorContact") ?? "").trim();
  const selectedMoodId = String(formData.get("selectedMoodId") ?? "").trim();
  const selectedMoodImage = String(formData.get("selectedMoodImage") ?? "").trim();
  const visitorAge = Number(visitorAgeInput);

  if (
    !visitorName ||
    !visitorAgeInput ||
    Number.isNaN(visitorAge) ||
    visitorAge <= 0 ||
    !visitorJob ||
    !visitorContact ||
    !selectedMoodId
  ) {
    return {
      success: false,
      error: "모든 항목을 입력해 주세요.",
    };
  }

  try {
    await createClickMoodReservation({
      userName: visitorName,
      userAge: visitorAge,
      userJob: visitorJob,
      userPhone: visitorContact,
      selectedMoodId,
      selectedMoodImage,
    });

    return {
      success: true,
      message: "신청이 완료되었습니다. 리 프레임이 연락드릴게요.",
    };
  } catch (error) {
    console.error("[click-mood] action error", error);
    return {
      success: false,
      error: "신청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}

interface ClickMoodFooterProps {
  selectedPostcardId: string | null;
  onShowApplication: () => void;
}

function ClickMoodFooter({ selectedPostcardId, onShowApplication }: ClickMoodFooterProps) {
  const handleStartRecording = () => {
    if (!selectedPostcardId) return;
    onShowApplication();
    // 스크롤을 하단으로 스무스하게 이동
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <footer className="relative w-full border-t border-[#F5F1E8]/10" style={{ backgroundColor: "#2C2C2C" }}>
      {/* 구분선 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#F5F1E8]/10" />
      
      <div className="relative w-full min-h-[15vh] max-h-[20vh] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          {/* Primary CTA Button - 중앙 */}
          <button
            onClick={handleStartRecording}
            disabled={!selectedPostcardId}
            className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl transition-all duration-300 ease-out touch-manipulation min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#D2B48C]/50 active:scale-[0.98]"
            style={{
              backgroundColor: "#D2B48C",
              color: "#F5F1E8",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              fontFamily: "Pretendard, 'Helvetica Neue', sans-serif",
              fontWeight: 500,
            }}
            aria-label="엽서로 나의 감정 포착"
          >
            <span className="text-base sm:text-lg font-medium text-center block">
              엽서로 나의 감정 포착
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

interface ClickMoodApplicationProps {
  selectedPostcardId: string | null;
  actionData?: { success?: boolean; message?: string; error?: string };
}

function ClickMoodApplication({ selectedPostcardId, actionData }: ClickMoodApplicationProps) {
  const reservationFormRef = useRef<HTMLFormElement | null>(null);
  const navigation = useNavigation();
  const isFormSubmitting = navigation.state === "submitting";
  const currentImage = moodImages.find((img) => img.id === selectedPostcardId) || moodImages[0];

  useEffect(() => {
    if (actionData?.success && reservationFormRef.current) {
      reservationFormRef.current.reset();
    }
  }, [actionData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const visitorNameInput = ((form.elements.namedItem("visitorName") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorAgeInput = ((form.elements.namedItem("visitorAge") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorJobInput = ((form.elements.namedItem("visitorJob") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorContactInput = ((form.elements.namedItem("visitorContact") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorAgeValue = Number(visitorAgeInput);

    if (
      !visitorNameInput ||
      !visitorAgeInput ||
      Number.isNaN(visitorAgeValue) ||
      visitorAgeValue <= 0 ||
      !visitorJobInput ||
      !visitorContactInput
    ) {
      event.preventDefault();
      return;
    }
  };

  return (
    <div className="relative w-full py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: "#2C2C2C" }}>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white/85 shadow-lg p-6 sm:p-8 space-y-6 backdrop-blur">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B8860B]">Click Mood</p>
            <h2 className="text-3xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Georgia, serif" }}>
              숨은 감정 알아보기
            </h2>
            <p className="text-base text-[#5A4A4A]">
              선택하신 엽서로 당신의 마음을 들여다보고,<br />
              리 프레임과 함께 감정을 탐색해보세요.
            </p>
          </div>

          {/* 선택한 엽서 이미지 표시 */}
          <div className="flex justify-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="rounded-full object-cover"
              style={{ 
                width: "clamp(120px, 25vw, 180px)", 
                height: "clamp(120px, 25vw, 180px)",
                aspectRatio: "1"
              }}
            />
          </div>

          <div className="space-y-5 rounded-3xl border border-[#EEC2D0] bg-white/80 p-6 shadow-inner">
            {actionData?.error && (
              <p className="rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 text-sm font-semibold text-[#C2410C]">
                {actionData.error}
              </p>
            )}
            {actionData?.success && (
              <p className="rounded-2xl border border-[#6EE7B7] bg-[#ECFDF5] px-4 py-3 text-sm font-semibold text-[#047857]">
                {actionData.message ?? "신청이 완료되었습니다."}
              </p>
            )}

            <Form
              method="post"
              ref={reservationFormRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              replace
            >
              <input type="hidden" name="selectedMoodId" value={selectedPostcardId || ""} />
              <input type="hidden" name="selectedMoodImage" value={currentImage.src} />

              <div className="space-y-2">
                <Label htmlFor="visitorName" className="text-[#5A4A4A]">
                  이름 *
                </Label>
                <Input
                  id="visitorName"
                  name="visitorName"
                  placeholder="홍길동"
                  autoComplete="name"
                  required
                  className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F] placeholder:text-[#C09DA7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitorAge" className="text-[#5A4A4A]">
                  나이 *
                </Label>
                <Input
                  id="visitorAge"
                  name="visitorAge"
                  type="number"
                  min={1}
                  max={120}
                  inputMode="numeric"
                  placeholder="29"
                  required
                  className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F] placeholder:text-[#C09DA7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitorJob" className="text-[#5A4A4A]">
                  직업 *
                </Label>
                <Input
                  id="visitorJob"
                  name="visitorJob"
                  placeholder="직업을 입력해 주세요"
                  required
                  className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F] placeholder:text-[#C09DA7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visitorContact" className="text-[#5A4A4A]">
                  연락처 *
                </Label>
                <Input
                  id="visitorContact"
                  name="visitorContact"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="010-0000-0000"
                  required
                  className="rounded-2xl border-[#EEC2D0] bg-white/70 text-[#3B2F2F] placeholder:text-[#C09DA7]"
                />
              </div>

              <Button
                type="submit"
                disabled={isFormSubmitting || !selectedPostcardId}
                className={`w-full rounded-full py-4 text-lg font-semibold shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2B48C] ${
                  isFormSubmitting
                    ? "bg-[#F9CEDF] text-[#B5567B] cursor-wait shadow-none hover:bg-[#F9CEDF]"
                    : "bg-[#D2B48C] text-[#F5F1E8] hover:bg-[#C9A961]"
                }`}
              >
                <span>
                  {isFormSubmitting ? "전송 중..." : "신청하기"}
                </span>
              </Button>
            </Form>

            <p className="text-xs text-[#B8860B]">
              제출 후 24시간 이내에 리 프레임 매니저가 연락드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhotoPage({ actionData }: Route.ComponentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    moodImages[0]?.id || null
  );
  const [showApplication, setShowApplication] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#2C2C2C" }}>
      {/* 상단 섹션 - Header */}
      <ClickMoodHeader />

      {/* 중앙 섹션 - Main Content */}
      <main className="relative flex-1">
        <ClickMoodCollage selectedId={selectedId} onSelect={setSelectedId} />
      </main>

      {/* 하단 섹션 - Footer */}
      <ClickMoodFooter 
        selectedPostcardId={selectedId} 
        onShowApplication={() => setShowApplication(true)}
      />

      {/* 신청 섹션 */}
      {showApplication && (
        <ClickMoodApplication 
          selectedPostcardId={selectedId}
          actionData={actionData as { success?: boolean; message?: string; error?: string } | undefined}
        />
      )}
    </div>
  );
}
