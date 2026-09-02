# Registro de atualizações de segurança e dependências

**Projeto:** Info-covid19-app  
**Última atualização:** 2026-09-02

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

---

## Lote 3 — Overrides transitivos (CRA 5) — Aplicado

### Gerenciador de pacotes

| Item | Valor |
|------|-------|
| Gerenciador | **npm** |
| Lock mantido | `package-lock.json` apenas |
| `npm audit fix --force` | **Não usado** (instalaria `react-scripts@0.0.0`) |

### Vulnerabilidades analisadas (Dependabot / npm audit)

| Pacote | Severidade | Tipo | Cadeia principal |
|--------|------------|------|------------------|
| `nth-check` | High | Transitiva | `react-scripts` → `@svgr/webpack` → `svgo` → `css-select` |
| `serialize-javascript` | High (+ Moderate DoS) | Transitiva | `css-minimizer-webpack-plugin`, `rollup-plugin-terser` |
| `postcss` | Moderate | Transitiva | `resolve-url-loader@4` → `postcss@7.0.39` |
| `js-yaml` | Moderate | Transitiva | Jest (`@istanbuljs/load-nyc-config`) + `svgo` |
| `uuid` | Moderate | Transitiva | `webpack-dev-server` → `sockjs` |
| `webpack-dev-server` | Moderate | Transitiva | `react-scripts` (dev only) |

**Nenhum** dos pacotes acima é dependência direta em `package.json`.

### Overrides npm aplicados (estado final)

```json
"overrides": {
  "@tootallnate/once": "2.0.1",
  "underscore": "1.13.8",
  "serialize-javascript": "7.0.6",
  "nth-check": "2.0.1",
  "js-yaml": "4.2.0",
  "resolve-url-loader": "5.0.0",
  "uuid": "11.1.1"
}
```

| Override | Versão anterior | Motivo |
|----------|----------------|--------|
| `serialize-javascript` | 6.0.2 (insuficiente) | RCE exige ≥7.0.3; DoS exige ≥7.0.5; sem backport na linha 6.x |
| `nth-check` | 1.0.2 (aninhado em svgo) | ReDoS; `react-scripts` não atualiza `@svgr/webpack` |
| `js-yaml` | 3.14.2 | DoS em merge aliases; advisory afeta ≤4.1.1; 4.2.0 já usado pelo eslint |
| `resolve-url-loader` | 4.0.0 | v5 usa PostCSS 8; elimina cópia vulnerável PostCSS 7 |
| `uuid` | 8.3.2 | Buffer bounds check; uso interno de `sockjs` em dev |
| `webpack-dev-server` | — | **Não aplicado** — ver fallback abaixo |

### Fallback: `webpack-dev-server@5.2.5`

Override de `webpack-dev-server` para 5.2.5 foi testado e **rejeitado**:

```text
Invalid options object. Dev Server has been initialized using an options object
that does not match the API schema.
- options has an unknown property 'onAfterSetupMiddleware'
```

`react-scripts@5.0.1` usa APIs removidas no WDS 5. Correção exigiria eject, fork do CRA ou migração para Vite.

### Comandos executados

```bash
npm audit
npm outdated
npm ls nth-check serialize-javascript webpack-dev-server uuid postcss js-yaml
# overrides aplicados em package.json
npm audit fix
npm install
npm audit
npm ls nth-check serialize-javascript webpack-dev-server uuid postcss js-yaml
CI=true npm test -- --watchAll=false
npm run build
npm start   # smoke test dev server
```

### Resultado do audit

| Métrica | Antes (Lote 2) | Depois (Lote 3) |
|---------|---------------:|----------------:|
| Total | 32 | **2** |
| High | 4 | **0** |
| Moderate | 28 | **2** |
| Critical | 0 | **0** |

### Pacotes vulneráveis citados pelo Dependabot — status Lote 3

| Pacote | Severidade | Status |
|--------|------------|--------|
| `nth-check` | High | **Corrigido** (override 2.0.1) |
| `serialize-javascript` | High | **Corrigido** (override 7.0.6) |
| `postcss` | Moderate | **Corrigido** (override `resolve-url-loader@5.0.0` → PostCSS 8.5.15) |
| `js-yaml` | Moderate | **Corrigido** (override 4.2.0) |
| `uuid` | Moderate | **Corrigido** (override 11.1.1) |
| `webpack-dev-server` | Moderate | **Pendente** (dev only; WDS 5 incompatível com CRA 5) |

### Vulnerabilidades restantes (2 moderate, dev only)

Ambas em `webpack-dev-server@4.15.2` via `react-scripts`:

