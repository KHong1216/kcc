import client from "../../lib/supa-client";

export interface Manager {
	id: number;
	name: string;
	image: string;
	introduction: string;
	graduation?: string;
	qualifications: string[];
	career: string[];
	specialty?: string;
	description?: string;
	is_active: boolean;
	is_representative?: boolean;
	created_at: string;
	updated_at: string;
}

export async function getManagers(): Promise<Manager[]> {
    const { data, error } = await client
      .from("managers")
      .select("*")
      .eq("is_active", true)
      .eq("is_representative", false) // 대표 제외
      .order("id", { ascending: true });
  
    if (error) {
      console.error("Error fetching managers:", error);
      return [];
    }
    return data || [];
  }

  export async function searchManagers(searchTerm: string): Promise<Manager[]> {
    const { data, error } = await client
      .from("managers")
      .select("*")
      .eq("is_active", true)
      .eq("is_representative", false) // 대표 제외
      .or([
        `name.ilike.%${searchTerm}%`,
        `specialty.ilike.%${searchTerm}%`,
        `introduction.ilike.%${searchTerm}%`,
      ].join(","))
      .order("id", { ascending: true });
  
    if (error) {
      console.error("Error searching managers:", error);
      return [];
    }
    return data || [];
  }

export async function getRepresentativeFromManagers(): Promise<Manager | null> {
	const { data, error } = await client
		.from("managers")
		.select("*")
		.eq("is_active", true)
		.eq("is_representative", true)
		.order("id", { ascending: true })
		.limit(1)
		.maybeSingle();

	if (error) {
		console.error("Error fetching representative:", error);
		return null;
	}
	return data ?? null;
}