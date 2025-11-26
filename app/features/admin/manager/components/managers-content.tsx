import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../common/components/ui/card";
import { Button } from "../../../../common/components/ui/button";
import { Input } from "../../../../common/components/ui/input";
import { Textarea } from "../../../../common/components/ui/textarea";
import { Badge } from "../../../../common/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../common/components/ui/dialog";
import { Plus, Trash2, Edit, Users, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import type { ManagerWithImageUrl } from "../queries";

interface ManagersContentProps {
  managers: ManagerWithImageUrl[];
  actionData?: { success?: boolean; error?: string; message?: string };
}

export function ManagersContent({ managers, actionData }: ManagersContentProps) {
  const [editingManager, setEditingManager] = useState<ManagerWithImageUrl | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (manager: ManagerWithImageUrl) => {
    setEditingManager(manager);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-full bg-transparent relative overflow-auto" style={{ fontFamily: 'Pretendard, Inter, sans-serif' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-14 sm:pt-16 lg:pt-[4.5rem]">
        {/* 성공/에러 메시지 */}
        {actionData?.success && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border-2 border-green-200 flex items-center gap-3 shadow-md">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">{actionData.message}</p>
          </div>
        )}
        {actionData?.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-200 flex items-center gap-3 shadow-md">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{actionData.error}</p>
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-6 rounded-xl overflow-hidden shadow-md" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6, #FFE6C5)' }}>
          <div className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-white/30 backdrop-blur-sm">
                <Users className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm mb-1" style={{ lineHeight: '1.6' }}>매니저 관리</h1>
                <p className="text-white/90 flex items-center gap-2 text-sm" style={{ lineHeight: '1.6' }}>
                  <Sparkles className="w-4 h-4" />
                  매니저 정보를 추가하고 활성화 상태를 관리하세요
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 매니저 추가 폼 */}
        <Card className="mb-6 border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Plus className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">새 매니저 추가</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <Form method="post" encType="multipart/form-data" className="space-y-6">
              <input type="hidden" name="intent" value="add" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input name="name" placeholder="홍길동" required className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      이미지 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      name="image" 
                      type="file" 
                      accept="image/*" 
                      required 
                      className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E8F4FB] file:text-[#2D6A9F] hover:file:bg-[#D1E7F5] border-2 border-[#FADADD]/50" 
                    />
                    <p className="mt-1 text-xs text-[#7A6666] opacity-80">JPG, PNG, GIF 형식의 이미지를 업로드하세요.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      소개 한 줄
                    </label>
                    <Input name="introduction" placeholder="예: 문학과 글쓰기를 사랑하는 매니저" className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      졸업
                    </label>
                    <Input name="graduation" placeholder="예: 서울대학교 문학과" className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      자격증 (쉼표 구분)
                    </label>
                    <Input name="qualifications" placeholder="예: 국어교사 자격증, 문학치료사" className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      경력 (쉼표 구분)
                    </label>
                    <Input name="career" placeholder="예: 작가, 문학 평론가, 강사" className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      전문 분야
                    </label>
                    <Input name="specialty" placeholder="예: 에세이, 시, 소설" className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      상세 설명
                    </label>
                    <Textarea name="description" placeholder="매니저에 대한 상세한 설명을 작성하세요." rows={3} className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FADADD]/30">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  매니저 추가
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* 매니저 목록 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#3B2F2F]">매니저 목록</h2>
              <Badge className="text-white px-3 py-1" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                {managers.length}명
              </Badge>
            </div>
          </div>

          {managers.length === 0 ? (
            <Card className="border border-gray-200 shadow-sm bg-white">
                <CardContent className="p-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-[#3B2F2F] text-lg font-extrabold tracking-tight" style={{ lineHeight: '1.6' }}>등록된 매니저가 없습니다.</p>
                  <p className="text-[#7A6666] text-sm mt-2 opacity-80" style={{ lineHeight: '1.6' }}>새 매니저를 추가해보세요</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {managers.map(m => (
                  <Card key={m.id} className="overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-200 shadow-sm bg-white group">
                    <CardHeader className="border-b border-gray-100 pb-4 flex-shrink-0 relative overflow-hidden bg-gray-50">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(168,197,248,0.1), rgba(243,195,230,0.1))' }}></div>
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 font-extrabold tracking-tight text-[#3B2F2F]" style={{ lineHeight: '1.6' }}>{m.name}</CardTitle>
                        {m.introduction && (
                          <p className="text-sm text-[#3B2F2F]/85" style={{ lineHeight: '1.6' }}>{m.introduction}</p>
                        )}
                      </div>
                      {m.imageUrl && (
                        <div className="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0 overflow-hidden border-3 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ml-3 flex-shrink-0 border-3 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <span className="text-2xl font-bold text-white">
                            {m.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                    {/* 정보 표시 */}
                    <div className="space-y-3 text-sm flex-1">
                      {m.graduation && (
                        <div className="p-3 rounded-lg border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                          <span className="text-[#7A6666] opacity-80 font-medium">졸업:</span> <span className="text-[#3B2F2F] font-extrabold tracking-tight">{m.graduation}</span>
                        </div>
                      )}
                      {m.specialty && (
                        <div className="p-3 rounded-lg border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #FFF0F5, #FFFFFF)' }}>
                          <span className="text-[#7A6666] opacity-80 font-medium">전문:</span> <span className="text-[#3B2F2F] font-extrabold tracking-tight">{m.specialty}</span>
                        </div>
                      )}
                      {m.qualifications && m.qualifications.length > 0 && (
                        <div className="p-3 rounded-lg border border-[#FADADD]/30" style={{ background: 'linear-gradient(180deg, #E8F4FB, #FFFFFF)' }}>
                          <span className="text-[#7A6666] opacity-80 font-medium block mb-2">자격:</span> 
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(m.qualifications) 
                              ? m.qualifications.map((q: string, i: number) => (
                                  <Badge key={i} className="text-xs bg-[#E8F4FB] text-[#2D6A9F] border-0">{q}</Badge>
                                ))
                              : <span className="text-[#3B2F2F]">{m.qualifications}</span>
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 상태 배지 */}
                    <div className="flex items-center gap-2 flex-wrap flex-shrink-0 pt-2">
                      <Badge className={m.is_active ? "bg-green-500 text-white" : "bg-gray-400 text-white"}>
                        {m.is_active ? "활성" : "비활성"}
                      </Badge>
                      {m.is_representative && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-md">
                          ⭐ 대표
                        </Badge>
                      )}
                    </div>

                    {/* 액션 버튼 - 항상 하단 고정 */}
                    <div className="pt-4 border-t border-[#FADADD]/30 mt-auto flex-shrink-0 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(m)}
                          className="w-full text-xs border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB] hover:border-[#A8C5F8] transition-all"
                          type="button"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          수정
                        </Button>
                        <Form method="post" className="w-full">
                          <input type="hidden" name="intent" value="toggle-rep" />
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="is_representative" value={String(m.is_representative)} />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            type="submit"
                            className="w-full text-xs border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#FFF0F5] hover:border-[#F3C3E6] transition-all"
                          >
                            {m.is_representative ? "대표해제" : "⭐ 대표지정"}
                          </Button>
                        </Form>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Form method="post" className="w-full">
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="id" value={m.id} />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            type="submit"
                            className="w-full text-xs bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </Form>
                        <Form method="post" className="w-full">
                          <input type="hidden" name="intent" value="toggle-active" />
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="is_active" value={String(m.is_active)} />
                          <Button 
                            variant={m.is_active ? "destructive" : "default"} 
                            size="sm" 
                            type="submit"
                            className={`w-full text-xs shadow-md hover:shadow-lg transition-all text-white ${
                              m.is_active 
                                ? "bg-orange-500 hover:bg-orange-600" 
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {m.is_active ? "비활성" : "활성"}
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 수정 모달 - 전체 내용은 원본 파일 참조 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border border-[#FADADD]/30 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-0 bg-[linear-gradient(180deg,#FFFFFF,#FFF7F5)]">
          <DialogHeader className="p-6 border-b border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #E8F4FB, #FFF0F5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}>
                <Edit className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-extrabold tracking-tight text-[#3B2F2F]">매니저 정보 수정</DialogTitle>
                <DialogDescription className="text-[#7A6666] opacity-80 mt-1" style={{ lineHeight: '1.6' }}>
                  매니저의 정보를 수정할 수 있습니다.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          {editingManager && (
            <Form
              method="post"
              encType="multipart/form-data"
              onSubmit={() => setIsDialogOpen(false)}
              className="space-y-6 p-6"
            >
              <input type="hidden" name="intent" value="update" />
              <input type="hidden" name="id" value={editingManager.id} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      name="name" 
                      placeholder="홍길동" 
                      required 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={editingManager.name}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      이미지
                    </label>
                    {editingManager.imageUrl && (
                      <div className="mb-2">
                        <img 
                          src={editingManager.imageUrl} 
                          alt={editingManager.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-[#FADADD]/50"
                        />
                        <p className="text-xs text-[#7A6666] opacity-80 mt-1">현재 이미지</p>
                      </div>
                    )}
                    <Input 
                      name="image" 
                      type="file" 
                      accept="image/*" 
                      className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E8F4FB] file:text-[#2D6A9F] hover:file:bg-[#D1E7F5] border-2 border-[#FADADD]/50" 
                    />
                    <p className="mt-1 text-xs text-[#7A6666] opacity-80">새 이미지를 선택하면 기존 이미지가 교체됩니다.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      소개 한 줄
                    </label>
                    <Input 
                      name="introduction" 
                      placeholder="예: 문학과 글쓰기를 사랑하는 매니저" 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={editingManager.introduction || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      졸업
                    </label>
                    <Input 
                      name="graduation" 
                      placeholder="예: 서울대학교 문학과" 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={editingManager.graduation || ""}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      자격증 (쉼표 구분)
                    </label>
                    <Input 
                      name="qualifications" 
                      placeholder="예: 국어교사 자격증, 문학치료사" 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={
                        Array.isArray(editingManager.qualifications)
                          ? editingManager.qualifications.join(", ")
                          : editingManager.qualifications || ""
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      경력 (쉼표 구분)
                    </label>
                    <Input 
                      name="career" 
                      placeholder="예: 작가, 문학 평론가, 강사" 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={
                        Array.isArray(editingManager.career)
                          ? editingManager.career.join(", ")
                          : editingManager.career || ""
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      전문 분야
                    </label>
                    <Input 
                      name="specialty" 
                      placeholder="예: 에세이, 시, 소설" 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={editingManager.specialty || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3B2F2F] mb-2">
                      상세 설명
                    </label>
                    <Textarea 
                      name="description" 
                      placeholder="매니저에 대한 상세한 설명을 작성하세요." 
                      rows={3} 
                      className="w-full border-2 border-[#FADADD]/50 focus:border-[#A8C5F8] focus:ring-2 focus:ring-[#E8F4FB] text-[#3B2F2F]"
                      defaultValue={editingManager.description || ""}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 border-t border-[#FADADD]/30" style={{ background: 'linear-gradient(90deg, #FDF6F0, #FFF7F5)' }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-2 border-[#FADADD] text-[#3B2F2F] hover:bg-[#E8F4FB]"
                >
                  취소
                </Button>
                <Button 
                  type="submit"
                  className="text-white shadow-lg hover:shadow-xl transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, #A8C5F8, #F3C3E6)' }}
                >
                  수정 완료
                </Button>
              </DialogFooter>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

