# Estrutura de Arquivos — LekinhosTUR

> Gerado em: 2026-05-11

---

## Árvore Principal

```
Landing Page LekinhosTUR/
├── .planning/codebase/        # Documentos GSD
├── vercel.json                # Deploy config (Vercel + Vite)
├── translate_gsd.py           # Script utilitário
│
├── app/                       # 🖥️ FRONTEND
│   ├── index.html             # Entry HTML
│   ├── package.json           # Deps frontend
│   ├── vite.config.ts         # Vite (port 3000, alias @)
│   ├── tailwind.config.js     # Design tokens
│   ├── public/                # 14 imagens estáticas (~2.6MB)
│   └── src/
│       ├── main.tsx           # Bootstrap (StrictMode + BrowserRouter)
│       ├── App.tsx            # Compositor de seções
│       ├── sections/          # 10 seções da landing page
│       ├── components/        # GaleriaLightbox, FloatingWhatsApp
│       ├── components/ui/     # 53 componentes shadcn-ui
│       ├── hooks/             # useIsMobile, useScrollReveal
│       ├── lib/               # sanity.ts, utils.ts
│       └── pages/             # Home.tsx (vestigial, não usado)
│
└── lekinhostur/               # 🏢 SANITY CMS STUDIO
    ├── sanity.config.js       # projectId: zv6ynzi7
    └── schemaTypes/index.js   # 4 schemas
```

## Seções (`src/sections/`)

| Arquivo                    | Tamanho | Sanity | Âncora        |
|----------------------------|--------:|:------:|---------------|
| `Navbar.tsx`               |   3.3KB | ❌     | —             |
| `HeroSection.tsx`          |   6.9KB | ✅     | `#hero`       |
| `GridViagens.tsx`          |   5.9KB | ✅     | `#destinos`   |
| `CategoriasAventura.tsx`   |   2.5KB | ❌     | `#categorias` |
| `CalendarioExcursoes.tsx`  |   9.3KB | ✅     | `#excursões`  |
| `SocialProof.tsx`          |   4.9KB | ✅     | —             |
| `QuemSomos.tsx`            |   4.3KB | ❌     | `#quem-somos` |
| `LeadCapture.tsx`          |   4.8KB | ❌     | `#contato`    |
| `Footer.tsx`               |   5.1KB | ❌     | —             |
| `BottomNav.tsx`            |   3.1KB | ❌     | —             |

## Dependências entre Arquivos

```
main.tsx → App.tsx
  ├── Navbar.tsx
  ├── HeroSection.tsx ──► lib/sanity.ts
  ├── GridViagens.tsx ──► lib/sanity.ts, hooks/useScrollReveal.ts
  ├── CategoriasAventura.tsx ──► hooks/useScrollReveal.ts
  ├── CalendarioExcursoes.tsx ──► lib/sanity.ts, hooks/useScrollReveal.ts, GaleriaLightbox.tsx
  ├── SocialProof.tsx ──► lib/sanity.ts, hooks/useScrollReveal.ts
  ├── QuemSomos.tsx ──► hooks/useScrollReveal.ts
  ├── LeadCapture.tsx ──► hooks/useScrollReveal.ts
  ├── Footer.tsx
  ├── FloatingWhatsApp.tsx
  └── BottomNav.tsx
```

## Métricas

| Diretório         | Arquivos | Tamanho   |
|-------------------|---------:|----------:|
| `src/sections/`   |       10 |  ~50.1 KB |
| `src/components/` |        2 |  ~11.7 KB |
| `src/components/ui/` |    53 | ~119.3 KB |
| `src/hooks/`      |        2 |   ~1.2 KB |
| `src/lib/`        |        2 |   ~0.8 KB |
| `public/`         |       14 |  ~2.6 MB  |
