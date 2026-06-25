# Plano de atualização de dependências

Documento gerado a partir do diagnóstico do projeto Info-covid19-app (CRA 2 + React 16 + npm).

**Última atualização:** 2026-06-24

---

## Stack detectada

| Aspecto | Valor |
|---------|-------|
| Tipo | SPA frontend-only |
| Framework | React 16.14.0 |
| Estado | Redux 4 + redux-thunk + @reduxjs/toolkit 1.9.7 |
| Roteamento | react-router-dom 5 |
| UI | Bootstrap 4.6.2 + react-bootstrap 1 |
| Build | Create React App (`react-scripts` 2.1.3) |
| Linguagem | JavaScript (sem TypeScript) |
| Testes | Enzyme 3 + @testing-library (7 suites) |
| CI | `.github/linters.yml` — ESLint + Stylelint; Node 12.x (EOL) |

## Gerenciador de pacotes

- **Primário:** npm (`package-lock.json`, lockfileVersion 2). `yarn.lock` foi removido — usar apenas npm.

## Node

| Fonte | Versão |
|-------|--------|
| `engines` em package.json | Ausente |
| CI | Node 12.x |
| Validação local | Node 22.22.0 |

**Workaround CRA 2 em Node 17+:** `NODE_OPTIONS=--openssl-legacy-provider` para build; `SKIP_PREFLIGHT_CHECK=true` para test/build (conflito eslint 5 vs 6).

---

## Pacotes analisados

### Dependências diretas (dependencies)

| Pacote | Antes | Atual | Latest | Grupo |
|--------|------:|------:|-------:|-------|
| @reduxjs/toolkit | 1.8.1 | **1.9.7** | 2.12.0 | A (aplicado Lote 1) |
| @testing-library/jest-dom | 4.2.4 | 4.2.4 | 6.9.1 | B |
| @testing-library/user-event | 7.2.1 | 7.2.1 | 14.6.1 | B |
| bootstrap | 4.5.0 | **4.6.2** | 5.3.8 | A (aplicado Lote 1) |
| prop-types | 15.8.1 | 15.8.1 | 15.8.1 | A (já atual) |
| react | 16.13.1 | **16.14.0** | 19.2.7 | A (aplicado Lote 1) |
| react-bootstrap | 1.0.1 | 1.0.1 | 2.10.10 | A* (Lote 2 proposto) |
| react-check-auth | 0.2.0-alpha.2 | 0.2.0-alpha.2 | 0.2.0-alpha.2 | — (não usado) |
| react-dom | 16.13.1 | **16.14.0** | 19.2.7 | A (aplicado Lote 1) |
| react-redux | 7.2.8 | **7.2.9** | 9.3.0 | A (aplicado Lote 1) |
| react-router-dom | 5.2.0 | 5.2.0 | 7.18.0 | A* (Lote 2 proposto) |
| react-scripts | 2.1.3 | 2.1.3 | 5.0.1 | **B** |
| redux | 4.1.2 | **4.2.1** | 5.0.1 | A (aplicado Lote 1) |
| redux-thunk | 2.4.1 | **2.4.2** | 3.1.0 | A (aplicado Lote 1) |

### DevDependencies

| Pacote | Atual | Latest | Grupo |
|--------|------:|-------:|-------|
| @testing-library/react | 9.5.0 | 16.x | B |
| enzyme + adapter | 3.11.0 | — | B (substituir) |
| eslint | 6.8.0 | 10.x | B |
| eslint-config-airbnb + plugins | 18.x | 19.x+ | B |

---

## Grupo A — Atualização segura (patch/minor, mesma major)

| Pacote | Atual | Alvo seguro | Tipo | Vuln | Status |
|--------|------:|------------:|------|------|--------|
| redux-thunk | 2.4.1 | 2.4.2 | D | Não | **Aplicado** |
| react-redux | 7.2.8 | 7.2.9 | D | Não | **Aplicado** |
| redux | 4.1.2 | 4.2.1 | D | Não | **Aplicado** |
| react | 16.13.1 | 16.14.0 | D | Não | **Aplicado** |
| react-dom | 16.13.1 | 16.14.0 | D | Não | **Aplicado** |
| bootstrap | 4.5.0 | 4.6.2 | D | Não | **Aplicado** |
| @reduxjs/toolkit | 1.8.1 | 1.9.7 | D | Não | **Aplicado** |
| react-router-dom | 5.2.0 | 5.3.4 | D | Parcial | Proposto Lote 2 |
| react-bootstrap | 1.0.1 | 1.6.8 | D | Não | Proposto Lote 2 |
| lodash, elliptic, ws, etc. | várias | patch | T | Sim | Proposto Lote 2 via `npm audit fix` |

