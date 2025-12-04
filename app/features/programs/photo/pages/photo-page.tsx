import type { MetaFunction } from "react-router";
import type { Route } from "./+types/photo-page";

export const meta: MetaFunction = () => {
  const url = "https://www.koicreativelab.com/programs/photo";
  return [
    { title: "클릭무드 - 준비중 | 코이창작소" },
    {
      name: "description",
      content: "클릭무드 프로그램이 더 나은 모습으로 돌아오기 위해 준비 중입니다. 곧 만나요!",
    },
    { name: "keywords", content: "코이창작소, 클릭무드, 무드 기록, 감정 일기, 사진 일기, 광주 청년, 광주 창작공간" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: "클릭무드 - 준비중 | 코이창작소" },
    {
      property: "og:description",
      content: "클릭무드 프로그램이 더 나은 모습으로 돌아오기 위해 준비 중입니다. 곧 만나요!",
    },
    { property: "og:image", content: "https://www.koicreativelab.com/og-home.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "코이창작소 - 준비중" },
    { property: "og:locale", content: "ko_KR" },
    { property: "og:site_name", content: "코이창작소" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "클릭무드 - 준비중 | 코이창작소" },
    { name: "twitter:description", content: "클릭무드 프로그램이 더 나은 모습으로 돌아오기 위해 준비 중입니다. 곧 만나요!" },
    { name: "twitter:image", content: "https://www.koicreativelab.com/og-home.jpg" },
    { name: "twitter:image:alt", content: "코이창작소 - 준비중" },
    { rel: "canonical", href: url },
  ];
};

export function loader(_: Route.LoaderArgs) {
  return {};
}

export async function action(_: Route.ActionArgs) {
  return {
    success: false,
    error: "현재 준비 중입니다. 곧 다시 만나요!",
  };
}

export function PhotoPage() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen w-full"
      style={{ 
        background: "#FDF6F0",
        fontFamily: 'Pretendard, Inter, sans-serif',
      }}
    >
      <div className="text-center px-6 max-w-2xl mx-auto space-y-6">
        <h1 
          className="text-4xl md:text-5xl font-bold text-[#3B2F2F] mb-4"
          style={{ lineHeight: '1.6' }}
        >
          클릭무드
        </h1>
        <div className="space-y-4">
          <p 
            className="text-xl md:text-2xl text-[#3B2F2F]/90 font-semibold"
            style={{ lineHeight: '1.6' }}
          >
            준비중입니다
          </p>
          <p 
            className="text-lg text-[#3B2F2F]/80"
            style={{ lineHeight: '1.6' }}
          >
            더 나은 모습으로 돌아오기 위해 준비하고 있어요.<br />
            곧 만나요!
          </p>
        </div>
        <div className="pt-8">
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-xl bg-[linear-gradient(90deg,#A8C5F8,#F3C3E6,#FFE6C5)] text-[#3B2F2F] font-semibold shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:brightness-95 transition-all duration-300"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}

export default PhotoPage;
