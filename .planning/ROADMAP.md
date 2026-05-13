# Roadmap: LekinhosTUR

## Visão Geral

Este roadmap reflete a iniciativa de estruturar o projeto existente (brownfield) para focar primeiramente em estabilidade, performance e resolução de dívida técnica antes de evoluir para novas funcionalidades.

## Fases

- [x] **Fase 1: Refatoração & Dívida Técnica** - Centralização, limpeza de dependências e tipagem.
- [x] **Fase 2: Otimização de Performance & Assets** - Otimização de imagens e tempos de resposta.
- [x] **Fase de Estabilização: Auditoria TypeScript** - Correção de tipos e limpeza de código.
- [x] **Fase 3: Análise & Base de SEO** - Estabelecer bases para SEO.

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
**Planos**: Concluído (02-01-PLAN.md)

### Fase de Estabilização: Auditoria TypeScript
**Objetivo**: Garantir que o código esteja livre de erros de tipagem e sem imports desnecessários.
**Depende de**: Fase 2
**Critérios de Sucesso**:
  1. Zero erros no `tsc --noEmit`.
  2. Build de produção concluído sem warnings de imports não utilizados.
  3. Hook `useScrollReveal` suportando múltiplos tipos de elementos HTML.
**Planos**: Concluído

### Fase 4: Expansão de Conteúdo & Conversão (Upgrade)
**Objetivo**: Tornar o site 100% gerenciável e focar em ferramentas de venda e refinamento visual premium.
**Depende de**: Fase 3
**Critérios de Sucesso**:
  1. Seção "Quem Somos" e "Nossa Frota" migradas para o Sanity.
  2. Sistema de Depoimentos (Social Proof) dinâmico com avatares.
  3. Integração de WhatsApp com mensagens contextuais e botões flutuantes inteligentes.
  4. Interface refinada com Glassmorphism, micro-interações e animações de scroll.

## Progresso

**Ordem de Execução:**
As fases executam em ordem numérica: 1 → 2 → 3 → 4

| Fase | Planos Concluídos | Status | Concluído em |
|-------|----------------|--------|-----------|
| 1. Refatoração | 1/1 | Concluído | 11/05/2026 |
| 2. Otimização | 1/1 | Concluído | 11/05/2026 |
| Auditoria TS | 1/1 | Concluído | 12/05/2026 |
| 3. Base de SEO | 1/1 | Concluído | 12/05/2026 |
| 4. Upgrade de Conteúdo | 0/1 | Em Planejamento | - |
