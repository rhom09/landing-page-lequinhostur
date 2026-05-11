# Testes — LekinhosTUR

> Gerado em: 2026-05-11

---

## Estado Atual

⚠️ **Nenhum teste existe no projeto.**

- Sem framework de teste instalado (no Jest, Vitest, Playwright, etc.)
- Sem diretório `__tests__/` ou arquivos `*.test.*` / `*.spec.*`
- Sem scripts de teste no `package.json`
- Sem CI/CD pipeline configurado

---

## Recomendações

### Prioridade Alta
1. **Instalar Vitest** — Compatível nativamente com Vite
2. **Testes unitários** para hooks (`useScrollReveal`, `useIsMobile`)
3. **Testes de integração** para componentes com fetch Sanity (mock do client)

### Prioridade Média
4. **Testes E2E** com Playwright para fluxos críticos:
   - Navegação por âncoras
   - Abertura da galeria lightbox
   - Links do WhatsApp
   - Responsividade mobile vs desktop

### Prioridade Baixa
5. **Visual regression** com Playwright screenshots
6. **Testes de acessibilidade** (axe-core)

---

## Cobertura Estimada

| Área                    | Cobertura | Risco  |
|-------------------------|:---------:|:------:|
| Hooks customizados      |     0%    |  Médio |
| Lógica de fetch Sanity  |     0%    |  Alto  |
| Galeria Lightbox        |     0%    |  Alto  |
| Navegação / scroll      |     0%    |  Médio |
| Componentes UI (shadcn) |     0%    |  Baixo |
