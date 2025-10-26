import type { MetaFunction } from "react-router"
import { HeroSection } from "../components/hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
    return [
        { title: "코이창작소 - 작은 물결이 큰 도약이 되는 창작소" },
        { name: "description", content: "탈광주 청년을 막기 위한 청년문화 공간, 상담을 통한 '나'를 찾는 과정을 지원하는 코이창작소" }
    ];
}

export default function HomePage() {
    return (
        <div className="min-h-screen w-full">
            <HeroSection/>
        </div>
    )
}