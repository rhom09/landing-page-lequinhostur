# Preocupações e Dívida Técnica — LekinhosTUR

> Gerado em: 2026-05-11

---

## 🔴 Crítico

### 1. SEO — Client-Side Rendering
A landing page é 100% renderizada no cliente. Crawlers que não executam JS verão uma página vazia. Para uma página de marketing/conversão, isso é um problema significativo.

**Impacto**: Baixo ranking em buscadores.
**Solução**: Migrar para Next.js com SSG/SSR ou implementar prerendering via plugin Vite.

### 2. Imagens Não Otimizadas
- `logo-mobile.png` tem **1MB** para um logo. Deveria ser <100KB.
- Favicon tem **404KB**. Deveria ser <10KB.
- Nenhuma imagem usa formato WebP ou AVIF.
- Sem lazy loading nativo (exceto na galeria).
- Sem `srcset` ou imagens responsivas.

**Impacto**: Core Web Vitals ruins (LCP, FID).

### 3. Sem HTTPS/CSP Headers
Não há configuração de Content Security Policy ou security headers no `vercel.json`.

---

## 🟡 Importante

### 4. WhatsApp Link Duplicado
O mesmo link WhatsApp está hardcoded em **7 arquivos** diferentes. Se o número mudar, é necessário editar todos manualmente.

**Solução**: Criar um `constants.ts` centralizado.

### 5. Tipagem `any` Excessiva
Quase todos os dados do Sanity são tipados como `any`:
```typescript
const [excursoes, setExcursoes] = useState<any[]>(EXCURSOES);
```
**Solução**: Criar interfaces TypeScript para cada schema do Sanity.

### 6. Dependências Não Utilizadas
~40 dependências instaladas sem uso detectado (recharts, react-resizable-panels, next-themes, 50+ componentes UI). Isso aumenta o bundle e o tempo de install.

**Solução**: Auditoria e remoção com `npx depcheck`.

### 7. Dados Duplicados (Fallback Hardcoded)
Cada componente que busca dados do Sanity contém uma cópia completa dos dados como fallback. Quando o conteúdo muda no CMS, o fallback fica desatualizado.

**Solução**: Mover fallbacks para um arquivo centralizado ou gerar automaticamente.

### 8. Página Home.tsx Vestigial
`src/pages/Home.tsx` é o template padrão do Vite (contador), nunca é renderizado. Código morto.

---

## 🟢 Menor

### 9. Acessibilidade Parcial
- ✅ `aria-label` em botões e links
- ✅ `alt` em imagens
- ✅ `role="dialog"` na galeria
- ❌ Sem skip-to-content link
- ❌ Sem teste com screen reader
- ❌ Contraste de cores não verificado

### 10. Sem Analytics
Nenhum tracking implementado (Google Analytics, Meta Pixel, etc.). Impossível medir conversões.

### 11. Sem Meta Tags Dinâmicas
O `index.html` provavelmente tem meta tags estáticas. Sem Open Graph ou Twitter Cards verificados.

### 12. Scroll Navigation Duplicada
A função `handleNavClick` com lógica de smooth scroll está copiada em 3 componentes (`Navbar`, `Footer`, `BottomNav`). Deveria ser um hook ou utilitário.

---

## Resumo de Risco

| Prioridade | Item                        | Esforço | Impacto |
|:----------:|-----------------------------|:-------:|:-------:|
| 🔴         | SEO (CSR)                   |  Alto   |  Alto   |
| 🔴         | Imagens não otimizadas      |  Baixo  |  Alto   |
| 🔴         | Security headers            |  Baixo  |  Médio  |
| 🟡         | WhatsApp link duplicado     |  Baixo  |  Baixo  |
| 🟡         | Tipagem `any`               |  Médio  |  Médio  |
| 🟡         | Deps não utilizadas         |  Baixo  |  Baixo  |
| 🟡         | Fallback desatualizado      |  Médio  |  Médio  |
| 🟡         | Código morto (Home.tsx)     |  Baixo  |  Baixo  |
| 🟢         | Acessibilidade              |  Médio  |  Médio  |
| 🟢         | Analytics                   |  Baixo  |  Alto   |
| 🟢         | Meta tags                   |  Baixo  |  Médio  |
| 🟢         | Scroll fn duplicada         |  Baixo  |  Baixo  |
