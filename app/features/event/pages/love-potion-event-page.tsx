import { useMemo, useRef, useState } from "react";

const SECTION_CLASS =
  "min-h-screen flex flex-col justify-center gap-8 px-6 py-16 md:px-10";
const CARD_CLASS =
  "w-full max-w-2xl mx-auto rounded-3xl bg-white/85 shadow-lg p-8 space-y-6 backdrop-blur";
const TITLE_CLASS = "text-3xl font-semibold text-[#3B2F2F]";
const SUBTITLE_CLASS = "text-base text-[#5A4A4A]";
const BUTTON_CLASS =
  "w-full rounded-full bg-[#FF8FB1] text-white py-4 text-lg font-semibold shadow-md transition hover:bg-[#ff7aa4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8FB1] disabled:cursor-not-allowed disabled:opacity-60";
const SELECT_BUTTON_CLASS =
  "w-full rounded-2xl border p-4 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8FB1]";

const INGREDIENTS = [
  {
    name: "라이트 스피크",
    english: "Light Speak",
    description: "마음을 비추는 말빛 성분",
    accent: "bg-[#FFE1E9] text-[#B45A75]",
  },
  {
    name: "메모리 드롭",
    english: "Memory Drop",
    description: "생각해준 흔적이 농축된 성분",
    accent: "bg-[#E6F1FF] text-[#4970B6]",
  },
  {
    name: "케어 액티브",
    english: "Care Active",
    description: "보이지 않게 먼저 움직이는 힘",
    accent: "bg-[#E2F8F2] text-[#2B8A73]",
  },
  {
    name: "타임 블렌딩",
    english: "Time Blending",
    description: "함께 흐르는 순간을 담은 추출물",
    accent: "bg-[#F1E9FF] text-[#6C55B7]",
  },
  {
    name: "워밍 토치",
    english: "Warming Touch",
    description: "닿는 온기를 퍼뜨리는 성분",
    accent: "bg-[#FFEEDC] text-[#B65E36]",
  },
];

const STEP_COPY = [
  {
    heading: "Step 1. 필요한 사랑 성분",
    body: "요즘 마음이 가장 원하는 성분을 골라 담아 주세요.",
  },
  {
    heading: "Step 2. 자주 전하는 사랑 성분",
    body: "사람들에게 가장 자주 건네는 성분을 다시 선택해 주세요.",
  },
];

