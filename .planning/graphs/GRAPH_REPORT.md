# Graph Report - Landing Page LekinhosTUR  (2026-05-12)

## Corpus Check
- 53 files · ~213,181 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 268 nodes · 310 edges · 35 communities (34 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9aa2d965`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 28|Community 28]]

## God Nodes (most connected - your core abstractions)
1. `useScrollReveal()` - 17 edges
2. `2️⃣ Requirement Validation Summary` - 11 edges
3. `OptimizedImage()` - 9 edges
4. `urlFor()` - 7 edges
5. `Arquitetura — LekinhosTUR` - 7 edges
6. `Convenções de Código — LekinhosTUR` - 7 edges
7. `Integrações — LekinhosTUR` - 7 edges
8. `LekinhosTUR` - 7 edges
9. `Estado do Projeto` - 7 edges
10. `ExcursaoItem()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `DepoimentoCard()` --calls--> `useScrollReveal()`  [EXTRACTED]
  app/src/sections/SocialProof.tsx → app/src/hooks/useScrollReveal.ts
- `SocialProof()` --calls--> `useScrollReveal()`  [EXTRACTED]
  app/src/sections/SocialProof.tsx → app/src/hooks/useScrollReveal.ts
- `ExcursaoItem()` --calls--> `useScrollReveal()`  [EXTRACTED]
  app/src/sections/CalendarioExcursoes.tsx → app/src/hooks/useScrollReveal.ts
- `CalendarioExcursoes()` --calls--> `useScrollReveal()`  [EXTRACTED]
  app/src/sections/CalendarioExcursoes.tsx → app/src/hooks/useScrollReveal.ts
- `CategoriaItem()` --calls--> `useScrollReveal()`  [EXTRACTED]
  app/src/sections/CategoriasAventura.tsx → app/src/hooks/useScrollReveal.ts

## Communities (35 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (25): OptimizedImage(), OptimizedImageProps, GaleriaLightbox(), GaleriaLightboxProps, builder, client, SanityImageSource, urlFor() (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (18): FloatingWhatsApp(), useScrollReveal(), BottomNav(), CalendarioExcursoes(), CategoriaItem(), CATEGORIAS, CategoriasAventura(), Footer() (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (18): 1. Sem SSR/SSG, 2. Dados Duplicados, 3. Monorepo Sem Workspace Manager, 4. Biblioteca UI Over-provisioned, 5. WhatsApp como CTA Principal, Arquitetura — LekinhosTUR, Camadas da Aplicação, code:block1 (┌─────────────────────────────────────────────────────┐) (+10 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (18): 10. Sem Analytics, 11. Sem Meta Tags Dinâmicas, 12. Scroll Navigation Duplicada, 1. SEO — Client-Side Rendering, 2. Imagens Não Otimizadas, 3. Sem HTTPS/CSP Headers, 4. WhatsApp Link Duplicado, 5. Tipagem `any` Excessiva (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (16): 1. Sanity CMS (Headless CMS), 2. WhatsApp Business API (Deep Links), 3. Redes Sociais (Links Estáticos), 4. E-mail (Mailto), 5. Google Fonts (CDN Externo), code:typescript (// Padrão repetido em 4 componentes), Configuração, Configuração (+8 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (15): 1️⃣ Document Metadata, 2️⃣ Requirement Validation Summary, 3️⃣ Coverage & Matching Metrics, 4️⃣ Key Gaps / Risks, Test TC001 Use the floating WhatsApp button from the landing page, Test TC002 Open the excursions calendar and reserve a trip, Test TC003 Reserve an excursion directly from the calendar list, Test TC004 Browse the gallery and view a photo in the lightbox (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): code:tsx (const { ref, isVisible } = useScrollReveal(0.1);), Componentes, Constantes, Convenções de Código — LekinhosTUR, Estado e Efeitos, Estilização, Hooks Customizados, Linguagem e Estilo (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (11): code:bash (npm install), code:bash (npm run dev), code:bash (npm run build), code:bash (npm run preview), 🛠️ Configuração e Execução, 📈 Estratégia de Desenvolvimento, 📂 Estrutura do Projeto, ⚠️ Importante: Conexão com Sanity (CORS) (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (10): Ativos, Contexto, Decisões Chave, Fora de Escopo, LekinhosTUR, O Que É Este Projeto, Requisitos, Restrições (+2 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (10): Contexto Acumulado, Continuidade da Sessão, Decisões, Estado do Projeto, Impedimentos/Preocupações, Itens Adiados, Métricas de Performance, Pendências (Todos) (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.2
Nodes (9): Detalhes das Fases, Fase 1: Refatoração & Dívida Técnica, Fase 2: Otimização de Performance & Assets, Fase 3: Análise & Base de SEO, Fase de Estabilização: Auditoria TypeScript, Fases, Progresso, Roadmap: LekinhosTUR (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.2
Nodes (9): CMS — Sanity Studio (`lekinhostur/`), Credenciais do Projeto, Dependências Críticas NÃO Utilizadas, Frontend (`app/`), Infraestrutura e Deploy, Paleta de Cores Principal, Resumo Executivo, Stack Tecnológico — LekinhosTUR (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (7): code:block1 (Landing Page LekinhosTUR/), code:block2 (main.tsx → App.tsx), Dependências entre Arquivos, Estrutura de Arquivos — LekinhosTUR, Métricas, Seções (`src/sections/`), Árvore Principal

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (7): Cobertura Estimada, Estado Atual, Prioridade Alta, Prioridade Baixa, Prioridade Média, Recomendações, Testes — LekinhosTUR

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (5): destinoType, estatisticaType, excursaoType, proximaSaidaType, schemaTypes

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (6): Ambiente, Componentes Ativos (Core):, Estrutura de Diretórios, Informações Técnicas da Aplicação, Otimização de Componentes, Performance

## Knowledge Gaps
- **128 isolated node(s):** `CalendarioExcursoes`, `SocialProof`, `GaleriaLightboxProps`, `OptimizedImageProps`, `builder` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useScrollReveal()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `CalendarioExcursoes`, `SocialProof`, `GaleriaLightboxProps` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._