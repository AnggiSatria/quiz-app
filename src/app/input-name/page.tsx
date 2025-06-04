import TemplateContentInput from "@/packages/ui/components/templates/TemplateContentInput";
import React from "react";

export default function page() {
  return (
    <div className="relative w-full h-screen bg-[url('/assets/bg-input-name.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end">
      {/* Container untuk layer-layer di bawah */}
      <TemplateContentInput />
    </div>
  );
}
