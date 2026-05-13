# Estado do Projeto

## Referência do Projeto

Veja: .planning/PROJECT.md (atualizado em 11/05/2026)

**Valor central:** Conectar rapidamente clientes interessados em excursões ao atendimento personalizado via WhatsApp de forma confiável.
**Foco atual:** Fase 4 (Expansão de Conteúdo & Conversão)

## Posição Atual

Fase: Planejamento (Fase 4: Expansão de Conteúdo & Conversão)
Plano: Nenhum (Em brainstorming)
Status: Em andamento
Última atividade: 13/05/2026 — Roadmap atualizado com a Fase 4 para migração de conteúdo estático para Sanity e melhoria na conversão via WhatsApp.

Progresso: [██████████] 100% (Fase 1)
Progresso: [██████████] 100% (Fase 2)
Progresso: [██████████] 100% (Fase 3)
Progresso: [░░░░░░░░░░] 0% (Fase 4)

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

### Pendências (Todos)

Nenhuma por enquanto.

### Impedimentos/Preocupações

- **CORS do Sanity**: A branch de homologação (`dev`) não exibirá dados dinâmicos até que o domínio `https://*.vercel.app` seja adicionado manualmente ao painel do Sanity pelo usuário. Isso impede a visualização completa do conteúdo dinâmico no ambiente de preview.

## Itens Adiados

| Categoria | Item | Status | Adiado Em |
|-----------|------|--------|-----------|
| *(nenhum)* | | | |

## Continuidade da Sessão

Última sessão: 13/05/2026 17:53
Parou em: Início do planejamento da Fase 4.
Arquivo de retomada: .planning/ROADMAP.md
