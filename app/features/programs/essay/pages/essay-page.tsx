import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/programs/essay";
  return [
    { title: "KOI 아무,말 진단 - 마음을 비추는 에세이 가이드 | 코이창작소" },
    {
      name: "description",
      content: "떠오르는 한 문장만으로 지금 마음의 좌표를 확인하고, KOI 에세이 캠프에서 나의 이야기를 정리해 보세요.",
    },
    { name: "keywords", content: "아무말 진단, 에세이, 자기이해, 마음 진단, 코이창작소" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "KOI 아무,말 진단 - 마음을 비추는 에세이 가이드" },
    {
      property: "og:description",
      content: "떠오르는 아무 말 한 문장으로 마음을 비추고, KOI 에세이 캠프에서 나의 이야기를 시작해요.",
    },
    { property: "og:image", content: "https://www.koicreativelab.com/og-essay.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: url },
  ];
};

export default function EssayPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFF9F5] via-[#FDF4FE] to-[#EFF5FF] px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#2F2143]">리뉴얼 중입니다</h1>
        <p className="mt-4 text-[#5F4C77]">곧 더 나은 서비스로 찾아뵙겠습니다.</p>
      </div>
    </div>
  );
}
