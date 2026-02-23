# Manual Completo de Duplicação White Label

Este é o guia definitivo para duplicar a plataforma para um novo cliente. Siga os passos abaixo na ordem exata para garantir o funcionamento correto.

---

## 1. Configuração do Banco de Dados (Supabase)

1. Crie um novo projeto no [Supabase](https://supabase.com/).
2. Vá em **SQL Editor** -> **New Query**.
3. Copie, cole e execute o script abaixo para criar toda a estrutura de tabelas, funções e políticas de segurança (RLS):

```sql
-- ==========================================
-- 1. ESTRUTURA DE TABELAS
-- ==========================================

-- Perfis de Usuário
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role text check (role in ('admin', 'client', 'partner', 'first_mate')) default 'client',
  mt5_account text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Produtos (Robôs e Cursos)
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  type text check (type in ('ea', 'course')) not null,
  title text not null,
  description text,
  image_url text,
  external_link text,
  price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Solicitações de Licença
create table if not exists public.license_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id),
  product_name text,
  mt5_account text not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Prospectos (CRM)
create table if not exists public.prospects (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text,
  phone text,
  status text check (status in ('new', 'contacted', 'negotiating', 'converted', 'lost')) default 'new',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Solicitações de Parceiro
create table if not exists public.partner_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Educação: Módulos
create table if not exists public.modules (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  title text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Educação: Aulas
create table if not exists public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  duration text,
  is_free boolean default false,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Educação: Artigos/Biblioteca
create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text,
  content text,
  image_url text,
  author text default 'Equipe WhiteLabel',
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 2. AUTOMAÇÃO: CRIAÇÃO DE PERFIL
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'client');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 3. SEGURANÇA (RLS)
-- ==========================================

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.license_requests enable row level security;
alter table public.prospects enable row level security;
alter table public.partner_requests enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.articles enable row level security;

-- Políticas Básicas (Permissões)
create policy "Perfis visíveis pelo próprio" on public.profiles for all using (auth.uid() = id);
create policy "Produtos visíveis por todos" on public.products for select using (true);
create policy "Admin total" on public.profiles for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Leitura pública de módulos/aulas" on public.modules for select using (true);
create policy "Leitura pública de aulas" on public.lessons for select using (true);
create policy "Leitura pública de artigos" on public.articles for select using (true);
```

---

## 2. Configuração Local do Código

### Passo 1: Arquivo `.env`
Na raiz do projeto, crie ou edite o arquivo `.env` com as chaves do novo projeto Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### Passo 2: Branding (`lib/branding.ts`)
Personalize a identidade visual no arquivo `lib/branding.ts`:

```typescript
export const BRAND_CONFIG = {
  name: 'Nome da Marca',
  companyName: 'Empresa LTDA',
  colors: {
    primary: '#2563eb',       // Cor principal (ex: Azul)
    primaryHover: '#1d4ed8',  // Cor no mouse (levemente mais escura)
    primaryLight: '#f8e5cb',  // Cor de fundo leve (clara)
    secondary: '#0d0f28',     // Cor de contraste (Dark)
    accent: '#3b82f6',        // Cor de destaque secundário
  },
  logo: {
    icon: '/icon.png',        // Caminho do ícone (public/icon.png)
    full: '/logo.png',        // Caminho da logo (public/logo.png)
  },
  seo: {
    title: 'Nome da Marca | Sua Headline aqui',
    description: 'Breve descrição sobre o que sua plataforma faz para o Google.',
  }
};

export type BrandConfig = typeof BRAND_CONFIG;
```

---

## 3. Substituição de Imagens (Assets)

Substitua os seguintes arquivos na pasta `public/`:
1. `logo.png`: Logotipo completo (ideal fundo transparente).
2. `icon.png`: Ícone da marca (usado no mobile e favicon).
3. `favicon.ico`: Ícone que aparece na aba do navegador.

---

## 4. Comandos Git para Novo Repositório

Se você está criando um novo repositório private para o cliente:

1. Limpe o `origin` antigo (se existir):
```powershell
git remote remove origin
```

2. Conecte ao novo repositório do cliente:
```powershell
git remote add origin https://github.com/usuario/novo-repositorio.git
```

3. Suba o código:
```powershell
git add .
git commit -m "Initial white label setup"
git branch -M main
git push -u origin main
```

---

## 5. Deploy na Vercel

1. Importe o novo repositório na [Vercel](https://vercel.com/).
2. Em **Environment Variables**, adicione (essencial):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Clique em **Deploy**.

---

## 6. Primeiros Passos e Acesso Admin

1. Acesse a URL do site e clique em **Criar conta**.
2. Após criar a conta, você será um usuário padrão (`client`).
3. Para virar Administrador e acessar o Painel Admin:
   - Vá no **Supabase** -> **Table Editor** -> **profiles**.
   - Encontre seu usuário e altere a coluna `role` para `admin`.
4. Recarregue seu site e você verá o menu **Administração** habilitado.
