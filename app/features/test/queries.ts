import client from "~/lib/supa-client";

export async function getEmotionParticipantCount(): Promise<number> {
  const { count, error } = await client
    .from("emotion_test_responses")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("[queries] failed to count emotion_test_responses", error);
    return 0;
  }

  return count ?? 0;
}

export interface CreateEmotionTestResponseInput {
  name: string;
  age: number;
  contact: string;
  job: "무직" | "학생" | "대학생" | "직장인";
  emotion: string;
  characterName: string;
  day: string;
  time: string;
  answers?: Record<string, string> | null;
}

export async function createEmotionTestResponse(
  input: CreateEmotionTestResponseInput
): Promise<{ success: boolean; error?: string }> {
  const { error } = await client.from("emotion_test_responses").insert({
    name: input.name,
    age: input.age,
    contact: input.contact,
    job: input.job,
    emotion: input.emotion,
    character_name: input.characterName,
    day: input.day,
    time: input.time,
    answers: input.answers || null,
  });

  if (error) {
    console.error("[queries] failed to create emotion_test_response", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getProgramVoteCount(programNames?: string[]): Promise<number> {
  try {
    let query = client.from("program_votes").select("*", { count: "exact", head: true });

    if (programNames && programNames.length > 0) {
      query = query.in("program_name", programNames);
    }

    const { count, error } = await query;

    if (error) {
      console.error("[queries] failed to count program_votes", error);
      // 테이블이 없을 경우 0 반환
      if (error.code === "PGRST116" || error.message?.includes("does not exist")) {
        return 0;
      }
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("[queries] unexpected error counting program_votes", error);
    return 0;
  }
}

export async function createProgramVote(
  programName: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await client.from("program_votes").insert({
    program_name: programName,
  });

  if (error) {
    console.error("[queries] failed to create program_vote", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}