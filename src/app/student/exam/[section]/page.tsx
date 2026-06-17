// src/app/student/exam/[section]/page.tsx
// src/app/student/exam/[section]/page.tsx
import ExamSectionClient from "./ExamSectionClient";
import type { ExamSection } from "@/types/exam";

const sections: ExamSection[] = ["listening", "structure", "reading"];

export function generateStaticParams() {
  return sections.map((section) => ({
    section,
  }));
}

export const dynamicParams = false;

export default async function StudentExamSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  const activeSection: ExamSection = sections.includes(section as ExamSection)
    ? (section as ExamSection)
    : "listening";

  return <ExamSectionClient section={activeSection} />;
}
