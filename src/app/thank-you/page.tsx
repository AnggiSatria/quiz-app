import TemplateContentThankYou from "@/packages/shared/ui/components/templates/TemplateContentThankYou";
import React from "react";

export default function page() {
  return (
    <div className="relative w-full bg-[url('/assets/thank-you.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative min-h-screen">
        {/* Ini sebagai konten visual, yang ukurannya real (bukan absolute) */}
        <div className="invisible h-[800px]" />
        <TemplateContentThankYou />
      </div>
    </div>
  );
}