---

## Grupo B — Alto impacto (não aplicar automaticamente)

| Pacote | Atual | Recomendada | Risco |
|--------|------:|------------:|-------|
| react-scripts | 2.1.3 | 5.0.1 ou Vite | Crítico |
| react + react-dom | 16.x | 18 LTS | Alto |
| redux | 4.x | 5.x | Alto |
| @reduxjs/toolkit | 1.x | 2.x | Alto |
| react-redux | 7.x | 9.x | Alto |
| react-router-dom | 5.x | 6.x/7.x | Alto |
| bootstrap | 4.x | 5.x | Alto |
| react-bootstrap | 1.x | 2.x | Alto |
| eslint + Airbnb | 6.x | 8+/9+ | Médio-alto |
| Node (CI) | 12.x | 20 LTS | Alto |
| webpack / babel / jest | via CRA 2 | via CRA 5/Vite | Crítico |

---

## Lote Seguro 1 — Aplicado

```text
Pacotes: redux-thunk, react-redux, redux, react, react-dom, bootstrap, @reduxjs/toolkit
Versões alvo: 2.4.2, 7.2.9, 4.2.1, 16.14.0, 16.14.0, 4.6.2, 1.9.7
Comando:
  npm install redux-thunk@2.4.2 react-redux@7.2.9 redux@4.2.1 react@16.14.0 react-dom@16.14.0 bootstrap@4.6.2 @reduxjs/toolkit@1.9.7
Resultado: 7 test suites OK, build OK, audit 241 vulns (sem redução — esperado)
```

Detalhes em [SECURITY_UPDATES.md](./SECURITY_UPDATES.md).

---

## Lote Seguro 2 — Proposto (aguardando aprovação)

```text
Lote seguro 2:
- pacotes:
  react-router-dom, react-bootstrap
  + transitivas via npm audit fix (sem --force)
- versões atuais:
  react-router-dom 5.2.0, react-bootstrap 1.0.1
- versões alvo:
  react-router-dom 5.3.4, react-bootstrap 1.6.8
  + patches transitivos (lodash, elliptic, follow-redirects, ws, @babel/*, etc.)
- motivo:
  Minor dentro da mesma major; npm audit fix corrige dezenas de transitivas sem react-scripts major
- risco:
  Médio — react-bootstrap 1.0→1.6 pode alterar estilos; audit fix pode alterar lockfile extensivamente
- arquivos alterados:
  package.json, package-lock.json
- comandos:
  npm install react-router-dom@5.3.4 react-bootstrap@1.6.8
  npm audit fix
  (NÃO usar npm audit fix --force)
- validação:
  SKIP_PREFLIGHT_CHECK=true CI=true npm test -- --watchAll=false
  SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm run build
  npm audit
  npx eslint src
```

**Expectativa:** redução parcial de vulnerabilidades (A confirmar contagem exata após aplicação). Maioria permanece até upgrade de `react-scripts`.

---

## Ordem recomendada de migração (Grupo B)

1. Node CI 12 → 20 LTS + `.github/linters.yml` (ubuntu-latest)
2. `react-scripts` 2 → 5 (ou spike Vite)
3. React 16 → 18 LTS
4. react-router-dom 5 → 6
5. Redux stack (redux 5 + RTK 2 + react-redux 9)
6. ESLint 6 → 8+ e plugins Airbnb
7. Substituir Enzyme por Testing Library
8. Bootstrap 4 → 5 + react-bootstrap 2 (se necessário)
9. Corrigir código quebrado; validar build/testes

---

## Fichas de migração — Grupo B

### react-scripts

```text
Pacote: react-scripts
Versão atual: 2.1.3
Versão recomendada: 5.0.1 (alternativa: migrar para Vite)
Por que precisa atualizar: ~200+ vulnerabilidades transitivas; CRA 2 EOL; incompatibilidade Node moderno
Tipo de breaking change: Webpack 4→5, Jest, ESLint integrado, browserslist, env vars
Arquivos provavelmente afetados: package.json, src/setupTests.js, src/test/*, browserslist
Risco: Crítico
Benefício: Maior redução de vulnerabilidades; suporte Node 18/20
Plano de migração: Branch isolada; primeiro Node LTS; CRA 5 ou spike Vite
Como testar: npm run build && CI=true npm test
Deve ser feito agora ou depois: DEPOIS dos lotes seguros A
```

### React 16 → 18

