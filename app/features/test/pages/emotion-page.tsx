import { useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { Form, useNavigation } from "react-router";
import { z } from "zod";
import { Button } from "../../../common/components/ui/button";
import { Progress } from "../../../common/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../common/components/ui/card";
import { Label } from "../../../common/components/ui/label";
import clsx from "clsx";
import type { Route } from "./+types/emotion-page";
import { getEmotionParticipantCount, createEmotionTestResponse } from "../queries";
import { getCombinedMessage } from "../utils/emotion-composer";
import { archetypeToEmotion } from "../utils/archetype-to-emotion";
import type { Emotion } from "../../test/types";

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
  emotion: z.enum(["기쁨", "슬픔", "불안", "분노", "지침", "설렘", "허무", "안정", "혼란"], {
    message: "감정 정보가 올바르지 않습니다.",
  }),
  characterName: z.string().min(1, "캐릭터 정보가 없습니다."),
  day: z.enum(["월", "화", "수", "목", "금", "토", "일"], {
    message: "요일을 선택해주세요.",
  }),
  time: z.enum(["오전", "오후", "저녁"], {
    message: "시간대를 선택해주세요.",
  }),
  answers: z.string().optional(),
});

type QuizOptionId = "A" | "B" | "C" | "D";

type Archetype =
  | "행복가"
  | "공감가"
  | "조심가"
  | "열정가"
  | "휴식가"
  | "기대가"
  | "성찰가"
  | "평온가"
  | "탐구가";

interface QuizOption {
  id: QuizOptionId;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: QuizOption[];
}

type WeightEntry = Partial<Record<Archetype, number>>;
type WeightMap = Record<number, Record<QuizOptionId, WeightEntry>>;
type ArchetypeScores = Record<Archetype, number>;

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "요즘의 나는, 하루를 어떤 감정으로 시작하는 편인가?",
    options: [
      { id: "A", text: "그래도 오늘 뭐라도 해볼 수 있지 않을까 싶은 느낌." },
      { id: "B", text: "솔직히 몸과 마음이 무거워서 기어 나오는 느낌." },
      { id: "C", text: "하루 계획 세우고 부딪쳐보자는 마음이 생긴다." },
      { id: "D", text: "오늘도 그냥 의미를 찾아보게 된다." },
    ],
  },
  {
    id: 2,
    text: "친구가 갑자기 힘들다고 연락 왔을 때 나는?",
    options: [
      { id: "A", text: "일단 상황보다 감정부터 챙긴다. ‘너 괜찮아?’가 먼저." },
      { id: "B", text: "차분히 듣고, 어떤 선택지가 있는지 같이 생각해본다." },
      { id: "C", text: "‘이건 이렇게 해야지’ 해결책부터 떠오른다." },
      { id: "D", text: "왜 그런 감정을 느끼는지, 깊은 고민이 떠오른다." },
    ],
  },
  {
    id: 3,
    text: "미래를 생각하면 가장 먼저 드는 느낌은?",
    options: [
      { id: "A", text: "아직 막연하지만 그래도 가능성은 있다고 생각한다." },
      { id: "B", text: "준비가 덜 된 느낌이라 걱정이 앞선다." },
      { id: "C", text: "지금 상황을 뒤집고 싶다는 열망이 올라온다." },
      { id: "D", text: "‘나는 어떤 삶을 원했지?’ 자기 이해가 먼저 떠오른다." },
    ],
  },
  {
    id: 4,
    text: "주말 하루가 완전히 비면, 제일 먼저 끌리는 건?",
    options: [
      { id: "A", text: "카페 가서 햇살 아래서 여유 즐기기." },
      { id: "B", text: "아예 아무것도 안 하고 침대랑 합체." },
      { id: "C", text: "전시·팝업·새로운 곳 가보기." },
      { id: "D", text: "미뤄둔 생각 정리·계획·노트 정리." },
    ],
  },
  {
    id: 5,
    text: "누군가 나를 어떻게 기억해줬으면 좋겠나?",
    options: [
      { id: "A", text: "함께 있으면 편안하고 잔잔한 사람." },
      { id: "B", text: "다정하고 따뜻한 사람." },
      { id: "C", text: "진심 있고 추진력 있는 사람." },
      { id: "D", text: "깊고 생각 많은 사람." },
    ],
  },
  {
    id: 6,
    text: "작은 실수를 했을 때 나는?",
    options: [
      { id: "A", text: "‘다음엔 잘하면 되지 뭐~’ 금방 넘어간다." },
      { id: "B", text: "생각보다 오래 신경 쓰이고 마음이 무거워진다." },
      { id: "C", text: "바로 수정하고, 나름의 해결책을 빠르게 찾는다." },
      { id: "D", text: "왜 이런 실수를 했는지 의미부터 분석한다." },
    ],
  },
  {
    id: 7,
    text: "새로운 제안(모임/프로젝트/일)이 들어오면?",
    options: [
      { id: "A", text: "좋은 경험일 것 같아 끌린다." },
      { id: "B", text: "감당 가능할지 먼저 계산해본다." },
      { id: "C", text: "지금의 답답함을 깨볼 기회 같아 뭔가 불붙는다." },
      { id: "D", text: "일단 보류, 흐름을 지켜보면서 판단한다." },
    ],
  },
  {
    id: 8,
    text: "친밀한 사람과 갈등이 생겼을 때 나는?",
    options: [
      { id: "A", text: "상대 감정을 먼저 파악하려 한다." },
      { id: "B", text: "지금 내 감정·상황을 설명하며 차분하게 말한다." },
      { id: "C", text: "오해를 바로 풀기 위해 먼저 해결을 시도한다." },
      { id: "D", text: "이번 갈등이 나에게 뭘 의미하는지 돌아본다." },
    ],
  },
  {
    id: 9,
    text: "요즘 나에게 가장 필요한 건?",
    options: [
      { id: "A", text: "일상에서 소소한 즐거움과 설렘." },
      { id: "B", text: "마음이 가라앉을 수 있는 충분한 휴식." },
      { id: "C", text: "나를 움직이게 할 동기와 에너지." },
      { id: "D", text: "내 마음을 정리할 수 있는 내면의 시간." },
    ],
  },
  {
    id: 10,
    text: "나를 가장 닮은 말은?",
    options: [
      { id: "A", text: "“작은 행복도 소중하잖아?”" },
      { id: "B", text: "“나도 힘든데… 근데 또 이해되긴 해.”" },
      { id: "C", text: "“그냥 이대로는 못 있겠다.”" },
      { id: "D", text: "“내가 진짜 원하는 게 뭘까?”" },
    ],
  },
];

