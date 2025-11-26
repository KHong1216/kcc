import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Form, useNavigation } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Label } from "../../../common/components/ui/label";
import type { Route } from "./+types/love-potion-event-page";
import { createLovePotionReservation } from "../quries";

const SECTION_CLASS =
  "min-h-screen flex flex-col justify-center gap-8 px-6 py-20 pt-28 md:px-10 md:pt-36";
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

interface ReservationActionResult {
  success?: boolean;
  message?: string;
  error?: string;
}

export function meta({}: Route.MetaArgs) {
  const url = "https://www.koicreativelab.com/event/love-potion";
  return [
    { title: "Love Potion Event - 코이창작소" },
    {
      name: "description",
      content:
        "러브 포션 젤리를 고르고 코이창작소에 맞춤 상담을 요청해 보세요. 필요한 사랑 성분과 루틴을 안내해 드립니다.",
    },
    { rel: "canonical", href: url },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const visitorName = String(formData.get("visitorName") ?? "").trim();
  const visitorAgeInput = String(formData.get("visitorAge") ?? "").trim();
  const visitorContact = String(formData.get("visitorContact") ?? "").trim();
  const neededIngredient = String(formData.get("neededIngredient") ?? "").trim();
  const currentIngredient = String(formData.get("currentIngredient") ?? "").trim();
  const visitorAge = Number(visitorAgeInput);

  if (
    !visitorName ||
    !visitorAgeInput ||
    Number.isNaN(visitorAge) ||
    visitorAge <= 0 ||
    !visitorContact ||
    !neededIngredient ||
    !currentIngredient
  ) {
    return {
      success: false,
      error: "이름, 나이, 연락처, 성분 정보를 모두 입력해 주세요.",
    };
  }

  try {
    const notes = `필요한 성분: ${neededIngredient} / 현재 사용 중인 성분: ${currentIngredient}`;

    await createLovePotionReservation({
      userName: visitorName,
      userAge: visitorAge,
      userPhone: visitorContact,
      notes,
    });

    return {
      success: true,
      message: "상담 요청이 등록되었습니다. 코이창작소가 연락드릴게요.",
    };
  } catch (error) {
    console.error("[love-potion] inquiry action error", error);
    return {
      success: false,
      error: "요청 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}

export function LovePotionEventPage({ actionData }: Route.ComponentProps) {
  const jellySectionRef = useRef<HTMLElement | null>(null);
  const guideSectionRef = useRef<HTMLElement | null>(null);
  const reservationSectionRef = useRef<HTMLElement | null>(null);
  const reservationFormRef = useRef<HTMLFormElement | null>(null);
  const [picks, setPicks] = useState<(typeof INGREDIENTS)[number][]>([]);
  const [currentStep, setCurrentStep] = useState<0 | 1>(0);
  const [showPrescription, setShowPrescription] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const navigation = useNavigation();
  const actionFeedback = actionData as ReservationActionResult | undefined;
  const isAligned = picks.length === 2 && picks[0] === picks[1];
  const hasFullRecipe = picks.length === 2;
  const neededIngredient = hasFullRecipe ? picks[0].name : "";
  const currentIngredient = hasFullRecipe ? picks[1].name : "";
  const isFormSubmitting = navigation.state === "submitting";
  const manufactureDate = useMemo(
    () =>
      new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(new Date()),
    [],
  );

  useEffect(() => {
    if (!actionFeedback) return;
    reservationSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (actionFeedback.success && reservationFormRef.current) {
      reservationFormRef.current.reset();
      setClientError(null);
    }
  }, [actionFeedback]);

  useEffect(() => {
    if (hasFullRecipe) {
      setClientError(null);
    }
  }, [hasFullRecipe]);

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

  const handleScrollTo = (target: HTMLElement | null) => {
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNeedPick = (ingredient: (typeof INGREDIENTS)[number]) => {
    setShowPrescription(false);
    setPicks((prev) => {
      if (prev.length === 0) {
        setCurrentStep(1);
        return [ingredient];
      }
      const second = prev[1];
      setCurrentStep(second ? 1 : 0);
      return second ? [ingredient, second] : [ingredient];
    });
  };

  const handleGivePick = (ingredient: (typeof INGREDIENTS)[number]) => {
    setShowPrescription(false);
    setPicks((prev) => {
      if (prev.length === 0) {
        return prev;
      }
      if (prev.length === 1) {
        setCurrentStep(1);
        return [prev[0], ingredient];
      }
      return [prev[0], ingredient];
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

  const handleReservationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!hasFullRecipe) {
      event.preventDefault();
      setClientError("두 성분을 모두 선택하면 상담 요청을 보낼 수 있어요.");
      handleScrollTo(jellySectionRef.current);
      return;
    }

    const form = event.currentTarget;
    const visitorNameInput =
      ((form.elements.namedItem("visitorName") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorAgeInput =
      ((form.elements.namedItem("visitorAge") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorContactInput =
      ((form.elements.namedItem("visitorContact") as HTMLInputElement | null)?.value ?? "").trim();
    const visitorAgeValue = Number(visitorAgeInput);

    if (
      !visitorNameInput ||
      !visitorAgeInput ||
      Number.isNaN(visitorAgeValue) ||
      visitorAgeValue <= 0 ||
      !visitorContactInput
    ) {
      event.preventDefault();
      setClientError("이름, 나이, 연락처를 모두 입력해 주세요.");
      return;
    }

    setClientError(null);
  };

  return (
    <div className="bg-[#FFF7F5] text-[#3B2F2F]">
      <section ref={jellySectionRef} className={SECTION_CLASS}>
        <div className={CARD_CLASS}>
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FFB6C1]">
              Love Potion Bar
            </p>
            <h2 className={`${TITLE_CLASS} break-keep`}>젤리 선택하기</h2>
            <p className={`${SUBTITLE_CLASS} break-keep`}>
              포션바에 놓인 젤리 비커 중 오늘 필요한 사랑의 성분을 담아 보세요.
              <br />
              두 가지 조합이 당신만의 Love Potion 레시피가 됩니다.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-[#FFB6C1] bg-[#FFF4F7] p-5 text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF8FB1]">
              Love Potion Recipe
            </p>
            <p className="mt-2 text-lg font-semibold text-[#3B2F2F] break-keep">
              지금 단계: {STEP_COPY[currentStep].heading}
            </p>
            <p className="text-sm text-[#5A4A4A] break-keep">{STEP_COPY[currentStep].body}</p>
            <p className="mt-4 text-sm font-semibold text-[#B85676] break-keep">
              {selectionsSummary}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FF8FB1] break-keep">
                필요한 사랑 성분 (받고 싶은 사랑)
              </p>
              <p className="mt-1 text-sm text-[#6B5A5A] break-keep">Step 1. 요즘 가장 충전이 필요한 성분을 골라 주세요.</p>
              <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {INGREDIENTS.map((ingredient) => {
                  const isSelected = picks[0] === ingredient;
                  return (
                    <li key={`need-${ingredient.name}`}>
                      <button
                        type="button"
                        className={clsx(
                          SELECT_BUTTON_CLASS,
                          isSelected ? "border-[#FF8FB1] bg-white" : "border-white/60 bg-white/70",
                        )}
                        onClick={() => handleNeedPick(ingredient)}
                      >
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${ingredient.accent}`}
                        >
                          🧪 {ingredient.english}
                        </span>
                        <p className="mt-2 text-lg font-semibold text-[#3B2F2F] break-keep">{ingredient.name}</p>
                        <p className="text-sm text-[#6B5A5A] break-keep">{ingredient.description}</p>
                        {isSelected && (
                          <p className="mt-3 text-xs font-semibold text-[#FF8FB1] break-keep">필요한 사랑 성분으로 담았어요</p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B65E36] break-keep">
                내가 사용 중인 성분 (내가 주는 사랑)
              </p>
              <p className="mt-1 text-sm text-[#6B5A5A] break-keep">
                Step 2. 다른 사람들에게 가장 자주 건네는 성분을 선택해 주세요.
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {INGREDIENTS.map((ingredient) => {
                  const isSelected = picks[1] === ingredient;
                  return (
                    <li key={`give-${ingredient.name}`}>
                      <button
                        type="button"
                        className={clsx(
                          SELECT_BUTTON_CLASS,
                          isSelected ? "border-[#FF8FB1] bg-white" : "border-white/60 bg-white/70",
                          (!picks[0] || picks.length === 0) && "opacity-60",
                        )}
                        onClick={() => handleGivePick(ingredient)}
                        disabled={!picks[0]}
                      >
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${ingredient.accent}`}
                        >
                          🧪 {ingredient.english}
                        </span>
                        <p className="mt-2 text-lg font-semibold text-[#3B2F2F] break-keep">{ingredient.name}</p>
                        <p className="text-sm text-[#6B5A5A] break-keep">{ingredient.description}</p>
                        {isSelected && (
                          <p className="mt-3 text-xs font-semibold text-[#FF8FB1] break-keep">자주 전하는 성분으로 담았어요</p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Button
            type="button"
            className={clsx(
              "mt-4 w-full rounded-full px-6 py-4 text-base font-semibold shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8FB1]",
              !picks[0] &&
                "cursor-not-allowed border border-[#F5CBD9] bg-[#F9E4ED] text-[#C982A4]",
              picks[0] &&
                !hasFullRecipe &&
                "bg-[#FFD7E9] text-[#B2447C] shadow-[0_10px_25px_rgba(255,158,195,0.35)] hover:bg-[#ffc5df]",
              hasFullRecipe &&
                "bg-[#FF8FB1] text-white shadow-[0_12px_30px_rgba(255,143,177,0.55)] hover:bg-[#ff7aa4]",
            )}
            disabled={!picks[0]}
            onClick={() => handleScrollTo(guideSectionRef.current)}
          >
            <span className="break-keep">{picks[0] ? "다음 단계로 이동하기" : "필요한 사랑 성분을 먼저 골라 주세요"}</span>
          </Button>
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
            <h2 className={`${TITLE_CLASS} break-keep`}>나만의 복용 지도서 받기</h2>
            <p className={`${SUBTITLE_CLASS} break-keep`}>
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
            <p className="text-sm text-[#5A4A4A] break-keep">
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
                  <p className="break-keep">조제자: <span className="font-semibold">Koi Creative Lab</span></p>
                  <p className="break-keep">
                    제조일:{" "}
                    <span className="inline-block min-w-[120px] border-b border-[#B85676]/40 align-middle">
                      {showPrescription ? manufactureDate : "\u00A0"}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold break-keep">1) 진단 결과</p>
                  <div>
                    <p className="text-xs font-semibold text-[#B85676] break-keep">
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
                    <p className="text-xs font-semibold text-[#B85676] break-keep">
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
                  <p className="font-semibold break-keep">2) 결과 해석</p>
                  {isAligned ? (
                    <div className="rounded-2xl bg-[#F3F0FF] p-3 ring-2 ring-[#A4A0FF]">
                      <p className="font-semibold text-[#5E4FBF] break-keep">
                        ✅ ① 두 성분이 '일치하는 경우'
                      </p>
                      <p className="text-sm text-[#4B3D7A] break-keep">– 균형이 좋은 상태입니다.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#4B3D7A]">
                        <li>자신의 감정과 욕구를 잘 알고 있음</li>
                        <li>관계에 안정감을 주는 패턴 형성 중</li>
                        <li>현재 방식이 당신의 힘이자 장점</li>
                        <li>더 깊은 자기 이해로 확장할 여지가 있음</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-[#5E4FBF] break-keep">
                        이 장점을 기반으로 '나만의 사랑 방식'을 더 선명하게 만들어 보세요.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#FFF6EE] p-3 ring-2 ring-[#F4C5AC]">
                      <p className="font-semibold text-[#C0603F] break-keep">
                        ⚠️ ② 두 성분이 '불일치하는 경우'
                      </p>
                      <p className="text-sm text-[#8A4128] break-keep">
                        – 사랑의 흐름이 서로 다른 언어로 번역되고 있습니다.
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[#8A4128]">
                        <li>“나는 이렇게 사랑받고 싶은데…”가 충족되지 않을 가능성</li>
                        <li>관계 안에서 오해·과투자·정서 피로 발생</li>
                        <li>본인도 모르게 감정 차단/회피 패턴이 생길 수 있음</li>
                        <li>자기 이해와 감정 구조 재정비가 필요</li>
                      </ul>
                      <p className="mt-3 text-xs font-semibold text-[#C0603F] break-keep">
                        이 경우 패턴 교정과 자기 탐색이 필요합니다.
                      </p>
                    </div>
                  )}
                  <div className="space-y-3 rounded-2xl bg-[#FFF4F7] p-4 text-center text-sm text-[#B85676]">
                    <p className="break-keep">더 깊은 처방이 필요하면 코이 창작소에서 알아보세요.</p>
                    <button
                      type="button"
                      className="w-full rounded-full border border-[#FF8FB1] bg-white px-4 py-3 text-sm font-semibold text-[#B85676] transition hover:bg-[#FFE3EC] break-keep"
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
              className={clsx(
                BUTTON_CLASS,
                picks.length < 2
                  ? "bg-[#FBE4EE] text-[#C87497] hover:bg-[#FBE4EE]"
                  : showPrescription
                    ? "bg-[#FFB4C5] text-[#7F1C44] hover:bg-[#FFA2B9]"
                    : "bg-[#FF8FB1] text-white hover:bg-[#ff7aa4]",
              )}
              onClick={handlePrimaryCTA}
              disabled={picks.length < 2}
            >
              <span className="break-keep">
                {picks.length < 2
                  ? "성분을 두 번 골라 주세요"
                  : showPrescription
                    ? "맞춤 처방 상담 예약하기"
                    : "맞춤 복용 지도서 생성"}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section ref={reservationSectionRef} className={SECTION_CLASS}>
        <div className={CARD_CLASS}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D977A0]">Koi Consultation</p>
          <h2 className={`${TITLE_CLASS} break-keep`}>코이창작소를 통해 알아보기</h2>
          <p className={`${SUBTITLE_CLASS} break-keep`}>
            완성한 러브 포션 레시피를 코이창작소 큐레이터에게 공유하면, 이름·나이·연락처만으로
            1:1 맞춤 상담을 준비해 드립니다. 필요 시 추가 질문을 드릴 수 있어요.
          </p>

          <div className="mt-6 space-y-5 rounded-3xl border border-[#F2CED8] bg-white/80 p-6 shadow-inner">
            {clientError && (
              <p className="rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 text-sm font-semibold text-[#C2410C] break-keep">
                {clientError}
              </p>
            )}
            {!clientError && actionFeedback?.error && (
              <p className="rounded-2xl border border-[#FB7185] bg-[#FFF5F7] px-4 py-3 text-sm font-semibold text-[#C2410C] break-keep">
                {actionFeedback.error}
              </p>
            )}
            {actionFeedback?.success && (
              <p className="rounded-2xl border border-[#6EE7B7] bg-[#ECFDF5] px-4 py-3 text-sm font-semibold text-[#047857] break-keep">
                {actionFeedback.message ?? "상담 요청이 접수되었습니다."}
              </p>
            )}

            <Form
              method="post"
              ref={reservationFormRef}
              onSubmit={handleReservationSubmit}
              className="space-y-4"
              replace
            >
              <input type="hidden" name="neededIngredient" value={neededIngredient} />
              <input type="hidden" name="currentIngredient" value={currentIngredient} />

              <div className="space-y-3 rounded-2xl border border-[#F2CED8] bg-[#FFF9FB] p-4">
                <p className="text-sm font-semibold text-[#B85676] break-keep">이번 Love Potion 레시피</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="neededIngredientDisplay" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85676]">
                      필요한 성분
                    </Label>
                    <Input
                      id="neededIngredientDisplay"
                      value={neededIngredient || "필요한 성분 선택 대기"}
                      readOnly
                      disabled={!hasFullRecipe}
                      className="rounded-2xl border-[#F2CED8] bg-white/70 text-[#3B2F2F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="currentIngredientDisplay" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85676]">
                      현재 사용 중인 성분
                    </Label>
                    <Input
                      id="currentIngredientDisplay"
                      value={currentIngredient || "현재 성분 선택 대기"}
                      readOnly
                      disabled={!hasFullRecipe}
                      className="rounded-2xl border-[#F2CED8] bg-white/70 text-[#3B2F2F]"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#B85676] break-keep">
                  성분을 두 번 모두 고르면 자동으로 채워져 상담 기록에 포함돼요.
                </p>
              </div>

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
                disabled={isFormSubmitting || !hasFullRecipe}
                className={clsx(
                  "w-full rounded-full py-4 text-lg font-semibold shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8FB1]",
                  isFormSubmitting &&
                    "bg-[#F9CEDF] text-[#B5567B] cursor-wait shadow-none hover:bg-[#F9CEDF]",
                  !isFormSubmitting &&
                    (hasFullRecipe
                      ? "bg-[#FF8FB1] text-white shadow-[0_12px_30px_rgba(255,143,177,0.55)] hover:bg-[#ff7aa4]"
                      : "bg-[#FBE4EE] text-[#C87497] hover:bg-[#FBE4EE]"),
                )}
              >
                <span className="break-keep">
                  {isFormSubmitting
                    ? "전송 중..."
                    : hasFullRecipe
                      ? "신청하기"
                      : "성분 선택을 완료해 주세요"}
                </span>
              </Button>
            </Form>
            <p className="text-xs text-[#B85676] break-keep">
              제출 후 24시간 이내에 코이매니저가 문자 또는 전화로 맞춤 상담을 안내드립니다.
            </p>
          </div>

          <button
            className="mt-6 text-sm text-[#FF8FB1] underline underline-offset-4 break-keep"
            onClick={() => handleScrollTo(jellySectionRef.current)}
          >
            다시 젤리 고르러 가기
          </button>
        </div>
      </section>
    </div>
  );
}

export default LovePotionEventPage;

