# TODO Legacy — Info-covid19-app

Lista de dívidas técnicas, riscos e melhorias futuras para retomada do projeto.

Classificação: **Alta prioridade** | **Média prioridade** | **Baixa prioridade**

---

## Alta prioridade

### API externa descontinuada

- **Problema:** `https://api.covid19api.com/summary` foi descontinuada (~2022). O app provavelmente não carrega dados reais.
- **Impacto:** Funcionalidade principal quebrada em produção.
- **Sugestão:** Migrar para API alternativa (ex.: disease.sh, WHO, ou outra fonte atualizada) e externalizar URL via `REACT_APP_API_URL`.
- **Arquivos:** `src/actions/fechSummary.js`

### Dependências em fim de vida (EOL)

- **Problema:** `react-scripts` 2.1.3, React 16, Node 12 no CI — todos fora de suporte.
- **Impacto:** Vulnerabilidades de segurança, incompatibilidade com Node moderno, impossibilidade de instalar em ambientes atuais sem workarounds.
- **Sugestão:** Atualizar para CRA 5+ ou migrar para Vite; atualizar React para 18+; CI com Node 20 LTS.
- **Arquivos:** `package.json`, `.github/linters.yml`

### Mutação de estado Redux

- **Problema:** Funções `sort*` em `helpers.js` mutam o array `Countries` do store in-place (`array.sort()`).
- **Impacto:** Viola imutabilidade do Redux; bugs sutis de re-render e comportamento imprevisível.
- **Sugestão:** Copiar array antes de ordenar (`[...array].sort(...)`).
- **Arquivos:** `src/helper/helpers.js`, containers que chamam sort

---

## Média prioridade

### Fetch duplicado na montagem

- **Problema:** `Summary` e o container da rota disparam `fetchSummary()` independentemente.
- **Impacto:** Duas requisições HTTP idênticas por page load.
- **Sugestão:** Centralizar fetch em um único ponto (App, middleware ou hook compartilhado).
- **Arquivos:** `src/containers/Summary.js`, `MoreInfected.js`, `MoreNewInfected.js`, `SearchCountry.js`

### Typos e nomenclatura inconsistente

- **Problema:**
  - Arquivo `fechSummary.js` (typo de "fetch")
  - Rota `/seach` (typo de "search")
  - Actions `fetchProducts*` / selectors `getProducts*` para dados COVID
  - Componente interno `SeachCountry` em `SearchCountry.js`
- **Impacto:** Confusão na manutenção; links quebrados se corrigir rota sem redirect.
- **Sugestão:** Renomear com cuidado; adicionar redirect de `/seach` → `/search` se alterar rota.
- **Arquivos:** múltiplos em `src/`

### Erros de API não exibidos na UI

- **Problema:** Quando o fetch falha, `state.summary.error` é preenchido mas nenhum componente exibe mensagem ao usuário.
- **Impacto:** Usuário vê loading eterno ou dados desatualizados sem saber o motivo.
- **Sugestão:** Componente de erro ou banner quando `error` não estiver vazio.
- **Arquivos:** containers, possivelmente novo componente `ErrorMessage`

### Testes ausentes no CI

- **Problema:** `.github/linters.yml` roda apenas ESLint e Stylelint; `npm test` não é executado.
- **Impacto:** Regressões podem passar em PRs sem detecção.
- **Sugestão:** Adicionar job de testes com `CI=true npm test`.
- **Arquivos:** `.github/linters.yml`

### Busca por país sem feedback ao usuário

- **Problema:** País não encontrado ou campo vazio → apenas `console.error`, sem mensagem na tela.
- **Impacto:** Má experiência do usuário.
- **Sugestão:** Exibir alerta ou texto de erro inline.
- **Arquivos:** `src/containers/SearchCountry.js`

### Cobertura de testes incompleta

- **Problema:** Testes existem para alguns components e Summary, mas faltam testes para:
  - `MoreInfected`, `MoreNewInfected`, `SearchCountry`
  - `fechSummary` thunk
  - `helpers.js` (sort, getTenArray)
- **Impacto:** Refatorações arriscadas sem rede de segurança.
- **Sugestão:** Expandir suite de testes gradualmente.

---

## Baixa prioridade

### Dependências não utilizadas

- **Problema:** `@reduxjs/toolkit` e `react-check-auth` no `package.json` sem uso em `src/`.
- **Impacto:** Bundle maior, confusão sobre stack real.
- **Sugestão:** Remover do `package.json`.
- **Arquivos:** `package.json`

