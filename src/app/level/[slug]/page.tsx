import TemplateContentLevel from "../../../packages/shared/ui/components/templates/TemplateContentLevel";
import React from "react";

export default function page() {
  return (
    <div className="relative w-full bg-[url('/assets/bg-page-level.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative min-h-screen">
        {/* Ini sebagai konten visual, yang ukurannya real (bukan absolute) */}
        <div className="invisible h-[800px]" />
        <TemplateContentLevel />
      </div>
    </div>
  );
}
