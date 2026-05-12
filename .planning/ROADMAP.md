# Roadmap: LekinhosTUR

## Visão Geral

Este roadmap reflete a iniciativa de estruturar o projeto existente (brownfield) para focar primeiramente em estabilidade, performance e resolução de dívida técnica antes de evoluir para novas funcionalidades.

## Fases

- [x] **Fase 1: Refatoração & Dívida Técnica** - Centralização, limpeza de dependências e tipagem.
- [x] **Fase 2: Otimização de Performance & Assets** - Otimização de imagens e tempos de resposta.
- [ ] **Fase 3: Análise & Base de SEO** - Estabelecer bases para SEO.

## Detalhes das Fases

### Fase 1: Refatoração & Dívida Técnica
**Objetivo**: Limpar o código, organizar dependências e centralizar pontos de manutenção.
**Depende de**: Nada
**Requisitos**: REQ-01, REQ-03
**Critérios de Sucesso** (o que deve ser VERDADE):
  1. A URL do WhatsApp deve estar centralizada em um único arquivo `constants/contacts.ts`.
  2. Tipagens `any` no consumo de dados do Sanity devem estar substituídas por tipos explícitos.
  3. Pacotes não utilizados (ex: excessos do shadcn-ui) removidos do bundle.
**Planos**: Concluído

### Fase 2: Otimização de Performance & Assets
**Objetivo**: Reduzir tamanho de bundle e assets visuais (imagens).
**Depende de**: Fase 1
**Requisitos**: REQ-02
**Critérios de Sucesso** (o que deve ser VERDADE):
  1. Assets pesados (como logo-mobile.png) otimizados para WebP e dimensões adequadas.
  2. Carregamento visual melhorado (Score Lighthouse Mobile 90+).
  3. Implementação de Code Splitting para seções pesadas.
**Planos**: Em planejamento (02-01-PLAN.md)

### Fase 3: Análise & Base de SEO
**Objetivo**: Construir uma base amigável para motores de busca.
**Depende de**: Fase 2
**Requisitos**: REQ-04
**Critérios de Sucesso** (o que deve ser VERDADE):
  1. Meta tags dinâmicas implementadas com `react-helmet` ou similar.
  2. Relatório de decisão gerado sobre manter SPA ou migrar para SSR/SSG (Next.js).
**Planos**: TBD

## Progresso

**Ordem de Execução:**
As fases executam em ordem numérica: 1 → 2 → 3

| Fase | Planos Concluídos | Status | Concluído em |
|-------|----------------|--------|-----------|
| 1. Refatoração | 1/1 | Concluído | 11/05/2026 |
| 2. Otimização | 1/1 | Concluído | 11/05/2026 |
| 3. Base de SEO | 0/0 | Em andamento | - |
