# Setup — Info-covid19-app

Guia para rodar o projeto localmente pela primeira vez.

---

## Pré-requisitos

| Requisito | Versão recomendada | Observação |
|-----------|-------------------|------------|
| Node.js | 14.x – 16.x | CRA 2.x (`react-scripts` 2.1.3) pode falhar em Node 17+ sem flags legadas |
| npm | 6.x ou superior | Yarn também funciona (há `yarn.lock` no repo) |
| Git | Qualquer versão recente | Para clonar o repositório |

O CI do projeto usa **Node 12.x** (`.github/linters.yml`), que está fora de suporte. Para desenvolvimento local, prefira Node 14 ou 16.

**Não é necessário:** banco de dados, Docker, variáveis de ambiente (no estado atual do código).

---

## Instalação

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Info-covid19-app
```

### 2. Instalar dependências

```bash
npm install
```

**Atenção — lockfiles duplos:** o repositório contém tanto `package-lock.json` (npm) quanto `yarn.lock` (yarn). Escolha **um** gerenciador e mantenha consistência:

- Com npm: `npm install`
- Com yarn: `yarn install`

Não misture os dois no mesmo ambiente de desenvolvimento.

### 3. Subir o servidor de desenvolvimento

```bash
npm start
```

O CRA abrirá automaticamente em `http://localhost:3000` (ou a próxima porta disponível).

### 4. Build de produção (opcional)

```bash
npm run build
```

Gera a pasta `build/` com arquivos estáticos prontos para deploy.

---

## Configuração de variáveis de ambiente

**Estado atual:** o projeto **não usa** variáveis de ambiente. A URL da API está hardcoded em `src/actions/fechSummary.js`.

O `.gitignore` já ignora arquivos `.env.*.local` (padrão CRA). Se no futuro a URL da API for externalizada, o padrão seria:

```bash
# .env (exemplo — NÃO commitar)
REACT_APP_API_URL=https://api.exemplo.com/summary
```

No código React (CRA), apenas variáveis com prefixo `REACT_APP_` são expostas ao browser.

**Não existe** `.env.example` no repositório.

---

## Banco de dados

**Não aplicável.** O projeto não possui banco de dados. Todo o estado é mantido em memória via Redux e é perdido ao recarregar a página.

Ver [DATABASE.md](./DATABASE.md) para a estrutura de dados em memória.

---

## Migrations e seeds

**Não aplicável.** Não há migrations nem seeds de banco.

O arquivo `src/reducers/initialState.js` funciona como um **mock estático** (snapshot de dados de junho/2020) usado como estado inicial do Redux até a API responder.

---

## Comandos para rodar localmente

| Ação | Comando |
|------|---------|
| Instalar deps | `npm install` |
| Dev server | `npm start` |
| Build produção | `npm run build` |
| Testes (interativo) | `npm test` |
| Testes (CI, sem watch) | `CI=true npm test` |
| Lint JS | `npx eslint .` |
| Lint CSS | `npx stylelint "**/*.{css,scss}"` |

---

## Problemas comuns

### API não retorna dados / app fica em loading

A API `https://api.covid19api.com/summary` foi **descontinuada** (~2022). O fetch pode falhar silenciosamente e o app exibir apenas o estado de loading ou dados do mock inicial.

**Workaround temporário:** os dados em `initialState.js` aparecem até o fetch completar; se a API falhar, o reducer mantém o estado anterior.

**Solução definitiva:** migrar para API alternativa (ver [TODO_LEGACY.md](./TODO_LEGACY.md)).

### Erro ao instalar com Node 17+

`react-scripts` 2.x usa OpenSSL legado. Possíveis soluções:

```bash
# Opção 1: usar Node 16 via nvm
nvm use 16

# Opção 2: flag legada (não recomendado em produção)
set NODE_OPTIONS=--openssl-legacy-provider
npm start
```

### Imagens quebradas no README

O README referencia `./public/assets/img/` (screenshots), mas essa pasta **não existe** no repositório atual. Isso não afeta o funcionamento da app.

### Conflito npm vs yarn

Se `npm install` e `yarn install` forem executados alternadamente, podem surgir inconsistências. Escolha um gerenciador e remova o lockfile do outro em uma futura limpeza.

### Porta 3000 ocupada

O CRA perguntará se deseja usar outra porta. Aceite ou libere a porta 3000.

### Testes falhando por versão do Node

Enzyme com React 16 pode ter incompatibilidades em Node muito recente. Use Node 14–16 para rodar testes.

---

## Deploy

O README documenta deploy no **Netlify**:

1. `npm run build`
2. Publicar conteúdo da pasta `build/`

Não há `netlify.toml` no repositório. A configuração de SPA fallback (redirects para `index.html`) pode estar no painel do Netlify.

**A confirmar:** se o deploy no Netlify ainda está ativo e funcional.
