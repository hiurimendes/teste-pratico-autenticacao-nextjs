# Desafio Técnico - Conversão de Figma + Autenticação

Este projeto consiste na conversão de um design Figma para uma interface frontend responsiva, com sistema de autenticação integrado.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🧩 Funcionalidades

- Conversão do layout Figma para UI responsiva com Tailwind + Shadcn UI
- Sistema de cadastro e login de usuários
- Validação de formulário com Zod + React Hook Form
- Proteção de rotas com middleware de autenticação
- Redirecionamento automático para `/dashboard` após login
- Banco de dados PostgreSQL com gerenciamento via Prisma ORM

## 🛠️ Como Rodar Localmente

1. Clone o repositório  
2. Instale as dependências com `npm install` ou `yarn`  
3. Configure as variáveis de ambiente (`.env`) com:
    ```env
    DATABASE_URL=postgresql://...
    NEXTAUTH_SECRET=...
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    ```
4. Rode as migrations do Prisma:  
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```
5. Inicie o servidor:  
    ```bash
    npm run dev
    ```

## 🔐 Acesso Protegido

A rota `/dashboard` só pode ser acessada por usuários autenticados.  
A autenticação é verificada via middleware (`middleware.ts`).

## 🧠 Abordagem AI First

Grande parte da lógica e estrutura foi criada com apoio de IA (ChatGPT), seguindo a abordagem AI First solicitada.  
Trechos relevantes da conversa com IA foram salvos e podem ser enviados separadamente, se necessário.

## 🌐 Deploy

Aplicação hospedada na Vercel:  
🔗 [Link para o Deploy](https://teste-nextjs.hiurimendes.com.br)

---

Desenvolvido como parte de um desafio técnico.
