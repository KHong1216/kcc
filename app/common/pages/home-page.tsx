import type { MetaFunction } from "react-router"
import { HeroSection } from "../components/hero-section";

export const meta: MetaFunction = () => {
    return [
        { title: "KOI" },
        { name: "description", content: "Koi Magazine" }
    ];
}

export default function HomePage() {
    return (
        <div className="min-h-screen lg:h-screen lg:overflow-hidden">
            <HeroSection/>
        </div>
    )
}