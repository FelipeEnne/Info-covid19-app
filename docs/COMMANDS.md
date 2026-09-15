# Comandos — Info-covid19-app

Referência rápida de comandos úteis para desenvolvimento, build, testes e lint.

---

## Instalação de dependências

```bash
npm install
```

---

## Desenvolvimento

```bash
# Servidor de desenvolvimento (hot reload)
npm start

# Abre em http://localhost:3000 por padrão
```

Não há script separado para frontend/backend — o projeto é 100% frontend.

---

## Build

```bash
# Build de produção → pasta dist/
npm run build

# Preview local do build de produção
npm run preview
```

---

## Testes

```bash
# Modo interativo (watch)
npm test

# Modo CI (executa uma vez e encerra)
npm test -- --run
```

**Framework:** Vitest + `@testing-library/react` + jsdom.

**Arquivos de teste:** `src/test/`

| Arquivo | Escopo |
|---------|--------|
| `src/test/actions/index.test.js` | Actions Redux |
| `src/test/components/*.test.js` | Componentes (5 arquivos) |
| `src/test/containers/Summary.test.js` | Container Summary |

---

## Lint

Não há scripts `lint` no `package.json`. Use diretamente:

```bash
# ESLint (JavaScript)
npx eslint .

# Stylelint (CSS)
npx stylelint "**/*.{css,scss}"
```

Configurações:

- ESLint: `.eslintrc.json` (react-app + vitest)
- Stylelint: `.stylelintrc.json`

---

## Formatação

**Não configurado.** Não há Prettier, Husky ou `lint-staged` no projeto.

---

## Banco de dados

**Não aplicável.** Sem migrations, seeds ou comandos de banco.

---

## Docker

**Não existe.** Não há `Dockerfile` nem `docker-compose.yml` no repositório.

---

## Git / CI

```bash
# Ver status
git status

# Criar branch
git checkout -b nome-da-branch
```

**CI (GitHub Actions):** dispara em `pull_request`, executa testes, build, ESLint e Stylelint com Node 20.

Arquivo: `.github/linters.yml`

**Stickler CI:** configurado em `.stickler.yml` (ESLint em PRs).

---

## Resumo rápido

| Ação | Comando |
|------|---------|
| Instalar | `npm install` |
| Dev | `npm start` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Testes | `npm test` |
| Testes CI | `npm test -- --run` |
| Lint JS | `npx eslint .` |
| Lint CSS | `npx stylelint "**/*.{css,scss}"` |
