import TemplateBackgroundGame from "@/packages/shared/ui/components/templates/TemplateBackgroundGame";
import TemplateContentGame from "../../../../packages/shared/ui/components/templates/TemplateContentGame";
import React from "react";

export default function page() {
  return (
    <TemplateBackgroundGame>
      <div className="relative min-h-screen">
        {/* Ini sebagai konten visual, yang ukurannya real (bukan absolute) */}
        <div className="invisible h-[800px]" />
        <TemplateContentGame />
      </div>
    </TemplateBackgroundGame>
  );
}
