# Registro de atualizações de segurança e dependências

**Projeto:** Info-covid19-app  
**Última atualização:** 2026-06-24

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

## Histórico de commits sugeridos

```bash
git add package.json package-lock.json docs/DEPENDENCY_UPGRADE_PLAN.md docs/SECURITY_UPDATES.md
git commit -m "fix: update low-risk dependencies"
```

*(Commit não executado automaticamente — aguardando solicitação do usuário.)*
