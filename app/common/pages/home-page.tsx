import type { MetaFunction } from "react-router"
import { HomeHero } from "../components/home-hero";
import { HomeCard } from "../components/home-card";
import { HeroSection } from "../components/hero-section";

export const meta: MetaFunction = () => {
    return [
        { title: "KOI" },
        { name: "description", content: "Koi Magazine" }
    ];
}

export default function HomePage() {
    return (
        <div>
            <HeroSection/>
        </div>
    )
}