import type { MetaFunction } from "react-router"
import { HomeHeroSection } from "../components/home-hero-section";
import { HomeAboutSection } from "../components/home-about-section";
import { HomeValueSection } from "../components/home-value-section";
import { Footer } from "../components/footer";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com";
    return [
        { title: "코이창작소 - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "keywords", content: "코이창작소, 청년창작공간, 에세이캠프, 포토캠프, 청년상담, 창작공간" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        { name: "author", content: "코이창작소" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: "코이창작소 - 청년을 위한 창작 공간" },
        { property: "og:description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { property: "og:image", content: `${url}/og-home.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "ko_KR" },
        { property: "og:site_name", content: "코이창작소" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "코이창작소 - 청년을 위한 창작 공간" },
        { name: "twitter:description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "twitter:image", content: `${url}/og-home.jpg` },
        { rel: "canonical", href: url },
    ];
}

export default function HomePage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "코이창작소",
        "alternateName": "KOI Creative Lab",
        "url": "https://www.koicreativelab.com",
        "logo": "https://www.koicreativelab.com/logo.png",
        "description": "따뜻한 이야기가 모여, 함께 성장하는 공간. 코이창작소는 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR"
        },
        "sameAs": []
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <div className="min-h-screen w-full bg-[#FDF6F0] text-[#3B2F2F]" key="home-page" style={{ fontFamily: 'Pretendard, Inter, sans-serif', lineHeight: '1.6' }}>
                <HomeHeroSection />
                <HomeAboutSection />
                <HomeValueSection />
                <Footer/>
            </div>
        </>
    )
}