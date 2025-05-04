"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
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
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [tab, setTab] = React.useState("login");

  // Login form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

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

  // Register form
  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onRegister: SubmitHandler<RegisterSchema> = async (values) => {
    // Registration logic here
    alert("Cadastro enviado! (implemente a lógica de backend)");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
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
            <div className="w-full mb-6">
              <div className="mb-10 mt-8">
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
            <AuthFooter className="absolute left-[clamp(3vw,6vw,120px)] bottom-4" />
          </>
        }
        right={
          <h1 className="text-[50px] font-bold leading-tight">
            A Revolução do Marketing por <span className="text-[#4FD8CD]">Influência</span>
          </h1>
        }
      />
    </div>
  );
} 