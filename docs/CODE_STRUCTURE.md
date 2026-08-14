# Estrutura enxuta do código

A aplicação deliberadamente não possui CMS, framework ou build de frontend nesta fase.

## Fonte de verdade
`public/data/articles.json`

## Renderização
- Home e categorias: `public/assets/app.js`
- Artigos: HTML estático em `public/{categoria}/{slug}/index.html`

## Arquivos que não devem voltar
Não manter duplicatas de `index.html`, `articles.json`, `app.js`, `styles.css`, sitemap, RSS ou páginas de categoria na raiz do repositório.

Não usar `artigo.html?slug=...` como URL pública.


## Branding
O branding oficial do portal usa `public/assets/firstnews-logo.png` em header, footer e favicon.
