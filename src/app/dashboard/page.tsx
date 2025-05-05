"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function getInitials(name: string | null | undefined) {
  if (!name) return "U";
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const initials = getInitials(session?.user?.name);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4">
      {status === "loading" ? (
        <div className="text-lg text-gray-600">Carregando...</div>
      ) : status === "authenticated" ? (
        <div className="flex flex-col items-center gap-6 bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          {session?.user?.image ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt={session?.user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#00218F] text-white flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
          )}
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1B1D28] mb-2">
              {session?.user?.name || "Usuário"}
            </h1>
            <p className="text-gray-600 mb-6">
              {session?.user?.email}
            </p>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-[#00218F] hover:bg-[#001A72] text-white px-8 py-2 rounded-lg w-full"
            >
              Sair
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-lg text-red-600">Não autorizado</div>
      )}
    </div>
  );
} 