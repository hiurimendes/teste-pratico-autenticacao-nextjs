import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleButton } from "./GoogleButton";
import { UseFormReturn, SubmitHandler, FieldValues, Path } from "react-hook-form";
import React from "react";

interface RegisterFormProps<FormSchema extends FieldValues> {
  form: UseFormReturn<FormSchema>;
  onSubmit: SubmitHandler<FormSchema>;
  size?: "mobile" | "desktop";
  onGoogle?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm<FormSchema extends FieldValues>({
  form,
  onSubmit,
  size = "desktop",
  onGoogle,
  onSwitchToLogin,
}: RegisterFormProps<FormSchema>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:mt-5">
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
        <FormField
          control={form.control}
          name={"confirmPassword" as Path<FormSchema>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={size === "desktop" ? "font-medium text-base text-[#1B1D28]" : "font-medium text-[12px] text-[#1B1D28]"}>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a mesma senha escolhida"
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
          name={"terms" as Path<FormSchema>}
          render={({ field }) => (
            <FormItem className="flex items-center mt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={size === "desktop" ? "border-[#00218F] text-[#00218F] w-5 h-5 focus:ring-0 focus:ring-offset-0" : "border-[#00218F] text-[#00218F] w-5 h-5 focus:ring-0 focus:ring-offset-0"}
                  style={{ backgroundColor: field.value ? '#00218F' : undefined }}
                />
              </FormControl>
              <FormLabel className={size === "desktop" ? "text-[#1B1D28] text-sm font-medium mt-0" : "text-[#1B1D28] text-xs font-medium mt-0"}>
                Concordo com os
                <a href="#" className={size === "desktop" ? "text-[#00218F] hover:underline font-medium" : "text-[#00218F] hover:underline text-xs font-semibold"}>Termos e Condições</a>
              </FormLabel>
            </FormItem>
          )}
        />
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
            Cadastrar
          </Button>
          <GoogleButton
            onClick={onGoogle || (() => {})}
            size={size}
          >
            Entrar com o Google
          </GoogleButton>
        </div>
      </form>
      {onSwitchToLogin && (
        <div className={size === "desktop" ? "mt-6 text-center" : "mt-6 text-center"}>
          <p className={size === "desktop" ? "text-sm text-[#99A7B7]" : "text-xs text-[#99A7B7]"}>
            Já tem conta?{' '}
            <a href="#" onClick={onSwitchToLogin} className="text-[#00218F] font-medium hover:underline cursor-pointer inline-block">
              Entre aqui
            </a>
          </p>
        </div>
      )}
    </Form>
  );
} 