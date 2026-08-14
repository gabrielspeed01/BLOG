# Limpeza do repositório atual

O ZIP representa a estrutura limpa que deve permanecer.

## Na raiz do repositório, manter somente
- `.gitignore`
- `package.json`
- `wrangler.jsonc`
- `README.md`
- `DEPLOY-CLOUDFLARE.md`
- `docs/`
- `public/`

**Remova todos os outros arquivos e pastas da raiz.**

Isso elimina versões antigas como:
- `index (1).html`, `index (2).html`, etc.;
- `AJUSTES-V*.md`;
- cópias de `assets/`, `data/`, `articles.json`, `app.js`, `artigo.html`, `404.html`, `_headers` e `ads.txt` fora de `public/`;
- `download`, `download (3)`, `download (9)`;
- `MANIFESTO.json`, `UPLOAD-LEIA-PRIMEIRO.txt`, `CONFIGURACAO-IMAGENS-PROXIMAS-NOTICIAS.txt`;
- arquivos de notícia soltos na raiz.

## Dentro de `public/`, manter somente
- `index.html`
- `404.html`
- `_headers`
- `ads.txt`
- `robots.txt`
- `sitemap.xml`
- `news-sitemap.xml`
- `rss.xml`
- `assets/`
- `data/`
- `tecnologia/`
- `criptomoedas/`
- `entretenimento/`
- `politica/`

Remova arquivos antigos como `public/artigo.html`, `public/atacante-article.json`, `public/index (1).html` e qualquer outra cópia/rascunho que não apareça na lista acima.

> Atenção: enviar um ZIP pelo GitHub substitui/cria arquivos, mas não apaga arquivos antigos automaticamente. As exclusões acima precisam ser feitas uma vez no repositório.
