import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "react-router";
import { Form, useNavigation } from "react-router";
import { z } from "zod";
import { Button } from "../../../common/components/ui/button";
import { Progress } from "../../../common/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../common/components/ui/card";
import { Label } from "../../../common/components/ui/label";
import clsx from "clsx";
import type { Route } from "./+types/emotion-page";
import type { Emotion } from "../types";
import { emotionDetails, emotionEmojis } from "../types";
import { getEmotionParticipantCount, createEmotionTestResponse } from "../queries";

// 예약 폼 validation 스키마
const bookingFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  age: z
    .string()
    .min(1, "나이를 선택해주세요.")
    .transform((val) => Number(val))
    .pipe(z.number().int().min(19, "나이는 19세 이상이어야 합니다.").max(28, "나이는 28세 이하여야 합니다.")),
  contact: z.string().min(1, "연락처를 입력해주세요."),
  job: z.enum(["무직", "학생", "대학생", "직장인"], {
    message: "직업을 선택해주세요.",
  }),
  emotion: z.string().min(1, "감정 정보가 없습니다."),
  characterName: z.string().min(1, "캐릭터 정보가 없습니다."),
  day: z.enum(["월", "화", "수", "목", "금", "토", "일"], {
    message: "요일을 선택해주세요.",
  }),
  time: z.enum(["오전", "오후", "저녁"], {
    message: "시간대를 선택해주세요.",
  }),
});

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/emotion";
  return [
    { title: "KOI 캐릭터 테스트 - 30초만에 내 마음 속 진짜 감정 캐릭터 찾기 | 코이창작소" },
    {
      name: "description",
      content:
        "9가지 감정 중 하나를 선택하면 곧바로 당신의 감정 패턴을 분석해 드립니다. 30초 테스트로 나만의 KOI 감정 캐릭터를 찾고, 1:1 세션으로 더 깊이 있는 이해를 시작해보세요.",
    },
    {
      name: "keywords",
      content:
        "KOI 캐릭터 테스트, 감정 테스트, 감정 분석, 감정 캐릭터, 마음 탐구, 자기이해, 감정 진단, 코이창작소, 감정 패턴, 1:1 상담",
    },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "KOI 캐릭터 테스트 - 30초만에 내 마음 속 진짜 감정 캐릭터 찾기" },
    {
      property: "og:description",
      content:
        "9가지 감정 중 하나를 선택하면 곧바로 당신의 감정 패턴을 분석해 드립니다. 30초 테스트로 나만의 KOI 감정 캐릭터를 찾고, 1:1 세션으로 더 깊이 있는 이해를 시작해보세요.",
    },
    { property: "og:image", content: "https://www.koicreativelab.com/og-emotion.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "ko_KR" },
    { property: "og:site_name", content: "코이창작소" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "KOI 캐릭터 테스트 - 30초만에 내 마음 속 진짜 감정 캐릭터 찾기" },
    {
      name: "twitter:description",
      content:
        "9가지 감정 중 하나를 선택하면 곧바로 당신의 감정 패턴을 분석해 드립니다. 30초 테스트로 나만의 KOI 감정 캐릭터를 찾아보세요.",
    },
    { name: "twitter:image", content: "https://www.koicreativelab.com/og-emotion.jpg" },
    { name: "twitter:site", content: "@koicreativelab" },
    { rel: "canonical", href: url },
  ];
};

