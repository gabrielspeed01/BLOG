# BLOG

MVP estático de um portal de notícias sobre **Tecnologia, Criptomoedas e Entretenimento**.

## Arquitetura atual

- `index.html`: home do portal.
- `artigo.html`: visualização de artigo por `?slug=`.
- `assets/styles.css`: layout responsivo.
- `assets/app.js`: renderização, filtros, busca e artigos.
- `data/articles.json`: contrato de entrada de conteúdo.
- `docs/PIPELINE.md`: desenho da automação editorial.
- `robots.txt` e `sitemap.xml`: base de SEO.

## Cloudflare Pages

Este repositório foi planejado para hospedagem estática gratuita no Cloudflare Pages.

Configuração sugerida:

- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `/`

Ao conectar o repositório ao Cloudflare Pages, cada push pode gerar um novo deploy automaticamente.

## Conteúdo automatizado

A primeira versão do site lê notícias a partir de `data/articles.json`.

A futura IA poderá:

1. monitorar RSS, APIs e fontes;
2. agrupar notícias do mesmo evento;
3. buscar fontes primárias;
4. produzir artigo original;
5. atualizar `data/articles.json`;
6. fazer commit no GitHub;
7. deixar o Cloudflare publicar automaticamente.

Leia `docs/PIPELINE.md` para o contrato editorial.

## Observação sobre o conteúdo atual

Os artigos existentes estão marcados como **DEMONSTRAÇÃO** e servem apenas para validar o layout. Não representam notícias factuais.


## Deploy atual — Cloudflare Workers Static Assets

URL temporária de produção:

`https://blog.gabriel-speed01.workers.dev`

O projeto agora inclui `wrangler.jsonc` na raiz:

```json
{
  "name": "blog",
  "compatibility_date": "2026-08-10",
  "assets": {
    "directory": ".",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

No painel da Cloudflare, utilizar:

- Root directory: `/`
- Build command: nenhum
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

O Wrangler publicará os arquivos estáticos da raiz e utilizará `404.html` para páginas inexistentes.

A `.assetsignore` impede que documentação, configuração e arquivos de desenvolvimento sejam servidos como conteúdo público.
