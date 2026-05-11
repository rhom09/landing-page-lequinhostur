# LekinhosTUR

## What This Is

LekinhosTUR é uma agência de viagens focada em excursões rodoviárias e experiências de lazer. A aplicação é uma Landing Page moderna, construída com React e integrada ao Sanity CMS para gerenciamento do calendário de excursões, provas sociais e hero images. O foco da plataforma é gerar conversões direcionando os usuários para o WhatsApp.

## Core Value

Conectar rapidamente clientes interessados em excursões ao atendimento personalizado via WhatsApp de forma confiável, independentemente de falhas no CMS.

## Requirements

### Validated

- [x] Landing page responsiva com catálogo de excursões.
- [x] Integração com Sanity CMS (com fallback estático em caso de falha).
- [x] Botões de conversão e direcionamento via WhatsApp.
- [x] Modal de Galeria (Lightbox) para imagens adicionais das excursões.
- [x] Layout moderno com navegação simplificada.

### Active

- [ ] REQ-01: Centralização de constantes do projeto (URL do WhatsApp e contatos).
- [ ] REQ-02: Otimização de Assets e Performance (compressão de imagens como logo-mobile.png, redução de tempo de carregamento).
- [ ] REQ-03: Limpeza de Bundle e Dívida Técnica (remover dependências de shadcn-ui não utilizadas e tipagens `any` do Sanity).
- [ ] REQ-04: Estruturação para melhorias de SEO (como Client-Side Rendering prejudica o indexamento).

### Out of Scope

- Autenticação e painel de clientes — (why: O foco é conversão direta via WhatsApp, não auto-atendimento de compras).
- Gateway de pagamento integrado — (why: Pagamentos são resolvidos diretamente no atendimento).

## Context

A aplicação utiliza Vite + React 19 + TypeScript + Tailwind CSS v3 e Vercel para deploy. O frontend foi recém-expandido com uma galeria lightbox. O SEO está sendo prejudicado pela falta de SSR, e existem pontos de refatoração para garantir a escalabilidade do projeto sem lentidão. O código atual possui 7 instâncias separadas de links de WhatsApp.

## Constraints

- **Tech stack**: React SPA. Mudanças drásticas para Next.js (para SEO) precisam ser avaliadas antes da execução devido ao esforço de migração.
- **Performance**: O site precisa carregar rapidamente em redes 3G, focando na compressão de LCP.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Implementação de Fallback | Garantir que o site funcione se o Sanity falhar | ✓ Good |
| Focar o Roadmap 1.0 em Tech Debt | Código sustentável antes de adicionar features | — Pending |

---
*Last updated: 2026-05-11 after GSD Init*
