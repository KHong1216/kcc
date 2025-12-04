import type { MetaFunction } from "react-router"
import { HomeHeroSection } from "../components/home-hero-section";
import { HomeAboutSection } from "../components/home-about-section";
import { HomeValueSection } from "../components/home-value-section";
import { Footer } from "../components/footer";

export const meta: MetaFunction = () => {
    const url = "https://www.koicreativelab.com";
    return [
        { title: "리 프레임(Re-Frame) - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "광주에 위치한 리 프레임(Re-Frame). 따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "keywords", content: "리 프레임, Re-Frame, 광주 리프레임, 광주 리 프레임, 청년창작공간, 포토캠프, 청년상담, 창작공간, 자기개발, 광주청년, 광주, 광주 청년, 광주 상담, 광주 창작공간, 광주 청년상담, 광주 문화공간, 광주 청년문화공간" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "googlebot", content: "index, follow" },
        { name: "author", content: "리 프레임(Re-Frame)" },
        { name: "geo.region", content: "KR-29" },
        { name: "geo.placename", content: "광주" },
        { name: "geo.position", content: "35.1595;126.8526" },
        { name: "ICBM", content: "35.1595, 126.8526" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { property: "og:description", content: "광주에 위치한 리 프레임(Re-Frame). 따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { property: "og:image", content: `${url}/og-home.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { property: "og:locale", content: "ko_KR" },
        { property: "og:site_name", content: "리 프레임(Re-Frame)" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { name: "twitter:description", content: "광주에 위치한 리 프레임(Re-Frame). 따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다." },
        { name: "twitter:image", content: `${url}/og-home.jpg` },
        { name: "twitter:image:alt", content: "리 프레임(Re-Frame) - 청년을 위한 창작 공간" },
        { rel: "canonical", href: url },
        { rel: "alternate", hreflang: "ko", href: url },
        { rel: "alternate", hreflang: "x-default", href: url },
    ];
}

export default function HomePage() {
    const url = "https://www.koicreativelab.com";
    
    // Organization Schema (강화)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "리 프레임(Re-Frame)",
        "alternateName": ["Re-Frame", "리프레임"],
        "url": url,
        "logo": `${url}/logo.png`,
        "description": "따뜻한 이야기가 모여, 함께 성장하는 공간. 리 프레임은 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간입니다.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR",
            "addressRegion": "광주광역시",
            "addressLocality": "광주"
            // TODO: 실제 주소 정보 추가 필요
            // "streetAddress": "",
            // "postalCode": ""
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "areaServed": "KR",
            "availableLanguage": ["ko"]
            // TODO: 전화번호 추가 필요
            // "telephone": ""
        },
        "sameAs": []
        // TODO: 소셜 미디어 링크 추가 필요
        // "sameAs": [
        //     "https://www.instagram.com/reframe",
        //     "https://www.facebook.com/reframe"
        // ]
    };

    // LocalBusiness Schema (지역 검색 최적화)
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "리 프레임(Re-Frame)",
        "alternateName": "Re-Frame",
        "url": url,
        "logo": `${url}/logo.png`,
        "image": `${url}/og-home.jpg`,
        "description": "광주에 위치한 청년 창작 공간. 포토 캠프, 연애 캠프 등 다양한 청년 프로그램을 제공합니다.",
        "address": {
            "@type": "PostalAddress",
            // TODO: 실제 주소 정보 추가 필요
            // "streetAddress": "",
            "addressLocality": "광주",
            "addressRegion": "광주광역시",
            // "postalCode": "",
            "addressCountry": "KR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.1595,
            "longitude": 126.8526
            // TODO: 실제 좌표로 수정 필요
        },
        // TODO: 전화번호 및 운영시간 추가 필요
        // "telephone": "",
        // "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "$$",
        "areaServed": {
            "@type": "City",
            "name": "광주"
        }
    };

    // FAQPage Schema (AEO/GEO 최적화 - 매우 중요!)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "리 프레임(Re-Frame)은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "리 프레임(Re-Frame)은 광주광역시에 위치한 청년 창작 공간입니다. 청년들이 자신의 이야기를 발견하고 함께 나누며 성장하는 따뜻한 공간으로, 포토 캠프(클릭무드), 연애 캠프, 감정 캐릭터 테스트 등 다양한 청년 프로그램을 제공합니다. 에세이 캠프는 현재 준비 중입니다."
                }
            },
            {
                "@type": "Question",
                "name": "리 프레임은 어디에 있나요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "리 프레임은 광주광역시에 위치한 청년 창작 공간입니다."
                }
            },
            {
                "@type": "Question",
                "name": "리 프레임에서 제공하는 프로그램은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "리 프레임은 클릭무드(포토 캠프), Re-Frame 연애 캠프, Re-Frame 캐릭터 테스트(감정 분석) 등 다양한 청년 프로그램을 제공합니다. 에세이 캠프는 현재 준비 중입니다."
                }
            },
            {
                "@type": "Question",
                "name": "리 프레임 프로그램 참여 비용은 얼마인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "프로그램마다 상이하며, 일부 프로그램은 무료 체험을 제공합니다. 자세한 내용은 예약 상담을 통해 안내받으실 수 있습니다."
                }
            },
            {
                "@type": "Question",
                "name": "코이창작소와 리 프레임은 같은 곳인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "네, 코이창작소에서 리 프레임(Re-Frame)으로 브랜드명이 변경되었습니다. 현재는 리 프레임(Re-Frame)으로 운영되고 있으며, 같은 서비스를 제공하고 있습니다."
                }
            },
            {
                "@type": "Question",
                "name": "리 프레임 프로그램은 어떻게 신청하나요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "리 프레임 웹사이트의 예약 페이지에서 원하는 프로그램을 선택하고, 이름, 연락처, 가능한 시간을 입력하여 신청하시면 됩니다. 신청 후 리 프레임 매니저가 직접 연락드려 상세 일정을 안내해드립니다."
                }
            },
            {
                "@type": "Question",
                "name": "광주 청년상담은 어디서 받을 수 있나요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "리 프레임에서 청년 상담 서비스를 제공합니다. 광주에 위치한 리 프레임은 청년들의 성장을 돕는 다양한 상담 프로그램을 운영하고 있습니다."
                }
            }
        ]
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "홈",
                "item": url
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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