# Stack Tecnológico — LekinhosTUR

> Gerado em: 2026-05-11 | Mapeamento automático via gsd-map-codebase

---

## Resumo Executivo

Landing page de turismo rodoviário, composta por duas aplicações independentes dentro de um monorepo:
1. **Frontend** (`app/`) — Vite + React 19 + TypeScript + Tailwind CSS v3
2. **CMS** (`lekinhostur/`) — Sanity Studio v5

Deploy via **Vercel** com build da pasta `app/`.

---

## Frontend (`app/`)

| Camada         | Tecnologia         | Versão   | Finalidade                        |
|----------------|--------------------|---------:|-----------------------------------|
| Runtime        | React              | 19.2.0   | Biblioteca de UI                  |
| Bundler        | Vite               | 7.2.4    | Dev server + build                |
| Linguagem      | TypeScript         | ~5.9.3   | Tipagem estática                  |
| CSS Framework  | Tailwind CSS       | 3.4.19   | Utility-first styling             |
| CSS Animations | tailwindcss-animate| 1.0.7    | Animações via classes utilitárias  |
| Icons          | lucide-react       | 0.562.0  | Ícones SVG como componentes       |
| UI Primitives  | Radix UI           | vários   | 20+ componentes headless          |
| Routing        | react-router       | 7.6.1    | Roteamento SPA                    |
| CMS Client     | @sanity/client     | 7.22.0   | Fetching de dados do Sanity       |
| Image Builder  | @sanity/image-url  | 2.1.1    | Geração de URLs de imagens Sanity |
| Charts         | recharts           | 2.15.4   | Gráficos (instalado, não usado)   |
| Forms          | react-hook-form    | 7.70.0   | Validação de formulários          |
| Validation     | zod                | 4.3.5    | Schema validation                 |
| Utility        | clsx + tailwind-merge | vários| Merge de classes CSS              |
| Toasts         | sonner             | 2.0.7    | Notificações toast                |
| Carousel       | embla-carousel     | 8.6.0    | Carrossel de imagens              |

### Tipografia
- **Display**: Anton (Google Fonts)
- **Body**: Inter (Google Fonts)

### Paleta de Cores Principal
| Token              | Hex       | Uso                         |
|--------------------|-----------|-----------------------------|
| `primary`          | `#4A67AB` | Azul institucional          |
| `primary-dark`     | `#2B3F7C` | Variante escura             |
| `accent`           | `#E6D51E` | Amarelo destaque / CTAs     |
| `off-white`        | `#F8F9FC` | Fundo alternativo           |
| `gray-dark`        | `#1F2937` | Texto principal             |

---

## CMS — Sanity Studio (`lekinhostur/`)

| Camada     | Tecnologia     | Versão | Finalidade            |
|------------|----------------|-------:|-----------------------|
| Framework  | Sanity         | 5.24.0 | Headless CMS          |
| Query      | GROQ           | —      | Linguagem de consulta |
| Plugin     | @sanity/vision | 5.24.0 | Explorador de queries |
| Plugin     | structureTool  | —      | UI de edição          |
| React      | React          | 19.2.4 | UI do Studio          |
| Styling    | styled-components | 6.1.18 | CSS-in-JS do Studio |

### Credenciais do Projeto
- **Project ID**: `zv6ynzi7`
- **Dataset**: `production`
- **API Version**: `2024-05-05`

---

## Infraestrutura e Deploy

| Aspecto    | Ferramenta | Configuração                           |
|------------|-----------|----------------------------------------|
| Hosting    | Vercel    | Build: `cd app && npm run build`       |
| Output     | Vercel    | `app/dist`                             |
| Framework  | Vercel    | Detectado como Vite                    |
| VCS        | Git       | Monorepo com 2 package.json            |
| Dev Port   | Vite      | `3000`                                 |

---

## Dependências Críticas NÃO Utilizadas

As seguintes dependências estão instaladas mas não foram detectadas em uso ativo:
- `recharts` — Sem componentes de gráfico na landing page
- `react-resizable-panels` — Sem uso detectado
- `next-themes` — Sem dark mode implementado
- `react-day-picker` / `date-fns` — Sem seletor de data
- 20+ componentes Radix (`accordion`, `dialog`, `dropdown-menu`, etc.) — Importados como arquivos em `components/ui/` mas sem uso na landing page atual
