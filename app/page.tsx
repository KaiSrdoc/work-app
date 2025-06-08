"use client";

import Goals from "@/app/(pages)/goals/page";
import Work from "@/app/(pages)/work/page";
import Projects from "@/app/(pages)/projects/page";
import Tasks from "@/app/(pages)/tasks/page";

export default function Home() {
  return (
    <>
      <Goals />
      <Work />
      <Projects />
      <Tasks />
    </>
  );
}