const WEIGHTS: WeightMap = {
  1: {
    A: { 기대가: 1, 행복가: 1 },
    B: { 휴식가: 1, 조심가: 1 },
    C: { 열정가: 1, 조심가: 1 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  2: {
    A: { 공감가: 2 },
    B: { 조심가: 1, 평온가: 1 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  3: {
    A: { 기대가: 1, 행복가: 1 },
    B: { 조심가: 2 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  4: {
    A: { 행복가: 1, 평온가: 1 },
    B: { 휴식가: 2 },
    C: { 기대가: 2 },
    D: { 성찰가: 1, 조심가: 1 },
  },
  5: {
    A: { 평온가: 2 },
    B: { 공감가: 2 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  6: {
    A: { 행복가: 2 },
    B: { 조심가: 1, 공감가: 1 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  7: {
    A: { 기대가: 1, 행복가: 1 },
    B: { 조심가: 1, 휴식가: 1 },
    C: { 열정가: 2 },
    D: { 평온가: 1, 탐구가: 1 },
  },
  8: {
    A: { 공감가: 2 },
    B: { 평온가: 2 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 탐구가: 1 },
  },
  9: {
    A: { 행복가: 1, 기대가: 1 },
    B: { 휴식가: 2 },
    C: { 열정가: 2 },
    D: { 성찰가: 1, 공감가: 1, 탐구가: 1 },
  },
  10: {
    A: { 행복가: 1, 평온가: 1 },
    B: { 공감가: 1 },
    C: { 열정가: 1, 기대가: 1 },
    D: { 성찰가: 1, 탐구가: 1, 조심가: 1 },
  },
};

const ARCHETYPE_ORDER: Archetype[] = [
  "행복가",
  "공감가",
  "조심가",
  "열정가",
  "휴식가",
  "기대가",
  "성찰가",
  "평온가",
  "탐구가",
];

const ARCHETYPE_DETAILS: Record<
  Archetype,
  {
    title: string;
    summary: string;
    guidance: string;
    emoji: string;
    highlight: string;
  }
> = {
  행복가: {
    title: "행복가",
    summary: "소소한 기쁨을 누구보다 빨리 발견하고 주변을 환하게 만드는 타입.",
    guidance: "지금의 밝음을 지키면서도, 마음이 지칠 때 쉬어갈 안전지대를 만들어 주세요.",
    emoji: "🌤️",
    highlight: "즐거움·낙관·회복",
  },
  공감가: {
    title: "공감가",
    summary: "타인의 감정을 먼저 읽고 기꺼이 곁을 내주는 따뜻한 사람.",
    guidance: "경청의 힘은 크지만, 내 감정도 똑같이 돌보겠다고 약속해 주세요.",
    emoji: "🤍",
    highlight: "다정함·연결·신뢰",
  },
  조심가: {
    title: "조심가",
    summary: "상황을 세밀하게 살피고 리스크를 줄이며 균형을 맞추는 전략가.",
    guidance: "불안은 당신의 민감함이 만든 레이더예요. 다만, 가끔은 의도적으로 틀에서 벗어나도 괜찮아요.",
    emoji: "🧭",
    highlight: "분석·안정·예방",
  },
  열정가: {
    title: "열정가",
    summary: "답답함을 깨고 새로운 길을 뚫어내는 추진형 에너지.",
    guidance: "속도보다 에너지를 건강하게 쓰는 방법을 찾으면, 지속력이 생깁니다.",
    emoji: "🔥",
    highlight: "추진력·도전·주도성",
  },
  휴식가: {
    title: "휴식가",
    summary: "멈춤과 회복의 가치를 알고 삶의 호흡을 맞추는 사람.",
    guidance: "쉼은 당신의 무기지만, 작은 움직임이 다시 빛을 열어 줄 때도 있다는 걸 기억하세요.",
    emoji: "🌙",
    highlight: "회복·자기돌봄·온기",
  },
  기대가: {
    title: "기대가",
    summary: "앞으로의 가능성을 먼저 바라보고 설렘으로 주변을 깨우는 타입.",
    guidance: "비전을 실현하기 위해서는 작은 실험과 기록이 필요합니다. 설렘을 현실로 번역해 보세요.",
    emoji: "✨",
    highlight: "비전·설렘·아이디어",
  },
  성찰가: {
    title: "성찰가",
    summary: "내면의 질문을 놓지 않고 깊이를 만들어 가는 사유형 인물.",
    guidance: "깊이 파고드는 능력이 강점이니, 가끔은 마음을 밖으로 말해줄 통로를 마련해 주세요.",
    emoji: "🪞",
    highlight: "사유·질문·통찰",
  },
  평온가: {
    title: "평온가",
    summary: "잔잔한 분위기를 유지하며 관계의 온도를 맞추는 조율자.",
    guidance: "갈등을 피하기보다, 평화를 만드는 당신의 방식을 믿고 한 걸음 먼저 말해 봐도 좋아요.",
    emoji: "🌿",
    highlight: "안정·조율·균형",
  },
  탐구가: {
    title: "탐구가",
    summary: "의미와 구조를 연구하며 삶의 지도를 그리는 탐색가.",
    guidance: "깊이 판 만큼, 그 이야기를 나누면 주변이 함께 성장합니다. 지식을 현실과 접속시켜 보세요.",
    emoji: "🔍",
    highlight: "탐색·이해·통찰",
  },
};

const RESULT_CTA_COPY = "나만의 캐릭터 활용 세션 신청하기 (확인)";
const ARCHETYPE_IMAGE_MAP: Record<Archetype, string> = {
  행복가: "/emotion/jubilation.png",
  공감가: "/emotion/empathy.png",
  조심가: "/emotion/anxiety.png",
  열정가: "/emotion/passion.png",
  휴식가: "/emotion/rest.png",
  기대가: "/emotion/expectation.png",
  성찰가: "/emotion/reflection.png",
  평온가: "/emotion/tranquility.png",
  탐구가: "/emotion/inquiry.png",
};

const createEmptyScores = (): ArchetypeScores =>
  ARCHETYPE_ORDER.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as ArchetypeScores);

const getQuizResult = (responses: Record<number, QuizOptionId>) => {
  const scores = createEmptyScores();

  Object.entries(responses).forEach(([questionId, optionId]) => {
    const weightEntry = WEIGHTS[Number(questionId)]?.[optionId as QuizOptionId];
    if (!weightEntry) {
      return;
    }
    Object.entries(weightEntry).forEach(([archetype, value]) => {
      scores[archetype as Archetype] += value ?? 0;
    });
  });

  const topArchetype = ARCHETYPE_ORDER.reduce((best, candidate) => {
    if (scores[candidate] > scores[best]) {
      return candidate;
    }
    return best;
  }, ARCHETYPE_ORDER[0]);

  return { topArchetype, scores };
};

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/emotion";
  return [
    { title: "KOI 캐릭터 테스트 - 30초만에 내 마음 속 진짜 감정 캐릭터 찾기 | 코이창작소" },
    {
      name: "description",
      content:
        "10개의 질문으로 지금의 감정 패턴을 정밀 분석해 드립니다. 빠르게 나만의 KOI 감정 캐릭터를 확인하고, 1:1 세션으로 더 깊이 있는 이해를 시작해보세요.",
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
        "10개의 문항으로 지금의 감정 패턴을 측정하고, 나만의 KOI 감정 캐릭터를 확인해 보세요. 1:1 세션으로 더 깊이 있는 이해를 이어갈 수 있습니다.",
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
        "10개의 질문으로 내 감정 캐릭터를 찾고, KOI 매니저와 1:1 세션까지 연결되는 경험을 시작해보세요.",
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
    answers: String(formData.get("answers") ?? "").trim() || undefined,
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

  // answers JSON 파싱
  let answersParsed: Record<string, string> | null = null;
  if (validatedData.answers) {
    try {
      answersParsed = JSON.parse(validatedData.answers);
    } catch (error) {
      console.error("[emotion-page action] Failed to parse answers JSON:", error);
    }
  }

  const result = await createEmotionTestResponse({
    name: validatedData.name,
    age: validatedData.age,
    contact: validatedData.contact,
    job: validatedData.job,
    emotion: validatedData.emotion,
    characterName: validatedData.characterName,
    day: validatedData.day,
    time: validatedData.time,
    answers: answersParsed,
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
const QUIZ_TOTAL_STEPS = 3;
const QUIZ_STEP_INDEX = 2;
const CARD_CLASS =
  "w-full max-w-2xl mx-auto rounded-3xl bg-white/85 shadow-lg p-8 space-y-6 backdrop-blur";
const TITLE_CLASS = "text-3xl font-semibold text-[#3B2F2F]";
const SUBTITLE_CLASS = "text-base text-[#5A4A4A]";
const QUIZ_SECTION_CARD_CLASS =
  "relative z-10 w-full max-w-5xl mx-auto rounded-3xl bg-white/80 backdrop-blur-md shadow-[0_18px_60px_rgba(173,134,255,0.22)] px-5 sm:px-10 py-6 space-y-6 sm:space-y-7";
const QUIZ_OPTION_LIST_CLASS = "space-y-1.5 sm:space-y-3";
const QUIZ_OPTION_BUTTON_CLASS =
  "w-full rounded-2xl border-2 px-4 py-3 sm:py-3.5 text-left text-sm sm:text-base font-medium leading-relaxed transition-all bg-white/90 shadow-sm focus-visible:outline-none will-change-transform";
const QUIZ_OPTION_SELECTED_CLASS =
  "border-[#8B5CF6] bg-gradient-to-br from-[#EFE2FF] to-white text-[#2E1E44] shadow-lg scale-[1.01]";
const QUIZ_OPTION_IDLE_CLASS = "border-transparent hover:border-[#DCCFF8] hover:scale-[1.005]";
const QUIZ_SECTION_WRAPPER_CLASS =
  "relative min-h-screen bg-gradient-to-b from-[#FFF8F5] via-[#FFEFF8] to-[#FDF6F0] px-4 sm:px-8 py-4 sm:py-6 lg:py-0 lg:flex lg:items-center animate-fade-in will-change-transform";

function blurActiveElement() {
  if (typeof document === "undefined") return;
  const activeElement = document.activeElement as HTMLElement | null;
  if (activeElement && typeof activeElement.blur === "function") {
    activeElement.blur();
  }
}

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOptionId>>({});
  const [resultArchetype, setResultArchetype] = useState<Archetype | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ArchetypeScores | null>(null);
  const [selectedDay, setSelectedDay] = useState<"월" | "화" | "수" | "목" | "금" | "토" | "일" | "">("");
  const [selectedTime, setSelectedTime] = useState<"오전" | "오후" | "저녁" | "">("");
  const [selectedAge, setSelectedAge] = useState<number | "">("");
  const [selectedJob, setSelectedJob] = useState<"무직" | "학생" | "대학생" | "직장인" | "">("");
  const [showSessionSection, setShowSessionSection] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const participantCount = loaderData?.participantCount ?? 0;
  const formattedParticipantCount = new Intl.NumberFormat("ko-KR").format(participantCount || 0);
  const totalSteps = 3;
  const quizProgress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
  const overallProgress = (currentPage / totalSteps) * 100;
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const selectedOptionForQuestion = answers[currentQuestion.id];
  const resultDetail = resultArchetype ? ARCHETYPE_DETAILS[resultArchetype] : null;
  const topScoreEntries = scoreBreakdown
    ? Object.entries(scoreBreakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
    : [];
  const secondaryEntry = topScoreEntries.length > 1 ? topScoreEntries[1] : null;
  const secondaryArchetype = secondaryEntry ? (secondaryEntry[0] as Archetype) : null;
  const secondaryDetail = secondaryArchetype ? ARCHETYPE_DETAILS[secondaryArchetype] : null;
  const resultImageSrc = resultArchetype ? ARCHETYPE_IMAGE_MAP[resultArchetype] : null;
  const secondaryImageSrc = secondaryArchetype ? ARCHETYPE_IMAGE_MAP[secondaryArchetype] : null;
  const combinedMessage = resultArchetype
    ? getCombinedMessage(resultArchetype, secondaryArchetype ?? resultArchetype)
    : null;
  const mainScore = resultArchetype && scoreBreakdown ? scoreBreakdown[resultArchetype] ?? null : null;
  const secondaryScore = secondaryArchetype && scoreBreakdown ? scoreBreakdown[secondaryArchetype] ?? null : null;
  const maxScore = scoreBreakdown ? Math.max(...Object.values(scoreBreakdown)) : 0;
  const highlightTokens =
    resultDetail?.highlight
      ?.split("·")
      .map((token) => token.trim())
      .filter(Boolean) ?? [];

  const handleStart = () => {
    setIsPageTransitioning(true);
    setCurrentPage(2);
    setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
  };

  const handleSelectOption = (optionId: QuizOptionId) => {
    if (isPageTransitioning) return;
    blurActiveElement();
    const question = QUESTIONS[currentQuestionIndex];
    const updatedAnswers = { ...answers, [question.id]: optionId };
    setAnswers(updatedAnswers);
    setIsPageTransitioning(true);

    setTimeout(() => {
      setIsPageTransitioning(false);
      const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
      if (isLastQuestion) {
        const { topArchetype, scores } = getQuizResult(updatedAnswers);
        setResultArchetype(topArchetype);
        setScoreBreakdown(scores);
        setCurrentPage(3);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 180);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex === 0 || isPageTransitioning) return;
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResultArchetype(null);
    setScoreBreakdown(null);
    setSelectedDay("");
    setSelectedTime("");
    setSelectedAge("");
    setSelectedJob("");
    setShowSessionSection(false);
    setIsPageTransitioning(false);
  };

  // ④ state 초기화 - 질문 변경 시 선택 상태 초기화하여 잔상 방지
  useEffect(() => {
    // 질문이 변경되면 선택 상태를 초기화 (answers는 유지하되 시각적 잔상 방지)
    if (currentPage === 2) {
      // 질문 변경 시 transition 상태 초기화 및 강제 리렌더링
      setIsPageTransitioning(false);
      blurActiveElement();
      // DOM 업데이트를 위한 작은 딜레이로 완전한 리렌더링 보장
      const timer = setTimeout(() => {
        // 현재 질문에 대한 선택 상태만 표시되도록 보장
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, currentPage]);

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
      {/* Prevent tap highlight on mobile */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              -webkit-tap-highlight-color: transparent;
            }
            button:focus,
            button:focus-visible,
            button:focus-within,
            button::-moz-focus-inner,
            button:focus::-moz-focus-inner {
              outline: none;
              box-shadow: none;
            }
              
          `,
        }}
      />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "KOI 캐릭터 테스트",
            description:
              "10개의 질문으로 당신의 감정 패턴을 빠르게 분석합니다. KOI 감정 캐릭터를 확인하고, 1:1 세션으로 더 깊이 있는 이해를 이어가 보세요.",
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
              30초 테스트: 나를 발견하는 감정 캐릭터 테스트
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[#4A3F55] leading-relaxed break-keep">
              지금 당신은 어떤 마음으로 하루를 시작하고 있을까요?
              <br />
              복잡한 내면을 KOI 캐릭터로 솔직하게 확인해 보세요.
            </p>

            <div className="mt-10 w-full max-w-md rounded-3xl bg-white/70 p-6 shadow-xl backdrop-blur">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold text-[#FF8FB1] animate-pulse">
                  ⭐ 지금까지 {formattedParticipantCount}명의 청년이 이 테스트로 자신을 발견했습니다.
                </p>
                <Button
                  type="button"
                  onClick={handleStart}
                  className="w-full rounded-full bg-[#8B5CF6] py-4 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-[0_15px_40px_rgba(139,92,246,0.35)] transition-transform duration-300 hover:scale-[1.02] hover:bg-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] min-h-[52px]"
                >
                  지금 바로 시작하기
                </Button>
                <p className="text-xs text-[#6B5A5A]">
                  시작하고 1:1 심층 코칭 안내받기
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 2: 10-question Quiz */}
      {currentPage === 2 && (
        <section key="page-2" className={QUIZ_SECTION_WRAPPER_CLASS}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 right-10 h-40 w-40 rounded-full bg-[#E4D2FF] blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#FFE3F1] blur-3xl opacity-70" />
          </div>

          <div className={QUIZ_SECTION_CARD_CLASS}>
            <div className="text-center space-y-4">
              <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
                KOI 캐릭터 테스트
              </p>
              <Progress
                value={(QUIZ_STEP_INDEX / QUIZ_TOTAL_STEPS) * 100}
                className="max-w-2xl mx-auto bg-[#E8DCF8] [&>div]:bg-[#A78BFA]"
              />
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B5CF6]">
                  QUESTION {currentQuestionIndex + 1} / {QUESTIONS.length}
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F1F2B] leading-relaxed break-keep">
                  {currentQuestion.text}
                </h2>
                <p className="text-sm sm:text-base text-[#4A3F55] leading-relaxed break-keep">
                  지금 마음에 가장 가까운 선택지를 고르고, 솔직한 내면의 답을 찾아주세요.
                </p>
              </div>
            </div>

            <div className={QUIZ_OPTION_LIST_CLASS} key={`question-options-${currentQuestion.id}-${currentQuestionIndex}`}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionForQuestion === option.id;
                return (
                  <button
                    key={`${currentQuestion.id}-${option.id}-${currentQuestionIndex}`}
                    id={`question-${currentQuestion.id}-option-${option.id}`}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={clsx(
                      QUIZ_OPTION_BUTTON_CLASS,
                      isSelected ? QUIZ_OPTION_SELECTED_CLASS : QUIZ_OPTION_IDLE_CLASS
                    )}
                    disabled={isPageTransitioning}
                  >
                    <p className="text-[#1F1F2B] break-keep">{option.text}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 sm:pt-5 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-between text-sm text-[#6B5A5A]">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0 || isPageTransitioning}
                className="text-[#7C3AED] hover:bg-[#F3E8FF] px-4"
              >
                이전 질문으로 돌아가기
              </Button>
              <div className="w-full sm:w-1/2">
                <Progress value={quizProgress} className="bg-[#FFE6F3] [&>div]:bg-[#FF8FB1]" />
                <p className="mt-2 text-center text-xs text-[#B85676]">
                  {currentQuestionIndex + 1} / {QUESTIONS.length} 진행 중
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 3: 결과 & 전환 페이지 (롱스크롤) */}
      {currentPage === 3 && resultDetail && (
        <div key="page-3" className="min-h-screen bg-gradient-to-b from-white via-[#FDF6F0] to-white animate-fade-in">
          <section className="relative min-h-screen px-4 sm:px-10 py-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-28 left-1/4 h-44 w-44 rounded-full bg-[#E4E4FF] blur-3xl opacity-60" />
              <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-[#FFE6F3] blur-3xl opacity-70" />
            </div>
            <div className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl bg-white/80 backdrop-blur-md shadow-[0_18px_60px_rgba(173,134,255,0.22)] px-6 sm:px-12 py-8 space-y-6">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between mb-2">
                <div className="space-y-1 text-center lg:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B5CF6]">STEP 3 / {totalSteps}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1F2B]">나를 발견하는 여정</h2>
                  <p className="text-sm text-[#4A3F55]">캐릭터 테스트 결과</p>
                </div>
                <div className="w-full lg:w-56">
                  <Progress value={overallProgress} className="bg-[#E8DCF8] [&>div]:bg-[#8B5CF6]" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-[#E7DFFC] bg-white/90 p-5 sm:p-7">
                  <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
                    <div className="space-y-5 text-center">
                      <div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED] flex items-center justify-center overflow-hidden shadow-2xl">
                        {resultImageSrc ? (
                          <img src={resultImageSrc} alt={resultDetail.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-6xl sm:text-7xl drop-shadow-lg">{resultDetail.emoji}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B5CF6]">MAIN RESULT</p>
                        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1F1F2B]">당신은 {resultDetail.title} 입니다.</h1>
                        <p className="mt-1 text-sm text-[#7A6A6A]">끊임없이 자신을 발견하는 여정의 주인공</p>
                      </div>
                      {highlightTokens?.length ? (
                        <div className="flex flex-wrap justify-center gap-2">
                          {highlightTokens.map((token) => (
                            <span key={token} className="rounded-full border border-[#E5DAFF] bg-[#F7F1FF] px-3 py-1 text-xs font-semibold text-[#6B4AA0]">
                              #{token}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {mainScore !== null && maxScore > 0 && (
                        <div className="text-left space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#5A4A4A]">
                            <span>메인 에너지</span>
                            <span>{mainScore}pt</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#F3E8FF]">
                            <div
                              className="h-full rounded-full bg-[#8B5CF6]"
                              style={{ width: `${Math.min(100, (mainScore / maxScore) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-[#EDE4FF] bg-[#F9F6FF] p-4 sm:p-5 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B5CF6]">당신의 에너지를 움직이는 힘</p>
                        <p className="text-lg sm:text-xl font-bold text-[#2E1E44]">
                          {resultDetail.title}의 핵심 동력
                        </p>
                        <ul className="space-y-2 text-sm sm:text-base text-[#4A3F55] leading-relaxed">
                          <li className="flex gap-2">
                            <span className="text-[#8B5CF6] font-bold">•</span>
                            <span>{resultDetail.summary}</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[#8B5CF6] font-bold">•</span>
                            <span>{resultDetail.guidance}</span>
                          </li>
                        </ul>
                      </div>
                      {combinedMessage && (
                        <div className="rounded-2xl border border-[#E5DAFF] bg-gradient-to-br from-white to-[#F7F1FF] p-4 text-sm sm:text-base text-[#3A2F4A] leading-relaxed shadow-sm">
                          {combinedMessage}
                        </div>
                      )}
                      <div className="rounded-2xl border border-[#FFE1ED] bg-[#FFF7FA] p-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FF8FB1]">오늘의 리추얼 제안</p>
                        <p className="text-sm sm:text-base text-[#5A3F48] leading-relaxed">
                          {resultDetail.title}의 강점을 살리려면, 오늘 하루 {resultDetail.highlight.replace(/·/g, ", ")} 중 하나를 의식적으로 실험해 보세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {secondaryDetail && (
                  <div className="rounded-3xl border border-[#FFE1ED] bg-white/90 p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFF4F8] flex items-center justify-center shadow">
                          {secondaryImageSrc ? (
                            <img src={secondaryImageSrc} alt={secondaryDetail.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-4xl">{secondaryDetail.emoji}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FF8FB1]">SUB RESULT</p>
                          <h3 className="text-xl font-bold text-[#B85676]">{secondaryDetail.title}</h3>
                          <p className="text-sm text-[#6B5A5A]">{secondaryDetail.summary}</p>
                        </div>
                      </div>
                      {secondaryScore !== null && maxScore > 0 && (
                        <div className="w-full lg:max-w-sm space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#B85676]">
                            <span>보조 에너지</span>
                            <span>{secondaryScore}pt</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#FFE1ED]">
                            <div
                              className="h-full rounded-full bg-[#FF8FB1]"
                              style={{ width: `${Math.min(100, (secondaryScore / maxScore) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-[#6B5A5A] leading-relaxed">
                      {secondaryDetail.guidance}
                    </p>
                  </div>
                )}

                {topScoreEntries.length > 0 && (
                  <div className="rounded-3xl border border-[#E8DFFB] bg-white/90 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-[#1F1F2B]">나의 캐릭터 스탯</h4>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7C90B1]">TOP {topScoreEntries.length}</span>
                    </div>
                    <div className="space-y-3">
                      {topScoreEntries.map(([type, score]) => (
                        <div key={type} className="space-y-1">
                          <div className="flex items-center justify-between text-sm font-semibold text-[#4A3F55]">
                            <span>{type}</span>
                            <span>{score}pt</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#F0F4FF]">
                            <div
                              className="h-full rounded-full bg-[#8B5CF6]"
                              style={{ width: `${maxScore > 0 ? Math.min(100, (score / maxScore) * 100) : 0}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowSessionSection(true);
                    setTimeout(() => {
                      const sessionSection = document.getElementById("session-section");
                      sessionSection?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm sm:text-lg font-semibold shadow-[0_15px_40px_rgba(139,92,246,0.35)] transition-transform duration-300 hover:scale-[1.02] leading-tight break-words"
                >
                  {RESULT_CTA_COPY}
                </Button>
              </div>
            </div>
          </section>

          {showSessionSection && (
            <section id="session-section" className="relative px-4 sm:px-6 py-16 bg-white animate-fade-in">
              <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
                <div className="text-center space-y-3 sm:space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8B5CF6]">
                    캐릭터 활용 전략
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F1F2B] leading-relaxed break-keep px-2">
                    {resultDetail.title} 조합을 실전에서 120% 활용하고 싶다면?
                  </h2>
                  <p className="text-sm sm:text-base text-[#5A4A4A] leading-relaxed break-keep">
                    KOI 전략 파트너가 메인·서브 감정가의 결을 분석해, 불안을 확신으로 바꾸는 실행 전략을 함께 설계합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#F3E8FF] to-white">
                    <div className="text-4xl">🔍</div>
                    <h3 className="font-semibold text-[#3A556A]">나만의 강점 확인</h3>
                    <p className="text-sm text-[#5A4A4A] break-keep">복잡한 고민 대신, 내가 왜 이렇게 행동하는지 정답을 찾아 확인해요.</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#E0E7FF] to-white">
                    <div className="text-4xl">🛡️</div>
                    <h3 className="font-semibold text-[#3A556A]">실패 확률 줄이기</h3>
                    <p className="text-sm text-[#5A4A4A] break-keep">캐릭터 조합의 취약점을 미리 알아, 시간 낭비와 시행착오를 줄입니다.</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#FCE7F3] to-white">
                    <div className="text-4xl">✨</div>
                    <h3 className="font-semibold text-[#3A556A]">바로 쓰는 액션 팁</h3>
                    <p className="text-sm text-[#5A4A4A] break-keep">거창한 로드맵 대신, 내일부터 적용할 1주일 분량의 행동 팁을 받습니다.</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFF8F5] to-white border border-[#F3E8FF] text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F1F2B] leading-relaxed break-keep">자주 묻는 질문</h3>
                  <div className="space-y-3 text-sm sm:text-base text-[#5A4A4A] leading-relaxed">
                    <div>
                      <p className="font-semibold text-[#8B5CF6]">Q. 꼭 심각한 고민이 있어야 하나요?</p>
                      <p className="mt-1">
                        A. 아닙니다. “이 캐릭터를 어떻게 써야 할까요?”라는 궁금증만 있어도 충분합니다. 지금의 상태를 확실히 확인하려는 청년들에게
                        맞춘 가벼운 전략 세션입니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#8B5CF6]">Q. 시간과 비용이 부담돼요.</p>
                      <p className="mt-1">
                        A. 첫 만남은 1회 체험 형태로 진행돼요. 약 20~40분 동안 핵심만 빠르게 점검하고, 세션 이후에만 상세 안내를 드립니다.
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="max-w-2xl mx-auto">
                  <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6 pt-6 sm:pt-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-[#3A556A]">
                      내 조합 기반 피드백 세션 예약하기
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
                        resultArchetype,
                      });
                    }}
                  >
                    <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
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

                      <div className="space-y-3">
                        <Label htmlFor="day-select" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                          선호 요일
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

                      <div className="space-y-3">
                        <Label htmlFor="time-select" className="text-sm sm:text-base font-semibold text-[#3A556A]">
                          선호 시간대
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

                      <input
                        type="hidden"
                        name="emotion"
                        value={resultArchetype ? archetypeToEmotion(resultArchetype) : ""}
                      />
                      <input type="hidden" name="characterName" value={resultDetail.title} />
                      <input
                        type="hidden"
                        name="answers"
                        value={JSON.stringify(
                          Object.fromEntries(
                            Object.entries(answers).map(([key, value]) => [String(key), value])
                          )
                        )}
                      />
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
                          disabled={isFormSubmitting}
                          className={clsx(
                            "w-full rounded-full py-4 sm:py-4 text-sm sm:text-lg font-semibold shadow-md transition min-h-[52px] leading-tight break-words",
                            isFormSubmitting ? "bg-[#E3ECF9] text-[#9CA3AF]" : "bg-[#A78BFA] hover:bg-[#8B5CF6] text-white"
                          )}
                        >
                          {isFormSubmitting ? "확인 중..." : "나만의 캐릭터 활용 세션 신청하기 (확인)"}
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
                  disabled={isFormSubmitting}
                  className={clsx(
                    "w-full rounded-full py-4 text-sm sm:text-lg font-semibold shadow-md transition min-h-[52px] leading-tight break-words",
                    isFormSubmitting ? "bg-[#E3ECF9] text-[#9CA3AF]" : "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  )}
                >
                  {isFormSubmitting ? "확인 중..." : RESULT_CTA_COPY}
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