export default function LovePotionEventPage() {
  const jellySectionRef = useRef<HTMLElement | null>(null);
  const guideSectionRef = useRef<HTMLElement | null>(null);
  const reservationSectionRef = useRef<HTMLElement | null>(null);
  const [picks, setPicks] = useState<(typeof INGREDIENTS)[number][]>([]);
  const [currentStep, setCurrentStep] = useState<0 | 1>(0);
  const [showPrescription, setShowPrescription] = useState(false);
  const isAligned = picks.length === 2 && picks[0] === picks[1];

  const selectionsSummary = useMemo(() => {
    if (picks.length === 0) {
      return "포션바에서 첫 번째 성분을 담아 보세요.";
    }
    if (picks.length === 1) {
      return `1차 픽: ${picks[0].name}. 한 번 더 골라 레시피를 완성하세요.`;
    }

    const first = picks[0];
    const second = picks[1];
    if (first.name === second.name) {
      return `${first.name} × 2 조합으로 진득한 레시피가 완성됐어요.`;
    }
    return `${first.name} + ${second.name} 조합이 준비됐어요.`;
  }, [picks]);

  const handlePick = (ingredient: (typeof INGREDIENTS)[number]) => {
    setShowPrescription(false);
    setPicks((prev) => {
      if (prev.length === 0) {
        setCurrentStep(1);
        return [ingredient];
      }
      if (prev.length === 1) {
        const nextPicks = [...prev, ingredient];
        return nextPicks;
      }
      // reset to start over if both already selected
      setCurrentStep(0);
      return [ingredient];
    });
  };

  const handleGuideCTA = () => {
    if (picks.length < 2) {
      handleScrollTo(jellySectionRef.current);
      return;
    }
    setShowPrescription(true);
    handleScrollTo(guideSectionRef.current);
  };

  const handlePrimaryCTA = () => {
    if (showPrescription) {
      handleScrollTo(reservationSectionRef.current);
      return;
    }
    handleGuideCTA();
  };

  const handleScrollTo = (target: HTMLElement | null) => {
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#FFF7F5] text-[#3B2F2F]">
      <section ref={jellySectionRef} className={SECTION_CLASS}>
        <div className={CARD_CLASS}>
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFB6C1]">
              Love Potion Bar
            </p>
            <h2 className={TITLE_CLASS}>젤리 선택하기</h2>
            <p className={SUBTITLE_CLASS}>
              포션바에 놓인 젤리 비커 중 오늘 필요한 사랑의 성분을 담아 보세요.
              <br />
              두 가지 조합이 당신만의 Love Potion 레시피가 됩니다.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-[#FFB6C1] bg-[#FFF4F7] p-5 text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF8FB1]">
              Love Potion Recipe
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3B2F2F]">
              지금 단계: {STEP_COPY[currentStep].heading}
            </p>
            <p className="text-sm text-[#5A4A4A]">{STEP_COPY[currentStep].body}</p>
            <p className="mt-4 text-sm font-semibold text-[#B85676]">
              {selectionsSummary}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {INGREDIENTS.map((ingredient) => {
              const firstSelected = picks[0] === ingredient;
              const secondSelected = picks[1] === ingredient;
              const isSelected = firstSelected || secondSelected;
              return (  
                <li key={ingredient.name}>
                  <button
                    type="button"
                    className={`${SELECT_BUTTON_CLASS} ${
                      isSelected
                        ? "border-[#FF8FB1] bg-white"
                        : "border-white/60 bg-white/70"
                    }`}
                    onClick={() => handlePick(ingredient)}
                  >
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${ingredient.accent}`}
                    >
                      🧪 {ingredient.english}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-[#3B2F2F]">
                      {ingredient.name}
                    </p>
                    <p className="text-sm text-[#6B5A5A]">
                      {ingredient.description}
                    </p>
                    {firstSelected && (
                      <p className="mt-3 text-xs font-semibold text-[#FF8FB1]">
                        필요한 사랑 성분으로 담았어요
                      </p>
                    )}
                    {secondSelected && (
                      <p className="mt-1 text-xs font-semibold text-[#FF8FB1]">
                        자주 전하는 성분으로 담았어요
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="text-sm text-[#FF8FB1] underline underline-offset-4"
            onClick={() => handleScrollTo(guideSectionRef.current)}
          >
            다음 단계로 이동하기
          </button>
        </div>
      </section>

      <section
        ref={guideSectionRef}
        className={`${SECTION_CLASS} bg-[#FFE6EB]/60`}
      >
        <div className={CARD_CLASS}>
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E98BAF]">
              Custom Guide
            </p>
            <h2 className={TITLE_CLASS}>나만의 복용 지도서 받기</h2>
            <p className={SUBTITLE_CLASS}>
              선택한 두 성분을 기준으로 하루 루틴, 대화 타이밍, 체온을 지키는
              스킨십까지 세심하게 안내해 드릴게요.
              <br />
              필요한 성분과 자주 쓰는 성분을 조합하면 레시피 완성!
            </p>
          </div>
          <div className="rounded-2xl bg-white/60 p-5 text-left space-y-4">
            <p className="text-sm font-semibold text-[#B85676]">Recipe Note</p>
            <p className="text-lg font-semibold text-[#3B2F2F]">
              Love Potion Guide
            </p>
            <p className="text-sm text-[#5A4A4A]">
              {picks.length < 2
                ? "두 성분을 모두 선택하면 당신만의 맞춤 복용 루틴이 열려요."
                : `${picks[0].name}와 ${picks[1].name} 조합을 중심으로 하루 루틴, 대화 타이밍, 스킨십 온도를 안내해 드릴게요.`}
            </p>
            {showPrescription && (
              <div className="space-y-4 rounded-2xl border border-[#F2CED8] bg-white/80 p-5 text-sm text-[#3B2F2F]">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#B85676]">
                    🧪 LOVE POTION – 개인 처방 복약지도서
                  </p>
                  <p>조제자: <span className="font-semibold">Koi Creative Lab</span></p>
                  <p>
                    제조일:{" "}
                    <span className="inline-block min-w-[120px] border-b border-[#B85676]/40 align-middle">
                      &nbsp;
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">1) 진단 결과</p>
                  <div>
                    <p className="text-xs font-semibold text-[#B85676]">
                      📍 필요한 성분(받고 싶은 사랑)
                    </p>
                    <ul className="mt-1 space-y-1">
                      {INGREDIENTS.map((ingredient) => (
                        <li key={`need-${ingredient.name}`}>
                          {picks[0]?.name === ingredient.name ? "☑" : "☐"}{" "}
                          {ingredient.english}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#B85676]">
                      📍 현재 사용 중인 성분(내가 주는 사랑)
                    </p>
                    <ul className="mt-1 space-y-1">
                      {INGREDIENTS.map((ingredient) => (
                        <li key={`give-${ingredient.name}`}>
                          {picks[1]?.name === ingredient.name ? "☑" : "☐"}{" "}
                          {ingredient.english}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold">2) 결과 해석</p>
                  {isAligned ? (
                    <div className="rounded-2xl bg-[#F3F0FF] p-3 ring-2 ring-[#A4A0FF]">
                      <p className="font-semibold text-[#5E4FBF]">
                        ✅ ① 두 성분이 ‘일치하는 경우’
                      </p>
                      <p className="text-sm text-[#4B3D7A]">– 균형이 좋은 상태입니다.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#4B3D7A]">
                        <li>자신의 감정과 욕구를 잘 알고 있음</li>
                        <li>관계에 안정감을 주는 패턴 형성 중</li>
                        <li>현재 방식이 당신의 힘이자 장점</li>
                        <li>더 깊은 자기 이해로 확장할 여지가 있음</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-[#5E4FBF]">
                        이 장점을 기반으로 ‘나만의 사랑 방식’을 더 선명하게 만들어 보세요.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#FFF6EE] p-3 ring-2 ring-[#F4C5AC]">
                      <p className="font-semibold text-[#C0603F]">
                        ⚠️ ② 두 성분이 ‘불일치하는 경우’
                      </p>
                      <p className="text-sm text-[#8A4128]">
                        – 사랑의 흐름이 서로 다른 언어로 번역되고 있습니다.
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#8A4128]">
                        <li>“나는 이렇게 사랑받고 싶은데…”가 충족되지 않을 가능성</li>
                        <li>관계 안에서 오해·과투자·정서 피로 발생</li>
                        <li>본인도 모르게 감정 차단/회피 패턴이 생길 수 있음</li>
                        <li>자기 이해와 감정 구조 재정비가 필요</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-[#C0603F]">
                        이 경우 패턴 교정과 자기 탐색이 필요합니다.
                      </p>
                    </div>
                  )}
                  <div className="space-y-3 rounded-2xl bg-[#FFF4F7] p-4 text-center text-sm text-[#B85676]">
                    <p>더 깊은 처방이 필요하면 코이 창작소에서 알아보세요.</p>
                    <button
                      type="button"
                      className="w-full rounded-full border border-[#FF8FB1] bg-white px-4 py-3 text-sm font-semibold text-[#B85676] transition hover:bg-[#FFE3EC]"
                      onClick={() => handleScrollTo(reservationSectionRef.current)}
                    >
                      상담 예약하러 가기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button
              className={BUTTON_CLASS}
              onClick={handlePrimaryCTA}
              disabled={picks.length < 2}
            >
              {picks.length < 2
                ? "성분을 두 번 골라 주세요"
                : showPrescription
                  ? "맞춤 처방 상담 예약하기"
                  : "맞춤 복용 지도서 생성"}
            </button>
          </div>
        </div>
      </section>

      <section ref={reservationSectionRef} className={SECTION_CLASS}>
        <div className={CARD_CLASS}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D977A0]">
            Book Now
          </p>
          <h2 className={TITLE_CLASS}>예약하기</h2>
          <p className={SUBTITLE_CLASS}>
            오프라인 포션 라운지에서 바리스타가 직접 레시피를 완성해 드립니다.
            <br />
            조용한 상담 부스에서 성분을 믹싱하고, 미각과 청각으로 경험하는
            테이스팅 세션을 즐겨 보세요.
          </p>
          <div className="flex flex-col gap-3">
            <button className={BUTTON_CLASS}>라운지 예약하기</button>
            <button
              className="text-sm text-[#FF8FB1] underline underline-offset-4"
              onClick={() => handleScrollTo(jellySectionRef.current)}
            >
              다시 젤리 고르러 가기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

