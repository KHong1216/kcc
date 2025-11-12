import type { MetaFunction } from "react-router"
import { HomeHeroSection } from "../components/home-hero-section";
import { HomeAboutSection } from "../components/home-about-section";
import { HomeValueSection } from "../components/home-value-section";

export const meta: MetaFunction = () => {
    return [
        { title: "코이창작소 - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "keywords", content: "코이창작소, 청년창작공간, 에세이캠프, 포토캠프, 청년상담, 창작공간" },
        { property: "og:title", content: "코이창작소 - 청년을 위한 창작 공간" },
        { property: "og:description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { property: "og:image", content: "https://www.koicreativelab.com/og-home.jpg" },
    ];
}

export default function HomePage() {
    return (
        <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" key="home-page" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
            <HomeHeroSection />
            <HomeAboutSection />
            <HomeValueSection />
        </div>
    )
}