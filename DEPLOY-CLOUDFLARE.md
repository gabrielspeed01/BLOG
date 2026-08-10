# Deploy no Cloudflare Workers — configuração v2

## Estrutura

O Wrangler publica somente a pasta `public/`.

```text
/
├── wrangler.jsonc
├── package.json
├── .gitignore
├── README.md
└── public/
    ├── index.html
    ├── 404.html
    ├── _headers
    ├── robots.txt
    ├── sitemap.xml
    ├── news-sitemap.xml
    ├── rss.xml
    ├── assets/
    ├── data/
    └── criptomoedas/
```

Isso impede que `.git`, `.wrangler`, README e outros arquivos internos sejam enviados como assets.

## Cloudflare

- Root directory: `/`
- Build command: nenhum
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

## Após o deploy

Testar:

- https://blog.gabriel-speed01.workers.dev/
- https://blog.gabriel-speed01.workers.dev/assets/styles.css
- https://blog.gabriel-speed01.workers.dev/data/articles.json
- https://blog.gabriel-speed01.workers.dev/criptomoedas/senado-eua-avanca-clarity-act-regras-criptomoedas/
- https://blog.gabriel-speed01.workers.dev/sitemap.xml
- https://blog.gabriel-speed01.workers.dev/news-sitemap.xml
- https://blog.gabriel-speed01.workers.dev/rss.xml
- https://blog.gabriel-speed01.workers.dev/robots.txt

Uma URL inexistente deve renderizar `404.html` e retornar HTTP 404.
