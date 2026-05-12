# Arquitetura — LekinhosTUR

> Gerado em: 2026-05-11 | Mapeamento automático via gsd-map-codebase

---

## Visão Geral

```
┌─────────────────────────────────────────────────────┐
│                    Monorepo Root                     │
│                                                     │
│  ┌──────────────────┐    ┌────────────────────────┐ │
│  │    app/           │    │    lekinhostur/         │ │
│  │  (Frontend SPA)   │◄───│  (Sanity CMS Studio)   │ │
│  │  Vite + React 19  │    │  Sanity v5             │ │
│  │  + TypeScript     │    │  GROQ queries          │ │
│  │  + Tailwind CSS   │    │  4 document types      │ │
│  └────────┬─────────┘    └────────────────────────┘ │
│           │                                         │
│           ▼                                         │
│  ┌──────────────────┐                               │
│  │  Vercel (Deploy)  │                               │
│  │  Output: app/dist │                               │
│  └──────────────────┘                               │
└─────────────────────────────────────────────────────┘
```

## Tipo de Aplicação

**Single Page Application (SPA)** — Uma única página de landing page com navegação por âncoras (hash links). Não há roteamento real de múltiplas páginas apesar do `react-router` estar instalado.

---

## Padrão Arquitetural

### Frontend: Section-Based Architecture

A aplicação é composta por seções empilhadas verticalmente, cada uma sendo um componente React auto-contido:

```
App.tsx (Compositor)
├── Navbar              (nav fixa no topo)
├── main
│   ├── HeroSection     (#hero)     — Banner principal + próximas saídas
│   ├── GridViagens     (#destinos) — Grid de destinos populares
│   ├── CategoriasAventura (#categorias) — Tipos de viagem
│   ├── CalendarioExcursoes (#excursões) — Lista de excursões
│   ├── SocialProof     (sem id)    — Depoimentos + estatísticas
│   ├── QuemSomos       (#quem-somos) — Sobre a empresa
│   └── LeadCapture     (#contato)  — CTA de contato
├── Footer              — Rodapé
├── FloatingWhatsApp    — FAB WhatsApp (desktop only)
└── BottomNav           — Nav fixa inferior (mobile only)
```

### Data Flow

```
Sanity CMS (Cloud) ──── GROQ Query ────► React Component
                                          │
                                          ├── State: Fallback (hardcoded)
                                          └── State: Sanity data (if available)
```

Cada seção que consome dados do CMS segue o padrão **Fallback-First**:
1. Renderiza imediatamente com dados estáticos embutidos
2. Busca dados do Sanity em background
3. Substitui dados se a busca for bem-sucedida

---

## Camadas da Aplicação

| Camada            | Diretório      | Responsabilidade                              |
|-------------------|----------------|-----------------------------------------------|
| **Entry Point**   | `src/main.tsx`  | Bootstrap React, BrowserRouter, StrictMode    |
| **Compositor**    | `src/App.tsx`   | Monta todas as seções em ordem                |
| **Sections**      | `src/sections/` | Componentes de página auto-contidos           |
| **Components**    | `src/components/`| Componentes reutilizáveis (FloatingWhatsApp, GaleriaLightbox) |
| **UI Primitives** | `src/components/ui/` | 53 componentes Radix/shadcn-ui (maioria não usada) |
| **Hooks**         | `src/hooks/`    | `useIsMobile`, `useScrollReveal`              |
| **Lib**           | `src/lib/`      | `sanity.ts` (client), `utils.ts` (cn helper)  |
| **Pages**         | `src/pages/`    | `Home.tsx` (vestigial, não usado)             |
| **Styles**        | `src/index.css`, `src/App.css` | CSS global + variáveis CSS |
| **Assets**        | `public/`       | 14 imagens estáticas (logos, destinos, hero)  |

---

## Decisões Arquiteturais Notáveis

### 1. Sem SSR/SSG
A landing page é **100% client-side rendered**. Não há pré-renderização. Isso impacta SEO negativamente para uma página de marketing.

### 2. Dados Duplicados
Todos os dados do Sanity possuem cópias hardcoded como fallback dentro dos componentes. Isso garante que a página funcione mesmo sem o CMS, mas cria duplicação.

### 3. Monorepo Sem Workspace Manager
Os dois projetos (`app/` e `lekinhostur/`) compartilham o mesmo repositório Git mas não usam npm workspaces, pnpm, ou qualquer ferramenta de monorepo.

### 4. Biblioteca UI Over-provisioned
53 componentes shadcn-ui instalados, mas apenas ~3 são utilizados diretamente pela landing page (`cn`, conceito de design system). Os demais parecem ter sido gerados automaticamente pelo CLI do shadcn.

### 5. WhatsApp como CTA Principal
Não há formulário de contato nem sistema de reservas. Todo o fluxo de conversão direciona para o WhatsApp via deep links.

---

## Fluxo de Navegação

```
                    ┌──────────────┐
                    │ Usuário abre │
                    │   a página   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  HeroSection  │
                    │  CTA: Agenda  │──► Scroll para #excursões
                    │  CTA: WhatsApp│──► WhatsApp (externo)
                    └──────┬───────┘
                           │ scroll
                    ┌──────▼───────┐
                    │ GridViagens   │
                    │ Click card   │──► Scroll para #excursões
                    └──────┬───────┘
                           │ scroll
                    ┌──────▼────────────┐
                    │CalendarioExcursoes │
                    │ Click imagem      │──► GaleriaLightbox (modal)
                    │ Click "Reservar"  │──► WhatsApp (externo)
                    └──────┬────────────┘
                           │ scroll
                    ┌──────▼───────┐
                    │  LeadCapture  │
                    │  CTA: WhatsApp│──► WhatsApp (externo)
                    │  CTA: Email  │──► Mailto (externo)
                    └──────────────┘
```
