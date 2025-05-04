import Image from "next/image";

export function AuthLogo({ size = "desktop" }: { size?: "mobile" | "desktop" }) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={size === "desktop" ? 190 : 120}
      height={size === "desktop" ? 39 : 40}
      priority
      className={size === "desktop" ? "h-[2.4375rem] w-auto" : "h-8 w-auto"}
      style={size === "desktop" ? { width: '11.875rem', height: '2.4375rem' } : {}}
    />
  );
} 