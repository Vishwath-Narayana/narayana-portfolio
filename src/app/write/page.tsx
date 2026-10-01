import type { Metadata } from "next";
import StubPage from "@/components/StubPage";

export const metadata: Metadata = { title: "Write" };

export default function Page() {
  return <StubPage title="Write" note="Notes on technology and daily life are next, written in MDX." />;
}
