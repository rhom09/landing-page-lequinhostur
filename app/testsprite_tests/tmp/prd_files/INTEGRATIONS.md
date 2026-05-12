# Integrações — LekinhosTUR

> Gerado em: 2026-05-11 | Mapeamento automático via gsd-map-codebase

---

## 1. Sanity CMS (Headless CMS)

### Tipo de Integração
Client-side fetching via `@sanity/client` + `@sanity/image-url`.

### Configuração
- **Arquivo**: `app/src/lib/sanity.ts`
- **Project ID**: `zv6ynzi7` (com fallback para env var `VITE_SANITY_PROJECT_ID`)
- **Dataset**: `production`
- **CDN**: Habilitado (`useCdn: true`)
- **API Version**: `2024-05-05`

### Schemas Gerenciados (4 tipos)
| Schema          | Campos Principais                                      | Componente Consumer                |
|-----------------|--------------------------------------------------------|------------------------------------|
| `excursao`      | titulo, img, status, data, galeria, order              | `CalendarioExcursoes.tsx`          |
| `destino`       | titulo, img, categoria, duracao, tag, badge_*, order   | `GridViagens.tsx`                  |
| `proximaSaida`  | titulo, img, data, order                               | `HeroSection.tsx`                  |
| `estatistica`   | icone, valor, rotulo, order                            | `SocialProof.tsx`                  |

### Padrão de Fetching
Todos os componentes seguem o mesmo padrão:
1. Estado inicializado com dados estáticos de **fallback**
2. `useEffect` faz fetch via GROQ no mount
3. Se dados válidos retornarem, substitui o fallback
4. Se falhar, mantém fallback (erro logado via `console.error`)

```typescript
// Padrão repetido em 4 componentes
const [data, setData] = useState(FALLBACK_DATA);
useEffect(() => {
  client.fetch('*[_type == "tipo"] | order(order asc)')
    .then(d => d?.length > 0 && setData(d))
    .catch(console.error);
}, []);
```

### Queries GROQ Utilizadas
| Query                                              | Componente           |
|----------------------------------------------------|----------------------|
| `*[_type == "excursao"] \| order(order asc)`       | CalendarioExcursoes  |
| `*[_type == "destino"] \| order(order asc)`        | GridViagens          |
| `*[_type == "proximaSaida"] \| order(order asc)[0...3]` | HeroSection    |
| `*[_type == "estatistica"] \| order(order asc)[0...4]`  | SocialProof    |

---

## 2. WhatsApp Business API (Deep Links)

### Tipo de Integração
Links diretos para o WhatsApp Web API (sem backend).

### Configuração
- **Número**: `+55 11 93233-2410`
- **Base URL**: `https://api.whatsapp.com/send?phone=5511932332410&text=`

### Pontos de Entrada
| Componente           | Mensagem Pré-preenchida                                                |
|----------------------|------------------------------------------------------------------------|
| `Navbar`             | "Olá! Gostaria de mais informações sobre as viagens da Lekinhos TUR." |
| `HeroSection`        | Mesma mensagem padrão                                                  |
| `CalendarioExcursoes`| "Olá! Gostaria de reservar vaga para {titulo da excursão}."           |
| `FloatingWhatsApp`   | Mesma mensagem padrão                                                  |
| `BottomNav`          | Mesma mensagem padrão                                                  |
| `LeadCapture`        | Mesma mensagem padrão                                                  |
| `Footer`             | Mesma mensagem padrão                                                  |

> ⚠️ **Observação**: O link do WhatsApp está **hardcoded** em 7 arquivos diferentes. Não existe uma constante centralizada.

---

## 3. Redes Sociais (Links Estáticos)

| Rede       | URL                                              | Componente   |
|------------|--------------------------------------------------|--------------|
| Instagram  | `https://www.instagram.com/lekinhostur/`         | Footer       |
| Facebook   | `https://www.facebook.com/share/1BBUh35Eb8/`     | Footer       |

---

## 4. E-mail (Mailto)

| Destino                          | Componente   |
|----------------------------------|--------------|
| `lekinhostur.agencia@gmail.com`  | LeadCapture  |

---

## 5. Google Fonts (CDN Externo)

Carregadas via configuração Tailwind, presumivelmente via `<link>` no `index.html`:
- **Anton** (display headings)
- **Inter** (body text)

---

## Integrações Ausentes (Potenciais Futuras)
- ❌ Google Analytics / Tag Manager
- ❌ Facebook Pixel
- ❌ Formulário de contato com backend
- ❌ Sistema de reservas / pagamento
- ❌ SEO meta tags dinâmicas (sem react-helmet ou similar)
- ❌ Sitemap.xml
