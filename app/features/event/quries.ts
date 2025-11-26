import client from "~/lib/supa-client";

export type JellyId =
  | "light-speak"
  | "memory-drop"
  | "care-active"
  | "time-blending"
  | "warming-touch";

export interface LovePotionJelly {
  id: JellyId;
  name: string;
  englishName: string;
  icon: string;
  tagline: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

export interface LovePotionResponse {
  id: string;
  received_jelly: JellyId;
  given_jelly: JellyId;
  created_at: string;
}

export interface CreateResponsePayload {
  receivedJelly: JellyId;
  givenJelly: JellyId;
}

export interface CreateReservationPayload {
  recordId: string;
  userName: string;
  userPhone: string;
  privacyAgreed: boolean;
}

export const jellyList: LovePotionJelly[] = [
  {
    id: "light-speak",
    name: "라이트 스피크",
    englishName: "Light Speak",
    icon: "💛",
    tagline: "Word Essence",
    description: "마음을 비추는 말빛 성분",
    color: "#FCD34D",
    bg: "rgba(252, 211, 77, 0.15)",
    border: "rgba(252, 211, 77, 0.5)",
  },
  {
    id: "memory-drop",
    name: "메모리 드롭",
    englishName: "Memory Drop",
    icon: "🎀",
    tagline: "Gift Element",
    description: "생각해준 흔적이 농축된 성분",
    color: "#F472B6",
    bg: "rgba(244, 114, 182, 0.15)",
    border: "rgba(244, 114, 182, 0.5)",
  },
  {
    id: "care-active",
    name: "케어 액티브",
    englishName: "Care Active",
    icon: "💙",
    tagline: "Service Extract",
    description: "보이지 않게 먼저 움직이는 힘",
    color: "#60A5FA",
    bg: "rgba(96, 165, 250, 0.15)",
    border: "rgba(96, 165, 250, 0.5)",
  },
  {
    id: "time-blending",
    name: "타임 블렌딩",
    englishName: "Time Blending",
    icon: "💜",
    tagline: "Time Infusion",
    description: "함께 흐르는 순간을 담은 추출물",
    color: "#A78BFA",
    bg: "rgba(167, 139, 250, 0.15)",
    border: "rgba(167, 139, 250, 0.5)",
  },
  {
    id: "warming-touch",
    name: "워밍 토치",
    englishName: "Warming Touch",
    icon: "❤️",
    tagline: "Touch Aura",
    description: "닿는 온기를 퍼뜨리는 성분",
    color: "#F87171",
    bg: "rgba(248, 113, 113, 0.15)",
    border: "rgba(248, 113, 113, 0.5)",
  },
];

export const synergyMessages: Record<string, string> = {
  "light-speak-light-speak":
    "말빛 성분이 충만한 균형 상태예요. 서로를 격려하는 언어가 이 관계를 더 빛나게 합니다.",
  "light-speak-memory-drop":
    "표현 방식이 다르지만, 작은 선물에 말빛 메시지를 함께 담아보세요.",
  "light-speak-care-active":
    "말과 행동의 간극을 줄이면 포션 효능이 극대화됩니다. 말한 만큼 행동으로 보여주세요.",
  "light-speak-time-blending":
    "따뜻한 말과 함께 시간을 보내며 공감대를 쌓으면 안정적인 사랑이 완성됩니다.",
  "light-speak-warming-touch":
    "감각적 접촉과 언어적 표현의 조율이 필요합니다. 스킨십 후 진심 어린 말을 전해보세요.",
};

export function getSynergyMessage(received: JellyId, given: JellyId) {
  return (
    synergyMessages[`${received}-${given}`] ??
    "받는 사랑과 주는 사랑의 리듬이 다릅니다. 서로의 언어를 번역하며 균형을 맞춰보세요."
  );
}

export async function createLovePotionResponse({
  receivedJelly,
  givenJelly,
}: CreateResponsePayload) {
  const { data, error } = await client
    .from("love_potion_responses")
    .insert({
      received_jelly: receivedJelly,
      given_jelly: givenJelly,
    })
    .select("id, received_jelly, given_jelly, created_at")
    .single();

  if (error) {
    throw error;
  }
  return data as LovePotionResponse;
}

export async function getLovePotionResponse(id: string) {
  const { data, error } = await client
    .from("love_potion_responses")
    .select("id, received_jelly, given_jelly, created_at")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data as LovePotionResponse;
}

export async function createLovePotionReservation({
  recordId,
  userName,
  userPhone,
}: CreateReservationPayload) {
  const { data: response, error: responseError } = await client
    .from("love_potion_responses")
    .select("received_jelly, given_jelly")
    .eq("id", recordId)
    .single();

  if (responseError || !response) {
    throw responseError ?? new Error("포션 정보를 불러올 수 없습니다.");
  }

  const { error } = await client.from("love_potion_reservations").insert({
    response_id: recordId,
    user_name: userName,
    user_phone: userPhone,
    received_jelly: response.received_jelly,
    given_jelly: response.given_jelly,
  });

  if (error) {
    throw error;
  }

  return { success: true };
}

