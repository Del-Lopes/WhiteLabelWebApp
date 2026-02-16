# Manual de Duplicação White Label - Libertraders

Este manual descreve os passos necessários para duplicar este projeto para um novo cliente White Label.

## 1. Configuração do Ambiente
- Crie um novo projeto no **Supabase**.
- Copie as credenciais (URL e Anon Key).
- Crie um arquivo `.env` baseado no `.env.example` com as novas credenciais.

## 2. Banco de Dados (Supabase)
- Execute o script SQL de inicialização (disponível em `.agent/knowledge/database_schema.sql` ou similar) no SQL Editor do Supabase.
- Isso criará as tabelas `profiles`, `robots`, `licenses`, `partners`, `prospects` e as políticas de RLS necessárias.

## 3. Branding (Aparência)
Toda a personalização visual é feita no arquivo `lib/branding.ts`.

### Passos para Novo Cliente:
1. Altere o `name` e `companyName`.
2. Atualize as cores no objeto `colors`:
   - `primary`: Cor principal (ex: botões, links).
   - `primaryHover`: Versão levemente mais escura para hover.
   - `primaryLight`: Versão muito clara para fundos/bg.
3. Substitua os assets de imagem:
   - Logo full em `public/logo.png`.
   - Ícone em `public/icon.png`.
   - Favicon em `public/favicon.ico`.
4. Atualize os metadados de SEO em `seo`.

## 4. Deploy
1. Inicialize um novo repositório Git.
2. Faça o push para o provedor de Git escolhido.
3. Conecte ao **Vercel** ou **Netlify** para deploy automático.
4. Certifique-se de configurar as Environment Variables (mesmas do `.env`) no provedor de deploy.

## 5. Verificação Final
- Teste o login e cadastro.
- Verifique se a logo e o nome da marca aparecem corretamente no Dashboard e na Sidebar.
- Teste a responsividade no mobile.
