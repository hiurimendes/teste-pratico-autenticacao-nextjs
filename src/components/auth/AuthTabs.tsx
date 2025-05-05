import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import React from "react";
import { FieldValues, UseFormReturn, SubmitHandler } from "react-hook-form";

interface AuthTabsProps<
  LoginSchema extends FieldValues,
  RegisterSchema extends FieldValues
> {
  tab: string;
  setTab: (tab: string) => void;
  loginForm: UseFormReturn<LoginSchema>;
  onLogin: SubmitHandler<LoginSchema>;
  registerForm: UseFormReturn<RegisterSchema>;
  onRegister: SubmitHandler<RegisterSchema>;
  callbackUrl: string;
  size?: "mobile" | "desktop";
}

export function AuthTabs<
  LoginSchema extends FieldValues,
  RegisterSchema extends FieldValues
>({
  tab,
  setTab,
  loginForm,
  onLogin,
  registerForm,
  onRegister,
  callbackUrl,
  size = "desktop",
}: AuthTabsProps<LoginSchema, RegisterSchema>) {
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full items-center md:items-start h-full">
      <TabsList className={
        size === "desktop"
          ? "flex bg-[#F5F7FD] rounded-[18px] w-3/6 h-9 mb-[46px] p-1 border-0 gap-x-3"
          : "flex bg-[#F5F7FD] rounded-[18px] w-3/5 mb-6 p-1 h-9"
      }>
        <TabsTrigger
          value="login"
          className="flex-1 rounded-[18px] font-medium text-xs h-full transition-all data-[state=active]:bg-white data-[state=active]:text-[#1B1D28] data-[state=active]:font-medium border-0 data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#697889]"
        >
          Entrar
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="flex-1 rounded-[18px] font-medium text-xs h-full transition-all text-[#697889] data-[state=active]:bg-white data-[state=active]:text-[#1B1D28] data-[state=active]:font-medium border-0 data-[state=inactive]:bg-transparent"
        >
          Cadastrar
        </TabsTrigger>
      </TabsList>
      {tab === 'login' ? (
      <div className="w-full mb-4 flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-3xl">Entrar</h1>
        <p className="text-xs md:text-base md:mt-2 text-gray-500">Non sit purus tempus malesuada poten</p>
      </div>
      ) : (
      <div className="w-full mb-4 flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-3xl">Cadastrar</h1>
        <p className="text-xs md:text-base md:mt-2 text-gray-500">Non sit purus tempus malesuada poten</p>
      </div>
      )}
      <div className={size === "desktop" ? "w-full" : "w-full"}>
        <TabsContent value="login" className="mt-0 md:mt-2.5 h-full">
          <LoginForm
            form={loginForm}
            onSubmit={onLogin}
            callbackUrl={callbackUrl}
            size={size}
            onGoogle={() => loginForm.handleSubmit(onLogin)()}
            onSwitchToRegister={() => setTab("register")}
          />
        </TabsContent>
        <TabsContent value="register" className="mt-0 h-full">
          <RegisterForm
            form={registerForm}
            onSubmit={onRegister}
            size={size}
            onGoogle={() => registerForm.handleSubmit(onRegister)()}
            onSwitchToLogin={() => setTab("login")}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
} 