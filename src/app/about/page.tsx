import type { Metadata } from "next";
import StubPage from "@/components/StubPage";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return <StubPage title="About" note="A short bio, the leadership work, and a contact form are next." />;
}
