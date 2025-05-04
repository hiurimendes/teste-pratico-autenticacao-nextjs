import React from "react";

export function AuthCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[342px] bg-white rounded-[20px] mx-4 my-6 flex flex-col items-center pt-6 pb-8 px-5 relative z-10 ${className}`}>
      {children}
    </div>
  );
} 