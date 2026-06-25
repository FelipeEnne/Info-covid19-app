# Banco de Dados — Info-covid19-app

## Tipo de banco

**Nenhum.** Este projeto não utiliza banco de dados relacional, NoSQL ou qualquer persistência server-side.

Todo o estado da aplicação é mantido **em memória no navegador** via Redux e é perdido ao recarregar a página.

---

## ORM

**Não aplicável.** Não há Prisma, Sequelize, TypeORM, Mongoose ou similar.

---

## Estrutura de dados em memória

Os dados seguem o formato retornado pela API externa `GET /summary`. O mesmo formato é replicado no mock estático.

### Objeto raiz (`state.summary.resp`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `Global` | objeto | Totais mundiais |
| `Countries` | array | Lista de países com métricas |
| `Date` | string (ISO 8601) | Data/hora da última atualização |

### `Global`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `NewConfirmed` | number | Novos confirmados (período) |
| `TotalConfirmed` | number | Total de confirmados |
| `NewDeaths` | number | Novas mortes (período) |
| `TotalDeaths` | number | Total de mortes |
| `NewRecovered` | number | Novos recuperados (período) |
| `TotalRecovered` | number | Total de recuperados |

### `Countries[]` (cada item)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `Country` | string | Nome do país (ex.: `Brazil`) |
| `CountryCode` | string | Código ISO (ex.: `BR`) |
| `Slug` | string | Identificador URL-friendly (ex.: `brazil`) |
| `NewConfirmed` | number | Novos confirmados |
| `TotalConfirmed` | number | Total confirmados |
| `TotalDeaths` | number | Total mortes |
| `NewDeaths` | number | Novas mortes |
| `NewRecovered` | number | Novos recuperados |
| `TotalRecovered` | number | Total recuperados |
| `Date` | string | Data do registro |

### `state.country` (país selecionado)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `country` | objeto ou undefined | Objeto completo do país encontrado na busca |

### `state.filter`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `filter` | string | Critério de ordenação ativo (ex.: `Total Confirmed`) |

---

## Relacionamentos

**Não aplicável.** Os dados são flat (sem joins, foreign keys ou entidades relacionadas).

- `Global` é um singleton dentro do payload.
- `Countries` é uma lista independente de objetos.
- `country` no slice de busca referencia um item de `Countries` por cópia de referência.

---

## Migrations

**Não existem.** Sem schema de banco para migrar.

---

## Seeds / dados iniciais

O arquivo `src/reducers/initialState.js` funciona como **seed estático** (~2200 linhas):

- Contém snapshot de dados de **junho/2020**.
- Usado como valor inicial do reducer `summary` antes do fetch da API.
- Se a API falhar, o estado pode permanecer com esses dados desatualizados.

**Arquivo:** `src/reducers/initialState.js`

**Exemplo do início do mock:**

```javascript
const resp = {
  Global: {
    NewConfirmed: 118555,
    TotalConfirmed: 7105522,
    NewDeaths: 3039,
    TotalDeaths: 410590,
    NewRecovered: 55087,
    TotalRecovered: 3140269,
  },
  Countries: [
    {
      Country: 'Afghanistan',
      CountryCode: 'AF',
      Slug: 'afghanistan',
      // ...
    },
    // ... centenas de países
  ],
};
```

---

## Dados sensíveis

| Aspecto | Status |
|---------|--------|
| PII (dados pessoais) | Não há — apenas estatísticas agregadas por país |
| Credenciais de API | Não usadas — API era pública sem chave |
| Tokens / sessões | Não aplicável |
| `.env` com secrets | Não existe no projeto |

A API original não exigia autenticação. Se uma API substituta exigir chave, ela deve ser configurada via `REACT_APP_*` e **nunca commitada**.

---

## Persistência

| Mecanismo | Usado? |
|-----------|--------|
| localStorage | Não |
| sessionStorage | Não |
| IndexedDB | Não |
| Cookies | Não |
| Backend / DB | Não |

---

## Resumo

Este é um projeto **stateless do ponto de vista de persistência**. A única fonte de verdade em runtime é o Redux store, alimentado pela API externa (ou pelo mock inicial em caso de falha).

Para qualquer necessidade futura de persistência (favoritos, histórico de buscas, etc.), seria necessário adicionar backend ou storage client-side — nenhum dos dois existe hoje.
