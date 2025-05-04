export function AuthFooter({ className = "" }: { className?: string }) {
  return (
    <div className={`text-xs text-[#D7E0EB] text-left pt-8 select-none ${className}`}>
      feito com <span className="text-[#D7E0EB]">♡</span> pela Kepler Digital.
    </div>
  );
} 