export async function loader({}: Route.LoaderArgs) {
  const participantCount = await getEmotionParticipantCount();

  return {
    participantCount,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  
  // formData를 객체로 변환
  const rawData = {
    name: String(formData.get("name") ?? "").trim(),
    age: String(formData.get("age") ?? "").trim(),
    contact: String(formData.get("contact") ?? "").trim(),
    job: String(formData.get("job") ?? "").trim(),
    emotion: String(formData.get("emotion") ?? "").trim(),
    characterName: String(formData.get("characterName") ?? "").trim(),
    day: String(formData.get("day") ?? "").trim(),
    time: String(formData.get("time") ?? "").trim(),
  };

  // 디버깅: rawData 로그 출력
  console.log("[emotion-page action] Raw form data:", rawData);
  console.log("[emotion-page action] FormData entries:", Array.from(formData.entries()));

  // Zod 스키마로 validation
  const validationResult = bookingFormSchema.safeParse(rawData);

  // 디버깅: validation 결과 로그 출력
  console.log("[emotion-page action] Validation result:", {
    success: validationResult.success,
    errors: validationResult.success ? null : validationResult.error.issues,
  });

  if (!validationResult.success) {
    // 첫 번째 에러 메시지 반환
    const firstError = validationResult.error.issues[0];
    console.log("[emotion-page action] Validation failed:", firstError);
    return {
      success: false,
      error: firstError?.message || "입력 정보를 확인해주세요.",
    };
  }

  const validatedData = validationResult.data;
  console.log("[emotion-page action] Validated data:", validatedData);

  const result = await createEmotionTestResponse({
    name: validatedData.name,
    age: validatedData.age,
    contact: validatedData.contact,
    job: validatedData.job,
    emotion: validatedData.emotion,
    characterName: validatedData.characterName,
    day: validatedData.day,
    time: validatedData.time,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "예약 저장 중 오류가 발생했습니다.",
    };
  }

  return {
    success: true,
    message: "예약이 완료되었습니다. 곧 매니저가 연락드릴게요.",
  };
}

const PAGE_CLASS = "min-h-screen flex flex-col justify-center gap-8 px-6 py-20 pt-28 md:px-10 md:pt-36";
const EMOTION_FLOW_STEPS = 3;
const EMOTION_SELECTION_STEP = 2;
const CARD_CLASS =
  "w-full max-w-2xl mx-auto rounded-3xl bg-white/85 shadow-lg p-8 space-y-6 backdrop-blur";
const TITLE_CLASS = "text-3xl font-semibold text-[#3B2F2F]";
const SUBTITLE_CLASS = "text-base text-[#5A4A4A]";
const EMOTION_DESCRIPTIONS: Record<Emotion, string> = (Object.keys(emotionEmojis) as Emotion[]).reduce(
  (acc, emotion) => {
    const details = emotionDetails[emotion] ?? [];
    acc[emotion] = details.slice(0, 2).join(", ") || "감정 설명 준비 중";
    return acc;
  },
  {} as Record<Emotion, string>,
);

interface ActionResult {
  success?: boolean;
  message?: string;
  error?: string;
}

export default function EmotionIntroPage({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const actionFeedback = actionData as ActionResult | undefined;
  const isFormSubmitting = navigation.state === "submitting";
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(1);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedDay, setSelectedDay] = useState<"월" | "화" | "수" | "목" | "금" | "토" | "일" | "">("");
  const [selectedTime, setSelectedTime] = useState<"오전" | "오후" | "저녁" | "">("");
  const [selectedAge, setSelectedAge] = useState<number | "">("");
  const [selectedJob, setSelectedJob] = useState<"무직" | "학생" | "대학생" | "직장인" | "">("");
  const [showSessionSection, setShowSessionSection] = useState(false);
  const [mobileTooltipEmotion, setMobileTooltipEmotion] = useState<Emotion | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const mobileTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysisTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const pageTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const participantCount = loaderData?.participantCount ?? 0;
  const formattedParticipantCount = new Intl.NumberFormat("ko-KR").format(participantCount || 0);

  const handleStart = () => {
    setIsPageTransitioning(true);
    setMobileTooltipEmotion(null);
    setCurrentPage(2);
    if (pageTransitionTimeoutRef.current) {
      clearTimeout(pageTransitionTimeoutRef.current);
    }
    pageTransitionTimeoutRef.current = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 350);
  };

  const handleNext = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleEmotionSelect = (emotion: Emotion) => {
    if (isPageTransitioning) return;
    setSelectedEmotion(emotion);
    setImageError(false); // 이미지 에러 상태 리셋
    if (currentPage !== 2) return;

    if (analysisTimeoutRef.current) {
      clearTimeout(analysisTimeoutRef.current);
    }
    setIsAnalyzing(true);
    analysisTimeoutRef.current = setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentPage(3);
    }, 1200);
  };

  const showMobileTooltip = (emotion: Emotion) => {
    if (isPageTransitioning) return;
    if (mobileTooltipTimeoutRef.current) {
      clearTimeout(mobileTooltipTimeoutRef.current);
    }
    setMobileTooltipEmotion(emotion);
    mobileTooltipTimeoutRef.current = setTimeout(() => {
      setMobileTooltipEmotion(null);
    }, 1600);
  };

  useEffect(() => {
    return () => {
      if (mobileTooltipTimeoutRef.current) {
        clearTimeout(mobileTooltipTimeoutRef.current);
      }
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current);
      }
      if (pageTransitionTimeoutRef.current) {
        clearTimeout(pageTransitionTimeoutRef.current);
      }
    };
  }, []);

  const totalSteps = 3;
  const progress = (currentPage / totalSteps) * 100;

  // 감정에 따른 캐릭터 이름 및 타입 매핑
  const getCharacterName = (emotion: Emotion | null): string => {
    if (!emotion) return "관찰가 O-Type";
    
    const characterMap: Record<Emotion, string> = {
      "기쁨": "환희가 J-Type",
      "슬픔": "공감가 C-Type",
      "불안": "초조가 A-Type",
      "분노": "열정가 P-Type",
      "지침": "휴식가 R-Type",
      "설렘": "기대가 E-Type",
      "허무": "성찰가 S-Type",
      "안정": "평온가 T-Type",
      "혼란": "탐구가 Q-Type",
    };
    
    return characterMap[emotion] || "관찰가 O-Type";
  };

  // 감정에 따른 캐릭터 이미지 경로 매핑
  const getCharacterImagePath = (emotion: Emotion | null): string => {
    if (!emotion) return "/emotion/inquiry.png";
    
    const imageMap: Record<Emotion, string> = {
      "기쁨": "/emotion/jubilation.png",
      "슬픔": "/emotion/empathy.png",
      "불안": "/emotion/anxiety.png",
      "분노": "/emotion/passion.png",
      "지침": "/emotion/rest.png",
      "설렘": "/emotion/expectation.png",
      "허무": "/emotion/reflection.png",
      "안정": "/emotion/tranquility.png",
      "혼란": "/emotion/inquiry.png",
    };
    
    return imageMap[emotion] || "/emotion/inquiry.png";
  };

  const handleShare = () => {
    // 공유 기능 placeholder
    if (navigator.share) {
      navigator.share({
        title: `${getCharacterName(selectedEmotion)} - KOI 캐릭터 테스트`,
        text: `나의 감정 캐릭터는 ${getCharacterName(selectedEmotion)}입니다!`,
        url: window.location.href,
      }).catch(() => {
        // 공유 취소 시 무시
      });
    } else {
      // Fallback: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("링크가 클립보드에 복사되었습니다!");
      });
    }
  };

  const handleReset = () => {
    // 모든 상태 초기화
    setCurrentPage(1);
    setSelectedEmotion(null);
    setSelectedDay("");
    setSelectedTime("");
    setSelectedAge("");
    setSelectedJob("");
    setShowSessionSection(false);
    setImageError(false);
    setIsPageTransitioning(false);
  };

  useEffect(() => {
    if (actionFeedback?.success) {
      // 폼 리셋
      setSelectedDay("");
      setSelectedTime("");
      setSelectedAge("");
      setSelectedJob("");
      const nameInput = document.getElementById("booking-name") as HTMLInputElement;
      const contactInput = document.getElementById("booking-contact") as HTMLInputElement;
      if (nameInput) nameInput.value = "";
      if (contactInput) contactInput.value = "";
    } else if (actionFeedback?.error) {
      alert(actionFeedback.error);
    }
  }, [actionFeedback]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "KOI 캐릭터 테스트",
            description:
              "9가지 감정 중 하나를 선택하면 곧바로 당신의 감정 패턴을 분석해 드립니다. 30초 테스트로 나만의 KOI 감정 캐릭터를 찾고, 1:1 세션으로 더 깊이 있는 이해를 시작해보세요.",
            provider: {
              "@type": "Organization",
              name: "코이창작소",
              url: "https://www.koicreativelab.com",
            },
            areaServed: {
              "@type": "Country",
              name: "KR",
            },
            serviceType: "감정 분석 및 상담",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
            },
          }),
        }}
      />
      <div className="bg-[#FDF6F0] text-[#3B2F2F] relative overflow-hidden">
      {/* Page 1: Intro */}
      {currentPage === 1 && (
        <section
          key="page-1"
          className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF8F5] via-[#FFEFF8] to-[#FDF6F0] px-6 py-8 sm:py-12 animate-fade-in"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-8 h-48 w-48 rounded-full bg-[#FDE1EA] blur-3xl opacity-80" />
            <div className="absolute top-20 right-10 h-56 w-56 rounded-full bg-[#E0E7FF] blur-3xl opacity-80" />
            <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#FCEFD6] blur-3xl opacity-70" />
            <div className="absolute inset-0 grid grid-cols-3 gap-6 opacity-20">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={`silhouette-${index}`}
                  className="aspect-square rounded-[20%] border border-white/30 bg-white/10 backdrop-blur-sm"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center text-center">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.3em] text-[#A78BFA]">
              KOI Creative Lab
            </p>
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-[#1F1F2B] break-keep">
              30초 테스트: 내 마음 속 진짜 감정 캐릭터 찾기
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#4A3F55] leading-relaxed break-keep">
              지금 당신이 느끼는 감정은 어떤 모습을 하고 있을까요?
              <br />
              복잡한 내면을 KOI 캐릭터로 가볍게 확인해 보세요.
            </p>

            <div className="mt-10 w-full max-w-md rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold text-[#FF8FB1] animate-pulse">
                  ⭐ 지금까지 {formattedParticipantCount}명이 자신의 캐릭터를 찾았습니다.
                </p>
                <Button
                  type="button"
                  onClick={handleStart}
                  className="w-full rounded-full bg-[#8B5CF6] py-4 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-[0_15px_40px_rgba(139,92,246,0.35)] transition-transform duration-300 hover:scale-[1.02] hover:bg-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] min-h-[52px]"
                >
                  지금 바로 시작하기
                </Button>
                <p className="text-xs text-[#6B5A5A]">
                  시작하고 1:1 세션 특별 혜택 안내받기
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 2: 감정 선택 페이지 */}
      {currentPage === 2 && (
        <section
          key="page-2"
          className="relative min-h-screen bg-gradient-to-b from-[#FFF8F5] via-[#FFEFF8] to-[#FDF6F0] px-4 pt-8 pb-16 sm:px-6 sm:pt-12 animate-fade-in"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 right-10 h-40 w-40 rounded-full bg-[#E4D2FF] blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#FFE3F1] blur-3xl opacity-70" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6 sm:gap-10">
            <div className="text-center space-y-4">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
                <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
                  KOI 캐릭터 테스트
                </p>
                <span className="text-sm sm:text-base font-medium text-[#3A556A]">
                  STEP {EMOTION_SELECTION_STEP} / {EMOTION_FLOW_STEPS}
                </span>
              </div>
              <Progress
                value={(EMOTION_SELECTION_STEP / EMOTION_FLOW_STEPS) * 100}
                className="mb-6 max-w-2xl mx-auto bg-[#E8DCF8] [&>div]:bg-[#A78BFA]"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F1F2B] leading-relaxed break-keep">
                지금 이 순간, 당신의 마음에 가장 가까운 감정을 골라주세요.
              </h2>
              <p className="text-sm sm:text-base text-[#4A3F55] leading-relaxed break-keep">
                9가지 감정 중 하나를 선택하면 곧바로 당신의 감정 패턴을 분석해 드릴게요.
              </p>
            </div>

            <div
              className={clsx(
                "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4",
                isPageTransitioning && "pointer-events-none"
              )}
            >
              {(Object.keys(emotionEmojis) as Emotion[]).map((emotion) => {
                const isSelected = selectedEmotion === emotion;
                return (
                  <div key={`emotion-${emotion}`} className="group relative">
                    <button
                      type="button"
                      title={EMOTION_DESCRIPTIONS[emotion]}
                      onClick={() => handleEmotionSelect(emotion)}
                      onTouchStart={() => showMobileTooltip(emotion)}
                      className={clsx(
                        "relative flex min-h-[140px] sm:h-28 w-full flex-col items-center justify-center rounded-2xl border-2 bg-white/80 text-sm sm:text-base font-semibold text-[#3A344D] shadow-sm transition-transform duration-300 p-4 sm:p-2",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B5CF6]",
                        isSelected
                          ? "border-[#8B5CF6] bg-gradient-to-br from-[#EFE2FF] to-white text-[#2E1E44] shadow-lg scale-[1.02]"
                          : "border-transparent hover:border-[#DCCFF8] hover:scale-[1.01]"
                      )}
                    >
                      <span className="text-5xl sm:text-3xl drop-shadow-sm">{emotionEmojis[emotion]}</span>
                      <span className="mt-2 text-sm sm:text-base">{emotion}</span>
                    </button>
                    <div
                      className={clsx(
                        "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-44 -translate-x-1/2 rounded-2xl bg-[#1F1F2B] px-3 py-2 text-xs text-white opacity-0 shadow-xl transition duration-200",
                        "group-hover:opacity-100 group-hover:translate-y-0",
                        mobileTooltipEmotion === emotion ? "opacity-100 translate-y-0" : "translate-y-1"
                      )}
                    >
                      {EMOTION_DESCRIPTIONS[emotion]}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-[#6B5A5A]">
              감정을 선택하면 바로 분석을 시작해요. 잠시만 기다려 주세요.
            </p>
          </div>

          {isAnalyzing && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur-sm">
              <div className="w-full max-w-sm rounded-3xl bg-white px-6 py-8 text-center shadow-2xl mx-4">
                <p className="text-sm font-semibold text-[#A78BFA]">[분석 중…]</p>
                <p className="mt-3 text-base text-[#3A344D] break-keep">
                  당신의 감정 패턴에 가장 가까운 캐릭터를 찾고 있습니다.
                  <br />
                  잠시만 기다려주세요.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Page 3: 결과 & 전환 페이지 (롱스크롤) */}
      {currentPage === 3 && (
        <div key="page-3" className="min-h-screen bg-gradient-to-b from-white via-[#FDF6F0] to-white animate-fade-in">
          {/* 결과 섹션 (Above the Fold) */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12">
            <div className="max-w-4xl mx-auto w-full text-center space-y-6 sm:space-y-8">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
                  KOI 캐릭터 테스트
                </p>
                <span className="text-sm sm:text-base font-medium text-[#3A556A]">STEP 3 / {totalSteps}</span>
              </div>
              <Progress value={progress} className="mb-8 bg-[#DCE7F5] [&>div]:bg-[#4A90E2]" />

              {/* 캐릭터 이미지 (40-50% 뷰포트) */}
              <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED] flex items-center justify-center shadow-2xl transform transition-all duration-500 animate-fade-in overflow-hidden">
                {!imageError ? (
                  <img
                    src={getCharacterImagePath(selectedEmotion)}
                    alt={getCharacterName(selectedEmotion)}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-9xl sm:text-[12rem] drop-shadow-lg">
                    {selectedEmotion ? emotionEmojis[selectedEmotion] : "😊"}
                  </span>
                )}
              </div>

              {/* 캐릭터명 & 타이틀 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1F1F2B] leading-tight break-keep px-2">
                당신은 {getCharacterName(selectedEmotion)} 입니다.
              </h1>

              {/* 개인화된 해석 (3-5줄) */}
              <div className="max-w-2xl mx-auto space-y-3 px-2">
                {selectedEmotion && emotionDetails[selectedEmotion] && (
                  <p className="text-base sm:text-lg md:text-xl text-[#4A3F55] leading-relaxed break-keep">
                    {emotionDetails[selectedEmotion].slice(0, 3).join(", ")}
                    {emotionDetails[selectedEmotion].length > 3 && "..."}
                  </p>
                )}
                <p className="text-sm sm:text-base md:text-lg text-[#5A4A4A] leading-relaxed break-keep">
                  오늘 선택된 감정을 기반으로 당신의 감정 패턴을 분석한 결과,
                  <br />
                  당신의 감정 캐릭터가 생성되었습니다.
                </p>
              </div>

              {/* Primary CTA + 공유 버튼 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowSessionSection(true);
                    // 섹션이 표시된 후 스크롤
                    setTimeout(() => {
                      const sessionSection = document.getElementById("session-section");
                      sessionSection?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm sm:text-lg font-semibold shadow-[0_15px_40px_rgba(139,92,246,0.35)] transition-transform duration-300 hover:scale-[1.02] leading-tight break-words"
                >
                  <span className="block sm:inline">{getCharacterName(selectedEmotion)}의 진짜 이야기 듣기</span>
                  <span className="block sm:inline"> (1:1 체험)</span>
                </Button>
                {/* <Button
                  type="button"
                  onClick={handleShare}
                  className="w-full sm:w-auto px-6 py-6 rounded-full border-2 border-[#8B5CF6] bg-transparent text-[#8B5CF6] hover:bg-[#F3E8FF] transition"
                >
                  <span className="mr-2">📤</span>
                  공유하기
                </Button> */}
              </div>
            </div>
          </section>

          {/* 체험 안내 섹션 (Scroll Down) */}
          {showSessionSection && (
            <section id="session-section" className="relative px-4 sm:px-6 py-16 bg-white animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
              {/* 섹션 헤더 */}
              <div className="text-center space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F1F2B] leading-relaxed break-keep px-2">
                  잠깐! {getCharacterName(selectedEmotion)} 캐릭터의 <span className="text-[#8B5CF6]">숨겨진 뒷면</span>을 확인해 보세요.
                </h2>
              </div>

              {/* 핵심 이점 3가지 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#F3E8FF] to-white">
                  <div className="text-4xl">⏱️</div>
                  <h3 className="font-semibold text-[#3A556A]">20-40분</h3>
                  <p className="text-sm text-[#5A4A4A] break-keep">짧고 가벼운 시간</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#E0E7FF] to-white">
                  <div className="text-4xl">💯</div>
                  <h3 className="font-semibold text-[#3A556A]">100% 부담 없음</h3>
                  <p className="text-sm text-[#5A4A4A] break-keep">자유롭게 참여</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#FCE7F3] to-white">
                  <div className="text-4xl">🎯</div>
                  <h3 className="font-semibold text-[#3A556A]">1:1 맞춤 해결책</h3>
                  <p className="text-sm text-[#5A4A4A] break-keep">개인화된 상담</p>
                </div>
              </div>

              {/* 세션 가치 설명 */}
              <div className="space-y-3 sm:space-y-4 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFF8F5] to-white border border-[#F3E8FF]">
                <h3 className="text-lg sm:text-xl font-bold text-[#1F1F2B] leading-relaxed break-keep">
                  왜 이 세션이 필요한가요?
                </h3>
                <p className="text-sm sm:text-base text-[#5A4A4A] leading-relaxed break-keep">
                  당신의 {getCharacterName(selectedEmotion)}가 억누르고 있는 <strong className="text-[#8B5CF6]">진짜 욕구와 행동 패턴의 근원</strong>을 찾아 드립니다.
                  <br />
                  <br />
                  매니저와 함께 더 깊이 이해하는 1:1 가벼운 체험이에요. 약 20~40분 진행되며 부담 없이 참여하시면 됩니다 :)
                </p>
              </div>

              {/* 예약 모듈 */}
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6 pt-6 sm:pt-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[#3A556A]">
                    1:1 세션 예약하기
                  </CardTitle>
                </CardHeader>

                <Form
                  method="post"
                  replace
                  id="booking-form"
                  onSubmit={(e) => {
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    console.log("[emotion-page client] Form submit - FormData entries:", Array.from(formData.entries()));
                    console.log("[emotion-page client] Form submit - Current state:", {
                      selectedAge,
                      selectedJob,
                      selectedDay,
                      selectedTime,
                      selectedEmotion,
                      characterName: getCharacterName(selectedEmotion),
                    });
                  }}
                >
                  <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
                  {/* 이름 입력 */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-name" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      이름
                    </Label>
                    <input
                      type="text"
                      id="booking-name"
                      name="name"
                      placeholder="이름을 입력해주세요"
                      className="w-full px-4 py-4 sm:py-3 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-base min-h-[44px]"
                    />
                  </div>

                  {/* 연락처 입력 */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-contact" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      연락처
                    </Label>
                    <input
                      type="tel"
                      id="booking-contact"
                      name="contact"
                      placeholder="연락처를 입력해주세요"
                      className="w-full px-4 py-4 sm:py-3 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-base min-h-[44px]"
                    />
                  </div>

                  {/* 나이 입력 */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-age" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      나이
                    </Label>
                    <select
                      id="booking-age"
                      name="age"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full px-4 py-4 sm:py-3 rounded-lg border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent text-base min-h-[44px]"
                    >
                      <option value="">나이를 선택해주세요</option>
                      {Array.from({ length: 10 }, (_, i) => i + 19).map((age) => (
                        <option key={age} value={age}>
                          {age}세
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 직업 선택 */}
                  <div className="space-y-3">
                    <Label htmlFor="job-select" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      직업
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["무직", "학생", "대학생", "직장인"] as const).map((job) => (
                        <button
                          key={job}
                          type="button"
                          onClick={() => setSelectedJob(job)}
                          className={clsx(
                            "px-4 py-4 sm:py-3 rounded-lg border-2 text-sm sm:text-base font-medium transition-all min-h-[44px]",
                            selectedJob === job
                              ? "border-[#8B5CF6] bg-[#F3E8FF] text-[#8B5CF6] shadow-md"
                              : "border-[#D1D5DB] bg-white text-[#5A4A5A] hover:border-[#8B5CF6] hover:bg-[#F9FAFB]"
                          )}
                        >
                          {job}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="job" value={selectedJob} />
                  </div>

                  {/* 요일 선택 */}
                  <div className="space-y-3">
                    <Label htmlFor="day-select" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      요일 선택
                    </Label>
                    <div className="grid grid-cols-7 gap-2">
                      {(["월", "화", "수", "목", "금", "토", "일"] as const).map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={clsx(
                            "px-2 py-3 sm:px-3 sm:py-2.5 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all min-h-[44px]",
                            selectedDay === day
                              ? "border-[#8B5CF6] bg-[#F3E8FF] text-[#8B5CF6] shadow-md"
                              : "border-[#D1D5DB] bg-white text-[#5A4A5A] hover:border-[#8B5CF6] hover:bg-[#F9FAFB]"
                          )}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="day" value={selectedDay} />
                  </div>

                  {/* 시간대 선택 */}
                  <div className="space-y-3">
                    <Label htmlFor="time-select" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                      시간대 선택
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["오전", "오후", "저녁"] as const).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={clsx(
                            "px-4 py-4 sm:py-3 rounded-lg border-2 text-sm sm:text-base font-medium transition-all min-h-[44px]",
                            selectedTime === time
                              ? "border-[#8B5CF6] bg-[#F3E8FF] text-[#8B5CF6] shadow-md"
                              : "border-[#D1D5DB] bg-white text-[#5A4A5A] hover:border-[#8B5CF6] hover:bg-[#F9FAFB]"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="time" value={selectedTime} />
                  </div>

                  {/* Hidden fields for emotion and characterName */}
                  <input type="hidden" name="emotion" value={selectedEmotion || ""} />
                  <input type="hidden" name="characterName" value={getCharacterName(selectedEmotion)} />
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  {actionFeedback?.success ? (
                    <>
                      <div className="w-full rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                        <p className="text-green-800 font-semibold text-base">
                          {actionFeedback.message || "예약이 완료되었습니다. 곧 매니저가 연락드릴게요."}
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={handleReset}
                        className="w-full rounded-full py-4 text-base sm:text-lg font-semibold shadow-md transition bg-[#8B5CF6] hover:bg-[#7C3AED] text-white min-h-[52px]"
                      >
                        다시하기
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!selectedDay || !selectedTime || !selectedAge || !selectedJob || isFormSubmitting}
                      className={clsx(
                        "w-full rounded-full py-4 sm:py-4 text-sm sm:text-lg font-semibold shadow-md transition min-h-[52px] leading-tight break-words",
                        selectedDay && selectedTime && selectedAge && selectedJob && !isFormSubmitting
                          ? "bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
                          : "bg-[#E3ECF9] text-[#9CA3AF] cursor-not-allowed"
                      )}
                    >
                      {isFormSubmitting ? (
                        "제출 중..."
                      ) : (
                        <>
                          <span className="block sm:inline">1:1 세션 예약하고</span>
                          <span className="block sm:inline"> 내 캐릭터 자세히 보기</span>
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
                </Form>
              </Card>
            </div>
          </section>
          )}

          {/* Sticky CTA Footer */}
          {showSessionSection && (
            <div className="sticky bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[#E5E7EB] shadow-lg px-4 py-4">
            <div className="max-w-3xl mx-auto">
              <Button
                type="submit"
                form="booking-form"
                disabled={!selectedDay || !selectedTime || !selectedAge || !selectedJob || isFormSubmitting}
                className={clsx(
                  "w-full rounded-full py-4 text-sm sm:text-lg font-semibold shadow-md transition min-h-[52px] leading-tight break-words",
                  selectedDay && selectedTime && selectedAge && selectedJob && !isFormSubmitting
                    ? "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                    : "bg-[#E3ECF9] text-[#9CA3AF] cursor-not-allowed"
                )}
              >
                {isFormSubmitting ? (
                  "제출 중..."
                ) : (
                  <>
                    <span className="block sm:inline">1:1 세션 예약하고</span>
                    <span className="block sm:inline"> 내 캐릭터 자세히 보기</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          )}
        </div>
      )}

      </div>
    </>
  );
}


