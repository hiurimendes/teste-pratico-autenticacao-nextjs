import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";

interface GoogleButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  size?: "mobile" | "desktop";
}

export function GoogleButton({ onClick, className = "", children, size = "desktop" }: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full ${size === "desktop" ? "h-14 text-base" : "p-[27px] text-base"} rounded-lg border border-[#D0D5DD] bg-white text-[#344054] font-medium flex items-center justify-center gap-3 mt-4 ${className}`}
      onClick={onClick}
    >
      <Image src="/google.svg" alt="Google" width={size === "desktop" ? 24 : 20} height={size === "desktop" ? 24 : 20} />
      {children}
    </Button>
  );
} 