import { Form, type MetaFunction, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Input } from "../../../common/components/ui/input";
import { Textarea } from "../../../common/components/ui/textarea";
import { Label } from "../../../common/components/ui/label";
import { Mail, Phone, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { createContact } from "../queries";
import { useEffect } from "react";
import type { Route } from "./+types/contact-page";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/community/contact";
  return [
    { title: "문의하기 - 코이창작소" },
    { name: "description", content: "코이창작소에 문의사항을 남겨주세요. 빠르게 답변드리겠습니다." },
    { name: "keywords", content: "문의하기, 상담문의, 코이창작소, 연락처" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "문의하기 - 코이창작소" },
    { property: "og:description", content: "코이창작소에 문의사항을 남겨주세요. 빠르게 답변드리겠습니다." },
    { name: "twitter:card", content: "summary" },
    { rel: "canonical", href: url },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  try {
    const contactData = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      status: 'pending' as const,
    };

    // 필수 필드 검증
    if (!contactData.name || !contactData.email || !contactData.message) {
      return {
        success: false,
        error: "이름, 이메일, 문의내용은 필수 입력 항목입니다.",
      };
    }

    const result = await createContact(contactData);

    if (result.error) {
      console.error("[action] create contact error:", result.error);
      return {
        success: false,
        error: "문의 등록에 실패했습니다. 다시 시도해주세요.",
      };
    }

    return {
      success: true,
      message: "문의가 성공적으로 등록되었습니다. 코이매니저가 빠른 시일 내에 검토하여 답변드리겠습니다.",
    };
  } catch (error) {
    console.error("[action] error:", error);
    return {
      success: false,
      error: "문의 등록 중 오류가 발생했습니다.",
    };
  }
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  // 성공 시 폼 초기화 및 스크롤
  useEffect(() => {
    if (actionData?.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      if (form) {
        form.reset();
      }
      // 성공 메시지가 보이도록 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [actionData]);

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* 헤더 섹션 */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            문의하기
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            궁금한 점이나 문의사항이 있으시면 언제든지 연락주세요
          </p>
          <p className="text-sm text-gray-500">
            빠른 시일 내에 답변드리겠습니다
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="w-5 h-5 text-green-600" />
              문의 양식
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 성공 메시지 */}
            {actionData?.success && (
              <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-800 mb-2">
                      문의 신청이 완료되었습니다! ✅
                    </h3>
                    <p className="text-green-700 leading-relaxed">
                      {actionData.message}
                    </p>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-sm text-green-600">
                        💡 입력하신 이메일로 답변을 드릴 예정입니다. 조금만 기다려주세요!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 에러 메시지 */}
            {actionData?.error && (
              <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <XCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-800 mb-2">
                      문의 등록 실패
                    </h3>
                    <p className="text-red-700">{actionData.error}</p>
                  </div>
                </div>
              </div>
            )}

            <Form method="post" id="contact-form" className="space-y-6">
              {/* 이름 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <span>이름 *</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="홍길동"
                  className="w-full"
                />
              </div>

              {/* 이메일 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  이메일 *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full"
                />
              </div>

              {/* 전화번호 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  전화번호
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  className="w-full"
                />
              </div>

              {/* 문의 제목 */}
              <div className="space-y-2">
                <Label htmlFor="subject">문의 제목</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="문의 제목을 입력해주세요"
                  className="w-full"
                />
              </div>

              {/* 문의 내용 */}
              <div className="space-y-2">
                <Label htmlFor="message">문의 내용 *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="문의하실 내용을 자세히 입력해주세요"
                  className="w-full min-h-[200px] resize-none"
                />
              </div>

              {/* 안내 문구 */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  📞 문의하신 내용은 빠른 시일 내에 검토하여 답변드리겠습니다.
                  <br />
                </p>
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                문의하기
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

