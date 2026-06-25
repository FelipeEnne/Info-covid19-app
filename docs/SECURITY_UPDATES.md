# Registro de atualizações de segurança e dependências

**Projeto:** Info-covid19-app  
**Última atualização:** 2026-06-25

---

## Lote Seguro 1 — Aplicado

### Pacotes atualizados (dependência direta)

| Pacote | Versão anterior | Versão nova | Tipo | Correção direta |
|--------|----------------|-------------|------|-----------------|
| redux-thunk | 2.4.1 | 2.4.2 | D | Patch |
| react-redux | 7.2.8 | 7.2.9 | D | Patch |
| redux | 4.1.2 | 4.2.1 | D | Minor |
| react | 16.13.1 | 16.14.0 | D | Patch |
| react-dom | 16.13.1 | 16.14.0 | D | Patch |
| bootstrap | 4.5.0 | 4.6.2 | D | Patch |
| @reduxjs/toolkit | 1.8.1 | 1.9.7 | D | Minor |

**Método:** atualização direta via npm (não foi necessário `overrides`).

### Comando executado

```bash
npm install
npm install redux-thunk@2.4.2 react-redux@7.2.9 redux@4.2.1 react@16.14.0 react-dom@16.14.0 bootstrap@4.6.2 @reduxjs/toolkit@1.9.7
```

### Arquivos alterados

- `package.json` — ranges semver atualizados para refletir versões mínimas seguras
- `package-lock.json` — lockfile npm atualizado (9 pacotes alterados na árvore)

### Resultado do audit

| Métrica | Antes | Depois |
|---------|------:|-------:|
| Total | 241 | 241 |
| Low | 13 | 13 |
| Moderate | 112 | 112 |
| High | 64 | 64 |
| Critical | 52 | 52 |

**Nota:** redução nula era esperada — vulnerabilidades estão em transitivas de `react-scripts@2.1.3` (Webpack, Babel, Jest, etc.).

### Resultado dos testes

```text
Ambiente: Node 22.22.0, SKIP_PREFLIGHT_CHECK=true, CI=true
Comando: npm test -- --watchAll=false

Test Suites: 7 passed, 7 total
Tests:       18 passed, 18 total
```

**Observação:** sem `SKIP_PREFLIGHT_CHECK=true`, CRA 2 bloqueia por conflito eslint 5.6 (react-scripts) vs 6.8 (devDependency). Isso é pré-existente, não introduzido pelo Lote 1.

### Resultado do build

```text
Ambiente: Node 22.22.0, SKIP_PREFLIGHT_CHECK=true, NODE_OPTIONS=--openssl-legacy-provider
Comando: npm run build

Compiled successfully.
```

Build gerou artefatos em `build/` (não commitados).

### Resultado do lint

```text
Comando: npx eslint src
Resultado: FALHOU — 3364 erros (majoritariamente linebreak-style CRLF vs LF, pré-existente no Windows)
```

Lint em `src/` falha por regras Airbnb (`linebreak-style`), não por regressão do Lote 1. CI usa `npx eslint .` — **. ter comportamento diferente sem ignore de `build/`.

### Vulnerabilidades restantes (principais causas)

- `react-scripts@2.1.3` → webpack 4, webpack-dev-server, jest, babel-preset-react-app
- Correção completa exige `react-scripts@5.0.1` ou `npm audit fix --force` (**não aplicado**)

### Próximo lote proposto

Ver [DEPENDENCY_UPGRADE_PLAN.md](./DEPENDENCY_UPGRADE_PLAN.md) — Lote Seguro 2:

- `react-router-dom@5.3.4`
- `react-bootstrap@1.6.8`
- `npm audit fix` (sem `--force`)

---

## Lote Seguro 2 + CRA 5 — Aplicado

### Gerenciador de pacotes

| Item | Valor |
|------|-------|
| Gerenciador escolhido | **npm** |
| Lock mantido | `package-lock.json` |
| Lock removido | `yarn.lock` (ausente no disco; padronizado npm) |

### Pacotes atualizados (dependência direta)

| Pacote | Versão anterior | Versão nova | Tipo |
|--------|----------------|-------------|------|
| react-router-dom | 5.2.0 | 5.3.4 | D |
| react-bootstrap | 1.0.1 | 1.6.8 | D |
| react | 16.14.0 | 18.3.1 | D |
| react-dom | 16.14.0 | 18.3.1 | D |
| react-scripts | 2.1.3 | 5.0.1 | D |
| @testing-library/react | 9.5.0 | 14.3.1 | D (dev) |
| @testing-library/jest-dom | 4.2.4 | 6.6.3 | D |
| @testing-library/user-event | 7.1.2 | 14.5.2 | D |
| eslint | 6.8.0 | 8.57.1 | D (dev) |
| eslint-config-airbnb | 18.1.0 | 19.0.4 | D (dev) |
| eslint-config-react-app | — | 7.0.1 | D (dev) |

### Pacotes removidos

| Pacote | Motivo |
|--------|--------|
| react-check-auth | Não utilizado em `src/` |
| enzyme | Substituído por Testing Library |
| enzyme-adapter-react-16 | Substituído por Testing Library |

