import React from "react";

export function AuthDesktopLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="hidden md:flex w-full h-screen">
      {/* Left side: login/register form */}
      <div className="w-1/2 flex flex-col justify-center items-start px-[clamp(3vw,6vw,120px)] h-full relative bg-white">
        {left}
      </div>
      {/* Right side: background and marketing text */}
      <div className="w-1/2 relative overflow-hidden flex items-center justify-center" style={{ background: 'url(/background.svg), url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 z-0 pointer-events-none" />
        <div className="relative z-10 p-12">
          {right}
        </div>
      </div>
    </div>
  );
} 