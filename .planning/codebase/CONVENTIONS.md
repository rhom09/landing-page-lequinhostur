# Convenções de Código — LekinhosTUR

> Gerado em: 2026-05-11

---

## Linguagem e Estilo

- **Linguagem**: TypeScript (strict mode habilitado via `tsconfig.app.json`)
- **Conteúdo textual**: Português brasileiro (labels, textos, comentários)
- **Nomes de variáveis/funções**: Inglês para hooks e utilitários, Português para dados de domínio

## Padrões React

### Componentes
- **Formato**: Function components com `export function NomeComponente()`
- **Named exports**: Sem default export (exceto `App.tsx`)
- **Sem Props Interfaces separadas**: Props tipadas inline quando simples
- **Padrão de seção**: Cada seção é auto-contida em um único arquivo

### Estado e Efeitos
- **Fetch pattern**: `useState(FALLBACK)` + `useEffect` com `client.fetch(GROQ)`
- **Error handling**: `try/catch` com `console.error` e fallback silencioso
- **Sem loading states**: Componentes renderizam fallback imediatamente

### Hooks Customizados
- **Naming**: `use` prefix (ex: `useScrollReveal`, `useIsMobile`)
- **Escopo**: Hooks genéricos, não acoplados a domínio

## Estilização

- **Framework**: Tailwind CSS v3 com classes utilitárias inline
- **Sem CSS Modules** nem styled-components no frontend
- **Design tokens**: Definidos em `tailwind.config.js` (cores `lekinhos-*`)
- **Animações**: Via `tailwindcss-animate` + keyframes custom no config
- **Responsividade**: Mobile-first com breakpoints `sm:`, `md:`, `lg:`

### Padrão de Animação de Entrada
```tsx
const { ref, isVisible } = useScrollReveal(0.1);
// ...
className={`... ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
style={{ animationDelay: `${index * 100}ms` }}
```

## Sanity CMS

### Schemas
- Definidos com `defineType()` / `defineField()` (Sanity v5 API)
- Campo `order` (number) em todos os tipos para ordenação manual
- Validação com `Rule.required()` nos campos essenciais
- Todos os schemas em arquivo único (`schemaTypes/index.js`)

### Nomenclatura de Schemas
| Convenção    | Exemplo          |
|-------------|------------------|
| camelCase   | `proximaSaida`   |
| PT-BR titles| `Excursão`, `Próximas Saídas` |

## Organização de Imports

Ordem observada (sem enforce via linter):
1. React / bibliotecas core
2. Ícones (lucide-react)
3. Hooks (`@/hooks/...`)
4. Lib (`@/lib/...`)
5. Componentes (`@/components/...`)

## Constantes

- **WHATSAPP_LINK**: Hardcoded em cada arquivo (não centralizada)
- **Dados fallback**: Arrays const no topo de cada componente (ALL_CAPS naming)
- **Breakpoints**: `768px` (mobile), `1024px` (desktop) — via Tailwind e hooks
