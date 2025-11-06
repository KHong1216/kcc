import type { MetaFunction } from "react-router";
import type { Route } from "./+types/managers-page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import { Badge } from "../../../common/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../common/components/ui/dialog";
import { 
  Plus, 
  Trash2,
  Edit
} from "lucide-react";
import client from "../../../lib/supa-client";
import { useState } from "react";

export const meta: MetaFunction = () => [{ title: "매니저 설정 | 코이창작소" }];

export async function loader({ request }: Route.LoaderArgs) {
  const { data: { session } } = await client.auth.getSession();
  if (!session) return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") return new Response(null, { status: 302, headers: { Location: "/admin/login" } });

  const { data: managers } = await client.from("managers").select("*").order("id", { ascending: true });
  
  // 이미지 URL 변환
  const managersWithImageUrl = (managers ?? []).map(manager => ({
    ...manager,
    imageUrl: manager.image 
      ? client.storage.from("manager-images").getPublicUrl(manager.image).data.publicUrl
      : null
  }));
  
  return { managers: managersWithImageUrl };
}

export async function action({ request }: Route.ActionArgs) {
  // 먼저 세션 확인
  const { data: { session } } = await client.auth.getSession();
  if (!session) {
    return { error: "로그인이 필요합니다." };
  }
  
  // 관리자 권한 확인
  const { data: profile } = await client.from("profiles").select("role").eq("email", session.user.email).single();
  if (profile?.role !== "admin") {
    return { error: "관리자 권한이 없습니다." };
  }

  const form = await request.formData();
  const intent = String(form.get("intent") || "");

  if (intent === "add") {
    let imagePath = "";
    
    // 이미지 파일 업로드 처리
    const imageFile = form.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      // 세션의 access token을 사용하여 업로드
      const { error: uploadError } = await client.storage
        .from("manager-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
          // 세션 토큰을 명시적으로 전달
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        return { error: "이미지 업로드에 실패했습니다." };
      }

      imagePath = filePath;
    }

    const payload = {
      name: String(form.get("name") || ""),
      image: imagePath,
      introduction: String(form.get("introduction") || ""),
      graduation: String(form.get("graduation") || ""),
      qualifications: String(form.get("qualifications") || "").split(",").map(s => s.trim()).filter(Boolean),
      career: String(form.get("career") || "").split(",").map(s => s.trim()).filter(Boolean),
      specialty: String(form.get("specialty") || ""),
      description: String(form.get("description") || ""),
      is_active: true,
      is_representative: false
    };
    await client.from("managers").insert(payload);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "toggle-active") {
    const id = Number(form.get("id"));
    const is_active = String(form.get("is_active")) === "true";
    await client.from("managers").update({ is_active: !is_active }).eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "toggle-rep") {
    const id = Number(form.get("id"));
    const is_representative = String(form.get("is_representative")) === "true";
    await client.from("managers").update({ is_representative: !is_representative }).eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "update") {
    const id = Number(form.get("id"));
    
    // 기존 매니저 정보 가져오기
    const { data: existingManager } = await client.from("managers").select("image").eq("id", id).single();
    
    let imagePath = existingManager?.image || "";
    
    // 새 이미지 파일이 업로드된 경우 처리
    const imageFile = form.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      // 기존 이미지 삭제 (있을 경우)
      if (existingManager?.image) {
        await client.storage.from("manager-images").remove([existingManager.image]);
      }

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await client.storage
        .from("manager-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        return { error: "이미지 업로드에 실패했습니다." };
      }

      imagePath = filePath;
    }

    const payload = {
      name: String(form.get("name") || ""),
      image: imagePath,
      introduction: String(form.get("introduction") || ""),
      graduation: String(form.get("graduation") || ""),
      qualifications: String(form.get("qualifications") || "").split(",").map(s => s.trim()).filter(Boolean),
      career: String(form.get("career") || "").split(",").map(s => s.trim()).filter(Boolean),
      specialty: String(form.get("specialty") || ""),
      description: String(form.get("description") || ""),
    };
    await client.from("managers").update(payload).eq("id", id);
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  if (intent === "delete") {
    const id = Number(form.get("id"));
    
    // 삭제 전에 이미지 파일 경로 가져오기
    const { data: managerToDelete } = await client.from("managers").select("image").eq("id", id).single();
    
    // 데이터베이스에서 삭제
    await client.from("managers").delete().eq("id", id);
    
    // Storage에서 이미지 파일 삭제
    if (managerToDelete?.image) {
      await client.storage.from("manager-images").remove([managerToDelete.image]);
    }
    
    return new Response(null, { status: 302, headers: { Location: new URL(request.url).pathname } });
  }

  return { ok: true };
}

