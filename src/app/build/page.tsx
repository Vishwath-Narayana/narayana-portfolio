import type { Metadata } from "next";
import StubPage from "@/components/StubPage";

export const metadata: Metadata = { title: "Build" };

export default function Page() {
  return <StubPage title="Build" note="Projects, pipelines and the systems behind them. Case studies are next." />;
}
