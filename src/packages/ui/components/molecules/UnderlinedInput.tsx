// components/UnderlinedInput.tsx
import React from "react";

interface UnderlinedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function UnderlinedInput({
  value,
  onChange,
  placeholder = "",
}: UnderlinedInputProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full text-center text-xl bg-transparent
          focus:outline-none
          pb-2
        "
      />
      <div className="border-t-2 border-brown-500 w-full mt-1"></div>
    </div>
  );
}
