import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "리 프레임(Re-Frame)" },
    { name: "description", content: "리 프레임(Re-Frame) - 작은 물결이 큰 도약이 되는 창작소" },
  ];
}

export default function Home() {
  return <Welcome />;
}
