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
    try {
      const { data, error } = await client
        .from("managers")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: true });
    
      if (error) {
        return [];
      }
      
      if (!data) {
        return [];
      }
      
      // 대표 제외 필터링 (is_representative가 true가 아닌 경우: false, null, undefined)
      const nonRepresentativeManagers = data.filter(manager => manager.is_representative !== true);
      
      // 매니저들도 이미지 URL 생성
      return nonRepresentativeManagers.map(manager => ({
        ...manager,
        qualifications: Array.isArray(manager.qualifications) ? manager.qualifications : [],
        career: Array.isArray(manager.career) ? manager.career : [],
        image: manager.image 
          ? `${client.supabaseUrl}/storage/v1/object/public/manager-images/${manager.image}`
          : '/placeholder.jpg'
      }));
    } catch (err) {
      return [];
    }
}

  export async function searchManagers(searchTerm: string): Promise<Manager[]> {
    const { data, error } = await client
      .from("managers")
      .select("*")
      .eq("is_active", true)
      .or([
        `name.ilike.%${searchTerm}%`,
        `specialty.ilike.%${searchTerm}%`,
        `introduction.ilike.%${searchTerm}%`,
      ].join(","))
      .order("id", { ascending: true });
  
    if (error) {
      return [];
    }
    
    if (!data) return [];
    
    // 대표 제외 필터링
    const nonRepresentativeManagers = data.filter(manager => manager.is_representative !== true);
    
    return nonRepresentativeManagers.map(manager => ({
      ...manager,
      qualifications: Array.isArray(manager.qualifications) ? manager.qualifications : [],
      career: Array.isArray(manager.career) ? manager.career : [],
      image: manager.image 
        ? `${client.supabaseUrl}/storage/v1/object/public/manager-images/${manager.image}`
        : '/placeholder.jpg'
    }));
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

