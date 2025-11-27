export type EmotionKey =
  | "행복가"
  | "공감가"
  | "조심가"
  | "열정가"
  | "휴식가"
  | "기대가"
  | "성찰가"
  | "평온가"
  | "탐구가";

export type EmotionGroup = "emotional" | "active" | "reflective";

export const CORE_SENTENCE: Record<EmotionKey, string> = {
  행복가: "소소한 기쁨을 누구보다 빨리 알아차리고 주변 공기를 밝히는 사람이에요.",
  공감가: "타인의 표정을 읽고 마음을 기대는 자리를 먼저 내어주는 사람이에요.",
  조심가: "상황을 세밀하게 살피며 안정적인 선택을 차분히 세워가는 사람이에요.",
  열정가: "막혀 있는 길에서도 새로운 시도를 떠올리는 추진형 에너지를 지녔어요.",
  휴식가: "쉼과 회복의 박자를 알고 스스로에게 온기를 나눌 줄 아는 사람이에요.",
  기대가: "아직 오지 않은 순간에도 설렘을 발견하고 가능성을 기획하는 사람이에요.",
  성찰가: "내면의 질문을 붙잡고 의미를 천천히 길어 올리는 사유형이에요.",
  평온가: "잔잔한 호흡으로 관계의 온도를 맞추며 주변을 안심시키는 사람이에요.",
  탐구가: "왜 그런지 끝까지 궁금해하며 구조를 이해하려는 탐색력을 지녔어요.",
};

export const SUB_SENTENCE: Record<EmotionKey, string> = {
  행복가: "또한 행복가의 기운이 스며들어 사소한 순간에서도 웃음을 찾고 있어요.",
  공감가: "또한 공감가의 결이 겹치며 사람들 이야기에 더 깊이 귀 기울이고 있어요.",
  조심가: "함께 조심가의 영향이 더해져 한 번 더 점검하고 싶어지는 마음이 커졌어요.",
  열정가: "또한 열정가의 불꽃이 올라와 지금의 답답함을 직접 흔들고 싶어져요.",
  휴식가: "요즘은 휴식가의 기운이 겹쳐 몸과 마음을 잠시 기대고 싶어져요.",
  기대가: "또한 기대가의 설렘이 깃들어 머릿속에 작은 실험 계획이 떠오르고 있어요.",
  성찰가: "함께 성찰가의 에너지가 움직이며 내면 이야기를 더 오래 붙잡고 있어요.",
  평온가: "또한 평온가의 숨결이 닿아 관계의 긴장을 느긋하게 풀어내고 있어요.",
  탐구가: "요즘은 탐구가의 호기심이 겹쳐 모든 경험에서 의미를 찾고 싶어져요.",
};

export const GROUP_SENTENCE: Record<EmotionGroup, string> = {
  emotional: "감정의 온도가 한층 짙어져 당신과 주변 모두가 잠시 숨을 고르게 됩니다.",
  active: "움직이고 싶은 열망이 차오르며 일상에 잔잔한 변화의 물결을 일으키고 있어요.",
  reflective: "내면을 들여다보는 시간이 깊어져 생각과 감정의 결을 또렷하게 느끼고 있어요.",
};

export function getGroup(emotion: EmotionKey): EmotionGroup {
  if (emotion === "행복가" || emotion === "공감가" || emotion === "평온가" || emotion === "휴식가") {
    return "emotional";
  }
  if (emotion === "열정가" || emotion === "기대가") {
    return "active";
  }
  return "reflective";
}

interface TemplateParams {
  main: EmotionKey;
  sub: EmotionKey;
  core: string;
  subSentence: string;
  groupSentence: string;
}

const duoLabel = (main: EmotionKey, sub: EmotionKey): string => (main === sub ? main : `${main} + ${sub}`);

export const TEMPLATES: Array<(params: TemplateParams) => string> = [
  ({ main, sub, core, subSentence, groupSentence }) =>
    `${core} ${subSentence} 그래서 지금의 당신은 ‘${duoLabel(main, sub)}’ 결이 겹쳐져 ${groupSentence}`,
  ({ main, sub, core, subSentence, groupSentence }) =>
    `${core} ${subSentence} 이 두 결이 포개지면서 ${groupSentence} ${main === sub ? `특히 ${main}다움이 더욱 진하게 번집니다.` : ""}`.trim(),
  ({ main, sub, core, subSentence, groupSentence }) =>
    `${core} ${subSentence} ${duoLabel(main, sub)}의 호흡이 이어지며 ${groupSentence}`,
];

const SAME_TYPE_SENTENCE = (emotion: EmotionKey): string => `특히 ${emotion}의 기질이 더욱 진하게 드러나는 시기입니다.`;

export function getCombinedMessage(main: EmotionKey, sub: EmotionKey): string {
  const coreSentence = CORE_SENTENCE[main];
  const subSentence = main === sub ? SAME_TYPE_SENTENCE(main) : SUB_SENTENCE[sub];
  const groupKey = getGroup(main === sub ? main : sub);
  const groupSentence = GROUP_SENTENCE[groupKey];
  const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  return template({
    main,
    sub,
    core: coreSentence,
    subSentence,
    groupSentence,
  });
}

