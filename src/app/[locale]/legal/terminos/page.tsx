"use client";

import LegalStyle from "@/components/LegalStyle";
import { useLocale } from "next-intl";

function LegalEs() {
  return (
    <div className="legal-container">
      <LegalStyle />

      <section></section>
    </div>
  );
}

function LegalEn() {
  return (
    <div className="legal-container">
      <LegalStyle />
      <section></section>
    </div>
  );
}

export default function LegalPage() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow mt-32 container mx-auto px-6 py-20 max-w-4xl">
        {locale === "es" ? <LegalEs /> : <LegalEn />}
      </main>
    </div>
  );
}