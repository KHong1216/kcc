import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/programs/photo";
  return [
    { title: "마음을 비추는 엽서 - 사진 심리 선택 가이드 | 코이창작소" },
    {
      name: "description",
      content: "10장의 감성 사진 중 마음이 끌리는 이미지를 고르고, 심리학 기반 해석으로 엽서에 담을 감정을 발견하세요.",
    },
    { name: "keywords", content: "사진 테스트, 엽서, 감정 분석, 사진 심리, 코이창작소" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "마음을 비추는 엽서 - 사진 심리 선택 가이드" },
    {
      property: "og:description",
      content: "10장의 사진 중 하나를 선택하고, 내 마음의 언어를 찾아 엽서에 담아 보세요.",
    },
    { property: "og:image", content: "https://www.koicreativelab.com/og-photo-guide.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: url },
  ];
};

export default function PhotoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFF9F4] via-[#FDF4F8] to-[#F2F8FF] px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#2F1A3A]">리뉴얼 중입니다</h1>
        <p className="mt-4 text-[#6B5678]">곧 더 나은 서비스로 찾아뵙겠습니다.</p>
      </div>
    </div>
  );
}
