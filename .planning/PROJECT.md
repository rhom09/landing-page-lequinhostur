# LekinhosTUR

## O Que É Este Projeto

LekinhosTUR é uma agência de viagens focada em excursões rodoviárias e experiências de lazer. A aplicação é uma Landing Page moderna, construída com React e integrada ao Sanity CMS para gerenciamento do calendário de excursões, provas sociais e hero images. O foco da plataforma é gerar conversões direcionando os usuários para o WhatsApp.

## Valor Central

Conectar rapidamente clientes interessados em excursões ao atendimento personalizado via WhatsApp de forma confiável, independentemente de falhas no CMS.

## Requisitos

### Validados

- [x] Landing page responsiva com catálogo de excursões.
- [x] Integração com Sanity CMS (com fallback estático em caso de falha).
- [x] Botões de conversão e direcionamento via WhatsApp.
- [x] Modal de Galeria (Lightbox) para imagens adicionais das excursões.
- [x] Layout moderno com navegação simplificada.

### Ativos

- [x] REQ-01: Centralização de constantes do projeto (URL do WhatsApp e contatos).
- [x] REQ-02: Otimização de Assets e Performance (WebP, Lazy Loading, OptimizedImage).
- [x] REQ-03: Limpeza de Bundle e Dívida Técnica (remover dependências de shadcn-ui não utilizadas e tipagens explicitas do Sanity).
- [x] REQ-04: Estratégia de Branches e Homologação (Criação da branch `dev`).
- [/] REQ-05: Estruturação para melhorias de SEO (Iniciando fase de análise).

### Fora de Escopo

- Autenticação e painel de clientes — (Motivo: O foco é conversão direta via WhatsApp, não auto-atendimento de compras).
- Gateway de pagamento integrado — (Motivo: Pagamentos são resolvidos diretamente no atendimento).

## Contexto

A aplicação utiliza Vite + React 19 + TypeScript + Tailwind CSS v3 e Vercel para deploy. O frontend foi recém-expandido com uma galeria lightbox. O SEO está sendo prejudicado pela falta de SSR, e existem pontos de refatoração para garantir a escalabilidade do projeto sem lentidão. O código atual possui 7 instâncias separadas de links de WhatsApp.

## Restrições

- **Stack Tecnológica**: React SPA. Mudanças drásticas para Next.js (para SEO) precisam ser avaliadas antes da execução devido ao esforço de migração.
- **Performance**: O site precisa carregar rapidamente em redes 3G, focando na compressão de LCP.
- **Conectividade Sanity**: A branch `dev` requer a adição manual do domínio `https://*.vercel.app` nas configurações de CORS do Sanity (Project ID: `zv6ynzi7`).

## Decisões Chave

| Decisão | Justificativa | Resultado |
|----------|-----------|---------|
| Implementação de Fallback | Garantir que o site funcione se o Sanity falhar | ✓ Bom |
| Focar o Roadmap 1.0 em Dívida Técnica | Código sustentável antes de adicionar funcionalidades | — Concluído (Fase 1) |
| Otimização de Performance (WebP) | Melhorar LCP e experiência mobile | ✓ Excelente |
| Branch de Homologação (`dev`) | Testar mudanças antes de subir para produção (main) | ✓ Seguro |

---
*Última atualização: 12/05/2026 após Auditoria TypeScript, criação da branch dev e configuração de preview na Vercel.*
