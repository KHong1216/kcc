import type { MetaFunction } from "react-router"
import { HomeHeroSection } from "../components/home-hero-section";
import { HomeAboutSection } from "../components/home-about-section";
import { HomeValueSection } from "../components/home-value-section";
import { Footer } from "../components/footer";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com";
    return [
        { title: "리 프레임(Re-Frame) - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "keywords", content: "리 프레임, Re-Frame, 청년창작공간, 에세이캠프, 포토캠프, 청년상담, 창작공간, 자기개발, 광주청년, 광주, 광주 청년, 광주 상담, 광주 창작공간, 광주 청년상담, 광주 문화공간, 광주 청년문화공간" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        { name: "author", content: "리 프레임(Re-Frame)" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { property: "og:description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { property: "og:image", content: `${url}/og-home.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "ko_KR" },
        { property: "og:site_name", content: "리 프레임(Re-Frame)" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { name: "twitter:description", content: "따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "twitter:image", content: `${url}/og-home.jpg` },
        { rel: "canonical", href: url },
    ];
}

export default function HomePage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "리 프레임(Re-Frame)",
        "alternateName": "Re-Frame",
        "url": "https://www.koicreativelab.com",
        "logo": "https://www.koicreativelab.com/logo.png",
        "description": "따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR",
            "addressRegion": "광주광역시",
            "addressLocality": "광주"
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