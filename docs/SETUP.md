# Setup — Info-covid19-app

Guia para rodar o projeto localmente pela primeira vez.

---

## Pré-requisitos

| Requisito | Versão recomendada | Observação |
|-----------|-------------------|------------|
| Node.js | 20.x LTS | CI usa Node 20; Node 18+ funciona |
| npm | 9.x ou superior | Gerenciador padrão (`package-lock.json`) |
| Git | Qualquer versão recente | Para clonar o repositório |

O CI do projeto usa **Node 20** (`.github/linters.yml`).

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

Use **npm** — o repositório mantém apenas `package-lock.json`.

### 3. Subir o servidor de desenvolvimento

```bash
npm start
```

O Vite abrirá em `http://localhost:3000` (ou a próxima porta disponível).

### 4. Build de produção (opcional)

```bash
npm run build
```

Gera a pasta `dist/` com arquivos estáticos prontos para deploy.

### 5. Preview do build (opcional)

```bash
npm run preview
```

Serve o conteúdo de `dist/` localmente para validar o build de produção.

---

## Configuração de variáveis de ambiente

**Estado atual:** o projeto **não usa** variáveis de ambiente. A URL da API está hardcoded em `src/actions/fechSummary.js`.

O `.gitignore` já ignora arquivos `.env.*.local`. Se no futuro a URL da API for externalizada, o padrão Vite seria:

```bash
# .env (exemplo — NÃO commitar)
VITE_API_URL=https://api.exemplo.com/summary
```

No código, variáveis com prefixo `VITE_` são expostas ao browser via `import.meta.env`.

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
| Preview build | `npm run preview` |
| Testes (interativo) | `npm test` |
| Testes (CI, sem watch) | `npm test -- --run` |
| Lint JS | `npx eslint .` |
| Lint CSS | `npx stylelint "**/*.{css,scss}"` |

---

## Problemas comuns

### API não retorna dados / app fica em loading

A API `https://api.covid19api.com/summary` foi **descontinuada** (~2022). O fetch pode falhar silenciosamente e o app exibir apenas o estado de loading ou dados do mock inicial.

**Workaround temporário:** os dados em `initialState.js` aparecem até o fetch completar; se a API falhar, o reducer mantém o estado anterior.

**Solução definitiva:** migrar para API alternativa (ver [TODO_LEGACY.md](./TODO_LEGACY.md)).

### Imagens quebradas no README

O README referencia `./public/assets/img/` (screenshots), mas essa pasta **não existe** no repositório atual. Isso não afeta o funcionamento da app.

### Gerenciador de pacotes

O projeto usa **apenas npm** (`package-lock.json`). Não use `yarn install` — o `yarn.lock` foi removido.

### Porta 3000 ocupada

O Vite tentará a próxima porta disponível ou exibirá erro. Libere a porta 3000 ou configure outra em `vite.config.js`.

---

## Deploy

O projeto inclui `netlify.toml` para deploy no **Netlify**:

1. `npm run build`
2. Publicar conteúdo da pasta `dist/` (configurado automaticamente via `netlify.toml`)
3. Redirects SPA para rotas `/new` e `/seach` incluídos