```text
Pacote: react, react-dom
Versão atual: 16.14.0
Versão recomendada: 18.3.x LTS
Por que precisa atualizar: React 16 EOL; prerequisito para RTK 2, react-redux 9, Testing Library recente
Tipo de breaking change: ReactDOM.render → createRoot; Strict Mode; Enzyme incompatível
Arquivos provavelmente afetados: src/index.js, src/test/* (Enzyme), possivelmente componentes com lifecycle legado
Risco: Alto
Benefício: Ecossistema moderno; correções de segurança indiretas
Plano de migração: Após CRA 5; migrar testes Enzyme → RTL; atualizar index.js
Como testar: CI=true npm test && npm run build
Deve ser feito agora ou depois: DEPOIS de react-scripts
```

### Node (CI e local)

```text
Pacote: Node.js (runtime)
Versão atual CI: 12.x
Versão recomendada: 20 LTS
Por que precisa atualizar: Node 12 EOL; ubuntu-18.04 EOL no CI
Tipo de breaking change: OpenSSL 3; CRA 2 exige legacy provider até upgrade CRA
Arquivos provavelmente afetados: .github/linters.yml; opcional .nvmrc, engines em package.json
Risco: Alto (sem CRA upgrade)
Benefício: Ambiente de build seguro e suportado
Plano de migração: Atualizar CI para node 20 + ubuntu-latest; adicionar engines; documentar NODE_OPTIONS
Como testar: npm ci && npm run build && npm test no CI
Deve ser feito agora ou depois: Paralelo a react-scripts (idealmente junto)
```

### react-router-dom 5 → 6

```text
Pacote: react-router-dom
Versão atual: 5.2.0 (Lote 2 propõe 5.3.4 dentro de v5)
Versão recomendada: 6.28.x
Por que precisa atualizar: v5 maintenance; v6 API moderna; vulnerabilidades transitivas em v5 menores que CRA
Tipo of breaking change: Switch→Routes, component→element, useHistory→useNavigate
Arquivos provavelmente afetados: src/App.js, containers com Route/Link/Redirect
Risco: Alto
Benefício: API atual; melhor tree-shaking
Plano de migração: Após React 18; seguir guia oficial v5→v6
Como testar: Testes de rota + smoke manual das 4 rotas
Deve ser feito agora ou depois: DEPOIS de React 18
```

### ESLint 6 → 8+

```text
Pacote: eslint, eslint-config-airbnb, plugins
Versão atual: eslint 6.8.0, airbnb 18.1.0
Versão recomendada: eslint 8.x + airbnb 19.x (ou eslint 9 flat config — A confirmar)
Por que precisa atualizar: ESLint 6 EOL; conflito com react-scripts (eslint 5 vs 6)
Tipo de breaking change: Novas regras; peer deps; possível flat config
Arquivos provavelmente afetados: .eslintrc.json, package.json devDependencies
Risco: Médio-alto
Benefício: Lint consistente; remove SKIP_PREFLIGHT_CHECK após CRA 5
Plano de migração: Após CRA 5; alinhar versão eslint com react-scripts embutido ou usar override
Como testar: npx eslint src
Deve ser feito agora ou depois: DEPOIS de react-scripts
```

### Enzyme → Testing Library

```text
Pacote: enzyme, enzyme-adapter-react-16
Versão atual: 3.11.0
Versão recomendada: Remover; usar @testing-library/react 14+
Por que precisa atualizar: Enzyme sem suporte React 17+
Tipo de breaking change: Reescrever testes (mount/shallow → render/screen)
Arquivos provavelmente afetados: src/test/**/*.test.js, setupTests.js
Risco: Alto (esforço de testes)
Benefício: Testes alinhados ao comportamento do usuário
Plano de migração: Migrar suite por suite após React 18
Como testar: CI=true npm test
Deve ser feito agora ou depois: DEPOIS de React 18
```

---

## Riscos gerais

- **241 vulnerabilidades** persistem até upgrade de `react-scripts` (ou migração Vite)
- **`npm audit fix --force` proibido** sem aprovação — instalaria react-scripts 5 + eslint 10 de uma vez
- **Dois lockfiles** — resolvido: removido `yarn.lock`; npm é o único gerenciador
- **CRA 2 + Node 22** exige workarounds temporários para build/test

---

## Próximos passos

1. Revisar e aprovar **Lote Seguro 2**
2. Commit separado: `fix: update low-risk dependencies` (Lote 1)
3. Planejar branch dedicada para **react-scripts 5** ou **Vite**
4. Adicionar `npm test` e `npm run build` ao CI
5. Decidir lockfile canônico (npm vs yarn) — **feito:** npm + `package-lock.json` apenas
