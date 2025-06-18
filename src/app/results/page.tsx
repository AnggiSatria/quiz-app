"use client";
import TemplateContentResults from "@/packages/shared/ui/components/templates/TemplateContentResults";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative w-full h-screen bg-[url('/assets/bg-image-lp.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end">
        <TemplateContentResults />
      </div>
    </Suspense>
  );
}
