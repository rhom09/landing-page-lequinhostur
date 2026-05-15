# Estado do Projeto

## Referência do Projeto

Veja: .planning/PROJECT.md (atualizado em 11/05/2026)

**Valor central:** Conectar rapidamente clientes interessados em excursões ao atendimento personalizado via WhatsApp de forma confiável.
**Foco atual:** Fase 4 (Expansão de Conteúdo & Conversão) → Fase 5 (Auditoria UI/UX Design) enfileirada

## Posição Atual

Fase: Planejamento (Fase 4: Expansão de Conteúdo & Conversão | Fase 5: Auditoria UI/UX Design)
Plano: Nenhum (Fase 4 em brainstorming | Fase 5 com 20 itens detalhados no ROADMAP.md)
Status: Em andamento
Última atividade: 15/05/2026 — Auditoria UI/UX completa via skill ui-ux-pro-max. Fase 5 adicionada ao ROADMAP com 20 itens priorizados em 3 ondas (Crítico/Alto/Médio).

Progresso: [██████████] 100% (Fase 1)
Progresso: [██████████] 100% (Fase 2)
Progresso: [██████████] 100% (Fase 3)
Progresso: [░░░░░░░░░░] 0% (Fase 4)
Progresso: [░░░░░░░░░░] 0% (Fase 5)

## Métricas de Performance

**Velocidade:**
- Total de planos concluídos: 0
- Duração média: 0 min
- Tempo total de execução: 0.0 horas

**Por Fase:**

| Fase | Planos | Total | Média/Plano |
|------|--------|-------|-------------|
| 1     | 1      | 1     | 15 min      |
| 3     | 1      | 1     | 45 min      |

**Tendência Recente:**
- Últimos 5 planos: N/A
- Tendência: Estável

*Atualizado após a conclusão de cada plano*

## Contexto Acumulado

### Decisões

- [Início]: Decidido focar o primeiro roadmap (v1.0) exclusivamente em refatoração e otimização de Dívida Técnica de um projeto já funcional.
- [Fase 2]: Uso do formato WebP como padrão para todos os assets estáticos.
- [Fase 2]: Adoção de Lazy Loading para seções abaixo da dobra (fold) e Suspense para componentes pesados.
- [Fase 2]: Centralização da lógica de imagens no componente `OptimizedImage`.
- [Auditoria TS]: Implementação de Tipagem Estrita (`import type`) e hook `useScrollReveal` genérico.
- [Estratégia]: Uso da branch `dev` para homologação antes do merge em `main` (produção).
- [Fase 3]: Manutenção da arquitetura SPA (Vite) focando em otimizações estáticas de SEO e JSON-LD, postergando migração para SSR (Next.js).
- [Fase 5]: Auditoria UI/UX realizada via skill ui-ux-pro-max. 20 melhorias identificadas, organizadas em 3 ondas de prioridade (4 críticas, 7 altas, 9 médias/baixas).
- [Fase 5]: Animações infinitas (bounce/ping) são anti-pattern para elementos decorativos — devem ser usadas apenas em loading indicators.
- [Fase 5]: Navbar flutuante (floating) preferida sobre navbar grudada no top-0, seguindo Web Interface Guidelines.

### Pendências (Todos)

- [ ] Atualizar `PROJECT.md` com REQ-06 (Auditoria UI/UX Design — 20 melhorias)
- [ ] Atualizar `STATE.md` Continuidade da Sessão
- [ ] Fase 5 Onda 1: UI-01 — Remover animate-bounce/ping de elementos decorativos (BottomNav, FloatingWhatsApp)
- [ ] Fase 5 Onda 1: UI-02 — Adicionar hamburger menu mobile na Navbar
- [ ] Fase 5 Onda 1: UI-03 — Corrigir font-serif → font-display em GridViagens cards
- [ ] Fase 5 Onda 1: UI-04 — Unificar hardcoded #1D55B5 → lekinhos-blue (#4A67AB)
- [ ] Fase 5 Onda 2: UI-05 a UI-11 — 7 itens de prioridade alta (reduced-motion, focus-visible, floating navbar, hero height, scroll progress, clickable categories, active BottomNav)
- [ ] Fase 5 Onda 3: UI-12 a UI-20 — 9 itens médio/baixo (skeleton, avatars, DRY NAV_LINKS, DRY handleNavClick, filters, dead links, bg pattern, .webp fallbacks, JSON-LD)
- [ ] Criar plano Fase 5 (05-01-PLAN.md) antes de executar
- [ ] Executar Onda 1 (crítico) primeiro
- [ ] Adicionar `https://*.vercel.app` ao CORS do Sanity para preview da branch dev

### Impedimentos/Preocupações

- **CORS do Sanity**: A branch de homologação (`dev`) não exibirá dados dinâmicos até que o domínio `https://*.vercel.app` seja adicionado manualmente ao painel do Sanity pelo usuário. Isso impede a visualização completa do conteúdo dinâmico no ambiente de preview.

## Itens Adiados

| Categoria | Item | Status | Adiado Em |
|-----------|------|--------|-----------|
| *(nenhum)* | | | |

## Continuidade da Sessão

Última sessão: 15/05/2026
Parou em: Auditoria UI/UX completa. ROADMAP.md atualizado com Fase 5 (20 itens). STATE.md e PROJECT.md parcialmente atualizados — pendente: Pendências e Continuidade em STATE.md, REQ-06 em PROJECT.md.
Arquivo de retomada: .planning/ROADMAP.md (Fase 5) + .planning/STATE.md (Pendências)
