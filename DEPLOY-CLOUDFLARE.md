# Checklist de deploy — Cloudflare Workers

## Configuração do painel

- Root directory: `/`
- Build command: vazio / None
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

## Testes após deploy

1. Home:
   https://blog.gabriel-speed01.workers.dev/

2. CSS:
   https://blog.gabriel-speed01.workers.dev/assets/styles.css

3. JSON:
   https://blog.gabriel-speed01.workers.dev/data/articles.json

4. Notícia:
   https://blog.gabriel-speed01.workers.dev/criptomoedas/senado-eua-avanca-clarity-act-regras-criptomoedas/

5. Sitemap:
   https://blog.gabriel-speed01.workers.dev/sitemap.xml

6. News Sitemap:
   https://blog.gabriel-speed01.workers.dev/news-sitemap.xml

7. RSS:
   https://blog.gabriel-speed01.workers.dev/rss.xml

8. Robots:
   https://blog.gabriel-speed01.workers.dev/robots.txt

9. Página inexistente:
   https://blog.gabriel-speed01.workers.dev/pagina-que-nao-existe
   Deve retornar o conteúdo de `404.html` com status HTTP 404.

## Observação

`html_handling: auto-trailing-slash` garante que uma pasta contendo `index.html`,
como `/criptomoedas/noticia/index.html`, seja acessível canonicamente como
`/criptomoedas/noticia/`.
