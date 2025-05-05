"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthDesktopLayout } from "@/components/auth/AuthDesktopLayout";

// Type-safe login form schema
const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  remember: z.boolean().default(false).optional(),
});
type FormSchema = z.infer<typeof formSchema>;

// Type-safe registration form schema
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "Confirme a senha"),
  terms: z.boolean().refine(val => val, { message: "Você deve aceitar os termos" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});
type RegisterSchema = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [tab, setTab] = React.useState("login");

  // Initialize forms before any conditional returns
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        form.setError("root", {
          message: "Email ou senha inválidos",
        });
        return;
      }
      router.push(callbackUrl);
    } catch (error) {
      form.setError("root", {
        message: "Ocorreu um erro. Por favor, tente novamente.",
      });
    }
  };

  const onRegister: SubmitHandler<RegisterSchema> = async (values) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        registerForm.setError("root", {
          message: data.message || "Erro ao criar conta",
        });
        return;
      }

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        registerForm.setError("root", {
          message: "Erro ao fazer login automático",
        });
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      registerForm.setError("root", {
        message: "Ocorreu um erro. Por favor, tente novamente.",
      });
    }
  };

  // Show loading state after all hooks are initialized
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center md:items-start md:justify-start">
      {/* MOBILE VERSION */}
      <div className="md:hidden flex items-start justify-center w-full min-h-screen bg-cover bg-center" style={{ background: 'url(/background.svg), url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <AuthCard>
          <div className="w-full flex flex-col items-center mb-0">
            <div className="flex flex-col items-center w-full mb-6">
              <AuthLogo size="mobile" />
            </div>
            <AuthTabs
              tab={tab}
              setTab={setTab}
              loginForm={form}
              onLogin={onSubmit}
              registerForm={registerForm}
              onRegister={onRegister}
              callbackUrl={callbackUrl}
              size="mobile"
            />
          </div>
        </AuthCard>
      </div>
      {/* DESKTOP VERSION */}
      <AuthDesktopLayout
        left={
          <>
            <div className="flex flex-col w-full max-w-[74%] mb-6 md:mb-0 ml-1 items-start justify-start">
              <div className="mb-12 mt-0">
                <AuthLogo size="desktop" />
              </div>
              <AuthTabs
                tab={tab}
                setTab={setTab}
                loginForm={form}
                onLogin={onSubmit}
                registerForm={registerForm}
                onRegister={onRegister}
                callbackUrl={callbackUrl}
                size="desktop"
              />
            </div>
            <AuthFooter className="sm:absolute left-[clamp(3vw,6vw,120px)] bottom-4" />
          </>
        }
        right={
          <h1 className="text-[50px] font-bold leading-tight max-w-xl ml-32">
            A Revolução do Marketing por <span className="text-[#4FD8CD]">Influência</span>
          </h1>
        }
      />
    </div>
  );
} 