import type { MetaFunction } from "react-router"
import { HeroSection } from "../components/hero-section";

export const meta: MetaFunction = () => {
    return [
        { title: "코이창작소 - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "탈광주 청년을 막기 위한 청년문화 공간, 상담을 통한 '나'를 찾는 과정을 지원하는 코이창작소" },
        { name: "keywords", content: "코이창작소, 청년창작공간, 에세이캠프, 포토캠프, 청년상담" },
        { property: "og:title", content: "코이창작소 - 청년을 위한 창작 공간" },
        { property: "og:description", content: "탈광주 청년을 위한 창작 공간. 에세이 캠프, 포토 캠프, 상담 서비스를 통해 청년들의 성장을 돕습니다." },
        { property: "og:image", content: "https://www.koicreativelab.com/og-home.jpg" },
    ];
}

export default function HomePage() {
    return (
        <div className="min-h-screen w-full">
            <HeroSection/>
        </div>
    )
}