# Informações Técnicas da Aplicação

## Ambiente
- **Node.js**: 20+
- **Vite**: v7.2.4
- **Tailwind CSS**: v3.4.19 (Tema Shadcn customizado)
- **Framework**: React 19 (SPA)

## Otimização de Componentes
O projeto passou por uma limpeza profunda de dívida técnica. Mais de 50 componentes `shadcn/ui` que não estavam sendo utilizados foram removidos para garantir um bundle extremamente leve e rápido.

### Componentes Ativos (Core):
- `accordion`, `alert-dialog`, `badge`, `button`, `card`, `carousel`, `dialog`, `drawer`, `input`, `scroll-area`, `separator`, `skeleton`, `sonner`.

## Estrutura de Diretórios
- `src/sections/`: Seções principais da página (Hero, Excursões, Depoimentos, etc).
- `src/hooks/`: Hooks reutilizáveis, incluindo o `useScrollReveal` genérico.
- `src/types/`: Tipagens TypeScript centralizadas para Sanity e componentes.
- `src/constants/`: Centralização de contatos e URL base do WhatsApp.
- `src/App.tsx`: Ponto de entrada com carregamento preguiçoso (Lazy Loading) das seções.

## Performance
- **Imagens**: Formato WebP obrigatório para assets estáticos.
- **LCP**: Priorização de carregamento da seção Hero.
- **Bundle**: Monitorado via `rollup-plugin-visualizer` (gera `stats.html` no build).

---
*Atualizado em 12/05/2026 após Auditoria de Performance e TS.*