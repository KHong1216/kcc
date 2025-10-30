import client from "../../lib/supa-client";

export interface ProgramUpdateInput {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  type: string;
}

export function listPrograms() {
  return client.from("programs").select("*").order("id");
}

export function updateProgram(input: ProgramUpdateInput) {
  const { id, ...rest } = input;
  return client.from("programs").update(rest).eq("id", id);
}

export function toggleProgramActive(id: number, isActive: boolean) {
  return client.from("programs").update({ is_active: !isActive }).eq("id", id);
}