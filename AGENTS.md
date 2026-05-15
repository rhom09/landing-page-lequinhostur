# AGENTS.md — Lekinhos TUR

## Visão Geral

Landing page de agência de viagens (excursões rodoviárias pelo Brasil). SPA com React 19 + Vite + TypeScript + Tailwind CSS v3, CMS Sanity, deploy na Vercel. Idioma: **PT-BR** em todo conteúdo e comentários.

## Comandos

```bash
# Dev server (porta 3000)
cd app && npm run dev

# Build de produção
cd app && npm run build

# Lint (ESLint flat config)
cd app && npm run lint

# Lint com fix
cd app && npm run lint -- --fix

# Type check (sem emit)
cd app && npx tsc --noEmit

# Preview do build
cd app && npm run preview
```

**Não há testes configurados** — nenhum framework de teste está instalado.

## Estrutura do Projeto

```
app/
├── src/
│   ├── App.tsx              # Composição principal, lazy loading de seções pesadas
│   ├── main.tsx             # Entry point, BrowserRouter + StrictMode
│   ├── index.css            # Tailwind layers, CSS vars, utilidades customizadas
│   ├── components/
│   │   ├── common/          # OptimizedImage (WebP automático, lazy loading)
│   │   ├── FloatingWhatsApp.tsx
│   │   └── GaleriaLightbox.tsx
│   ├── sections/            # Cada seção da landing page (1 componente = 1 seção)
│   ├── hooks/               # useScrollReveal, useIsMobile
│   ├── constants/           # contacts.ts (WhatsApp links)
│   ├── types/               # sanity.ts (interfaces: Destino, Excursao, ProximaSaida)
│   └── lib/                 # sanity.ts (client + urlFor)
├── index.html               # Meta tags, JSON-LD, fontes (Anton + Inter)
├── tailwind.config.js       # Design system completo
├── vite.config.ts           # Alias @/, plugin React, visualizer
├── tsconfig.app.json        # strict: true, noUnusedLocals, noUnusedParameters
└── eslint.config.js         # Flat config: js.recommended + TS + react-hooks + react-refresh
lekinhostur/                 # Sanity Studio (schema separado, não editar junto com app/)
```

## Design System

### Fontes
- **`font-display`** → Anton (títulos h1-h6, headings, badges de data)
- **`font-body`** → Inter (corpo, labels, parágrafos)
- **NUNCA** usar `font-serif` no projeto — quebra o design system

### Cores (usar tokens do Tailwind, jamais hardcode)
| Token                  | Hex        | Uso                            |
|------------------------|------------|--------------------------------|
| `lekinhos-blue`        | `#4A67AB`  | Cor primária, navbar, CTAs     |
| `lekinhos-blue-dark`   | `#2B3F7C`  | Footer, hover                  |
| `lekinhos-blue-light`  | `#E8ECF7`  | Backgrounds suaves             |
| `accent`               | `#E6D51E`  | Destaques, badges, hover CTAs  |
| `accent-hover`         | `#D4C41A`  | Hover do accent                |
| `lekinhos-gray-dark`   | `#1F2937`  | Texto principal                |
| `lekinhos-gray-medium` | `#6B7280`  | Texto secundário               |
| `lekinhos-off-white`   | `#F8F9FC`  | Backgrounds de cards           |

**Regra crítica**: Nunca usar `bg-[#1D55B5]` ou hex hardcoded — sempre usar `bg-lekinhos-blue` ou token correspondente.

### Sombras
- `shadow-xs` — sutil
- `shadow-card` / `shadow-card-hover` — cards de viagem
- `shadow-lg` — elementos flutuantes

## Convenções de Código

### Imports
```tsx
// 1. React / hooks
import { useState, useEffect } from 'react';
// 2. Ícones lucide-react
import { MessageCircle, MapPin } from 'lucide-react';
// 3. Hooks internos (alias @/)
import { useScrollReveal } from '@/hooks/useScrollReveal';
// 4. Lib / Sanity
import { client, urlFor } from '@/lib/sanity';
// 5. Tipos (import type separado)
import type { Destino } from '@/types/sanity';
// 6. Componentes
import { OptimizedImage } from '@/components/common/OptimizedImage';
// 7. Constantes (path relativo ../constants/)
import { WHATSAPP_LINK } from '../constants/contacts';
```

### Componentes
- **Named exports** sempre (`export function Nome()`, nunca `export default` exceto `App.tsx`)
- PascalCase para componentes, camelCase para funções/variáveis
- Props com interface explícita (não inline type)
- Um componente por arquivo

### TypeScript
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- `verbatimModuleSyntax: true` → usar `import type` para imports apenas de tipo
- `erasableSyntaxOnly: true` → não usar `enum`, `namespace`, ou parameter properties
- Tipos do Sanity em `src/types/sanity.ts`

### Tailwind
- Classes na ordem: layout → spacing → sizing → typography → colors → effects → transitions → responsive
- Sempre usar tokens (`text-lekinhos-blue`, `bg-accent`) ao invés de cores arbitrárias
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`
- Mobile-first: estilos base = mobile, prefixos `lg:` para desktop

### Animações
- **PROIBIDO** `animate-bounce` e `animate-ping` em elementos decorativos — causam distração visual
- Usar `animate-fade-in-up`, `animate-slide-in-right` (definidas no tailwind.config.js)
- `animate-pulse-slow` apenas para badges de urgência
- Respeitar `prefers-reduced-motion` (implementar quando necessário)

### Erros / Fallbacks
- Dados do Sanity sempre com fallback hardcoded (const local)
- Pattern: `try { await client.fetch() } catch { console.error("...", error) }` — manter app funcional mesmo sem CMS
- Imagens locais sempre `.webp` (conversão automática em `OptimizedImage`)

## Sanity CMS

- Project ID: `zv6ynzi7` (ou `VITE_SANITY_PROJECT_ID` env var)
- Dataset: `production`, CDN habilitado
- Schemas: `destino`, `excursao`, `proximaSaida`, `estatistica`
- Studio em `lekinhostur/` (separado do app frontend)
- Imagens: `urlFor(source).format('webp').width(N).url()`

## Arquitetura

- **SPA puro** — sem SSR/SSG, SEO via meta tags estáticas + JSON-LD no `index.html`
- Seções lazy-loaded: `CalendarioExcursoes`, `SocialProof` (com `React.lazy` + `Suspense`)
- Scroll suave via CSS `scroll-behavior: smooth` + `handleNavClick` com offset por viewport
- `useScrollReveal` (IntersectionObserver) para animações de entrada nas seções
- Navbar fixa no topo, BottomNav fixa em baixo (mobile only), FloatingWhatsApp (desktop only)
- Deploy: Vercel com `vercel.json` na raiz apontando para `app/`

## Duplicações Conhecidas (a refatorar)

- `NAV_LINKS` duplicado em `Navbar.tsx` e `Footer.tsx` → mover para `src/constants/navigation.ts`
- `handleNavClick` duplicado em `Navbar`, `Footer`, `BottomNav` → mover para `src/hooks/useSmoothScroll.ts`
- Fallbacks `.jpg` em `CalendarioExcursoes.tsx` → converter para `.webp`

## Antipadrões a Evitar

1. Hex hardcoded em className (`bg-[#1D55B5]`) — usar token do Tailwind
2. `font-serif` — usar `font-display` para títulos
3. `animate-bounce`/`animate-ping` em elementos decorativos
4. Links mortos (`href="#"`) — remover ou apontar para seção real
5. Imagens `.jpg`/`.png` em fallbacks — usar `.webp`