- [GHSA-79cf-xcqc-c78w](https://github.com/advisories/GHSA-79cf-xcqc-c78w) — exposição de código-fonte em origem HTTP
- [GHSA-4v9v-hfq4-rm2v](https://github.com/advisories/GHSA-4v9v-hfq4-rm2v) / [GHSA-9jgg-88mc-972h](https://github.com/advisories/GHSA-9jgg-88mc-972h) — origem cruzada / HMR WebSocket

**Mitigação:** não expor `npm start` em rede pública; usar HTTPS no dev se necessário; risco não afeta `npm run build` nem produção.

### Resultado dos testes

```text
Ambiente: Node 22, CI=true
Comando: npm test -- --watchAll=false

Test Suites: 7 passed, 7 total
Tests:       18 passed, 18 total
```

### Resultado do build

```text
Comando: npm run build

Compiled successfully.
```

### Resultado do dev server (`npm start`)

```text
Comando: npm start

Compiled successfully!
Local: http://localhost:3000
```

Com WDS 4 (padrão CRA). Avisos de depreciação `onAfterSetupMiddleware` são esperados.

### Riscos de breaking changes

| Override | Risco | Validação |
|----------|-------|-----------|
| `serialize-javascript@7` | Baixo (build) | `npm run build` OK |
| `nth-check@2` | Baixo (SVG build) | `npm run build` OK |
| `resolve-url-loader@5` | Médio (CSS/Sass) | `npm run build` OK |
| `js-yaml@4` | Baixo (Jest/coverage) | `npm test` OK |
| `uuid@11` | Baixo (dev/sockjs) | `npm start` OK |

### Arquivos alterados

- `package.json` — bloco `overrides` atualizado
- `package-lock.json` — regenerado por `npm install`
- `docs/SECURITY_UPDATES.md` — este relatório

### Próximos passos recomendados

1. Atualizar CI para Node 20 LTS + jobs `npm test` / `npm run build`
2. Adicionar `"engines": { "node": ">=20" }` (requerido por `serialize-javascript@7`)
3. Migrar para Vite ou eject para corrigir `webpack-dev-server` (dev only)
4. Planejar `react-router-dom` 5 → 6

### Dependabot

Com um único lockfile (`package-lock.json`), alertas convergem após merge. Se o Dependabot estiver **pausado**, retoma após merge de um PR do Dependabot ou reativação manual em **Settings → Security → Dependabot**.

---

## Histórico de commits sugeridos (Lote 3)

```bash
git add package.json package-lock.json docs/SECURITY_UPDATES.md
git commit -m "fix: resolve transitive dependency vulnerabilities via npm overrides"
```

*(Commit não executado automaticamente — aguardando solicitação do usuário.)*

---

## Lote 4 — Overrides transitivos (Dependabot Jul/Ago 2026) — Aplicado

### Gerenciador de pacotes

| Item | Valor |
|------|-------|
| Gerenciador | **npm** |
| Lock mantido | `package-lock.json` apenas |
| `npm audit fix --force` | **Não usado** (instalaria `react-scripts@0.0.0`) |

### Vulnerabilidades analisadas (Dependabot / npm audit)

| Pacote | Severidade | Alertas | Tipo |
|--------|------------|---------|------|
| `shell-quote` | High | #374 | Transitiva (`react-dev-utils`, `launch-editor`) |
| `svgo` | High | #371 | Transitiva (`@svgr/plugin-svgo`, `postcss-svgo`) |
| `brace-expansion` | High | #377, #379 | Transitiva (`minimatch` 3.x e 5.x) |
| `js-yaml` | High | #375 | Transitiva (override Lote 3 `4.2.0` insuficiente) |
| `fast-uri` | High | #372, #373, #380 | Transitiva (`ajv` → schema-utils) |
| `postcss` | High | #378 | Transitiva (cópia `8.5.15` vulnerável a path traversal) |
| `body-parser` | Low | #376 | Transitiva (`express` via `webpack-dev-server`) |
| `webpack-dev-server` | Moderate | #209, #211, #340, #364, #369, #370 | Transitiva (`react-scripts`; **sem fix CRA-compatível**) |

### Overrides npm aplicados (estado final)

```json
"overrides": {
  "@tootallnate/once": "2.0.1",
  "underscore": "1.13.8",
  "serialize-javascript": "7.0.6",
  "nth-check": "2.0.1",
  "js-yaml": "4.3.1",
  "resolve-url-loader": "5.0.0",
  "uuid": "11.1.1",
  "shell-quote": "1.10.0",
  "fast-uri": "3.1.5",
  "postcss": "8.5.26",
  "body-parser": "1.20.6",
  "svgo": "2.8.3",
  "minimatch@3": { "brace-expansion": "1.1.18" },
  "minimatch@5": { "brace-expansion": "2.1.4" }
}
```

| Override | Versão anterior | Motivo |
|----------|----------------|--------|
| `js-yaml` | 4.2.0 | Merge-key / omap DoS; patched em ≥4.3.1 |
| `shell-quote` | 1.8.4 | DoS O(n²) em `parse()`; patched ≥1.9.0 |
| `fast-uri` | 3.1.2 | Host confusion (IDN / backslash); patched ≥3.1.5 |
| `postcss` | 8.5.15 | Path traversal em source map; patched ≥8.5.23 → 8.5.26 |
| `body-parser` | 1.20.5 | DoS com `limit` inválido; patched ≥1.20.6 |
| `svgo` | 1.3.2 / 2.8.2 | `removeScripts` incompleto; patched 2.8.3 (global OK no build) |
| `brace-expansion` (via minimatch) | 1.1.15 / 2.1.1 | DoS expansion; 1.1.18 e 2.1.4 |

### Comandos executados

```bash
npm install
npm audit
npm ls shell-quote svgo brace-expansion js-yaml fast-uri postcss body-parser webpack-dev-server
CI=true npm test -- --watchAll=false
npm run build
BROWSER=none npm start   # smoke test
```

### Resultado do audit

| Métrica | Antes (pré-Lote 4) | Depois (Lote 4) |
|---------|-------------------:|----------------:|
| Total | 11 | **2** |
| High | 9 | **0** |
| Moderate | 1+ | **2** (só WDS) |
| Critical | 0 | **0** |
| Low | 1 | **0** |

### Pacotes citados pelo Dependabot — status Lote 4

| Pacote | Status |
|--------|--------|
| `shell-quote` | **Corrigido** (override 1.10.0) |
| `svgo` | **Corrigido** (override 2.8.3; `@svgr` unificado) |
| `brace-expansion` | **Corrigido** (1.1.18 / 2.1.4 via minimatch) |
| `js-yaml` | **Corrigido** (override 4.3.1) |
| `fast-uri` | **Corrigido** (override 3.1.5) |
| `postcss` | **Corrigido** (override 8.5.26) |
| `body-parser` | **Corrigido** (override 1.20.6) |
| `webpack-dev-server` | **Pendente** (dev only; WDS 5 incompatível com CRA 5) |

### Vulnerabilidades restantes (2 moderate, dev only)

Mesmas do Lote 3 — `webpack-dev-server@4.15.2` via `react-scripts`. Override para 5.x rejeitado (API `onAfterSetupMiddleware`).

**Mitigação:** não expor `npm start` em rede pública; risco não afeta `npm run build` nem produção.

**Ação GitHub (pós-merge):** dismiss alertas #209, #211, #340, #364, #369, #370 com *Risk is tolerable to this project*; Refresh Dependabot alerts; retomar updates (merge PR Dependabot ou Settings → Security → Dependabot).

### Resultado dos testes

```text
Ambiente: Node 22, CI=true
Comando: npm test -- --watchAll=false

Test Suites: 7 passed, 7 total
Tests:       18 passed, 18 total
```

### Resultado do build

```text
Comando: npm run build

Compiled successfully.
```

### Resultado do dev server (`npm start`)

```text
Compiled successfully!
```

WDS 4 sobe normalmente com `svgo@2.8.3` global.

### Arquivos alterados

- `package.json` — bloco `overrides` estendido (Lote 4)
- `package-lock.json` — regenerado por `npm install`
- `docs/SECURITY_UPDATES.md` — este relatório

### Próximos passos recomendados

1. Merge + dismiss alertas WDS no GitHub + retomar Dependabot
2. Migrar para Vite ou eject para eliminar residual `webpack-dev-server`
3. Atualizar CI para Node 20 LTS + jobs `npm test` / `npm run build`

### Histórico de commits sugeridos (Lote 4)

```bash
git add package.json package-lock.json docs/SECURITY_UPDATES.md
git commit -m "fix: patch transitive Dependabot vulns via npm overrides (lote 4)"
```

*(Commit não executado automaticamente — aguardando solicitação do usuário.)*

---

## Lote 5 — Overrides transitivos (Dependabot Set 2026) — Aplicado

### Gerenciador de pacotes

| Item | Valor |
|------|-------|
| Gerenciador | **npm** |
| Lock mantido | `package-lock.json` apenas |
| `npm audit fix --force` | **Não usado** (instalaria `react-scripts@0.0.0`) |

### Vulnerabilidades analisadas (Dependabot)

| Pacote | Severidade | Alertas | Tipo |
|--------|------------|---------|------|
| `browserslist` | High | #382, #383 | Transitiva (`react-scripts`, Autoprefixer, Babel) |
| `fast-uri` | High | #386, #387, #388, #389 | Transitiva (`ajv` → schema-utils); override Lote 4 `3.1.5` insuficiente |
| `qs` | Moderate | #384, #385 | Transitiva (`express`/`body-parser` via `webpack-dev-server`) |

### Overrides npm aplicados (estado final)

```json
"overrides": {
  "@tootallnate/once": "2.0.1",
  "underscore": "1.13.8",
  "serialize-javascript": "7.0.6",
  "nth-check": "2.0.1",
  "js-yaml": "4.3.1",
  "resolve-url-loader": "5.0.0",
  "uuid": "11.1.1",
  "shell-quote": "1.10.0",
  "browserslist": "4.28.8",
  "fast-uri": "3.1.7",
  "qs": "6.16.0",
  "postcss": "8.5.26",
  "body-parser": "1.20.6",
  "svgo": "2.8.3",
  "nanoid": "3.3.18",
  "minimatch@3": { "brace-expansion": "1.1.18" },
  "minimatch@5": { "brace-expansion": "2.1.4" }
}
```

| Override | Versão anterior | Motivo |
|----------|----------------|--------|
| `browserslist` | 4.28.4 | Prototype write / crash em `normalizeStats` e OOM no cache; patched ≥4.28.7 → 4.28.8 |
| `fast-uri` | 3.1.5 | Host confusion (IDN scheme-relative, percent-encoded scheme) e SSRF (IPv6 / percent-decoding); patched ≥3.1.6 → 3.1.7 (também cobre port injection e IP-literal brackets) |
| `qs` | 6.15.3 | DoS via `isBuffer` não callable e bypass de `arrayLimit` em bracket+comma; patched ≥6.16.0. Override necessário: `express` pede `qs ~6.15.1` |

### Comandos executados

```bash
npm install
npm audit
npm ls browserslist fast-uri qs
CI=true npm test -- --watchAll=false
npm run build
```

### Resultado do audit

| Métrica | Antes (pré-Lote 5) | Depois (Lote 5) |
|---------|-------------------:|----------------:|
| Total | 8 alertas Dependabot | **2** (npm audit) |
| High | 6 | **0** |
| Moderate | 2 | **2** (só WDS) |
| Critical | 0 | **0** |
| Low | 0 | **0** |

### Pacotes citados pelo Dependabot — status Lote 5

| Pacote | Status |
|--------|--------|
| `browserslist` | **Corrigido** (override 4.28.8) |
| `fast-uri` | **Corrigido** (override 3.1.7) |
| `qs` | **Corrigido** (override 6.16.0) |
| `webpack-dev-server` | **Pendente** (dev only; WDS 5 incompatível com CRA 5) |

### Vulnerabilidades restantes (2 moderate, dev only)

Mesmas do Lote 4 — `webpack-dev-server@4.15.2` via `react-scripts`. Override para 5.x rejeitado (API `onAfterSetupMiddleware`).

**Mitigação:** não expor `npm start` em rede pública; risco não afeta `npm run build` nem produção.

**Ação GitHub (pós-merge):** Refresh Dependabot alerts em `/FelipeEnne/Info-covid19-app/security/dependabot/refresh`. Os 8 alertas (#382–#389) devem fechar sozinhos.

### Resultado dos testes

```text
Ambiente: Node 24.20.0, CI=true
Comando: npm test -- --watchAll=false

Test Suites: 7 passed, 7 total
Tests:       18 passed, 18 total
```

### Resultado do build

```text
Comando: npm run build

Compiled successfully.
```

### Arquivos alterados

- `package.json` — bloco `overrides` estendido (Lote 5)
- `package-lock.json` — regenerado por `npm install`
- `docs/SECURITY_UPDATES.md` — este relatório

### Próximos passos recomendados

1. Merge + Refresh Dependabot no GitHub
2. Migrar para Vite ou eject para eliminar residual `webpack-dev-server`
3. Atualizar CI para Node 20 LTS + jobs `npm test` / `npm run build`

### Histórico de commits sugeridos (Lote 5)

```bash
git add package.json package-lock.json docs/SECURITY_UPDATES.md
git commit -m "fix: patch browserslist, fast-uri, and qs Dependabot alerts via overrides"
```

*(Commit não executado automaticamente — aguardando solicitação do usuário.)*