export default function ManagersPage({ loaderData }: Route.ComponentProps) {
  const { managers } = loaderData as { managers: any[] };
  const [editingManager, setEditingManager] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (manager: any) => {
    setEditingManager(manager);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">매니저 설정</h1>
          <p className="text-gray-600">매니저 정보를 추가하고 활성화 상태를 관리하세요.</p>
        </div>

        {/* 매니저 추가 폼 */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <CardTitle>새 매니저 추가</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form method="post" encType="multipart/form-data" className="space-y-6">
              <input type="hidden" name="intent" value="add" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input name="name" placeholder="홍길동" required className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이미지 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      name="image" 
                      type="file" 
                      accept="image/*" 
                      required 
                      className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    />
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF 형식의 이미지를 업로드하세요.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      소개 한 줄
                    </label>
                    <Input name="introduction" placeholder="예: 문학과 글쓰기를 사랑하는 매니저" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      졸업
                    </label>
                    <Input name="graduation" placeholder="예: 서울대학교 문학과" className="w-full" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자격증 (쉼표 구분)
                    </label>
                    <Input name="qualifications" placeholder="예: 국어교사 자격증, 문학치료사" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      경력 (쉼표 구분)
                    </label>
                    <Input name="career" placeholder="예: 작가, 문학 평론가, 강사" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전문 분야
                    </label>
                    <Input name="specialty" placeholder="예: 에세이, 시, 소설" className="w-full" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 설명
                    </label>
                    <Textarea name="description" placeholder="매니저에 대한 상세한 설명을 작성하세요." rows={3} className="w-full" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button type="submit" className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  매니저 추가
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 매니저 목록 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">매니저 목록</h2>
            <Badge variant="outline">{managers.length}명</Badge>
          </div>

          {managers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 text-lg">등록된 매니저가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managers.map(m => (
                <Card key={m.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b pb-3 flex-shrink-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{m.name}</CardTitle>
                        {m.introduction && (
                          <p className="text-sm text-gray-600">{m.introduction}</p>
                        )}
                      </div>
                      {m.imageUrl && (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
                          <img 
                            src={m.imageUrl} 
                            alt={m.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.classList.add('bg-gray-200');
                            }}
                          />
                        </div>
                      )}
                      {!m.imageUrl && m.image && (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center ml-3 flex-shrink-0 border-2 border-white shadow-md">
                          <span className="text-xl font-bold text-gray-700">
                            {m.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 flex-1 flex flex-col space-y-4">
                    {/* 정보 표시 */}
                    <div className="space-y-2 text-sm flex-1">
                      {m.graduation && (
                        <div>
                          <span className="text-gray-500">졸업:</span> <span className="text-gray-700">{m.graduation}</span>
                        </div>
                      )}
                      {m.specialty && (
                        <div>
                          <span className="text-gray-500">전문:</span> <span className="text-gray-700">{m.specialty}</span>
                        </div>
                      )}
                      {m.qualifications && m.qualifications.length > 0 && (
                        <div>
                          <span className="text-gray-500">자격:</span> 
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.isArray(m.qualifications) 
                              ? m.qualifications.map((q: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{q}</Badge>
                                ))
                              : <span className="text-gray-700">{m.qualifications}</span>
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 상태 배지 */}
                    <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                      <Badge variant={m.is_active ? "default" : "secondary"}>
                        {m.is_active ? "활성" : "비활성"}
                      </Badge>
                      {m.is_representative && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                          대표
                        </Badge>
                      )}
                    </div>

                    {/* 액션 버튼 - 항상 하단 고정 */}
                    <div className="pt-2 border-t mt-auto flex-shrink-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(m)}
                          className="w-full text-xs"
                          type="button"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          수정
                        </Button>
                        <form method="post" className="w-full">
                          <input type="hidden" name="intent" value="toggle-rep" />
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="is_representative" value={String(m.is_representative)} />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            type="submit"
                            className="w-full text-xs"
                          >
                            {m.is_representative ? "대표해제" : "대표지정"}
                          </Button>
                        </form>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <form method="post" className="w-full">
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="id" value={m.id} />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            type="submit"
                            className="w-full text-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </form>
                        <form method="post" className="w-full">
                          <input type="hidden" name="intent" value="toggle-active" />
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="is_active" value={String(m.is_active)} />
                          <Button 
                            variant={m.is_active ? "destructive" : "default"} 
                            size="sm" 
                            type="submit"
                            className="w-full text-xs"
                          >
                            {m.is_active ? "비활성" : "활성"}
                          </Button>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 수정 모달 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>매니저 정보 수정</DialogTitle>
            <DialogDescription>
              매니저의 정보를 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          {editingManager && (
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={() => setIsDialogOpen(false)}
              className="space-y-6"
            >
              <input type="hidden" name="intent" value="update" />
              <input type="hidden" name="id" value={editingManager.id} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      name="name" 
                      placeholder="홍길동" 
                      required 
                      className="w-full"
                      defaultValue={editingManager.name}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이미지
                    </label>
                    {editingManager.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={editingManager.imageUrl} 
                          alt={editingManager.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        <p className="text-xs text-gray-500 mt-1">현재 이미지</p>
                      </div>
                    )}
                    <Input 
                      name="image" 
                      type="file" 
                      accept="image/*" 
                      className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    />
                    <p className="mt-1 text-xs text-gray-500">새 이미지를 선택하면 기존 이미지가 교체됩니다.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      소개 한 줄
                    </label>
                    <Input 
                      name="introduction" 
                      placeholder="예: 문학과 글쓰기를 사랑하는 매니저" 
                      className="w-full"
                      defaultValue={editingManager.introduction || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      졸업
                    </label>
                    <Input 
                      name="graduation" 
                      placeholder="예: 서울대학교 문학과" 
                      className="w-full"
                      defaultValue={editingManager.graduation || ""}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자격증 (쉼표 구분)
                    </label>
                    <Input 
                      name="qualifications" 
                      placeholder="예: 국어교사 자격증, 문학치료사" 
                      className="w-full"
                      defaultValue={
                        Array.isArray(editingManager.qualifications)
                          ? editingManager.qualifications.join(", ")
                          : editingManager.qualifications || ""
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      경력 (쉼표 구분)
                    </label>
                    <Input 
                      name="career" 
                      placeholder="예: 작가, 문학 평론가, 강사" 
                      className="w-full"
                      defaultValue={
                        Array.isArray(editingManager.career)
                          ? editingManager.career.join(", ")
                          : editingManager.career || ""
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전문 분야
                    </label>
                    <Input 
                      name="specialty" 
                      placeholder="예: 에세이, 시, 소설" 
                      className="w-full"
                      defaultValue={editingManager.specialty || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 설명
                    </label>
                    <Textarea 
                      name="description" 
                      placeholder="매니저에 대한 상세한 설명을 작성하세요." 
                      rows={3} 
                      className="w-full"
                      defaultValue={editingManager.description || ""}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  취소
                </Button>
                <Button type="submit">
                  수정 완료
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}