import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { GoogleButton } from "./GoogleButton";
import { UseFormReturn, SubmitHandler, FieldValues, Path } from "react-hook-form";
import React from "react";

interface LoginFormProps<FormSchema extends FieldValues> {
  form: UseFormReturn<FormSchema>;
  onSubmit: SubmitHandler<FormSchema>;
  callbackUrl: string;
  size?: "mobile" | "desktop";
  onGoogle?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm<FormSchema extends FieldValues>({
  form,
  onSubmit,
  callbackUrl,
  size = "desktop",
  onGoogle,
  onSwitchToRegister,
}: LoginFormProps<FormSchema>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-4">
        <FormField
          control={form.control}
          name={"email" as Path<FormSchema>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={size === "desktop" ? "font-medium text-base text-[#1B1D28]" : "font-bold text-[12px] text-[#1B1D28]"}>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="e-mail@website.com"
                  className={size === "desktop"
                    ? "py-[30px] mt-1 rounded-sm border border-[#D7E0EB] placeholder-[#99A7B7] focus:border-[#00218F] focus:ring-0 text-xl"
                    : "py-[30px] rounded-sm border border-[#D7E0EB] text-gray-600 placeholder-gray-100 focus:border-[#00218F] focus:ring-0 text-sm"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password" as Path<FormSchema>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={size === "desktop" ? "font-medium text-base text-[#1B1D28]" : "font-medium text-[12px] text-[#1B1D28]"}>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="min. 8 caracteres"
                  className={size === "desktop"
                    ? "py-[30px] mt-1 rounded-sm border border-[#D7E0EB] placeholder-[#99A7B7] focus:border-[#00218F] focus:ring-0 text-xl"
                    : "py-[30px] rounded-sm border border-[#D7E0EB] text-gray-600 placeholder-gray-100 focus:border-[#00218F] focus:ring-0 text-sm"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name={"remember" as Path<FormSchema>}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={size === "desktop" ? "border-[#00218F] text-[#00218F] w-5 h-5 focus:ring-0 focus:ring-offset-0" : "border-[#00218F] text-[#00218F] w-5 h-5 focus:ring-0 focus:ring-offset-0"}
                    style={{ backgroundColor: field.value ? '#00218F' : undefined }}
                  />
                </FormControl>
                <FormLabel className={size === "desktop" ? "text-[#1B1D28] text-base font-medium mt-0" : "text-[#1B1D28] text-sm font-medium mt-0"}>Lembrar</FormLabel>
              </FormItem>
            )}
          />
          <Link
            href="/forgot-password"
            className={size === "desktop" ? "text-sm text-[#00218F] font-medium hover:underline" : "text-sm text-[#00218F] font-medium hover:underline text-right"}
          >
            Esqueceu a senha?
          </Link>
        </div>
        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}
        <div>

        <Button
          type="submit"
          className={`w-full p-[27px] bg-[#00218F] hover:bg-[#001A72] text-white rounded-lg font-medium ${size === "desktop" ? "text-base" : "text-base"} shadow-none mt-4`}
          >
          Entrar
        </Button>
        <GoogleButton
          onClick={onGoogle || (() => {})}
          size={size}
          >
          Entrar com o Google
        </GoogleButton>
        </div>
      </form>
      {onSwitchToRegister && (
        <div className={size === "desktop" ? "mt-6 text-center" : "mt-6 text-center"}>
          <p className={size === "desktop" ? "text-sm font-semibold" : "text-xs text-[#99A7B7]"}>
            Ainda não tem conta?{' '}
            <a href="#" onClick={onSwitchToRegister} className="text-[#00218F] font-medium hover:underline cursor-pointer inline-block">
              Assine agora
            </a>
          </p>
        </div>
      )}
    </Form>
  );
} 