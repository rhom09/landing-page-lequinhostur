# LekinhosTUR - Landing Page

Esta é a Landing Page oficial da **LekinhosTUR**, desenvolvida com foco em alta performance, conversão via WhatsApp e gerenciamento dinâmico de conteúdo via Sanity CMS.

## 🚀 Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Performance**: Assets em WebP, Lazy Loading, Code Splitting e Otimização de Imagens.
- **Homologação**: Branch `dev` com Preview Deploy na Vercel.

## 🛠️ Configuração e Execução

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```

4. **Visualizar build (Preview)**:
   ```bash
   npm run preview
   ```

## 📈 Estratégia de Desenvolvimento

Este projeto utiliza uma estratégia de duas branches principais:

- **`main`**: Reflete o estado atual de produção. Apenas código estável e testado deve ser mesclado aqui.
- **`dev`**: Branch de homologação. Todas as novas funcionalidades e correções passam por aqui primeiro para testes na Vercel.

### ⚠️ Importante: Conexão com Sanity (CORS)

Para que os dados do Sanity apareçam corretamente na versão de homologação (`dev`), é necessário adicionar o domínio de preview da Vercel no painel do Sanity:
1. Vá para [manage.sanity.io](https://manage.sanity.io)
2. Selecione o projeto `zv6ynzi7`
3. Vá em **API > CORS Origins**
4. Adicione `https://*.vercel.app` (habilitando credenciais).

## ⚡ Otimizações Implementadas

- **Imagens Otimizadas**: Uso do componente `<OptimizedImage />` que gerencia automaticamente `loading="lazy"`, `fetchpriority` e formatos modernos.
- **Bundle Enxuto**: Remoção de mais de 50 componentes de UI não utilizados para reduzir o tempo de carregamento.
- **Tipagem Estrita**: Auditoria completa de TypeScript para evitar erros em produção.
- **Análise Visual**: Plugin `rollup-plugin-visualizer` habilitado para monitorar o tamanho do bundle.

## 📂 Estrutura do Projeto

- `src/components/ui/`: Componentes base (shadcn otimizado).
- `src/sections/`: Seções da Landing Page.
- `src/constants/`: Constantes globais (como links de WhatsApp).
- `src/hooks/`: Hooks customizados (ex: `useScrollReveal`).
- `src/lib/`: Configurações de bibliotecas (Sanity client).
- `src/types/`: Definições de tipos TypeScript.

---
*Desenvolvido com foco em excelência e conversão.*