### Overrides npm aplicados

```json
"overrides": {
  "@tootallnate/once": "2.0.1",
  "serialize-javascript": "6.0.2",
  "underscore": "1.13.8"
}
```

### Comandos executados

```bash
npm install
npm uninstall react-check-auth
npm install react-router-dom@5.3.4 react-bootstrap@1.6.8
npm install react@18.3.1 react-dom@18.3.1 react-scripts@5.0.1
npm install @testing-library/react@14.3.1 @testing-library/jest-dom@6.6.3 @testing-library/user-event@14.5.2
npm uninstall enzyme enzyme-adapter-react-16
npm install --save-dev eslint@8.57.1 eslint-config-airbnb@19.0.4 eslint-plugin-import@2.29.1 eslint-plugin-jsx-a11y@6.8.0 eslint-plugin-react@7.34.1 eslint-plugin-react-hooks@4.6.0
npm install --save-dev eslint-config-react-app@7.0.1
npm audit fix
npm install
CI=true npm test -- --watchAll=false
npm run build
npm audit
```

**Nota:** `npm audit fix` no CRA 2 falhou com `ERR_INVALID_ARG_TYPE` (npm no Windows); após CRA 5, `npm audit fix` aplicou patches parciais. **`npm audit fix --force` não foi usado.**

### Resultado do audit

| Métrica | Antes (CRA 2) | Depois (CRA 5) |
|---------|-------------:|---------------:|
| Total | 241 | 32 |
| Low | 13 | 4 |
| Moderate | 112 | 28 |
| High | 64 | 4 |
| Critical | 52 | 0 |

### Pacotes vulneráveis citados pelo Dependabot — status

| Pacote | Severidade original | Status |
|--------|---------------------|--------|
| loader-utils | Critical | **Corrigido** (2.0.4 via CRA 5) |
| fsevents | Critical | **Corrigido** (2.3.3 via CRA 5; opcional macOS) |
| form-data | Critical | **Corrigido** (3.0.5 via Jest 27) |
| handlebars | Critical | **Removido** da árvore (Istanbul antigo eliminado) |
| decode-uri-component | High | **Removido** da árvore |
| lodash.template | High | **Removido** da árvore (workbox 6) |
| json5 | High | **Corrigido** (2.2.3) |
| ip | High | **Removido** da árvore (webpack-dev-server 4) |
| ssri | High | **Removido** da árvore (cacache atualizado) |
| async | High | **Corrigido** (3.2.6 via workbox 6) |
| serialize-javascript | High | **Corrigido** via override 6.0.2 |

### Vulnerabilidades restantes (32)

Cadeias em tooling do CRA 5 — correção exige `--force` destrutivo ou upgrade futuro do CRA:

- `js-yaml` / `nth-check` / `postcss` — via `@svgr/webpack`, `resolve-url-loader` (moderate/high)
- `uuid` — via `webpack-dev-server` → `sockjs` (moderate)
- `@tootallnate/once` / `jsdom` — via Jest 27 (moderate)

### Resultado dos testes

```text
Ambiente: Node 22.22.0, CI=true
Comando: npm test -- --watchAll=false

Test Suites: 7 passed, 7 total
Tests:       18 passed, 18 total
```

Sem `SKIP_PREFLIGHT_CHECK` — conflito ESLint CRA 2 vs devDeps resolvido.

### Resultado do build

```text
Ambiente: Node 22.22.0
Comando: npm run build

Compiled successfully.
```

Sem `NODE_OPTIONS=--openssl-legacy-provider` — CRA 5 + Webpack 5 compatível com Node 22.

### Arquivos modificados

- `package.json`, `package-lock.json`
- `src/index.js` — `createRoot` (React 18)
- `src/setupTests.js` — criado
- `src/test/**/*.test.js` — Enzyme → Testing Library (6 arquivos)
- `.eslintrc.json` — `extends: react-app` para build CRA 5

### Breaking changes aplicados

- react-scripts 2 → 5 (Webpack 5, Jest 27, ESLint 8 integrado)
- React 16 → 18 (`createRoot`)
- Enzyme → @testing-library/react
- Testes: `NavbarApp` requer `MemoryRouter`; `Summary` valida spinner de loading

### Próximos passos recomendados

1. Atualizar CI (`.github/linters.yml`) para Node 20 LTS + `ubuntu-latest`
2. Adicionar `npm test` e `npm run build` ao CI
3. Migrar `react-router-dom` 5 → 6
4. Considerar migração Vite ou eject se CRA 5 for descontinuado
5. Reativar regras Airbnb no lint local após alinhar código (opcional)

### Dependabot

Com um único lockfile (`package-lock.json`), alertas duplicados do `yarn.lock` cessam. Se o Dependabot estiver pausado, retoma após merge de um PR do Dependabot ou reativação manual nas configurações do GitHub.

---

## Histórico de commits sugeridos

```bash
git add package.json package-lock.json docs/DEPENDENCY_UPGRADE_PLAN.md docs/SECURITY_UPDATES.md
git commit -m "fix: update low-risk dependencies"
```

*(Commit não executado automaticamente — aguardando solicitação do usuário.)*
