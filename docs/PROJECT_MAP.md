# Mapa do Projeto — Info-covid19-app

## Propósito

Aplicação web (SPA) que exibe estatísticas globais e por país sobre COVID-19. O usuário pode:

- Ver totais globais (confirmados, mortes, recuperados)
- Filtrar os 10 países com mais casos totais
- Filtrar os 10 países com mais casos novos
- Buscar um país específico pelo nome

Projeto desenvolvido no contexto do [Microverse](https://www.microverse.org/) (~2020). Dados obtidos da [Coronavirus COVID19 API](https://covid19api.com/).

**Versão ao vivo (documentada no README):** https://upbeat-kirch-c70050.netlify.app/

---

## Stack principal

| Camada | Tecnologia |
|--------|------------|
| Linguagem | JavaScript (sem TypeScript) |
| UI | React 16.13, React-Bootstrap, Bootstrap 4 |
| Estado | Redux 4 + redux-thunk |
| Roteamento | React Router DOM 5 |
| Build | Create React App (`react-scripts` 2.1.3) |
| Testes | Jest (via CRA) + Enzyme |
| Hospedagem | Netlify (estático) |

**Não há:** backend, banco de dados, autenticação ou Docker.

---

## Estrutura de pastas

```
Info-covid19-app/
├── .github/
│   └── linters.yml          # CI: ESLint e Stylelint em PRs
├── docs/                    # Documentação do projeto (esta pasta)
├── public/
│   └── index.html           # Shell HTML do CRA
├── src/
│   ├── actions/             # Action creators e thunks Redux
│   ├── components/          # Componentes presentacionais (UI)
│   ├── containers/          # Componentes conectados ao Redux
│   ├── helper/              # Funções utilitárias (sort, formatação)
│   ├── reducers/            # Reducers e store Redux
│   ├── test/                # Testes unitários (Enzyme)
│   └── index.js             # Ponto de entrada JavaScript
├── package.json
├── README.md
└── ...
```

### Responsabilidade de cada pasta

| Pasta | Responsabilidade |
|-------|------------------|
| `src/actions/` | Disparo de ações Redux; thunk `fetchSummary` chama a API externa |
| `src/components/` | Componentes de apresentação: navbar, tabelas, filtros, loading, footer |
| `src/containers/` | Orquestração: conecta Redux, dispara fetch, aplica filtros e renderiza componentes |
| `src/reducers/` | Estado global: summary (dados API), country (país selecionado), filter (critério de ordenação) |
| `src/helper/` | Lógica auxiliar: ordenação, formatação numérica, top 10 países |
| `src/test/` | Testes de actions, components e containers |
| `public/` | Arquivo HTML base; CRA injeta os bundles aqui |

---

## Arquivos mais importantes

| Arquivo | Função |
|---------|--------|
| `src/index.js` | Bootstrap: monta React com `Provider` (Redux) e `BrowserRouter` |
| `src/components/App.js` | Layout principal e definição das rotas |
| `src/actions/fechSummary.js` | Thunk que busca dados em `https://api.covid19api.com/summary` |
| `src/actions/loader.js` | Actions de loading/success/error do fetch |
| `src/reducers/index.js` | Combina reducers e cria o store com middleware thunk |
| `src/reducers/summary.js` | Reducer dos dados da API |
| `src/reducers/initialState.js` | Mock estático com snapshot de junho/2020 (~2200 linhas) |
| `src/reducers/filterInfoReducer.js` | Estado do filtro de ordenação |
| `src/reducers/selectCountry.js` | Estado do país selecionado na busca |
| `src/helper/helpers.js` | Funções de sort, formatação e seleção do top 10 |
| `src/containers/MoreInfected.js` | Página: países com mais infectados (rota `/`) |
| `src/containers/MoreNewInfected.js` | Página: países com mais novos casos (rota `/new`) |
| `src/containers/SearchCountry.js` | Página: busca por país (rota `/seach`) |
| `src/containers/Summary.js` | Resumo global (sempre visível no topo) |
| `package.json` | Dependências e scripts npm |
| `.github/linters.yml` | Pipeline de lint em pull requests |

---

## Dependências relevantes

### Produção (`package.json`)

| Pacote | Uso |
|--------|-----|
| `react`, `react-dom` | Framework UI |
| `redux`, `react-redux`, `redux-thunk` | Gerenciamento de estado assíncrono |
| `react-router-dom` | Rotas client-side |
| `bootstrap`, `react-bootstrap` | Estilização e componentes UI |
| `react-scripts` | Toolchain CRA (start, build, test) |
| `prop-types` | Validação de props em runtime |

### Dependências instaladas mas não utilizadas em `src/`

| Pacote | Observação |
|--------|------------|
| `@reduxjs/toolkit` | Não importado em nenhum arquivo |
| `react-check-auth` | Não importado; autenticação não implementada |

### Desenvolvimento

| Pacote | Uso |
|--------|-----|
| `enzyme`, `enzyme-adapter-react-16` | Testes de componentes |
| `@testing-library/react` | Instalado; testes usam principalmente Enzyme |
| `eslint`, `eslint-config-airbnb` | Linting JavaScript |

---

## Visão geral para novo desenvolvedor

1. **Clone e instale:** `npm install` → `npm start` (ver [SETUP.md](./SETUP.md)).
2. **Entrada da app:** `public/index.html` → `src/index.js` → `src/components/App.js`.
3. **Fluxo de dados:** containers disparam `fetchSummary()` → API externa → reducer `summary` → UI re-renderiza.
4. **Rotas:**
   - `/` — top 10 países por totais
   - `/new` — top 10 países por novos casos
   - `/seach` — busca por nome de país (typo intencional no código)
5. **Sem backend:** toda a lógica roda no browser; estado vive no Redux até recarregar a página.
6. **Atenção:** a API original (`covid19api.com`) foi descontinuada; o app pode não carregar dados reais. Ver [TODO_LEGACY.md](./TODO_LEGACY.md).

---

## Documentação relacionada

- [ARCHITECTURE.md](./ARCHITECTURE.md) — arquitetura e padrões
- [SETUP.md](./SETUP.md) — como rodar localmente
- [COMMANDS.md](./COMMANDS.md) — comandos úteis
- [FLOWS.md](./FLOWS.md) — fluxos de negócio
- [DATABASE.md](./DATABASE.md) — estrutura de dados (sem banco)
- [TODO_LEGACY.md](./TODO_LEGACY.md) — dívidas técnicas e melhorias
