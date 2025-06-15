"use client";
import TemplateContentLP from "@/packages/shared/ui/components/templates/TemplateContentLP";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[url('/assets/bg-image-lp.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end">
      {/* Container untuk layer-layer di bawah */}
      <TemplateContentLP />
    </div>
  );
}
