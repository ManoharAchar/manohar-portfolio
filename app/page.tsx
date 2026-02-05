import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { siteConfig } from "@/content/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { MindsetSection } from "@/components/MindsetSection";
import { ToolStackStrip } from "@/components/ToolStackStrip";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <Hero />

      {/* Work Section */}
      <WorkSection />

      {/* Intro / About Section */}
      <AboutSection />

      {/* Mindset Section */}
      <MindsetSection />

      {/* Tool Stack Section */}
      <ToolStackStrip />
    </div>
  );
}
