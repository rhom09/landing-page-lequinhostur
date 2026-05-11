# Roadmap: LekinhosTUR

## Overview

Este roadmap reflete a iniciativa de estruturar o projeto existente (brownfield) para focar primeiramente em estabilidade, performance e resolução de dívida técnica antes de evoluir para novas funcionalidades.

## Phases

- [ ] **Phase 1: Refactoring & Tech Debt** - Centralização, limpeza de dependências e tipagem.
- [ ] **Phase 2: Performance & Assets Optimization** - Otimização de imagens e tempos de resposta.
- [ ] **Phase 3: SEO Analysis & Foundation** - Estabelecer bases para SEO.

## Phase Details

### Phase 1: Refactoring & Tech Debt
**Goal**: Limpar o código, organizar dependências e centralizar pontos de manutenção.
**Depends on**: Nothing
**Requirements**: REQ-01, REQ-03
**Success Criteria** (what must be TRUE):
  1. A URL do WhatsApp deve estar centralizada em um único arquivo `constants.ts`.
  2. Tipagens `any` no consumo de dados do Sanity devem estar substituídas por tipos explícitos.
  3. Pacotes não utilizados (ex: excessos do shadcn-ui) removidos do bundle.
**Plans**: TBD

### Phase 2: Performance & Assets Optimization
**Goal**: Reduzir tamanho de bundle e assets visuais (imagens).
**Depends on**: Phase 1
**Requirements**: REQ-02
**Success Criteria** (what must be TRUE):
  1. Imagem de logo pesada otimizada para o formato WebP e dimensões adequadas.
  2. Carregamento visual melhorado (First Contentful Paint mais rápido).
**Plans**: TBD

### Phase 3: SEO Analysis & Foundation
**Goal**: Construir uma base amigável para motores de busca.
**Depends on**: Phase 2
**Requirements**: REQ-04
**Success Criteria** (what must be TRUE):
  1. Meta tags dinâmicas implementadas com `react-helmet` ou similar.
  2. Relatório de decisão gerado sobre manter SPA ou migrar para SSR/SSG (Next.js).
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Refactoring | 0/0 | Not started | - |
| 2. Optimization | 0/0 | Not started | - |
| 3. SEO Foundation | 0/0 | Not started | - |
