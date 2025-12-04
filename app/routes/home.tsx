import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "코이창작소" },
    { name: "description", content: "코이창작소 - 작은 물결이 큰 도약이 되는 창작소" },
  ];
}

export default function Home() {
  return <Welcome />;
}
