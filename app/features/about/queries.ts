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
    
    if (!data) return [];
    
    // 매니저들도 이미지 URL 생성
    return data.map(manager => ({
      ...manager,
      qualifications: Array.isArray(manager.qualifications) ? manager.qualifications : [],
      career: Array.isArray(manager.career) ? manager.career : [],
      image: manager.image 
        ? `${client.supabaseUrl}/storage/v1/object/public/manager-images/${manager.image}`
        : '/placeholder.jpg'
    }));
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
		.limit(1)
		.maybeSingle();

	if (error) {
		console.error("[getRepresentativeFromManagers] supabase error:", error);
		return null;
	}
	
	if (!data) return null;
	
	// 실제 버킷명으로 변경 (예: 'images', 'profiles', 'manager-images' 등)
	const imageUrl = data.image 
  ? `${client.supabaseUrl}/storage/v1/object/public/manager-images/${data.image}`
  : '/placeholder.jpg';
	
	return {
		...data,
		qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
		career: Array.isArray(data.career) ? data.career : [],
		image: imageUrl
	};
}

