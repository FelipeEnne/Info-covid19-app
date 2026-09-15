# Info-covid19-app — instruções para o agente

SPA frontend de estatísticas COVID-19. Sem backend, banco ou auth.

## Stack

- JavaScript (sem TypeScript), React 18, Redux 4 + thunk, React Router 5
- Vite 6 (build → `dist/`), Vitest 5 + Testing Library
- Bootstrap 4 + react-bootstrap
- Deploy: Netlify (`netlify.toml`)
- npm apenas

## Comandos

```bash
npm start          # dev (porta 3000)
npm run build      # produção
npm test -- --run  # testes CI
npm run preview    # preview do build
```

## Arquitetura

| Pasta | Responsabilidade |
|-------|------------------|
| `src/components/` | UI presentacional |
| `src/containers/` | Páginas com `connect()` |
| `src/actions/` | Thunks e action creators |
| `src/reducers/` | Store Redux |
| `src/helper/` | Sort, format |
| `src/test/` | Testes Vitest |

- HTTP no thunk `src/actions/fechSummary.js` (API descontinuada; mock em `initialState.js`)
- Redux clássico — `@reduxjs/toolkit` instalado mas não usado
- Copiar arrays antes de ordenar (`[...arr].sort()`), nunca mutar o store
- Rotas: `/`, `/new`, `/seach` (typo legado)

## Ao implementar

- Diffs mínimos; seguir convenções existentes
- Não reintroduzir `react-scripts` nem usar `npm audit fix --force`
- Env vars com prefixo `VITE_`
- Não editar `docs/` nem README sem pedido explícito

## Commits

Uma linha só, sem corpo:

```
fix: migrate from CRA to Vite
```

## Documentação

Detalhes em `docs/`: `ARCHITECTURE.md`, `SETUP.md`, `SECURITY_UPDATES.md`, `TODO_LEGACY.md`.