### Código morto no filterInfoReducer

- **Problema:** Cases `FETCH_PRODUCTS_PENDING/SUCCESS/ERROR` nunca disparados.
- **Impacto:** Código confuso e enganoso.
- **Sugestão:** Remover cases mortos ou integrar com fluxo real.
- **Arquivos:** `src/reducers/filterInfoReducer.js`

### Keys instáveis em listas React

- **Problema:** `makeid(5)` gera keys aleatórias a cada render em `MoreInfected` e `MoreNewInfected`.
- **Impacto:** Re-renders desnecessários, possível perda de estado de componentes filhos.
- **Sugestão:** Usar `value.Slug` ou `value.CountryCode` como key.
- **Arquivos:** `src/containers/MoreInfected.js`, `MoreNewInfected.js`

### Lockfiles duplos (npm + yarn) — resolvido

- **Problema:** `package-lock.json` e `yarn.lock` coexistiam.
- **Resolução:** `yarn.lock` removido; padronizado npm + `package-lock.json`.

### Sem formatador de código (Prettier)

- **Problema:** Não há Prettier nem script de format.
- **Impacto:** Estilo inconsistente entre arquivos.
- **Sugestão:** Adicionar Prettier com config mínima compatível com ESLint Airbnb.

### Imagens ausentes no README

- **Problema:** README referencia `public/assets/img/` que não existe no repo.
- **Impacto:** Imagens quebradas na documentação.
- **Sugestão:** Restaurar screenshots ou remover referências.
- **Arquivos:** `README.md`

### `.gitignore` incompleto

- **Problema:** Ignora `.env.*.local` mas não `.env` raiz.
- **Impacto:** Risco de commit acidental de secrets se `.env` for criado.
- **Sugestão:** Adicionar `.env` ao `.gitignore` (feito nesta etapa de documentação).

### CI com Ubuntu 18.04 e actions desatualizadas

- **Problema:** `ubuntu-18.04` e `actions/checkout@v2` / `setup-node@v1` estão deprecated.
- **Impacto:** CI pode parar de funcionar.
- **Sugestão:** Atualizar para `ubuntu-latest`, `actions/checkout@v4`, `setup-node@v4`.
- **Arquivos:** `.github/linters.yml`

### Acesso direto ao DOM na busca

- **Problema:** `SearchCountry` usa `document.getElementById('nameCountry')` em vez de state React.
- **Impacto:** Padrão anti-React; dificulta testes.
- **Sugestão:** Converter input para controlled component.
- **Arquivos:** `src/containers/SearchCountry.js`

### Mock estático enorme

- **Problema:** `initialState.js` tem ~2200 linhas de dados hardcoded.
- **Impacto:** Dificulta leitura e manutenção do reducer.
- **Sugestão:** Mover mock para `src/mocks/summary.json` ou reduzir a um subset mínimo.
- **Arquivos:** `src/reducers/initialState.js`

---

## Oportunidades de refatoração (futuro)

| Área | Oportunidade |
|------|-------------|
| Estado | Migrar para Redux Toolkit (já está no package.json) |
| Fetch | Criar camada `src/services/covidApi.js` |
| Componentes | Extrair lógica duplicada entre `MoreInfected` e `MoreNewInfected` |
| Hooks | Substituir `connect()` por `useSelector`/`useDispatch` (React-Redux 7+) |
| TypeScript | Migração gradual para tipagem estática |
| Deploy | Adicionar `netlify.toml` com redirects SPA |

---

## Melhorias de DX (Developer Experience)

| Item | Benefício |
|------|-----------|
| `.env.example` com variáveis documentadas | Onboarding mais rápido |
| Script `npm run lint` no package.json | Lint com um comando |
| Husky + lint-staged | Qualidade em pre-commit |
| Documentação em `docs/` (esta pasta) | Retomada do projeto facilitada |
| Regras Cursor em `.cursor/rules/` | IA alinhada ao contexto legado |

---

## Riscos de segurança

| Risco | Prioridade | Detalhe |
|-------|------------|---------|
| Dependências EOL com CVEs | Alta | React 16, CRA 2, Node 12 |
| Sem HTTPS enforcement | Baixa | Depende do hosting (Netlify usa HTTPS) |
| Sem CSP headers | Baixa | Configuração de hosting, não do código |
| API pública sem rate limiting client | Baixa | Fetch direto do browser |

Não há autenticação, autorização ou dados sensíveis de usuário no escopo atual.
