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

### Fase 5: Auditoria UI/UX Design
**Objetivo**: Corrigir problemas de acessibilidade, consistência visual e polimento interativo identificados pela avaliação ui-ux-pro-max.
**Depende de**: Fase 4
**Requisitos**: REQ-06
**Critérios de Sucesso** (o que deve ser VERDADE):
1. Nenhuma animação infinita decorativa (bounce/ping) em elementos interativos.
2. Menu mobile funcional (hamburger/drawer) com acesso a todos os links.
3. Tipografia 100% consistente com o design system (Anton + Inter, sem font-serif).
4. Navbar com cor unificada e estilo floating.
5. Focus visible em todos os elementos interativos para navegação por teclado.
6. `prefers-reduced-motion` respeitado globalmente.
7. BottomNav com estado ativo baseado na seção visível.
8. Categorias clicáveis que filtram ou navegam para seções relevantes.
9. Skeleton loading que espelha a estrutura real dos componentes.
10. Código DRY — NAV_LINKS e handleNavClick extraídos para shared constants/hook.
**Planos**: 05-01-PLAN.md (criado, aguardando execução)

---

## Detalhamento da Fase 5: Auditoria UI/UX Design

### Onda 1 — Crítico (Acessibilidade & Consistência Visual)

| ID | Problema | Arquivo | Ação | Verificação |
|----|----------|---------|------|-------------|
| UI-01 | `animate-bounce` infinito no FAB WhatsApp e BottomNav | `FloatingWhatsApp.tsx:11`, `BottomNav.tsx:45` | Remover `animate-bounce`. Substituir por micro-animação sutil (ex: `hover:scale-110` já existe) ou `animate-pulse` com opacidade baixa. Remover também `animate-ping` no FAB | Nenhum `animate-bounce` ou `animate-ping` em elementos decorativos |
| UI-02 | Sem menu mobile na Navbar | `Navbar.tsx` | Adicionar hamburger menu com drawer/sheet lateral contendo NAV_LINKS + CTA WhatsApp. Manter BottomNav como navegação rápida complementar | Hamburger visível em <1024px; drawer abre com links clicáveis; ESC fecha o drawer |
| UI-03 | `font-serif` inconsistente nos cards de viagem | `GridViagens.tsx:77` | Trocar `font-serif` por `font-display` (Anton) nos títulos `<h3>` dos ViagemCard | Zero `font-serif` no código; títulos seguem a stack Anton+Inter |
| UI-04 | Cor `#1D55B5` hardcoded diverge do design system | `Navbar.tsx:41,46` | Unificar para `bg-lekinhos-blue` (#4A67AB) em todos os estados da Navbar (scrolled e não-scrolled) | Inspeção visual mostra azul uniforme; nenhuma cor hardcoded fora do tailwind config |

### Onda 2 — Alto (UX Interativa & Acessibilidade)

| ID | Problema | Arquivo | Ação | Verificação |
|----|----------|---------|------|-------------|
| UI-05 | Sem `prefers-reduced-motion` | `index.css`, `tailwind.config.js` | Adicionar `@media (prefers-reduced-motion: reduce)` que desabilita `fade-in-up`, `bounce`, `ping` e `scale` transitions. Adicionar classe `motion-safe:` nas animações existentes | `window.matchMedia('(prefers-reduced-motion: reduce)')` ativo desabilita animações |
| UI-06 | Sem focus visible nos links/botões | Todos os componentes | Adicionar `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` globalmente em `<a>`, `<button>` via `@layer base` no index.css | Tab-navegação mostra ring visível em todos os interativos |
| UI-07 | Navbar colada no top-0 | `Navbar.tsx:40` | Transformar em floating navbar: adicionar `top-3 left-3 right-3 rounded-2xl` + `bg-lekinhos-blue/95 backdrop-blur-md` em ambos os estados | Navbar flutuante com 12px de margem do topo e bordas arredondadas |
| UI-08 | Hero min-h-[70vh] mobile pode cortar conteúdo | `HeroSection.tsx:48` | Trocar `min-h-[70vh]` para `min-h-[calc(100dvh-72px)]` em mobile, mantendo `lg:min-h-[100vh]` em desktop | Hero preenche viewport completo em qualquer tela mobile sem cortar CTAs |
| UI-09 | Sem indicador de progresso/scroll | Geral | Adicionar thin progress bar no topo da página (ex: 2px `bg-accent`) que avança conforme scroll. Usar `scrollY / (docHeight - winHeight)` | Barra visível no topo mostrando progresso de leitura |
| UI-10 | Categorias sem interatividade | `CategoriasAventura.tsx` | Tornar categorias clicáveis: ao clicar, scroll suave para `#destinos` com filtro aplicado (requer UI-16) ou link direto para seção relevante | Click em categoria navega/filtra destinos; `cursor-pointer` adicionado |
| UI-11 | Sem estado ativo na BottomNav | `BottomNav.tsx` | Adicionar `useState` + `IntersectionObserver` para detectar seção visível e destacar item ativo (cor `text-lekinhos-blue` ou `text-accent`) | Item da BottomNav correspondente à seção visível fica destacado |

### Onda 3 — Médio/Baixo (Polimento & Refatoração)

| ID | Problema | Arquivo | Ação | Verificação |
|----|----------|---------|------|-------------|
| UI-12 | Loading skeleton genérico | `App.tsx:17` | Criar `SectionSkeleton` que espelha CalendarioExcursoes (lista com thumb+texto) e SocialProof (cards com avatar+estrelas+texto) | Suspense fallback visualmente representa o conteúdo que vai carregar |
| UI-13 | Depoimentos usam fotos de destinos como avatar | `SocialProof.tsx:14` | Substituir imagens de destinos por avatares com iniciais (circle com background + letra do nome) ou fotos reais de pessoas | Avatares mostram iniciais ou fotos de pessoas, não paisagens |
| UI-14 | NAV_LINKS duplicado | `Navbar.tsx:4`, `Footer.tsx:3` | Extrair array para `constants/navigation.ts` e importar nos 3 componentes | Uma única fonte de verdade para links de navegação |
| UI-15 | handleNavClick duplicado 3x | `Navbar.tsx:26`, `Footer.tsx:15`, `BottomNav.tsx:6` | Criar hook `useSmoothScroll()` em `hooks/useSmoothScroll.ts` e importar nos componentes | Uma única implementação; zero duplicação de lógica de scroll |
| UI-16 | Grid de destinos sem filtro | `GridViagens.tsx` | Adicionar tabs/filtros por categoria (Religiosas, Praia, Serra, etc.) integrando com dados de `CategoriasAventura`. Requer que categorias sejam propagadas nos dados do Sanity | Filtros visíveis; ao selecionar "Praia", só destinos de praia aparecem |
| UI-17 | Footer com links mortos | `Footer.tsx:115-116` | Criar páginas mínimas de "Política de Privacidade" e "Termos de Uso" ou remover os links | Links levam a conteúdo real ou não existem |
| UI-18 | Background pattern invisível | `LeadCapture.tsx:13` | Aumentar `opacity-[0.03]` para `opacity-[0.06]` ou substituir por SVG pattern mais visível | Pattern sutil mas perceptível a olho nu |
| UI-19 | Fallbacks .jpg no Calendario | `CalendarioExcursoes.tsx` | Converter imagens fallback de `.jpg` para `.webp` e atualizar referências | Todas as imagens de fallback usam WebP |
| UI-20 | Sem schema markup de turismo | Geral | Adicionar JSON-LD `TravelAgency` com dados de contato, endereço e serviços (complementar ao JSON-LD da Fase 3) | Google Rich Results Test valida o schema TravelAgency |

## Progresso

**Ordem de Execução:**
As fases executam em ordem numérica: 1 → 2 → 3 → 4 → 5

| Fase | Planos Concluídos | Status | Concluído em |
|-------|----------------|--------|-----------|
| 1. Refatoração | 1/1 | Concluído | 11/05/2026 |
| 2. Otimização | 1/1 | Concluído | 11/05/2026 |
| Auditoria TS | 1/1 | Concluído | 12/05/2026 |
| 3. Base de SEO | 1/1 | Concluído | 12/05/2026 |
| 4. Upgrade de Conteúdo | 0/1 | Em Planejamento | - |
| 5. Auditoria UI/UX | 0/1 | Em Planejamento | - |
